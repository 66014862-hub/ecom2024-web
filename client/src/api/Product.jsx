import axios from "axios"

export const createProduct = async (token, form) => {
  return await axios.post('http://localhost:5001/api/product', form, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const listProduct = async (count = 20) => {
  return await axios.get('http://localhost:5001/api/products/'+count )
}


export const readProduct = async (token, id) => {
    return await axios.get(`http://localhost:5001/api/product/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const deleteProduct = async (token, id) => {
    return await axios.delete(`http://localhost:5001/api/product/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}


export const updateProduct = async (token, id, form) => {
    return await axios.put(`http://localhost:5001/api/product/${id}`, form, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}
export const uploadFile = async (token, form) => {

  console.log('form api frontent',form)
  return await axios.post('http://localhost:5001/api/images', {
    image: form
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const removeFiles = async (token, public_id) => {

  //console.log('form api frontent',form)
  return await axios.post('http://localhost:5001/api/removeimages', {
     public_id
  }, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  })
}

export const removeProduct = async (token, id) => {
    return await axios.delete(`http://localhost:5001/api/product/${id}`, {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })
}

export const searchFilters = async (arg) => {
  return await axios.post('http://localhost:5001/api/search/filters',arg )
}
