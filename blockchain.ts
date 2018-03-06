import { Block } from './block';
import { Transaction } from './transaction';

export class Blockchain {
    // Blockchain
    chain: Array<Block>;
    
    constructor (
        private difficulty = 2,
        private pendingTransaction = [],
        private miningReward = 100
    ) {
        // Add first block when create a blockchain instance
        this.chain = [ this.createGenesisBlock() ];
    }

    // Create first block of blockchain
    createGenesisBlock(): Block {
        // Create first bitcoin transaction
        const genesisData = {from: 'rafael', to: 'satoshi', amount: 50};

        return new Block(new Date(), genesisData);
    }

    // Return latest block of blockchain
    getLatestBlock(): Block {
        return this.chain[ this.chain.length - 1 ];
    }

    // Mining pending transactions -> add new block after mining
    miningPendingTransactions(miningRewardAddress): void {
        let block = new Block(new Date(), this.pendingTransaction);

        block.mineBlock(this.difficulty);

        console.log("Block successfully mined!");
        
        this.chain.push(block);

        this.pendingTransaction = [
            new Transaction(null, miningRewardAddress, this.miningReward)
        ];
    }

    // Add pending transaction
    createTransaction(transaction): void {
        this.pendingTransaction.push(transaction);
    }

    // Return balance from user
    getBalanceOfAddress(address: string): number {
        let balance = 0;

        for(const block of this.chain) {
            for(const trans of block.getTransactions()){
                if (trans.getFrom() === address)
                    balance -= trans.getAmount();
                
                if (trans.getTo() === address)
                    balance += trans.getAmount();
            }
        }

        return balance;
    }

    // Verify if chain is valid
    isChainValid(): boolean {
        const chainLen: number = this.chain.length;
        
        for(let i = 1 ; i < chainLen ; i++) {
            const currentBlock = this.chain[ i ];
            const previousBlock = this.chain[ i - 1 ];

            if(currentBlock.getHash() !== currentBlock.calculateHash())
                return false;
            
            if(currentBlock.getPreviousHash() !== previousBlock.calculateHash())
                return false;
        }

        return true;
    }
}