interface Submission {
  naiveBayes: string;
  bert: string;
  createdAt: Date;
}

interface Comment {
  naiveBayes: string;
  bert: string;
  createdAt: Date;
}

interface State {
  submissions: Array<Submission>,
  comments: Array<Comment>,
}

export const useStatisticsStore = defineStore('StatisticsStore', {
  state: (): State => {
    return {
      submissions: [],
      comments: [],
    };
  },

  getters: {
    getSubmissions(state) {
      return state.submissions;
    },

    getComments(state) {
      return state.comments;
    },

    getTotalSentiments(state) {
      return state.submissions.length + state.comments.length;
    },

    getTotalPositiveSentimentCountNaiveBayes(state) {
      const submissionsPositiveSentimentsCount = state.submissions.filter(submission => submission.naiveBayes === 'positive').length;
      const commentsPositiveSentimentsCount = state.comments.filter(comment => comment.naiveBayes === 'positive').length;
      return submissionsPositiveSentimentsCount + commentsPositiveSentimentsCount;
    },

    getTotalNegativeSentimentCountNaiveBayes(state) {
      const submissionsPositiveSentimentsCount = state.submissions.filter(submission => submission.naiveBayes === 'negative').length;
      const commentsPositiveSentimentsCount = state.comments.filter(comment => comment.naiveBayes === 'negative').length;
      return submissionsPositiveSentimentsCount + commentsPositiveSentimentsCount;
    },

    getTotalNeutralSentimentCountNaiveBayes(state) {
      const submissionsPositiveSentimentsCount = state.submissions.filter(submission => submission.naiveBayes === 'neutral').length;
      const commentsPositiveSentimentsCount = state.comments.filter(comment => comment.naiveBayes === 'neutral').length;
      return submissionsPositiveSentimentsCount + commentsPositiveSentimentsCount;
    },    

    getTotalPositiveSentimentCountBert(state) {
      const submissionsPositiveSentimentsCount = state.submissions.filter(submission => submission.bert === 'positive').length;
      const commentsPositiveSentimentsCount = state.comments.filter(comment => comment.bert === 'positive').length;
      return submissionsPositiveSentimentsCount + commentsPositiveSentimentsCount;
    },

    getTotalNegativeSentimentCountBert(state) {
      const submissionsPositiveSentimentsCount = state.submissions.filter(submission => submission.bert === 'negative').length;
      const commentsPositiveSentimentsCount = state.comments.filter(comment => comment.bert === 'negative').length;
      return submissionsPositiveSentimentsCount + commentsPositiveSentimentsCount;
    },

    getTotalNeutralSentimentCountBert(state) {
      const submissionsPositiveSentimentsCount = state.submissions.filter(submission => submission.bert === 'neutral').length;
      const commentsPositiveSentimentsCount = state.comments.filter(comment => comment.bert === 'neutral').length;
      return submissionsPositiveSentimentsCount + commentsPositiveSentimentsCount;
    },
  },

  actions: {
    async fetchStatistics(subject: string) {
      const data = await useApiRequest(`api/ui/subjects/${subject}/statistics`, {
        method: 'GET',
      });

      this.submissions = data.submissions;
      this.comments = data.comments;
    },
  },
});