import { PayoutNotification } from '../interfaces/payoutNotification';
import { TransactionNotification } from '../interfaces/transaction';
import { PayoutNotificationRepository } from '../repository/payoutNotificationRepository';

export class PayoutNotificationService {
    static async processPayout(transaction: TransactionNotification): Promise<void>{

       const merchantAmount = transaction.amount * 0.95;
       
       const valPayout: PayoutNotification = {
        date: new Date(),
        partialAmount: transaction.amount - merchantAmount,
        transactionId: transaction.transactionId,
        merchantId: transaction.merchantId,
        splitId: 'Fee Part1',
        destinationAccount: 'valpay'
       }

        await PayoutNotificationRepository.createPayout(valPayout);

        const merchantPayout: PayoutNotification = {
            date: new Date(),
            partialAmount: merchantAmount,
            transactionId: transaction.transactionId,
            merchantId: transaction.merchantId,
            splitId: 'Fee Part2',
            destinationAccount: 'merchant'
           }

        await PayoutNotificationRepository.createPayout(merchantPayout);
    }
}

