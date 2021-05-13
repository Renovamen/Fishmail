import { API_ROOT } from "./config.js";

const API = {
  startimage: "/4/start-image/1080*1776",
  news: "/4/news/latest",
  newsbyid: "/4/news/",
  newsbydate: "/4/news/before/",
  newsinfo: "/4/story-extra",
  topics: "/4/themes",
  topicbyid: "/4/theme/",
  sections: "/3/sections",
  sectionbyid: "/3/section"
};

export const NewsAPI = API_ROOT.concat(API.news);
export const NewsIdAPI = API_ROOT.concat(API.newsbyid);
export const NewsDateAPI = API_ROOT.concat(API.newsbydate);
export const NewsInfoAPI = API_ROOT.concat(API.newsinfo);
export const TopicsAPI = API_ROOT.concat(API.topics);
export const TopicsIdAPI = API_ROOT.concat(API.topicbyid);
export const SectionsAPI = API_ROOT.concat(API.sections);
export const SectionIdAPI = API_ROOT.concat(API.sectionbyid);
