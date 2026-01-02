import dayjs from "dayjs";
import chalk from "chalk";
import { getTodayDate, getTodayDateTime } from "../date.js";
import { readFromJsonFile } from "../storage.js";
import { DataStructure } from "../types.js";

/**
 * Generates a formal, timestamped session report for the entire day
 */
export const generateReport = async () => {
  const today = getTodayDate();
  const data = await readFromJsonFile<DataStructure>(today);

  if (!data) return console.log(chalk.red("ERR: No session records found."));

  const HR = chalk.dim("─".repeat(60));
  const now = getTodayDateTime();

  // Header Section
  console.log(
    `\n${chalk.bgWhite.black.bold(" SESSION AUDIT REPORT ")} ${chalk.dim(
      "•"
    )} ${chalk.white(today)}`
  );
  console.log(HR);

  // 1. Task Breakdown
  console.log(chalk.bold("ACTIVITY LOG"));

  data.tasks.forEach((task) => {
    // Calculate total task time across all segments
    const totalMins = task.segments.reduce((acc, seg) => {
      const end = seg.end ? dayjs(seg.end) : dayjs(now);
      return acc + dayjs.duration(end.diff(dayjs(seg.start))).asMinutes();
    }, 0);

    // Header for the specific task
    console.log(
      `\n${chalk.blue("●")} ${chalk.bold(task.title.toUpperCase())} ${chalk.dim(
        `(${Math.round(totalMins)}m cumulative)`
      )}`
    );

    // List all events/notes under this task
    if (task.events.length === 0) {
      console.log(`  ${chalk.dim("└─ No specific checkpoints recorded.")}`);
    } else {
      task.events.forEach((event, idx) => {
        const isLast = idx === task.events.length - 1;
        const branch = isLast ? "└─" : "├─";
        const time = chalk.dim(`[${dayjs(event.time).format("HH:mm")}]`);
        console.log(`  ${chalk.dim(branch)} ${time} ${event.message}`);
      });
    }
  });

  // 2. Aggregate Totals
  const totalWork = data.tasks.reduce((total, task) => {
    return (
      total +
      task.segments.reduce((acc, seg) => {
        const end = seg.end ? dayjs(seg.end) : dayjs(now);
        return acc + dayjs.duration(end.diff(dayjs(seg.start))).asMinutes();
      }, 0)
    );
  }, 0);

  const totalBreaks = data.breaks.reduce((acc, b) => {
    const end = b.end ? dayjs(b.end) : dayjs(now);
    return acc + dayjs.duration(end.diff(dayjs(b.start))).asMinutes();
  }, 0);

  console.log(`\n${HR}`);
  console.log(`${chalk.bold("FINAL METRICS")}`);
  console.log(
    `${chalk.dim("Total Billable Time:")}  ${chalk.green(
      Math.round(totalWork) + " minutes"
    )}`
  );
  console.log(
    `${chalk.dim("Total Non-Work Time:")} ${chalk.yellow(
      Math.round(totalBreaks) + " minutes"
    )}`
  );
  console.log(HR + "\n");
};
