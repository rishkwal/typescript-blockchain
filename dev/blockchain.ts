import { block } from "./types";
class Blockchain {
  chain: string[];
  newTransactions: string[];
  constructor() {
    this.chain = [];
    this.newTransactions = [];
  }

  createNewBlock(nonce: string, previousBlockHash: string, hash: string) {
    const newBlock: block = {
      index: this.chain.length + 1,
      timestamp: Date.now(),
      transactions: this.newTransactions,
    };
  }
}
