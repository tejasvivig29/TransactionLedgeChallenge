import { PayoutNotification } from '../interfaces/payoutNotification';
import { Schema, model } from 'mongoose';

const payoutNotificationSchema = new Schema<PayoutNotification>({
    date: Date,
    partialAmount: Number,
    transactionId: String, 
    merchantId: String,
    splitId: String,
    destinationAccount: String
});

export const PayoutNotificationModel = model<PayoutNotification>('PayoutNotification', payoutNotificationSchema);