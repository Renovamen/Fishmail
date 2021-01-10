import axios from 'axios'
import {
	NewsAPI,
	NewsIdAPI,
	NewsDateAPI,
	NewsInfoAPI,
	TopicsAPI,
	TopicsIdAPI,
	SectionsAPI,
	SectionIdAPI
} from './resource'

export default {
	async getNews() {
		return await axios.get(NewsAPI)
	},
	getNewsById(id) {
		return axios.get(NewsIdAPI + id)
	}
}