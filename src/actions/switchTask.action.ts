import { randomUUID } from "crypto";
import chalk from "chalk";
import { getTodayDate, getTodayDateTime, getTodayTime } from "../date.js";
import { readFromJsonFile, writeToJsonFile } from "../storage.js";
import { createTask } from "./createTask.action.js";
import { finalizeCurrentTask } from "./common.js";
import { DataStructure, TaskState, Task } from "../types.js";

/**
 * Switches context from the current task to a new one
 */
export const switchTask = async (newTaskName: string) => {
  const today = getTodayDate();
  const now = getTodayDateTime();
  const time = chalk.dim(`[${getTodayTime()}]`);
  const data = await readFromJsonFile<DataStructure>(today);

  if (!data) return await createTask(newTaskName);

  // 1. Guard: Check if we are already on this task and it's active
  const currentTask = data.tasks.find((t) => t.taskId === data.activeTaskId);
  if (
    currentTask &&
    currentTask.title.toLowerCase() === newTaskName.toLowerCase() &&
    currentTask.state === TaskState.ACTIVE
  ) {
    return console.log(
      `${time} ${chalk.yellow("●")} ${chalk
        .bold("STATIONARY")
        .padEnd(12)} ${chalk.dim("│")} ${chalk.white(
        newTaskName
      )} is already active.`
    );
  }

  // 2. Finalize current active task
  finalizeCurrentTask(data, now, newTaskName);

  // 3. Find or Create logic
  let targetTask = data.tasks.find(
    (t) => t.title.toLowerCase() === newTaskName.toLowerCase()
  );

  if (targetTask) {
    // If it was FINISHED or SWITCHED, we bring it back to ACTIVE
    targetTask.state = TaskState.ACTIVE;
    targetTask.segments.push({ type: TaskState.ACTIVE, start: now, end: null });
    data.activeTaskId = targetTask.taskId;
  } else {
    const newTask: Task = {
      taskId: randomUUID(),
      title: newTaskName,
      state: TaskState.ACTIVE,
      segments: [{ type: TaskState.ACTIVE, start: now, end: null }],
      events: [],
    };
    data.tasks.push(newTask);
    data.activeTaskId = newTask.taskId;
  }

  await writeToJsonFile(today, data);

  console.log(
    `${time} ${chalk.blue("●")} ${chalk
      .bold("TRANSITIONED")
      .padEnd(12)} ${chalk.dim("│")} ${chalk.white(newTaskName)}`
  );
};
