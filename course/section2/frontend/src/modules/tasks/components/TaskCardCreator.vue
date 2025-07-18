<script setup>
import { useRouter } from "vue-router";
import { onMounted, ref } from "vue";
import { createNewDate } from "@/common/helpers";
import { cloneDeep } from "lodash";
import { STATUSES } from "@/common/constants";
import taskStatuses from "@/common/enums/taskStatuses";
import { useTaskCardDate } from "../../../common/composables";

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
const validations = ref(setEmptyValidations());

const statusList = ref(STATUSES.slice(0, 3));

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

function setStatus(status) {
	const [key] = Object.entries(taskStatuses)
		.find(([ _, value ]) => value === status);
	const taskStatus = task.value.statusId;
	if (!taskStatus || taskStatus !== +key) {
		task.value.statusId = +key;
	} else {
		task.value.statusId = null;
	}
}
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
				<h4 class="task-card__title">
					Выберите статус:
				</h4>

				<!--        Список статусов задачи-->
				<ul class="meta-filter task-card__meta">
					<li
						v-for="({ value, label }) in statusList"
						:key="value"
						class="meta-filter__item"
						:class="{ active: value === taskStatuses[task.statusId]}"
						@click="setStatus(value)"
					>
						<a
							class="meta-filter__status"
							:class="`meta-filter__status--${value}`"
							:title="label"
						/>
					</li>
				</ul>
			</div>

			<!--      Блок даты выполнения задачи-->
			<div
				v-if="task.id"
				class="task-card__block"
			>
				<p class="task-card__date">
					{{ useTaskCardDate(task) }}
				</p>
			</div>

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
