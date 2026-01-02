import dayjs from "dayjs";
import chalk from "chalk";
import { getTodayDate } from "../date.js";
import { readFromJsonFile } from "../storage.js";
import { DataStructure } from "../types.js";

/**
 * Displays all log entries/checkpoints for the currently active task
 */
export const viewTaskLogs = async () => {
  const data = await readFromJsonFile<DataStructure>(getTodayDate());
  if (!data) return;

  const activeTask = data.tasks.find((t) => t.taskId === data.activeTaskId);
  if (!activeTask) return;

  console.log(`\n${chalk.bold("SESSION AUDIT LOG")}`);
  console.log(`${chalk.dim("Identifier:")} ${activeTask.title}`);
  console.log(chalk.dim("─".repeat(30)));

  activeTask.events.forEach((event) => {
    const time = dayjs(event.time).format("HH:mm");
    // Vertical line pipe creates a professional "timeline" look
    console.log(`${chalk.blue("│")} ${chalk.dim(time)} ${event.message}`);
  });

  console.log(chalk.dim("─".repeat(30)) + "\n");
};
