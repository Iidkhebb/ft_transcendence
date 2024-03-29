import {
  ConnectedSocket,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { Socket } from 'socket.io';
import { JoinEventDto } from '../dto/join.event.dto';
import { MoveEventDto } from '../dto/move.event.dio';
import { GameService } from '../game/game.service';
import { Logger } from '@nestjs/common';

@WebSocketGateway({
  cors: {
    origin: process.env.FRONTEND_URL,
    credentials: true,
  },
  namespace: 'game',
})
export class GameGateway {
  constructor(private readonly gameService: GameService) {}

  @WebSocketServer() server: Server;

  @SubscribeMessage('join')
  handleMatchmaking(client: Socket, data: JoinEventDto): void {
    this.gameService.handleMatchmaking(client);
  }

  @SubscribeMessage('cancel-join')
  handleCancelJoin(client: Socket): void {
    this.gameService.handleCancelJoin(client);
  }

  @SubscribeMessage('move')
  handleMoveUp(client: Socket, data): void {
    this.gameService.handleMove(client, data);
  }

  @SubscribeMessage('message')
  handleMessage(client: Socket, data: string): void {
    this.gameService.handleMessage(client, data);
  }

  @SubscribeMessage('invite')
  handleInvite(client: Socket, data: {username: string}): void {
    this.gameService.handleInvite(client, data);
  }

  @SubscribeMessage('left-game')
  handleLeftGame(client: Socket): void {
    this.gameService.handleLeftGame(client);
  }

  @SubscribeMessage('accept-invite')
  handleAcceptInvite(client: Socket, data: {username: string}): void {
    this.gameService.handleAcceptInvite(client, data);
  }

  @SubscribeMessage('cancel-invite')
  handleCancelInvite(client: Socket, data: { username: string }): void {
    this.gameService.handleCancelInvite(client, data);
  }

  @SubscribeMessage('reject-invite')
  handleRejectInvite(client: Socket, data: { username: string }): void {
    this.gameService.handleRejectInvite(client, data);
  }

  @SubscribeMessage('leave')
  handleLeave(client: Socket): void {
    this.gameService.handleLeave(client);
  }


  // @SubscribeMessage('disconnect')
  async handleDisconnect(client: Socket) {
    this.gameService.handleDisconnect(client);
  }

  async handleConnection(@ConnectedSocket() client: Socket, ...args: any[]) {
    const userdata = await this.gameService.getUserData(client)

    if (!userdata || userdata.is2f) {
      client.disconnect();
      return;
    }
    this.gameService.handleInit(client, userdata.username);
  }
}
