"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blockchain_1 = __importDefault(require("./blockchain"));
const bitcoin = new blockchain_1.default();
bitcoin.createNewBlock(123, "hniotir4r34o44jo4", "ioegio4r4r34223");
bitcoin.createNewTransaction(220, "girojregio4r344", "oi4ji43r44r34r");
bitcoin.createNewTransaction(110, "girojregio4r344", "oi4ji43r44r34r");
console.log(bitcoin);
