export interface Task {
	id: string;
	name: string;
	completed: boolean;
}

export type TaskFilter = 'all' | 'active' | 'completed';
