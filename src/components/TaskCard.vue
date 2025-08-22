<script setup lang="ts">
import { defineProps } from 'vue';

import type { Task } from '../types';

defineProps<{
	task: Task;
}>();

defineEmits<{
	toggleCompleted: [id: string];
}>();
</script>

<template>
	<label class="task-card">
		<input
			type="checkbox"
			v-model="task.completed"
			class="task-checkbox"
			@input="$emit('toggleCompleted', task.id)"
		/>
		{{ task.name }}
	</label>
</template>

<style scoped>
.task-checkbox {
	width: auto;
}

.task-card {
	display: flex;
	align-items: center;
	gap: 1rem;
	background-color: #323232;
	border-radius: 0.5rem;
	padding: 1rem;
	color: #fff;
	border: 1px solid red;
	cursor: pointer;
	transition: all 0.3s ease;
}

.task-card:hover {
	border-color: green;
}

@media (prefers-color-scheme: light) {
	.task-card {
		background-color: #f9f9f9;
		color: #000;
	}
}
</style>
