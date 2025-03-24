export interface Task {
  id: string;
  title: string;
  description: string;
  status: Status;
  priority: Priority;
  created: string;
}

export interface NewTask {
  title: string;
  description: string;
  status: Status;
  priority: Priority;
}

export interface JsonPatchOperation {
  op: 'add' | 'remove' | 'replace' | 'move' | 'copy' | 'test';
  path: string;
  value?: any;
  from?: string;
}

export enum Status {
  NOT_STARTED,
  STARTED,
  FINISHED,
}

export enum Priority {
  LOW,
  MEDIUM,
  HIGH,
}
