import { channel } from 'diagnostics_channel';
import { Injectable, HttpException } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { User, Prisma, PrismaClient } from '.prisma/client';
import { compare, genSalt, hash } from 'bcryptjs';
import { UserPasswordService } from './user.password.service';
import { OrigineService } from './user.validate.origine.service';

@Injectable()
export class UserChannelService {
  constructor(
    private prisma: PrismaService,
    private UserPasswordService: UserPasswordService,
    private OrigineService: OrigineService,
  ) {}

  async createChannelByUsername(
    username: string,
    channel: Prisma.ChannelCreateInput,
  ) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { username: username },
      });

      if (user == null) {
        throw new HttpException('User does not exist', 400);
      }

      const check_password = this.UserPasswordService.validatePassword(
        channel.password,
      );
      if ((await check_password).validated == false) {
        throw new HttpException('Weak password', 400);
      }

      const newChannel = await this.prisma.channel.create({
        data: {
          members: { connect: { id: user.id } },
          admins: { connect: { id: user.id } },
          name: channel.name,
          isPublic: channel.isPublic,
          password: channel.isPublic ? null : (await check_password).password,
          salt: channel.isPublic ? null : (await check_password).salt,
          owner: channel.owner ? channel.owner : user.username,
        },
      });
      return newChannel;
    } catch (e) {
      console.log(e);
      throw new HttpException(e.meta, 400);
    }
  }

  async setUserAsAdminOfChannelByUsername(
    admin: string,
    new_admin: string,
    channelname: string,
  ) {
    try {
      let new_admin_user = await this.prisma.user.findUnique({
        // check if user exists
        where: { username: new_admin },
      });
      if (new_admin_user == null) {
        throw new HttpException('User does not exist', 400);
      }

      let admin_user = await this.prisma.user.findUnique({
        // check if user exists
        where: { username: admin },
      });
      if (admin_user == null) {
        throw new HttpException('User does not exist', 400);
      }

      let channel = await this.prisma.channel.findUnique({
        // check if channel exists
        where: { name: channelname },
      });
      if (channel == null) {
        throw new HttpException('Channel does not exist', 400);
      }

      let admin_of = await this.prisma.user.findUnique({
        // check if user is admin of channel
        where: { username: admin },
        include: {
          AdminOf: {
            where: { name: channelname },
          },
        },
      });

      if (admin_of == null) {
        throw new HttpException('User is not admin of channel', 400);
      } else {
        await this.prisma.channel.update({
          // add user as admin of channel
          where: { name: channelname },
          data: {
            admins: {
              connect: { id: new_admin_user.id },
            },
            members: { connect: { id: new_admin_user.id } },
          },
        });
        return channel;
      }
    } catch (e) {
      console.log(e);
      throw new HttpException(e.meta, 400);
    }
  }

  async setUserAsMemberOfChannelByUsername(
    admin: string,
    new_member: string,
    channelname: string,
  ) {
    try {
      let new_admin_user = await this.prisma.user.findUnique({
        // check if user exists
        where: { username: admin },
      });
      if (new_admin_user == null) {
        throw new HttpException('Admin does not exist', 400);
      }

      let new_user_member = await this.prisma.user.findUnique({
        // check if user exists
        where: { username: new_member },
      });
      if (new_user_member == null) {
        throw new HttpException('new member does not exist', 400);
      }

      let channel = await this.prisma.channel.findUnique({
        // check if channel exists
        where: { name: channelname },
      });
      if (channel == null) {
        throw new HttpException('Channel does not exist', 400);
      } else {
        await this.prisma.channel.update({
          // add user as admin of channel
          where: { name: channelname },
          data: {
            members: {
              connect: { id: new_user_member.id },
            },
          },
        });
        return channel;
      }
    } catch (e) {
      console.log(e);
      throw new HttpException(e.meta, 400);
    }
  }

  async changeChannelPasswordByUsername(
    admin: string,
    channelname: string,
    password: string,
  ) {
    try {
      let new_admin_user = await this.prisma.user.findUnique({
        // check if user exists
        where: { username: admin },
      });
      if (new_admin_user == null) {
        throw new HttpException('Admin does not exist', 400);
      }

      let channel = await this.prisma.channel.findUnique({
        // check if channel exists
        where: { name: channelname },
      });

      if (channel.owner != admin) {
        throw new HttpException('User is not owner of channel', 400);
      } else {
        const check_password =
          this.UserPasswordService.validatePassword(password);
        if ((await check_password).validated == false) {
          throw new HttpException('Weak password', 400);
        } else {
          await this.prisma.channel.update({
            where: { name: channelname },
            data: {
              password: (await check_password).password,
              salt: (await check_password).salt,
            },
          });
          return channel;
        }
      }
    } catch (e) {
      console.log(e);
      throw new HttpException(e.meta, 400);
    }
  }

  async checkChannelPasswordByUsername(
    username: string,
    channelname: string,
    password: string,
  ) {
    try {
      const channelcheck = await this.prisma.channel.findUnique({
        where: { name: channelname },
      });
      if (channelcheck == null) {
        throw new HttpException('Channel does not exist', 400);
      }

      if (channelcheck.isPublic == true) {
        throw new HttpException('Channel is public', 400);
      }

      const new_hash = await this.UserPasswordService.createhashPassword(
        password,
        channelcheck.salt,
      );

      if (new_hash.password == channelcheck.password) {
        return { channel };
      } else {
        throw new HttpException('Password incorrect', 400);
      }
    } catch (e) {
      console.log(e);
      throw new HttpException(e.meta, 400);
    }
  }

  async removeChannelPasswordByUsername(username: string, channelname: string) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { username: username },
      });

      if (user == null) {
        throw new HttpException('User does not exist', 400);
      }

      const channel = await this.prisma.channel.findUnique({
        where: { name: channelname },
      });

      if (channel == null) {
        throw new HttpException('Channel does not exist', 400);
      }

      if (channel.owner != username) {
        throw new HttpException('User is not owner of channel', 400);
      }

      await this.prisma.channel.update({
        where: { name: channelname },
        data: {
          password: null,
          isPublic: true,
        },
      });
      return { channel };
    } catch (e) {
      console.log(e);
      throw new HttpException(e.meta, 400);
    }
  }

  async setUserAsBannedOfChannelByUsername(
    admin: string,
    new_banned: string,
    channelname: string,
  ) {
    try {
      const user = await this.prisma.user.findUnique({
        where: { username: admin },
      });

      if (user == null) {
        throw new HttpException('User does not exist', 400);
      }

      const channel = await this.prisma.channel.findUnique({
        where: { name: channelname },
      });

      if (channel == null) {
        throw new HttpException('Channel does not exist', 400);
      }

      const admin_check = await this.prisma.channel.findFirst({
        where: {
          name: channelname,
          admins: {
            some: {
              username: admin,
            },
          },
        },
      });

      if (admin_check == null) {
        throw new HttpException('User is not admin of channel', 400);
      }

      const banned_user = await this.prisma.user.findUnique({
        where: { username: new_banned },
      });

      if (banned_user == null) {
        throw new HttpException('User does not exist', 400);
      }

      // check if user is already banned
      const banned_check = await this.prisma.channel.findFirst({
        where: {
          name: channelname,
          banned: {
            some: {
              username: new_banned,
            },
          },
        },
      });

      if (banned_check != null) {
        throw new HttpException('User is already banned', 400);
      }

      await this.prisma.channel.update({
        where: { name: channelname },
        data: {
          banned: {
            connect: { id: banned_user.id },
          },
        },
      });
      return { channelname };
    } catch (e) {
      console.log(e);
      throw new HttpException(e.meta, 400);
    }
  }

  async setUserAsKickedOfChannelByUsername(
    request: any,
    new_kicked: string,
    channelname: string,
  ) {
    const adminCheck = await this.OrigineService.is_admin_of_channel(
      channelname,
      request,
    );
    if (adminCheck == false) {
      throw new HttpException('User is not admin of channel', 400);
    }

    const kicked_user = await this.prisma.user.findUnique({
      where: { username: new_kicked },
    });

    if (kicked_user == null) {
      throw new HttpException(`doesn't exist`, 400);
    }

    // check if user is already banned
    const banned_check = await this.prisma.channel.findFirst({
      where: {
        name: channelname,
        kicked: {
          some: {
            username: new_kicked,
          },
        },
      },
    });

    if (banned_check != null) {
      throw new HttpException('User is already Kicked', 400);
    }

    await this.prisma.channel.update({
      where: { name: channelname },
      data: {
        kicked: {
          connect: { id: kicked_user.id },
        },
      },
    });

    return { kicked_user };
  }

  async setUserAsMutedOfChannelByUsername(
    request: any,
    new_muted: string,
    channelname: string,
  ) {
    const adminCheck = await this.OrigineService.is_admin_of_channel(
      channelname,
      request,
    );
    if (adminCheck == false) {
      throw new HttpException('User is not admin of channel', 400);
    }

    const muted_user = await this.prisma.user.findUnique({
      where: { username: new_muted },
    });

    if (muted_user == null) {
      throw new HttpException('user not exist', 400);
    }

    // check if user is already banned
    const muted_check = await this.prisma.channel.findFirst({
      where: {
        name: channelname,
        muted: {
          some: {
            username: new_muted,
          },
        },
      },
    });

    if (muted_check != null) {
      throw new HttpException('User is already muted', 400);
    }

    await this.prisma.channel.update({
      where: { name: channelname },
      data: {
        muted: {
          connect: { id: muted_user.id },
        },
      },
    });

    return { muted_user };
  }

  async setUserAsUnmutedOfChannelByUsername(
    request: any,
    new_unmuted: string,
    channelname: string,
  ) {
    const adminCheck = await this.OrigineService.is_admin_of_channel(
      channelname,
      request,
    );
    if (adminCheck == false) {
      throw new HttpException('User is not admin of channel', 400);
    }

    const muted_user = await this.prisma.user.findUnique({
      where: { username: new_unmuted },
    });

    if (muted_user == null) {
      throw new HttpException('User does not exist', 400);
    }

    // check if user is already banned
    const muted_check = await this.prisma.channel.findFirst({
      where: {
        name: channelname,
        muted: {
          some: {
            username: new_unmuted,
          },
        },
      },
    });

    if (muted_check == null) {
      throw new HttpException('User is not muted', 400);
    }

    await this.prisma.channel.update({
      where: { name: channelname },
      data: {
        muted: {
          disconnect: { id: muted_user.id },
        },
      },
    });

    return { muted_user };
  }

  async setUserAsUnbannedOfChannelByUsername(
    request: any,
    new_unbanned: string,
    channelname: string,
  ) {
    const adminCheck = await this.OrigineService.is_admin_of_channel(
      channelname,
      request,
    );
    if (adminCheck == false) {
      throw new HttpException('User is not admin of channel', 400);
    }

    const banned_user = await this.prisma.user.findUnique({
      where: { username: new_unbanned },
    });

    if (banned_user == null) {
      throw new HttpException('User does not exist', 400);
    }

    // check if user is already banned
    const banned_check = await this.prisma.channel.findFirst({
      where: {
        name: channelname,
        banned: {
          some: {
            username: new_unbanned,
          },
        },
      },
    });

    if (banned_check == null) {
      throw new HttpException('User is not banned', 400);
    }

    await this.prisma.channel.update({
      where: { name: channelname },
      data: {
        banned: {
          disconnect: { id: banned_user.id },
        },
      },
    });

    return { banned_user };
  }

  async setUserAsUnkickedOfChannelByUsername(
    request: any,
    new_unkicked: string,
    channelname: string,
  ) {
    const adminCheck = await this.OrigineService.is_admin_of_channel(
      channelname,
      request,
    );
    if (adminCheck == false) {
      throw new HttpException('User is not admin of channel', 400);
    }

    const kicked_user = await this.prisma.user.findUnique({
      where: { username: new_unkicked },
    });

    if (kicked_user == null) {
      throw new HttpException('User does not exist', 400);
    }

    // check if user is already banned
    const kicked_check = await this.prisma.channel.findFirst({
      where: {
        name: channelname,
        kicked: {
          some: {
            username: new_unkicked,
          },
        },
      },
    });

    if (kicked_check == null) {
      throw new HttpException('User is not kicked', 400);
    }

    await this.prisma.channel.update({
      where: { name: channelname },
      data: {
        kicked: {
          disconnect: { id: kicked_user.id },
        },
      },
    });

    return { kicked_user };
  }

  async HandleChannelOwnerLeaveChannel(owner_check: any, username: string) {
    if (owner_check == null) {
      throw new HttpException('Channel not exist', 400);
    }

    /* update the owner of the channel with the first admin 
    of the channel if no admin exist then delete the channel*/
    const channel = await this.prisma.channel.findUnique({
      where: { name: owner_check.name },
      include: { admins: true },
    });

    const firstAdmin = channel.admins.find(
      (admin) => admin.username !== username,
    );
    if (firstAdmin) {
      await this.prisma.channel.update({
        where: { name: owner_check.name },
        data: { owner: firstAdmin.username },
      });
    } else {
      await this.prisma.channel.delete({
        where: { name: owner_check.name },
      });
    }

    // remove the user from the channel
    await this.prisma.user.update({
      where: { username: username },
      data: {
        channels: {
          disconnect: { name: owner_check.name },
        },
        AdminOf: {
          disconnect: { name: owner_check.name },
        },
      },
    });

    // remove the the new owner from kicked or banned or muted list
    await this.prisma.channel.update({
      where: { name: owner_check.name },
      data: {
        kicked: {
          disconnect: { username: firstAdmin.username },
        },
        banned: {
          disconnect: { username: firstAdmin.username },
        },
        muted: {
          disconnect: { username: firstAdmin.username },
        },
      },
    });

    return { username };
  }

  async leaveChannelByUsername(
    username: string,
    channelname: string,
  ): Promise<any> {
    // check if the user is a channel member or channel exist
    const member_check = await this.prisma.user.findFirst({
      where: {
        username: username,
        channels: { some: { name: channelname } },
      },
    });

    if (member_check == null) {
      throw new HttpException(
        'User is not a member of the channel or channel not exist',
        400,
      );
    }

    // check if the user is the owner of the channel
    const owner_check = await this.prisma.channel.findFirst({
      where: {
        name: channelname,
      },
    });
    if (owner_check.owner == username) {
      const owner_handler = this.HandleChannelOwnerLeaveChannel(
        owner_check,
        username,
      );
    } else {
      // remove the non owner user from the channel
      await this.prisma.channel.update({
        where: { name: channelname },
        data: {
          members: {
            disconnect: { username: username },
          },
          admins: {
            disconnect: { username: username },
          },
        },
      });
    }

    return { username };
  }
}