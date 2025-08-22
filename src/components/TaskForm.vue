<script setup lang="ts">
import { ref } from 'vue';

const newTask = ref('');

const emit = defineEmits<{
	addTask: [newTask: string];
}>();

function handleSubmit(event: Event) {
	event.preventDefault();

	if (newTask.value.trim()) {
		emit('addTask', newTask.value);
		newTask.value = '';
	} else {
		alert('Task cannot be empty');
	}
}
</script>

<template>
	<form @submit="handleSubmit">
		<input type="text" v-model="newTask" placeholder="Add a new todo" />
		<div class="btn-add-todo-container">
			<button>Add</button>
		</div>
	</form>
</template>

<style scoped>
.btn-add-todo-container {
	display: flex;
	justify-content: end;
}
</style>
