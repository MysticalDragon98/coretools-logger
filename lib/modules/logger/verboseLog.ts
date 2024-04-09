import { sequencialColor, timestamp } from "termx";
import * as chalk from "chalk";
import getCircularReplacer from "../utils/getCircularReplacer";

const verboseLogs: { [key: string]: (...args: any[]) => void } = {};

export default function verboseLog (name: string) {
    if (verboseLogs[name]) return verboseLogs[name];

    const color = sequencialColor();

    return verboseLogs[name] = (...args: any[]) => {
        const message = 
            timestamp() + " " +
            chalk.default.bold(chalk.default[color](`| ${name} |`)) + " " +
            args.map(arg => {
                return typeof arg === "string" ? arg : JSON.stringify(arg, getCircularReplacer(), 2)
            }).join(" ") + "\n"
        ;
        
        process.stdout.write(message);
    }
}