import { Report } from "@Common/entities/Report";
import { ReportsDAO } from "@Persistence/dao/reports/ReportsDAO";
import { Command } from "../Command";

export class GetReportsCommand extends Command<Report | undefined, Report> {

    execute() {
        return new ReportsDAO().get();
    }
}