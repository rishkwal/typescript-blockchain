export type block = {
  index: number;
  timestamp: number;
  transactions: string[];
  nonce: number;
  hash: string;
  previousBlockHash: string;
};
