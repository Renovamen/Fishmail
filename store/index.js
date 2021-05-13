export const state = () => ({
  articles: {},
  lists: {},
  disableImage: false
});

export const mutations = {
  updateList(state, payload) {
    state.lists[payload.page] = payload.data;
  },
  clearList(state) {
    state.lists = {};
  },
  updateArticle(state, payload) {
    state.articles[payload.id] = payload.data;
  },
  toggleDisableImage(state) {
    state.disableImage = !state.disableImage;
  }
};
