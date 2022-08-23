import axios from 'axios'

const fetchTodoList = async () => {
  try {
    const { data } = await axios.get('/api/todo-list.json')
    return data
  } catch (error) {
    console.log('error:', error)
  }
}

export const TodoAPIService = {
  fetchTodoList,
}
