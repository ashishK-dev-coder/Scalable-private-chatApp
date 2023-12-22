"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.startMessageConsumer = exports.produceMessage = exports.createProducer = void 0;
const kafkajs_1 = require("kafkajs");
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const prisma_1 = __importDefault(require("./prisma"));
// Making New kafka object------------------
const kafka = new kafkajs_1.Kafka({
    brokers: ["kafka-339d77c0-scalable-chatapp.a.aivencloud.com:11244"],
    ssl: {
        ca: [fs_1.default.readFileSync(path_1.default.resolve("./ca.pem"), "utf-8")],
    },
    sasl: {
        username: "avnadmin",
        password: "AVNS_ctKEV7_afRmwqJfJ5RZ",
        mechanism: "plain",
    },
});
// making this for not create again and again producer , if producer then use this
let producer = null;
// Create producer----------------------------
function createProducer() {
    return __awaiter(this, void 0, void 0, function* () {
        if (producer)
            return producer;
        const _producer = kafka.producer();
        yield _producer.connect();
        producer = _producer;
        return producer;
    });
}
exports.createProducer = createProducer;
//Receive msg from the consumer and send to the frontend---------------------
function produceMessage(message) {
    return __awaiter(this, void 0, void 0, function* () {
        const producer = yield createProducer();
        yield producer.send({
            messages: [{ key: `message-${Date.now()}`, value: message }],
            topic: "MESSAGES",
        });
        return true;
    });
}
exports.produceMessage = produceMessage;
// Create consumer of kafka and Message consume from the kafka server
function startMessageConsumer() {
    return __awaiter(this, void 0, void 0, function* () {
        console.log("Consumer is running..");
        const consumer = kafka.consumer({ groupId: "default" });
        yield consumer.connect();
        yield consumer.subscribe({ topic: "MESSAGES", fromBeginning: true });
        yield consumer.run({
            autoCommit: true,
            eachMessage: ({ message, pause }) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                if (!message.value)
                    return;
                console.log(`New Message Recv..`);
                try {
                    yield prisma_1.default.message.create({
                        data: {
                            text: (_a = message.value) === null || _a === void 0 ? void 0 : _a.toString(),
                        },
                    });
                }
                catch (err) {
                    console.log("Something is wrong");
                    pause();
                    setTimeout(() => {
                        consumer.resume([{ topic: "MESSAGES" }]);
                    }, 60 * 1000);
                }
            }),
        });
    });
}
exports.startMessageConsumer = startMessageConsumer;
exports.default = kafka;
