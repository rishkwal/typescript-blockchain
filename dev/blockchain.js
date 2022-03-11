"use strict";
exports.__esModule = true;
var Blockchain = /** @class */ (function () {
    function Blockchain() {
        this.chain = [];
        this.newTransactions = [];
    }
    Blockchain.prototype.createNewBlock = function (nonce, previousBlockHash, hash) {
        var newBlock = {
            index: this.chain.length + 1,
            timestamp: Date.now(),
            transactions: this.newTransactions,
            nonce: nonce,
            hash: hash,
            previousBlockHash: previousBlockHash
        };
        this.newTransactions = [];
        this.chain.push(newBlock);
        return newBlock;
    };
    return Blockchain;
}());
exports["default"] = Blockchain;
