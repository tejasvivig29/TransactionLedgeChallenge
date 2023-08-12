import * as express from 'express';
import { TransactionController } from '../controllers/transactionController';
import { ReportController } from '../controllers/reportController';


const router = express.Router();

router.post('/webhook/transaction', TransactionController.handleTransactionHook);

router.get('/webhook/generateReport', ReportController.generateCSVReport);

export default router;