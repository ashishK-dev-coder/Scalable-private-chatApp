import { Server } from "socket.io";
import Redis from 'ioredis'
import prismaClient from "./prisma";
import { produceMessage } from "./kafka";

const pub = new Redis({
    host: "redis-7fd9638-scalable-chatapp.a.aivencloud.com",
    port: 11231,
    username: "default",
    password: "AVNS_RsW8p52EIF7IjxZNp5F",

});

const sub = new Redis({
    host: "redis-7fd9638-scalable-chatapp.a.aivencloud.com",
    port: 11231,
    username: "default",
    password: "AVNS_RsW8p52EIF7IjxZNp5F",
});


class SocketService {
    private _io: Server

    constructor() {
        console.log("Init Socket Service...")
        this._io = new Server({
            cors: {
                allowedHeaders: ['*'],
                origin: '*',
            },
        });
        sub.subscribe("MESSAGES");
    }

    // New socket connected---------------------------------
    public initListeners(){
        const io = this.io;
        console.log("Init Socket Listeners....");
        io.on("connect", (socket) => {
            console.log(`New Socket Connected` , socket.id);

            socket.on(`event:message`, async ({message}: {message : string}) =>{
                console.log("New message Rec.",message);
                // publish this message to redis
                await pub.publish('MESSAGES', JSON.stringify({message}));
            })
        });
       // Send message from socket io server to Redis server------|||||
    sub.on("message", async (channel, message) => {
        if (channel === "MESSAGES") {
          console.log("new message from redis", message);
          // Send message from Redis server to kafka broker
          io.emit("message", message);
        //   await prismaClient.message.create({
        //     data : {
        //         text : message,
        //     }
        //   })
          await produceMessage(message);
          console.log("Message Produced to Kafka Broker");
        }
      });
    }

    get io() {
        return this._io;
    }
}

export default SocketService;