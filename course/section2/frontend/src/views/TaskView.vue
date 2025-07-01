<script setup>
import { computed, onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const props = defineProps({
  tasks: {
    type: Array,
    required: true,
  }
});

const router = useRouter();
const route = useRoute();
const dialog = ref(null);

onMounted(() => {
  dialog.value.focus
});

const task = computed(() => {
  return props.tasks.find(task => task.id == route.params.id)
});

const closeDialog = () => { router.push("/") };
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
      <!--Закрытие задачи-->
      <button
          class="task-card__close"
          type="button"
          @click="closeDialog"
      />

      <!--Шапка задачи-->
      <div class="task-card__block">
        <div class="task-card__row">
          <!--Наименование задачи-->
          <h1 class="task-card__name task-card__name--min">
            {{ task ? task.title : '' }}
          </h1>
          <!--Кнопка редактирования задачи-->
          <a
              class="task-card__edit"
              @click="router.push({
                name: 'TaskEdit',
                params: { id: $route.params.id }
              })"
          >
            Редактировать задачу
          </a>
        </div>
        <!--Дата создания задачи-->
        <p class="task-card__date">
          {{ task.dueDate }}
        </p>
      </div>
      <!--Участник задачи и срок выполнения-->
      <div class="task-card__block">
        <ul class="task-card__params">
          <!--Участник задачи-->

          <!--Срок выполнения-->

        </ul>
      </div>
      <!--Описание задачи-->

      <!--Дополнительная ссылка-->

      <!--Чек-лист-->

      <!--Метки-->

      <!--Комментарии-->
    </section>
  </div>
</template>

<style scoped lang="scss">

</style>
