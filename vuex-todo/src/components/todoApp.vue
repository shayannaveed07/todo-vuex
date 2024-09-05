<template>
  <div class="container">
    <h1 class="text-center mt-3 text-white bg-success rounded p-2">TodoApp</h1>
    <form class="d-flex addForm" @submit.prevent="$store.commit('addTask')">
      <input
        v-model="taskNumber"
        type="text"
        class="form-control border-0 border-bottom outline-none"
        placeholder="Enter task"
      />
      <button class="btn btn-success submit">
        {{ $store.state.editedTask === null ? "Submit" : "Update" }}
      </button>
    </form>
    <form class="d-flex searchForm">
      <input
        v-model="searchText"
        type="text"
        placeholder="Search the todoList"
        class="form-control border-0 border-bottom outline-none mt-4"
        @input="$store.commit('searchTask', $event.target.value)"
      />
      <select
        @change="$store.commit('showChangeStatus', $event.target.value)"
        class="dropdown border-0 border-bottom outline-none btn btn-success"
      >
        <option value="Todo">Todo</option>
        <option value="In-Progress">In-Progress</option>
        <option value="Done">Done</option>
        <option value="All">All</option>
      </select>
    </form>
    <div>
      <select
        class="btn btn-success w-50 mx-auto d-flex mt-3"
        @change="$store.commit('sortTasks', $event.target.value)"
      >
        <option disabled>Sort</option>
        <option value="Oldest">Oldest</option>
        <option value="Newest">Newest</option>
      </select>
    </div>
    <table class="table table-bordered mt-3 table-dark">
      <thead>
        <tr>
          <th scope="col">Task</th>
          <th scope="col">Status</th>
          <th scope="col">Date</th>
          <th scope="col" class="text-center">#</th>
          <th scope="col" class="text-center">#</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(task, index) in $store.state.data" :key="index">
          <th :class="{ finished: task.status === 'Done' }">{{ task.name }}</th>
          <td
            class="pointer"
            @click="$store.commit('changeStaus', index)"
            :class="{
              'text-danger': task.status === 'Todo',
              'text-warning': task.status === 'In-Progress',
              'text-success': task.status === 'Done',
            }"
          >
            {{ task.status }}
          </td>
          <td>
            {{ task.dates }}
          </td>
          <td>
            <div
              class="text-center edit"
              @click="$store.commit('intiateTask', index)"
            >
              <i class="fa fa-pen"></i>
            </div>
          </td>
          <td>
            <div
              class="text-center del"
              @click="$store.commit('deleteTask', index)"
            >
              <i class="fa fa-trash"></i>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
  import { mapGetters, mapActions } from "vuex";
export default {
  data() {
    return {};
  },
  computed: {
    taskNumber: {
      get() {
        return this.$store.state.task;
      },
      set(newtask) {
        this.$store.commit("setTask", newtask);
      },
    },
    searchText: {
      get() {
        return this.$store.state.searchValue;
      },
      set(newVal) {
        this.$store.commit("searchVal", newVal);
      },
    },
  },
};
</script>

<style scoped>
i {
  cursor: pointer;
}
.pointer {
  cursor: pointer;
}
.finished {
  text-decoration: line-through;
}
.addForm {
  position: relative;
}
.submit {
  border-radius: 0 5px 5px 0;
  position: absolute;
  right: -0.1rem;
  width: 6.01rem;
}
.dropdown {
  border-radius: 0 5px 5px 0;
  position: relative;
  right: -0.1rem;
  margin-top: 1.5rem;
  width: 6.01rem;
}
</style>
