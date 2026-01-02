import { randomUUID } from "crypto";
import chalk from "chalk";
import { getTodayDate, getTodayDateTime } from "../date.js";
import { readFromJsonFile, writeToJsonFile } from "../storage.js";
import { switchTask } from "./switchTask.action.js";
import { finalizeCurrentTask } from "./common.js";
import { DataStructure, Task, TaskState } from "../types.js";

/**
 * Creates or resumes a task based on whether it already exists today
 */
export const createTask = async (taskName: string) => {
  const today = getTodayDate();
  const now = getTodayDateTime();
  let data = await readFromJsonFile<DataStructure>(today);

  // Initial setup for a new day
  if (!data) {
    const newTask: Task = {
      taskId: randomUUID(),
      title: taskName,
      state: TaskState.ACTIVE,
      segments: [{ type: TaskState.ACTIVE, start: now, end: null }],
      events: [],
    };
    data = {
      date: today,
      activeTaskId: newTask.taskId,
      breaks: [],
      tasks: [newTask],
    };
    await writeToJsonFile(today, data);
    console.log(
      chalk.greenBright(`\nWorklog Initialized. Started: "${taskName}"`)
    );
    return;
  }

  // Check if task with the same name already exists
  const existingTask = data.tasks.find(
    (t) => t.title.toLowerCase() === taskName.toLowerCase()
  );

  if (existingTask) {
    if (
      existingTask.taskId === data.activeTaskId &&
      existingTask.state === TaskState.ACTIVE
    ) {
      return console.log(
        chalk.yellow(`\n"${taskName}" is already your active task.`)
      );
    }
    // Otherwise, switch back to it
    await switchTask(taskName);
  } else {
    // New task for an existing day
    finalizeCurrentTask(data, now, taskName);
    const newTask: Task = {
      taskId: randomUUID(),
      title: taskName,
      state: TaskState.ACTIVE,
      segments: [{ type: TaskState.ACTIVE, start: now, end: null }],
      events: [],
    };
    data.activeTaskId = newTask.taskId;
    data.tasks.push(newTask);
    await writeToJsonFile(today, data);
    console.log(chalk.cyan(`\nNew Task Started: "${taskName}"`));
  }
};
