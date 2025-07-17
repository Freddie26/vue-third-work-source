<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { createNewDate } from "../../../common/helpers";
import { cloneDeep } from "lodash";

const router = useRouter();
const dialog = ref(null);

const props = defineProps({
	taskToEdit: {
		type: Object,
		default: null,
	},
});

const emits = defineEmits(["addTask", "editTask", "deleteTask"]);

const taskToWork = props.taskToEdit ?
	cloneDeep(props.taskToEdit) :
	createNewTask();

const task = ref(taskToWork);

onMounted(() => {
	dialog.value.focus();
});

function closeDialog() {
	router.push("/");
}

function createNewTask() {
	return ({
		userId: null,
		columnId: null,
		statusId: null,
		title: "Название задачи",
		description: "",
		sortOrder: 0,
		dueDate: createNewDate(),
		url: "",
		urlDescription: "",
		ticks: [],
		tags: "",
	});
}

function deleteTask() {
	emits("deleteTask", task.value.id);
	router.push("/");
}

function setEmptyValidations() {
	return ({
		title: {
			error: "",
			rules: ["required"],
		},
		url: {
			error: "",
			rules: ["url"],
		}
	});
}

const validations = ref(setEmptyValidations());
</script>

<template>
	<div
		class="task-card"
		tabindex="0"
		ref="dialog"
		@click.self="closeDialog"
		@keydown.esc="closeDialog"
	>
		<section class="task-card__wrapper">
			<!--      Кнопка закрытия диалога задачи-->
			<button
				class="task-card__close"
				type="button"
				@click="closeDialog"
			/>

			<!--      Блок ввода имени и удаления задачи-->
			<div class="task-card__block">
				<div class="task-card__row">
					<!--          Поле ввода имени задачи-->
					<input
						v-model="task.title"
						type="text"
						name="task_name"
						class="task-card__name"
						max="37"
					/>
					<!--          Кнопка удаления задачи-->
					<a
						v-if="taskToEdit"
						class="task-card__edit task-card__edit--red"
						@click="deleteTask"
					>
						Удалить задачу
					</a>

				</div>
				<!--        Ошибка валидации поля ввода имени -->
				<span
					v-if="validations.title.error"
					class="task-card__error-text"
				>
					{{ validations.title.error }}
				</span>
			</div>

			<!--      Блок статуса задачи-->
			<div class="task-card__status">
				<!--        Список статусов задачи-->

			</div>

			<!--      Блок даты выполнения задачи-->

			<!--      Блок ввода пользователя и даты срока выполнения-->
			<div class="task-card__block">
				<ul class="task-card__params">
					<!--          Блок выбора пользователя-->

					<!--          Блок выбора даты выполнения-->

				</ul>
			</div>

			<!--      Блок описания задачи-->

			<!--      Блок внешней ссылки-->
			<div class="task-card__block">
				<div class="task-card__links">

					<div class="task-card__links-item">
						<!--            Поле ввода ссылки-->

						<!--            Ошибка валидации поля ввода ссылки-->

						<!--            Описание ссылки-->

					</div>
				</div>
			</div>

			<!--      Блок подзадач-->
			<div class="task-card__block">
				<!--        Список подзадач-->
			</div>

			<!--      Блок тегов-->
			<div class="task-card__block">
				<!--        Компонент создания тегов-->
			</div>

			<!--      Блок сохранения и отмены изменений-->
			<div class="task-card__buttons">
				<!--        Кнопка отмены изменений-->

				<!--        Кнопка сохранения изменений-->

			</div>
		</section>
	</div>
</template>

<style scoped lang="scss">

</style>
