import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    task: "",
    editedTask: null,
    avaibleStatuses: ["Todo", "In-Progress", "Done"],
    tasks: [],
    searchValue: "",
    data: [],
      
  },
  getters: {},
  mutations: {
    addTask(state) {
      if (!state.task) return;
      if (state.editedTask === null) {
        state.tasks.push({
          name: state.task,
          status: "Todo",
          dates: new Date().toLocaleString(),
        });
        state.task = "";
      } else {
        state.tasks[state.editedTask].name = state.task;
        state.editedTask = null;
        state.task = "";
      }
      this.commit("searchTask", "");
    },
    deleteTask(state, index) {
      let id = state.tasks.indexOf(state.data[index]);
      state.tasks.splice(id, 1);
      this.commit("searchTask", "");
      state.searchValue = "";
    },
    editTask(state, index) {
      state.tasks[index].name = state.task;
      state.editedTask = null;
    },
    intiateTask(state, index) {
      let id = state.tasks.indexOf(state.data[index]);
      state.task = state.data[index].name;
      state.editedTask = id;
      state.searchValue = "";
    },

    changeStaus(state, index) {
      let newIndex =
        state.avaibleStatuses.indexOf(state.tasks[index].status) + 1;
      if (newIndex === state.avaibleStatuses.length) newIndex = 0;
      state.tasks[index].status = state.avaibleStatuses[newIndex];
    },
    setTask(state, newTask) {
      state.task = newTask;
    },
    searchTask(state, q) {
      state.data = state.tasks.filter((task) => task.name.includes(q));
    },
    searchVal(state, newVal) {
      state.searchValue = newVal;
    },
    showChangeStatus(state, e) {
      if (e === "All") {
        state.data = state.tasks;
      } else {
        state.data = state.tasks.filter((task) => task.status.includes(e));
      }
    },
    sortTasks(state, e) {
      state.data.sort((a, b) => {
        const date1 = new Date(a.dates);
        const date2 = new Date(b.dates);
        if (e === "Oldest") return date1 - date2;
        if (e === "Newest") return date2 - date1;

      });
    },
  },
  actions: {


    //  addTask(context,payload) {
    //   alert("called")
    //  }

  },
  modules: {},
});
