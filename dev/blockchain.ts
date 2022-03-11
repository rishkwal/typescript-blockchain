import { block, transaction } from "./types";
class Blockchain {
  chain: block[];
  pendingTransactions: transaction[];
  constructor() {
    this.chain = [];
    this.pendingTransactions = [];
  }

  createNewBlock(
    nonce: number,
    previousBlockHash: string,
    hash: string
  ): block {
    const newBlock: block = {
      index: this.chain.length + 1,
      timestamp: Date.now(),
      transactions: this.pendingTransactions,
      nonce: nonce,
      hash: hash,
      previousBlockHash: previousBlockHash,
    };

    this.pendingTransactions = [];
    this.chain.push(newBlock);

    return newBlock;
  }

  getLastBlock(): block {
    return this.chain[this.chain.length - 1];
  }

  createNewTransaction(
    amount: number,
    sender: string,
    recipient: string
  ): number {
    const newTransaction = {
      amount: amount,
      sender: sender,
      recipient: recipient,
    };
    this.pendingTransactions.push(newTransaction);
    return this.getLastBlock()["index"] + 1;
  }
}

export default Blockchain;
