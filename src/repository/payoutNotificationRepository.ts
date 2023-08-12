import { PayoutNotification } from "../interfaces/payoutNotification";
import { PayoutNotificationModel } from "../models/payoutNotificationSchema";

export class PayoutNotificationRepository{
    static async createPayout(payoutData: PayoutNotification): Promise<PayoutNotification> {
        const data = await PayoutNotificationModel.create(payoutData);
        return data;
    }

    static async getAllPayouts(): Promise<PayoutNotification[]> {
        return await PayoutNotificationModel.find();
    }
}