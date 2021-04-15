import axios from 'axios'

const url = `${process.env.REACT_APP_API}/publication`

export default {
  getAll() {
    return new Promise((resolve, reject) => {
      axios.get(`${url}`)
        .then(result => {
          resolve(result.data)
        })
        .catch(error => {
          console.log(error)
          reject()
        })
    })
  },

  getById(id) {
    return new Promise((resolve, reject) => {
      axios.get(`${url}/${id}`)
        .then(result => {
          resolve(result.data)
        })
        .catch(error => {
          console.log(error)
          reject()
        })
    })
  },

  getByAuthor(id) {
    return new Promise((resolve, reject) => {
      axios.get(`${url}?authorId=${id}`)
        .then(result => {
          resolve(result.data)
        })
        .catch(error => {
          console.log(error)
          reject()
        })
    })
  },

  getBySearch(search, limit, offset) {
    return new Promise((resolve, reject) => {
      axios.get(`${url}?title=%${search}%&limit=${limit}&offset=${offset}`)
        .then(result => {
          resolve(result.data)
        })
        .catch(error => {
          console.log(error)
          reject()
        })
    })
  }
}
