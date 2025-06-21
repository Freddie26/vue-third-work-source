<script setup>
import {computed} from "vue";
import {getTagsArrayFromString} from "@/common/helpers";

const props = defineProps({
  tags: {
    type: String,
    required: true,
  }
});

const tagsArray = computed(() => {
  return getTagsArrayFromString(props.tags);
});
</script>

<template>
  <ul class="task__tags">
    <liv
        v-for="(tag, index) in tagsArray"
        :key="index"
    >
      <span class="task__tag">
        {{ tag }}
      </span>
    </liv>
  </ul>
</template>

<style scoped lang="scss">
@import "@/assets/scss/app.scss";

.task__tags {
  display: flex;
  flex-wrap: wrap;
  width: 100%;
  margin-top: 5px;
  @include clear-list;

  li {
    margin-top: 4px;
    margin-right: 4px;
  }
}

.task__tag {
  padding: 4px 8px;
  color: $black-900;
  border-radius: 10px;
  background-color: $blue-gray-100;
  @include r-s10-h12;
}
</style>