<p align="center">
  <br>
  <strong><samp>Worklog</samp></strong>
  <br>
  <br>
  <samp>A professional, local-first time and task management CLI for developers.</samp>
  <br>
</p>

<p align="center">
  <a href="https://github.com/Kevin-Rozario/worklog/releases/latest"><img alt="Version" src="https://img.shields.io/github/v/release/Kevin-Rozario/worklog"></a>
  <a href="https://github.com/Kevin-Rozario/worklog/blob/main/LICENSE"><img alt="License" src="https://img.shields.io/github/license/Kevin-Rozario/worklog"></a>
  <a href="https://github.com/Kevin-Rozario/worklog/actions/workflows/build.yml"><img alt="Build" src="https://img.shields.io/github/actions/workflow/status/Kevin-Rozario/worklog/build.yml?branch=main"></a>
</p>

## Overview

Worklog is a powerful, privacy-focused Command Line Interface (CLI) designed for professionals who want to efficiently track their work without ever leaving the terminal. It operates entirely locally, storing all data on your machine to ensure your logs remain private and under your control.

Built with performance in mind, Worklog helps you manage your day by allowing you to start tasks, log progress, take breaks, and switch contexts with simple, intuitive commands. At the end of the day, it generates a detailed report of your activities, giving you a clear picture of how you spent your time.

## Features

- **Local-First Storage:** All your data is stored in a hidden `~/.worklog-records/` directory on your machine. No cloud, no syncing, no third-party access.
- **Detailed Time Tracking:** Every task state (active, paused) is logged with precise start and end times, ensuring accurate reports.
- **Context Switching:** Seamlessly switch between tasks while Worklog automatically handles the state changes.
- **Task & Break Management:** Start new tasks, pause them for breaks, and resume right where you left off.
- **End-of-Day Reports:** Generate a comprehensive summary of your daily tasks, including total time spent on each.
- **Human-Readable Data:** Daily logs are stored in a clean, human-readable JSON format.
- **Colorful & Intuitive Interface:** A polished and easy-to-use command-line experience.

## Installation

```bash
# Clone the repository
git clone https://github.com/Kevin-Rozario/worklog.git
cd worklog

# Build the project
npm install
npm run build

# (Optional) Create a global symlink for easy access
npm link
```

## Usage

Worklog provides a simple command-based workflow to manage your day.

### Start a New Task

Begin your day or a new task. This is your first command of the day.

```bash
worklog start "My first task"
```

### Log a New Task

Use `log` to stop the currently active task and start a new one in a single command.

```bash
worklog log "Work on feature B"
```

### Pause and Resume

Take a break without losing your place.

```bash
worklog pause   # Pauses the active task
worklog resume  # Resumes the paused task
```

### Switch Between Tasks

Jump to another existing task from the current day.

```bash
worklog switch <task-name>
```
> **Note:** Find the `task-name` by using the `worklog status` command.

### View Current Status

Check the status of your current task, including active time and breaks.

```bash
worklog status
```

### View Daily Log

See a log of all activities for the day.

```bash
worklog log:view
```

### Generate a Report

Get a summary of all tasks and time spent. You can also generate reports for past days.

```bash
worklog report
```

### Finish the Day

Finalize all tasks and get a comprehensive end-of-day report.

```bash
worklog done
```

## Data Storage

Worklog stores all data locally in the `~/.worklog-records/` directory in your home folder. Each day's activities are saved in a separate `YYYY-MM-DD.json` file. This local-first approach ensures that your data remains private and entirely under your control.

The JSON files are human-readable, allowing you to inspect or back up your data easily.

## Development

Contributions are welcome! If you'd like to improve Worklog, please follow these steps:

1.  Fork the repository.
2.  Create a new feature branch (`git checkout -b feature/your-feature`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add some feature'`).
5.  Push to the branch (`git push origin feature/your-feature`).
6.  Open a new Pull Request.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.