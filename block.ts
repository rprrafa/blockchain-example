import { SHA256 } from "crypto-js";
import { Transaction } from "./transaction";

export class Block {
    private hash;

    constructor (
        private timestamp,
        private transactions,
        private previousHash = '',
        private nonce = 0
    ) { 
        this.timestamp = Date.now();
        this.hash = this.calculateHash();
    }

    //Implementing Proof-of-Work
    mineBlock(difficulty: number) {
        while(this.hash.substring(0, difficulty) !== Array(difficulty + 1).join("0")) {
            this.nonce++;
            this.hash = this.calculateHash();
        }

        console.log("Block mined: " + this.hash);

    }
    
    setHash(hash: string): void {
        this.hash = hash;
    }

    getHash(): string {
        return this.hash;
    }

    getTransactions(): Transaction[] {
        return this.transactions;
    }
    
    setPreviousHash(hash: string): void {
        this.previousHash = hash;
    }

    getPreviousHash(): string {
        return this.previousHash;
    }
    
    calculateHash(): string {
        return SHA256(this.previousHash + JSON.stringify(this.transactions).toString() + this.nonce).toString();
    }

}
