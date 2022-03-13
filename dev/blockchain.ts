import { block, transaction } from "./types";
import sha256 from "sha256";
class Blockchain {
  chain: block[];
  pendingTransactions: transaction[];
  constructor() {
    this.chain = [];
    this.pendingTransactions = [];
    this.createNewBlock(0, "0", "0"); //creating the genesis block
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

  hashBlock(
    previousBlockHash: string,
    currentBlockData: transaction[],
    nonce: number
  ): string {
    const dataAsString =
      previousBlockHash + nonce.toString() + JSON.stringify(currentBlockData);
    const hash = sha256(dataAsString);
    return hash;
  }

  proofOfWork(
    previousBlockHash: string,
    currentBlockData: transaction[]
  ): number {
    let nonce = 0;
    let hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    while (hash.substr(0, 4) !== "0000") {
      nonce++;
      hash = this.hashBlock(previousBlockHash, currentBlockData, nonce);
    }
    return nonce;
  }
}

export default Blockchain;
