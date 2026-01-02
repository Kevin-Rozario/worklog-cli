import { DataStructure, TaskState } from "../types.js";

// Standardizes closing the current activity
export const finalizeCurrentTask = (
  data: DataStructure,
  now: string,
  nextTaskName?: string
) => {
  const task = data.tasks.find((t) => t.taskId === data.activeTaskId);

  if (
    task &&
    (task.state === TaskState.ACTIVE || task.state === TaskState.PAUSED)
  ) {
    task.state = TaskState.SWITCHED;

    // Close any open segments
    const openSegment = task.segments.find((s) => s.end === null);
    if (openSegment) openSegment.end = now;

    task.events.push({
      time: now,
      message: nextTaskName ? `Switched to: ${nextTaskName}` : "Task closed",
    });
  }

  // Also close any lingering breaks if switching/creating a task
  const openBreak = data.breaks.find((b) => b.end === null);
  if (openBreak) openBreak.end = now;
};
