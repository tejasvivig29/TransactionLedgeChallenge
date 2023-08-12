import { TransactionNotification } from "../interfaces/transaction";
import { TransactionModel } from "../models/transactionSchema";

export class TransactionRepository{
    static async createTransaction(transactionDataInput: TransactionNotification): Promise<TransactionNotification> {
        const transaction = await TransactionModel.create(transactionDataInput);
        return transaction;
    }
    
    static async getAllTransactions(): Promise<TransactionNotification[]> {
        try{
            const transactions = await TransactionModel.find();
            return transactions;
        }catch(error){
            throw new Error('Error occured while fetching the transactions');
        }
    }
}


