import dayjs from "dayjs";
import duration from "dayjs/plugin/duration.js";
import chalk from "chalk";
import { getTodayDate, getTodayDateTime } from "../date.js";
import { readFromJsonFile } from "../storage.js";
import { TaskState, DataStructure } from "../types.js"; // Using your new types file

dayjs.extend(duration);

const HR = chalk.dim("─".repeat(50));

export const taskStatus = async () => {
  const data = await readFromJsonFile<DataStructure>(getTodayDate());
  if (!data)
    return console.log(chalk.red("ERR: No active log found for today."));

  const now = getTodayDateTime();

  // Header
  console.log(
    `\n${chalk.bold("WORKLOG SYSTEM")} ${chalk.dim("•")} ${chalk.blue(
      data.date
    )}`
  );
  console.log(HR);

  // Column Headers
  console.log(
    `${chalk.dim("STATUS")}${" ".repeat(5)}${chalk.bold(
      "IDENTIFIER"
    )}${" ".repeat(15)}${chalk.bold("DURATION")}`
  );

  let totalWorkMins = 0;

  data.tasks.forEach((t) => {
    const mins = t.segments.reduce((acc, s) => {
      const end = s.end ? dayjs(s.end) : dayjs(now);
      return acc + dayjs.duration(end.diff(dayjs(s.start))).asMinutes();
    }, 0);

    totalWorkMins += mins;

    // Default: SWITCHED or Other
    let statusLabel = chalk.dim("IDLE    ");
    let titleColor = chalk.white;
    let icon = chalk.dim("○");

    // State-specific formatting
    if (t.state === TaskState.ACTIVE) {
      statusLabel = chalk.green.bold("ACTIVE  ");
      titleColor = chalk.greenBright;
      icon = chalk.green("●");
    } else if (t.state === TaskState.PAUSED) {
      statusLabel = chalk.yellow("PAUSED  ");
      icon = chalk.yellow("●");
    } else if (t.state === TaskState.FINISHED) {
      statusLabel = chalk.blue("DONE    ");
      titleColor = chalk.dim;
      icon = chalk.blue("✔");
    }

    // Aligned Output
    console.log(
      `${icon} ${statusLabel} ${titleColor(t.title.padEnd(25))} ${Math.round(
        mins
      )} min`
    );
  });

  console.log(HR);

  // Summary Logic
  const breakMins = data.breaks.reduce((acc, b) => {
    const end = b.end ? dayjs(b.end) : dayjs(now);
    return acc + dayjs.duration(end.diff(dayjs(b.start))).asMinutes();
  }, 0);

  const activeBreak = data.breaks.find((b) => b.end === null);

  console.log(`${chalk.bold("PRODUCTIVITY SUMMARY")}`);
  console.log(
    `${chalk.dim("Total Active Time:")}  ${chalk.white(
      Math.round(totalWorkMins) + "m"
    )}`
  );
  console.log(
    `${chalk.dim("Total Break Time:")}   ${chalk.white(
      Math.round(breakMins) + "m"
    )}`
  );

  if (activeBreak) {
    console.log(
      `\n${chalk.bgYellow.black.bold(" SYSTEM ON HOLD ")} ${chalk.yellow(
        `Reason: ${activeBreak.reason}`
      )}`
    );
  }
  console.log("");
};
