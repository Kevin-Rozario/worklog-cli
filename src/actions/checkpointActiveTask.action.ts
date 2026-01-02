import chalk from "chalk";
import { getTodayDate, getTodayTime, getTodayDateTime } from "../date.js";
import { readFromJsonFile, writeToJsonFile } from "../storage.js";
import { DataStructure } from "../types.js";

/**
 * Logs a note/event to the active task
 */
export const checkPointActiveTask = async (message: string) => {
  const today = getTodayDate();
  const time = chalk.dim(`[${getTodayTime()}]`);
  const data = await readFromJsonFile<DataStructure>(today);

  if (!data) return console.log(chalk.red("No active worklog."));

  const task = data.tasks.find((t) => t.taskId === data.activeTaskId);
  if (!task) return console.log(chalk.yellow("No active task to log to."));

  task.events.push({ time: getTodayDateTime(), message });
  await writeToJsonFile(today, data);

  console.log(
    `${time} ${chalk.magenta("●")} ${chalk
      .bold("RECORDED")
      .padEnd(12)} ${chalk.dim("│")} ${chalk.italic(message)}`
  );
};
