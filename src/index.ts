#!/usr/bin/env node
import { Command } from "commander";
import chalk from "chalk";
import { createTask } from "./actions/createTask.action.js";
import { checkPointActiveTask } from "./actions/checkpointActiveTask.action.js";
import { pauseActiveTask } from "./actions/pauseActiveTask.action.js";
import { resumeActiveTask } from "./actions/resumeActiveTask.action.js";
import { switchTask } from "./actions/switchTask.action.js";
import { taskStatus } from "./actions/taskStatus.action.js";
import { finishDay } from "./actions/finishDay.action.js";
import { viewTaskLogs } from "./actions/viewLog.action.js";
import { generateReport } from "./actions/generateReport.action.js";
import { finishTask } from "./actions/finishTask.action.js";

const program = new Command();

program
  .name("worklog")
  .description("CLI to manage tasks, segments, and breaks")
  .version("1.0.0");

// Helper to wrap actions with error handling
const handle =
  (fn: (...args: any[]) => Promise<any>) =>
  async (...args: any[]) => {
    try {
      await fn(...args);
    } catch (err: any) {
      console.error(chalk.red("\nFATAL ERROR:"), err.message);
      process.exit(1);
    }
  };

program
  .command("start <name>")
  .description("Start a new task")
  .action(handle(createTask));

program
  .command("log <msg>")
  .description("Add a checkpoint to current task")
  .action(handle(checkPointActiveTask));

program
  .command("pause [reason]")
  .description("Pause work for a break")
  .action(
    async (reason) => await handle(pauseActiveTask)(reason || "General break")
  );

program
  .command("resume")
  .description("Return from break")
  .action(handle(resumeActiveTask));

program
  .command("switch <name>")
  .description("Switch to a new task")
  .action(handle(switchTask));

program
  .command("status")
  .description("Show daily summary")
  .action(handle(taskStatus));

program
  .command("finish")
  .description("Close all active tasks/breaks and end the workday")
  .action(handle(finishDay));

program
  .command("log:view")
  .description("View all progress logs for the current active task")
  .action(handle(viewTaskLogs));

program
  .command("report")
  .description("Generate a detailed formal activity report for the day")
  .action(handle(generateReport));

program
  .command("done")
  .description("Mark the current active task as finished")
  .action(handle(finishTask));
program.parseAsync(process.argv);
