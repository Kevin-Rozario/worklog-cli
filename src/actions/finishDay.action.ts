import dayjs from "dayjs";
import chalk from "chalk";
import { getTodayDate, getTodayDateTime } from "../date.js";
import { readFromJsonFile, writeToJsonFile } from "../storage.js";
import { finalizeCurrentTask } from "./common.js";
import { DataStructure } from "../types.js";

/**
 * Concludes the workday and generates a formal session report
 */
export const finishDay = async () => {
  const today = getTodayDate();
  const now = getTodayDateTime();
  const data = await readFromJsonFile<DataStructure>(today);

  if (!data)
    return console.log(chalk.red("ERR: No session data found to terminate."));

  const activeTask = data.tasks.find((t) => t.taskId === data.activeTaskId);

  // Logic to prevent double-finishing
  if (data.activeTaskId === "") {
    return console.log(
      chalk.dim("INFO: Workday has already been formally concluded.")
    );
  }

  // 1. Close all remaining sessions
  finalizeCurrentTask(data, now);
  data.activeTaskId = ""; // Clear pointer

  await writeToJsonFile(today, data);

  // 2. Performance Report UI
  const HR = chalk.dim("━".repeat(50));
  console.log(
    `\n${chalk.bgWhite.black.bold(" FINAL SESSION REPORT ")} ${chalk.dim(
      "•"
    )} ${chalk.white(today)}`
  );
  console.log(HR);

  let totalWorkMins = 0;
  data.tasks.forEach((t) => {
    const mins = t.segments.reduce((acc, s) => {
      const end = s.end ? dayjs(s.end) : dayjs(now);
      return acc + dayjs.duration(end.diff(dayjs(s.start))).asMinutes();
    }, 0);
    totalWorkMins += mins;
    console.log(
      `${chalk.dim("✔")} ${t.title.padEnd(30)} ${chalk.blue(
        Math.round(mins) + "m"
      )}`
    );
  });

  const totalBreakMins = data.breaks.reduce((acc, b) => {
    const end = b.end ? dayjs(b.end) : dayjs(now);
    return acc + dayjs.duration(end.diff(dayjs(b.start))).asMinutes();
  }, 0);

  // 3. Meaningful Conclusion Statements
  console.log(HR);
  const ratio =
    totalWorkMins > 0
      ? (totalWorkMins / (totalWorkMins + totalBreakMins)) * 100
      : 0;

  console.log(`${chalk.bold("SESSIONS CONCLUDED")}`);
  console.log(
    `${chalk.dim("Aggregate Work Time:")}  ${Math.round(totalWorkMins)} minutes`
  );
  console.log(
    `${chalk.dim("Aggregate Break Time:")} ${Math.round(
      totalBreakMins
    )} minutes`
  );
  console.log(
    `${chalk.dim("Efficiency Rating:")}   ${chalk.cyan(ratio.toFixed(1) + "%")}`
  );

  console.log(`\n${chalk.green.bold("TERMINATION SUCCESSFUL")}`);
  console.log(
    chalk.dim(
      `Workday closed at ${dayjs(now).format(
        "HH:mm:ss"
      )}. Log integrity verified.`
    )
  );
  console.log(HR + "\n");
};
