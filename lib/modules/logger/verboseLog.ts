import { customLog, sequencialColor, timestamp } from "termx";
import * as chalk from "chalk";
import { join } from "path";
import { $INSPECTOR_LOGS } from "../../env";
import { createWriteStream } from "fs";
import getCircularReplacer from "../utils/getCircularReplacer";

const verboseLogs: { [key: string]: (...args: any[]) => void } = {};
const mainOutputPath = join($INSPECTOR_LOGS, "logs.log");
const mainWriteStream = createWriteStream(mainOutputPath, { flags: "a" });
export default function verboseLog (name: string) {
    if (verboseLogs[name]) return verboseLogs[name];

    const outputPath = join($INSPECTOR_LOGS, name.toLowerCase() + ".log");
    const writeStream = createWriteStream(outputPath, { flags: "a" });
    const color = sequencialColor();

    return verboseLogs[name] = (...args: any[]) => {
        const message = 
            timestamp() + " " +
            chalk.default.bold(chalk.default[color](`| ${name} |`)) + " " +
            args.map(arg => {
                return typeof arg === "string" ? arg : JSON.stringify(arg, getCircularReplacer(), 2)
            }).join(" ") + "\n"
        ;
        
        writeStream.write(message);
        mainWriteStream.write(message);
        process.stdout.write(message);
    }
}