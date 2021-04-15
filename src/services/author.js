import axios from 'axios'

const url = `${process.env.REACT_APP_API}/author`

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
  }
}
