export interface PayoutNotification{
    date: Date,
    partialAmount: number,
    transactionId: String,
    merchantId: string,
    splitId: string,
    destinationAccount: string
}