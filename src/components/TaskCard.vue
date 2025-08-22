<script setup lang="ts">
import { defineProps } from 'vue';

import type { Task } from '../types';

defineProps<{
	task: Task;
}>();

defineEmits<{
	toggleCompleted: [id: string];
	removeTask: [id: string];
}>();
</script>

<template>
	<article class="task" :class="{ done: task.completed }">
		<label>
			<input
				type="checkbox"
				v-model="task.completed"
				@input="$emit('toggleCompleted', task.id)"
			/>
			{{ task.name }}
		</label>
		<button @click="$emit('removeTask', task.id)" class="outline">
			Remove
		</button>
	</article>
</template>

<style scoped>
.task {
	display: flex;
	align-items: center;
	justify-content: space-between;
}

.task.done label {
	text-decoration: line-through;
	color: gray;
}
</style>
