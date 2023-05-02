import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class UserChatHistoryService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserPrivateConversationChatHistory(username: string): Promise<any> {
    // get user private direct messages to other users, no duplicates allowed , show only the last message

    const user = await this.prisma.user.findUnique({
      where: { username: username },
    });
    let userConversations = [];

    await Promise.all(
      user.privateChannels.map(async (id) => {
        let chat = await this.prisma.directMessage.findFirst({
          where: { privateChannelId: id },
          orderBy: { createdAt: 'desc' },
          select: {
            text: true,
            SenderUsername: true,
            ReceiverUsername: true,
            createdAt: true,
            privateChannelId: true,
          },
        });
        userConversations.push(chat);
      }),
    );

    console.log('here');
    return userConversations;
  }

  async getUserChannelConversationChatHistory(username: string): Promise<any> {
    const chat = await this.prisma.message.findMany({
      where: { sender: username },
      orderBy: { createdAt: 'desc' },
      select: {
        content: true,
        sender: true,
        createdAt: true,
        channel: { select: { name: true, isPublic: true, owner: true } },
      },
    });
    console.log(chat);
    return chat;
  }
}
