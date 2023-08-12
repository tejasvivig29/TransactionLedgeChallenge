import { TransactionRepository } from '../repository/transactionRepository'
import { TransactionNotification } from '../interfaces/transaction';
import { PayoutNotificationModel } from '../models/payoutNotificationSchema';
import { createObjectCsvWriter } from 'csv-writer';

export class ReportService {
  static async generateCSVReport(): Promise<string> {
    try {
      const transactions: TransactionNotification[] = await TransactionRepository.getAllTransactions();

      const csvWriter = createObjectCsvWriter({
        path: 'transactionLedgeDayReport.csv',
        header: [
          { id: 'transactionId', title: 'Transaction ID' },
          { id: 'date', title: 'Date' },
          { id: 'amount', title: 'Amount' },
          { id: 'merchantId', title: 'Merchant ID' },
          { id: 'payoutId', title: 'Payout ID' },
          { id: 'partialAmount', title: 'Partial Amount' },
        ],
      });

      const csvRecords = [];

      for (const transaction of transactions) {
        const payouts = await PayoutNotificationModel.find({ transactionId: transaction.transactionId });

        for (const payout of payouts) {
          const csvRecord = {
            transactionId: transaction.transactionId,
            date: transaction.date,
            amount: transaction.amount,
            merchantId: transaction.merchantId,
            payoutId: payout._id,
            partialAmount: payout.partialAmount,
          };

          csvRecords.push(csvRecord);
        }
      }

      await csvWriter.writeRecords(csvRecords);

      return 'CSV report generated successfully.';
    } catch (error) {
      throw new Error('Error generating CSV report: ');
    }
  }
}
