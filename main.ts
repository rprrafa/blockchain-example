import { Block } from './block';
import { Blockchain } from './blockchain';
import { Transaction } from './transaction';

let blockchain = new Blockchain();

blockchain.createTransaction(new Transaction('address1', 'address2', 100));
blockchain.createTransaction(new Transaction('address2', 'address1', 50));

console.log('\n Starting the miner...');

blockchain.miningPendingTransactions('rprrafa');

console.log('\n Balance of rprrafa: ', blockchain.getBalanceOfAddress('rprrafa'));

console.log('\n Starting the miner again...');
blockchain.miningPendingTransactions('rprrafa');
console.log('\n Balance of rprrafa: ', blockchain.getBalanceOfAddress('rprrafa'));
console.log('\n Balance of address1: ', blockchain.getBalanceOfAddress('address1'));
console.log('\n Balance of address2: ', blockchain.getBalanceOfAddress('address2'));

