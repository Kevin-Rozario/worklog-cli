import chalk from "chalk";
import { getTodayDate, getTodayTime, getTodayDateTime } from "../date.js";
import { readFromJsonFile, writeToJsonFile } from "../storage.js";
import { DataStructure, TaskState } from "../types.js";

/**
 * Resumes the active task from a break
 */
export const resumeActiveTask = async () => {
  const today = getTodayDate();
  const now = getTodayDateTime();
  const time = chalk.dim(`[${getTodayTime()}]`);
  const data = await readFromJsonFile<DataStructure>(today);

  if (!data) return;

  const openBreak = data.breaks.find((b) => b.end === null);
  if (openBreak) openBreak.end = now;

  const task = data.tasks.find((t) => t.taskId === data.activeTaskId);
  if (!task) return console.log(chalk.red("No task found to resume."));

  task.state = TaskState.ACTIVE;
  task.segments.push({ type: TaskState.ACTIVE, start: now, end: null });

  await writeToJsonFile(today, data);
  
  console.log(
    `${time} ${chalk.green("●")} ${chalk
      .bold("RESUMED")
      .padEnd(12)} ${chalk.dim("│")} ${chalk.white(task.title)}`
  );
};
