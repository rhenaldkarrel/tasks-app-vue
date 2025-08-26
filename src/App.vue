<script setup lang="ts">
import { computed, ref } from 'vue';

import TaskForm from './components/TaskForm.vue';
import TaskCard from './components/TaskCard.vue';

import type { Task, TaskFilter } from './types';

const tasks = ref<Task[]>([]);
const filterTask = ref<TaskFilter>('all');

const filteredTasks = computed(() => {
	switch (filterTask.value) {
		case 'active':
			return tasks.value.filter((task) => !task.completed);
		case 'completed':
			return tasks.value.filter((task) => task.completed);
		default:
			return tasks.value;
	}
});

const totalCompleted = computed(() => {
	return tasks.value.filter((task) => task.completed).length;
});

function handleAddTask(newTask: string) {
	tasks.value.push({
		id: crypto.randomUUID(),
		name: newTask,
		completed: false,
	});
}

function handleToggleCompleted(id: string) {
	const task = tasks.value.find((t) => t.id === id);

	if (task) {
		task.completed = !task.completed;
	}
}

function handleRemoveTask(id: string) {
	tasks.value = tasks.value.filter((task) => task.id !== id);
}
</script>

<template>
	<main>
		<h1>Todo App</h1>
		<TaskForm @add-task="handleAddTask" />
		<h3 v-if="!tasks.length">Add a new task...</h3>
		<h3 v-else>
			There are {{ totalCompleted }}/{{ tasks.length }} completed tasks.
		</h3>

		<div v-if="tasks.length" class="filter-container">
			<button @click="filterTask = 'all'">All</button>
			<button @click="filterTask = 'active'">Active</button>
			<button @click="filterTask = 'completed'">Completed</button>
		</div>

		<ul>
			<li>
				<TransitionGroup name="task-list" tag="div" class="task-list">
					<div v-for="task in filteredTasks" :key="task.id">
						<TaskCard
							:task="task"
							@toggleCompleted="handleToggleCompleted"
							@removeTask="handleRemoveTask"
						/>
					</div>
				</TransitionGroup>
			</li>
		</ul>
	</main>
</template>

<style scoped>
main {
	max-width: 50rem;
	margin: 4rem auto;
	padding: 0 1rem;
}

ul {
	padding: 0;
}

li {
	list-style: none;
}

.filter-container {
	display: flex;
	gap: 0.5rem;
	margin-bottom: 1rem;
}

.task-list-enter-active,
.task-list-leave-active {
	transition: all 0.5s ease;
}
.task-list-enter-from,
.task-list-leave-to {
	opacity: 0;
	transform: translateX(300px);
}
</style>
