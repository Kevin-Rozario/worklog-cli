export enum TaskState {
  ACTIVE = "ACTIVE",
  PAUSED = "PAUSED",
  SWITCHED = "SWITCHED",
  FINISHED = "FINISHED",
}

export interface DataStructure {
  date: string;
  activeTaskId: string;
  breaks: Break[];
  tasks: Task[];
}

export interface Break {
  start: string;
  end: string | null;
  reason: string;
}

export interface Task {
  taskId: string;
  title: string;
  state: TaskState;
  segments: { type: TaskState; start: string; end: string | null }[];
  events: { time: string; message: string }[];
}
