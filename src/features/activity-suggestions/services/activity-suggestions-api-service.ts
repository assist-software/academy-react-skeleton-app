import axios from 'axios'

const fetchActivities = async () => {
  try {
    const { data } = await axios.get('/api/suggestions.json')
    return data
  } catch (error) {
    console.log('error:', error)
  }
}

export const ActivitySuggestionAPIService = {
  fetchActivities,
}
