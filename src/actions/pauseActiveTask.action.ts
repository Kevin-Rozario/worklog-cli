import chalk from "chalk";
import { getTodayDate, getTodayTime, getTodayDateTime } from "../date.js";
import { readFromJsonFile, writeToJsonFile } from "../storage.js";
import { DataStructure, TaskState } from "../types.js";

/**
 * Pauses work and logs a break
 */
export const pauseActiveTask = async (reason: string) => {
  const today = getTodayDate();
  const now = getTodayDateTime();
  const time = chalk.dim(`[${getTodayTime()}]`);
  const data = await readFromJsonFile<DataStructure>(today);

  if (!data) return console.log(chalk.red("No active worklog found."));

  const task = data.tasks.find((t) => t.taskId === data.activeTaskId);
  if (!task || task.state !== TaskState.ACTIVE) {
    return console.log(chalk.yellow("No active task to pause."));
  }

  task.state = TaskState.PAUSED;
  const seg = task.segments.find((s) => s.end === null);
  if (seg) seg.end = now;

  data.breaks.push({ start: now, end: null, reason });

  await writeToJsonFile(today, data);
  
  console.log(
    `${time} ${chalk.yellow("●")} ${chalk
      .bold("SUSPENDED")
      .padEnd(12)} ${chalk.dim("│")} ${chalk.white(task.title)}`
  );
};
