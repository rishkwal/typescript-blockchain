import Blockchain from "./blockchain";
const TScoin = new Blockchain();

const bc1 = {
  chain: [
    {
      index: 1,
      timestamp: 1648712794798,
      transactions: [],
      nonce: 0,
      hash: "0",
      previousBlockHash: "0",
    },
    {
      index: 2,
      timestamp: 1648712846067,
      transactions: [
        {
          amount: 30,
          sender: "rnojie449fj049g40jg4hf403",
          recipient: "jg08954j0t4j03g0gh0439403",
          transactionId: "c74c1cb0b0c611eca0f91fe8e00c48dc",
        },
        {
          amount: 30,
          sender: "rnojie449fj049g40jg4hf403",
          recipient: "jg08954j0t4j03g0gh0439403",
          transactionId: "c8312580b0c611eca0f91fe8e00c48dc",
        },
        {
          amount: 30,
          sender: "rnojie449fj049g40jg4hf403",
          recipient: "jg08954j0t4j03g0gh0439403",
          transactionId: "c8a20fc0b0c611eca0f91fe8e00c48dc",
        },
        {
          amount: 10,
          sender: "rnojie449fj049g40jg4hf403",
          recipient: "jg08954j0t4j03g0gh0439403",
          transactionId: "caf5ead0b0c611eca0f91fe8e00c48dc",
        },
        {
          amount: 10,
          sender: "rnojie449fj049g40jg4hf403",
          recipient: "jg08954j0t4j03g0gh0439403",
          transactionId: "cb4f2e60b0c611eca0f91fe8e00c48dc",
        },
      ],
      nonce: 59114,
      hash: "00000a418a9bf1c565f29de397ae6d951fb4ce9e6d3810dcb3e51f3d5a3559ba",
      previousBlockHash: "0",
    },
    {
      index: 3,
      timestamp: 1648712857184,
      transactions: [
        {
          amount: 12.5,
          sender: "00",
          recipient: "b035ece0b0c611eca0f91fe8e00c48dc",
          transactionId: "cec605a0b0c611eca0f91fe8e00c48dc",
        },
        {
          amount: 20,
          sender: "rnojie449fj049g40jg4hf403",
          recipient: "jg08954j0t4j03g0gh0439403",
          transactionId: "d273a450b0c611eca0f91fe8e00c48dc",
        },
        {
          amount: 20,
          sender: "rnojie449fj049g40jg4hf403",
          recipient: "jg08954j0t4j03g0gh0439403",
          transactionId: "d31d2ac0b0c611eca0f91fe8e00c48dc",
        },
        {
          amount: 20,
          sender: "rnojie449fj049g40jg4hf403",
          recipient: "jg08954j0t4j03g0gh0439403",
          transactionId: "d384ed40b0c611eca0f91fe8e00c48dc",
        },
      ],
      nonce: 82095,
      hash: "0000c8a3b13600419e3537ceadcc749d3eb28e52d1f1452b18e0b4df677f569f",
      previousBlockHash:
        "00000a418a9bf1c565f29de397ae6d951fb4ce9e6d3810dcb3e51f3d5a3559ba",
    },
    {
      index: 4,
      timestamp: 1648712867494,
      transactions: [
        {
          amount: 12.5,
          sender: "00",
          recipient: "b035ece0b0c611eca0f91fe8e00c48dc",
          transactionId: "d565bb30b0c611eca0f91fe8e00c48dc",
        },
        {
          amount: 70,
          sender: "rnojie449fj049g40jg4hf403",
          recipient: "jg08954j0t4j03g0gh0439403",
          transactionId: "d9b42dc0b0c611eca0f91fe8e00c48dc",
        },
        {
          amount: 70,
          sender: "rnojie449fj049g40jg4hf403",
          recipient: "jg08954j0t4j03g0gh0439403",
          transactionId: "da13b2e0b0c611eca0f91fe8e00c48dc",
        },
        {
          amount: 70,
          sender: "rnojie449fj049g40jg4hf403",
          recipient: "jg08954j0t4j03g0gh0439403",
          transactionId: "da626f20b0c611eca0f91fe8e00c48dc",
        },
      ],
      nonce: 15085,
      hash: "0000d37d86303abfe792a850b70b0d4f05d814abe2d3fbbf485705a6aa108423",
      previousBlockHash:
        "0000c8a3b13600419e3537ceadcc749d3eb28e52d1f1452b18e0b4df677f569f",
    },
    {
      index: 5,
      timestamp: 1648712878445,
      transactions: [
        {
          amount: 12.5,
          sender: "00",
          recipient: "b035ece0b0c611eca0f91fe8e00c48dc",
          transactionId: "db8ac280b0c611eca0f91fe8e00c48dc",
        },
        {
          amount: 100,
          sender: "rnojie449fj049g40jg4hf403",
          recipient: "jg08954j0t4j03g0gh0439403",
          transactionId: "dfbc1020b0c611eca0f91fe8e00c48dc",
        },
        {
          amount: 100,
          sender: "rnojie449fj049g40jg4hf403",
          recipient: "jg08954j0t4j03g0gh0439403",
          transactionId: "e015a1d0b0c611eca0f91fe8e00c48dc",
        },
        {
          amount: 100,
          sender: "rnojie449fj049g40jg4hf403",
          recipient: "jg08954j0t4j03g0gh0439403",
          transactionId: "e06b62f0b0c611eca0f91fe8e00c48dc",
        },
      ],
      nonce: 226445,
      hash: "00001c4534f33790213be21b1551e5d5495c9eba62b3df09f851eb3a2291e11b",
      previousBlockHash:
        "0000d37d86303abfe792a850b70b0d4f05d814abe2d3fbbf485705a6aa108423",
    },
  ],
  pendingTransactions: [
    {
      amount: 12.5,
      sender: "00",
      recipient: "b035ece0b0c611eca0f91fe8e00c48dc",
      transactionId: "e211bff0b0c611eca0f91fe8e00c48dc",
    },
  ],
  currentNodeUrl: "http://localhost:3001",
  networkNodes: [],
};

console.log(TScoin.chainIsValid(bc1.chain));
