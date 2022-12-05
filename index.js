// Import the necessary libraries
const SHA256 = require('crypto-js/sha256');

// Define the block class
class Block {
  constructor(index, timestamp, data, previousHash) {
    this.index = index;
    this.timestamp = timestamp;
    this.data = data;
    this.previousHash = previousHash;
    this.hash = this.calculateHash();
  }

  // Method to calculate the hash of the block
  calculateHash() {
    return SHA256(this.index + this.timestamp + JSON.stringify(this.data) + this.previousHash).toString();
  }
}

// Define the blockchain class
class Blockchain {
  constructor() {
    this.chain = [this.createGenesisBlock()];
  }

  // Method to create the first block in the blockchain
  createGenesisBlock() {
    return new Block(0, Date.now(), 'Genesis block', '0');
  }

  // Method to get the latest block in the blockchain
  getLatestBlock() {
    return this.chain[this.chain.length - 1];
  }

  // Method to add a new block to the blockchain
  addBlock(newBlock) {
    newBlock.previousHash = this.getLatestBlock().hash;
    newBlock.hash = newBlock.calculateHash();
    this.chain.push(newBlock);
  }

  // Method to check if the blockchain is valid
  isChainValid() {
    for (let i = 1; i < this.chain.length; i++) {
      const currentBlock = this.chain[i];
      const previousBlock = this.chain[i - 1];

      if (currentBlock.hash !== currentBlock.calculateHash()) {
        return false;
      }

      if (currentBlock.previousHash !== previousBlock.hash) {
        return false;
      }
    }

    return true;
  }
}

// Create a new instance of the blockchain
const myCoin = new Blockchain();

// Add some blocks to the blockchain
myCoin.addBlock(new Block(1, Date.now(), { amount: 4 }));
myCoin.addBlock(new Block(2, Date.now(), { amount: 10 }));

// Check if the blockchain is valid
console.log(myCoin.isChainValid()); // should return true

// Tamper with the blockchain
myCoin.chain[1].data = { amount: 100 };
myCoin.chain[1].hash = myCoin.chain[1].calculateHash();

// Check if the blockchain is still valid
console.log(myCoin.isChainValid()); // should return false
