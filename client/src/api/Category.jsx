import axios from 'axios'

export const listCategory = async (token) => {
  return await axios.get('http://localhost:5001/api/category', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const createCategory = async (token, data) => {
  return await axios.post('http://localhost:5001/api/category', data, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const removeCategory = async (token, id) => {
  return await axios.delete('http://localhost:5001/api/category/' + id, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}