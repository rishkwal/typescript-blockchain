import { block } from "./types";
class Blockchain {
  chain: block[];
  newTransactions: string[];
  constructor() {
    this.chain = [];
    this.newTransactions = [];
  }

  createNewBlock(nonce: number, previousBlockHash: string, hash: string) {
    const newBlock: block = {
      index: this.chain.length + 1,
      timestamp: Date.now(),
      transactions: this.newTransactions,
      nonce: nonce,
      hash: hash,
      previousBlockHash: previousBlockHash,
    };

    this.newTransactions = [];
    this.chain.push(newBlock);

    return newBlock;
  }
}

export default Blockchain;
