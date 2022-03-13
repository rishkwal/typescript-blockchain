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
const block = bitcoin.createNewBlock(123, "ghugriofw4342r", "nrtjtio34joi24r");
const previousBlockHash = "fhauoefh34r434r893hf93fu4";
console.log(block);
console.log(bitcoin.hashBlock(previousBlockHash, block, 2943941));
