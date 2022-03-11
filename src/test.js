"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const blockchain_1 = __importDefault(require("./blockchain"));
const bitcoin = new blockchain_1.default();
bitcoin.createNewBlock(123, "fhuao3r34234wr4af", "fhiu342344jg45t5");
bitcoin.createNewBlock(123, "hniotir4r34o44jo4", "ioegio4r4r34223");
bitcoin.createNewBlock(123, "ghugriofw4342r", "nrtjtio34joi24r");
console.log(bitcoin);
