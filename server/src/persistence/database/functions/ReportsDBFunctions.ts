export class ReportsDBFunctions {
    static getReports(): string {
        return `SELECT * FROM get_reports()`;
    }
}