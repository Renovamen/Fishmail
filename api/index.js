import axios from "axios";
import {
  NewsAPI,
  NewsIdAPI,
  NewsDateAPI
  // NewsInfoAPI,
  // TopicsAPI,
  // TopicsIdAPI,
  // SectionsAPI,
  // SectionIdAPI,
} from "./resource";

export default {
  async getNews() {
    return await axios.get(NewsAPI);
  },
  async getNewsByDate(date) {
    return await axios.get(NewsDateAPI + date);
  },
  async getNewsById(id) {
    return await axios.get(NewsIdAPI + id);
  }
};
