export class PortfolioDBFuctions {

    static getPortfolio(userId: number): string {
        return `SELECT * FROM get_portfolio(${userId})`;
    }
}