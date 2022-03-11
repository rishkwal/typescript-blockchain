export type block = {
  index: number;
  timestamp: number;
  transactions: transaction[];
  nonce: number;
  hash: string;
  previousBlockHash: string;
};

export type transaction = {
  amount: number;
  sender: string;
  recipient: string;
};
