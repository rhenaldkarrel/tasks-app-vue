<script setup lang="ts">
import { ref } from 'vue';

import TaskForm from './components/TaskForm.vue';
import TaskCard from './components/TaskCard.vue';

import type { Task } from './types';

const tasks = ref<Task[]>([]);

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
		<h3 v-else>There are {{ tasks.length }} tasks left...</h3>

		<ul>
			<li>
				<TransitionGroup name="task-list" tag="div" class="task-list">
					<div v-for="task in tasks" :key="task.id">
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
}

ul {
	padding: 0;
}

li {
	list-style: none;
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
