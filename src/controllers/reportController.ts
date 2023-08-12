// src/controllers/reportController.ts
import { Request, Response } from 'express';
import { ReportService } from '../services/reportService';

export class ReportController {
  static async generateCSVReport(_ : Request, res: Response): Promise<void> {
    try {
      const csvData = await ReportService.generateCSVReport();

      res.setHeader('Content-Type', 'text/csv');
      res.setHeader('Content-Disposition', 'attachment; filename=report.csv');
      res.send(csvData);
    } catch (error) {
      console.error('Error generating CSV report:', error);
      res.status(500).json({message : "Internal Server Error occured while generating the report"});
    }
  }
}
