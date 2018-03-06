export class Transaction {
    constructor(
        private from,
        private to,
        private amount
    ) {  };

    getFrom(): string {
        return this.from;
    }

    getTo(): string {
        return this.to;
    }

    getAmount(): number {
        return this.amount;
    }
}