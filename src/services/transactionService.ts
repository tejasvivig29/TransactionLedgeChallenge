import { TransactionNotification } from '../interfaces/transaction';
import { TransactionRepository } from '../repository/transactionRepository';

export class TransactionService {
    static async saveTransaction(transactionData: TransactionNotification): Promise<TransactionNotification>{
        const savedTransaction = await TransactionRepository.createTransaction(transactionData);
        return savedTransaction;
    }
}

