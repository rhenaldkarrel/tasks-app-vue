<script setup lang="ts">
import { ref } from 'vue';

const newTask = ref('');

function handleSubmit(event: Event) {
	event.preventDefault();
	if (newTask.value.trim()) {
		console.log('New Task:', newTask.value);
		newTask.value = '';
	} else {
		alert('Task cannot be empty');
	}
}
</script>

<template>
	<main>
		<h1>Todo App</h1>

		<form @submit="handleSubmit">
			<input type="text" v-model="newTask" placeholder="Add a new todo" />
			<div class="btn-add-todo-container">
				<button>Add</button>
			</div>
		</form>
		<p>{{ newTask }}</p>
	</main>
</template>

<style scoped>
main {
	max-width: 50rem;
	margin: 0 auto;
}

.btn-add-todo-container {
	display: flex;
	justify-content: end;
}

form > *:where(:not(:last-child)) {
	margin-bottom: 1rem;
}
</style>
