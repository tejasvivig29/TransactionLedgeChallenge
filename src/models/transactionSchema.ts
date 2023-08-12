import { TransactionNotification } from '../interfaces/transaction';
import { Schema, model } from 'mongoose';

const transactionSchema = new Schema<TransactionNotification>({
    date: Date,
    amount: Number,
    merchantId: String,
    transactionType: String,
});

export const TransactionModel = model<TransactionNotification>('Transaction', transactionSchema);