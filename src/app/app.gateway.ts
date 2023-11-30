import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';

import { Server, Socket } from 'socket.io';
import { AppService } from '../app.service';
import { Chat } from '../database/entity/chat.entity';

@WebSocketGateway({cors: {origin: '*'}})
export class AppGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {

  constructor(private appService: AppService) {}
  
  @WebSocketServer() server: Server;

  @SubscribeMessage('sendMessage')
  async handleMessage(client: Socket, payload: Chat): Promise<void> {
    await this.appService.createMessage(payload);
    this.server.emit('recMessage', payload)
  }
  
  afterInit(server: Server) {
    console.log("Server: : : ", server)
  }
  handleConnection(client: Socket, ...args: any[]) {
    console.log("Connected: : : ", client.id)
  }
  handleDisconnect(client: Socket) {
    console.log("Disconnected: : : ", client.id)
  }
}
