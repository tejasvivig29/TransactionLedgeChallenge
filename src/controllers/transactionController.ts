import { Request , Response } from 'express';
import { TransactionService } from '../services/transactionService';
import { TransactionNotification } from '../interfaces/transaction';
import { PayoutNotificationService } from '../services/payoutNotificationService';

export class TransactionController{
    static async handleTransactionHook(req: Request, res: Response): Promise<void>{
        try{
           
           const transactionData: TransactionNotification = req.body;

           if(transactionData.amount == null){
            res.status(400).json({ message: "Invalid data received, amount is null"});
            return;
           }

           if(transactionData.amount < 0){
            res.status(400).json({ message: "Invalid data received, amount is negative"});
            return;
           }

           if(transactionData.merchantId == null){
            res.status(400).json({ message: "Invalid data received, merchant id is null"});
            return;
           }

           if(transactionData.transactionType == null){
            res.status(400).json({ message: "Invalid data received, transaction type is null"});
            return;
           }

           transactionData.date = new Date();

            const savedTransaction = await TransactionService.saveTransaction(transactionData);

            if (savedTransaction.transactionType === "AUTH")
            await PayoutNotificationService.processPayout(savedTransaction);

            res.status(200).json({message: 'Transaction notification received and transaction saved in the database'});

        }catch(error){
            console.log('Error occured while handling transaction webhook' , error);
            res.status(500).json({message: 'Internal Server Error occured while handling the trnsaction web hook'});
        }
    }
}