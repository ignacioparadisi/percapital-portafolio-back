export class PortfolioDBFuctions {

    static getPortfolio(userId: number): string {
        return `SELECT * FROM portfolio(${userId})`;
    }
}