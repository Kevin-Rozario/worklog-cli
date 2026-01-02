import chalk from "chalk";
import { getTodayDate, getTodayTime, getTodayDateTime } from "../date.js";
import { readFromJsonFile, writeToJsonFile } from "../storage.js";
import { DataStructure, TaskState } from "../types.js";

/**
 * Marks the currently active task as FINISHED and closes segments
 */
export const finishTask = async () => {
  const today = getTodayDate();
  const now = getTodayDateTime();
  const data = await readFromJsonFile<DataStructure>(today);

  if (!data || !data.activeTaskId) {
    return console.log(
      chalk.red("● ERROR        │ No active task found to finish.")
    );
  }

  const task = data.tasks.find((t) => t.taskId === data.activeTaskId);

  if (task) {
    task.state = TaskState.FINISHED;

    // Close the current open segment
    const openSegment = task.segments.find((s) => s.end === null);
    if (openSegment) openSegment.end = now;

    task.events.push({
      time: now,
      message: "Task marked as COMPLETED",
    });

    // Clear the active task pointer
    data.activeTaskId = "";

    await writeToJsonFile(today, data);

    const time = chalk.dim(`[${getTodayTime()}]`);
    console.log(
      `${time} ${chalk.greenBright("●")} ${chalk
        .bold("COMPLETED")
        .padEnd(12)} ${chalk.dim("│")} ${chalk.white(task.title)}`
    );
    console.log(chalk.dim("The task has been archived for today's records.\n"));
  }
};
