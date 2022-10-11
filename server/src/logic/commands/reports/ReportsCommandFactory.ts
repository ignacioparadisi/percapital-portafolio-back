import { Report } from "@Common/entities/Report";
import { GetReportsCommand } from "./GetReportsCommand";

export class ReportsCommandFactory {
    static createGetReportsCommand() {
        return new GetReportsCommand(undefined);
    }
}