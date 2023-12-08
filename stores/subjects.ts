interface State {
  subjects: Array<string>,
}

export const useSubjectStore = defineStore('SubjectStore', {
  state: (): State => {
    return {
      subjects: [],
    };
  },

  getters: {
    getSubjects(state) {
      return state.subjects;
    }
  },

  actions: {
    async fetchSubjects() {
      const data = await useApiRequest('api/ui/subjects', {
        method: 'GET',
      });

      this.subjects = data.subjects;
    },
  },
});