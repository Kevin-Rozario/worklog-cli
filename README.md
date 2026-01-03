<p align="center">
  <br>
  <h1>Worklog</h1>
  <samp>A professional, local-first time and task management CLI for developers.</samp>
  <br>
</p>

<p align="center">
  <a href="https://github.com/Kevin-Rozario/worklog-cli/releases/latest">
    <img alt="Version" src="https://img.shields.io/github/v/release/Kevin-Rozario/worklog-cli">
  </a>
  <a href="https://github.com/Kevin-Rozario/worklog-cli/blob/main/LICENSE">
    <img alt="License" src="https://img.shields.io/github/license/Kevin-Rozario/worklog-cli">
  </a>
  <a href="https://github.com/Kevin-Rozario/worklog-cli/actions/workflows/build.yml">
    <img alt="Build" src="https://img.shields.io/github/actions/workflow/status/Kevin-Rozario/worklog-cli/build.yml?branch=main">
  </a>
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

Worklog is distributed as a standalone native binary, meaning you can start tracking your time immediately without needing Node.js, npm, or any other dependencies installed on your system.

### Option 1: Quick Install (Recommended)

#### **Linux (x86_64)**

```bash
curl -L https://github.com/Kevin-Rozario/worklog-cli/releases/download/v1.0.0/worklog-v1.0.0-linux-x64.tar.gz | tar xz
sudo mv worklog-linux /usr/local/bin/worklog
sudo chmod +x /usr/local/bin/worklog
```

#### **macOS (Apple Silicon)**

```bash
curl -L -O https://github.com/Kevin-Rozario/worklog-cli/releases/download/v1.0.0/worklog-v1.0.0-macos-arm64.zip
unzip -q worklog-v1.0.0-macos-arm64.zip
sudo mv -f worklog-macos /usr/local/bin/worklog
chmod +x /usr/local/bin/worklog
# Optional: Remove macOS quarantine for unsigned binaries
sudo xattr -dr com.apple.quarantine /usr/local/bin/worklog
```

### Option 2: Build from Source

If you prefer to build Worklog from source, ensure you have Node.js and npm installed. Then, follow these steps:

#### 1. Clone the repository.

```bash
git clone https://github.com/Kevin-Rozario/worklog.git
cd worklog
```

#### 2. Install dependencies and build the project.

```bash
pnpm install
pnpm run build
```

#### 3. (Optional) Create a global symlink for easy access.

```bash
pnpm link --global
```

## Usage

Worklog provides a simple command-based workflow to manage your day.

### Start a New Task

Begin your day or a new task. This is your first command of the day.

```bash
worklog start "My first task"
```

### Log a New Task

Use `log` to record the progress done on the currently active task.

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

See recent logs for the currently active task.

```bash
worklog log:view
```

### Generate a Report

Get a summary of all tasks and time spent. You can also generate reports for past days.

```bash
worklog report
```

### Completion of a task

Mark the current task as done.

```bash
worklog done
```

### End of Day

Set all the tasks / breaks a hard stop at the end of the day.

```bash
worklog finish
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
