import {
  DAY_IN_MILLISEC,
  TAG_SEPARATOR
} from './constants';
import timeStatuses from './enums/timeStatuses';
import taskStatuses from './enums/taskStatuses';
import {toRaw} from "vue";

export const getTagsArrayFromString = tags => {
  const array = tags.split(TAG_SEPARATOR);
  return array.slice(1, array.length);
};

export const getTimeStatus = dueDate => {
  if (!dueDate) {
    return '';
  }
  const currentTime = +new Date();
  const taskTime = Date.parse(dueDate);
  const timeDelta = taskTime - currentTime;
  if (timeDelta > DAY_IN_MILLISEC) {
    return '';
  }
  return timeDelta < 0 ? timeStatuses.DEADLINE : timeStatuses.EXPIRED;
};

export const normalizeTask = task => {
  return {
    ...task,
    status: task.statusId ? taskStatuses[task.statusId] : '',
    timeStatus: getTimeStatus(task.dueDate)
  };
};

export const getImage = image => {
  return new URL(`../assets/img/${image}`, import.meta.url).href;
};

export const getTargetColumnTasks = (toColumnId, tasks) => {
  return tasks
      .filter((task) => task.columnId === toColumnId)
      .map((task) => toRaw(task));
};

export const addActive = (active, toTask, tasks) => {
  const activeIndex = tasks.findIndex(task => task.id === active.id);
  if (~activeIndex) {
    tasks.splice(activeIndex, 1);
  }

  tasks.sort((a, b) => a.sortOrder - b.sortOrder);

  if (toTask) {
    const toTaskIndex = tasks.findIndex(task => task.id === toTask.id);
    tasks.splice(toTaskIndex, 0, active);
  } else {
    tasks.push(active);
  }

  return tasks;
};
