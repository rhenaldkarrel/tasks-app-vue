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
</script>

<template>
	<main>
		<h1>Todo App</h1>
		<TaskForm @add-task="handleAddTask" />
		<h3>There are {{ tasks.length }} tasks left...</h3>

		<ul v-if="tasks.length > 0">
			<li v-for="task in tasks" :key="task.id">
				<TaskCard :task="task" @toggleCompleted="handleToggleCompleted" />
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
</style>
