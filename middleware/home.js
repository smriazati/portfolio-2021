import axios from 'axios'

export default function ( {params, store} ) {
    return axios.get(`/api/`)
    .then((response) => {
        store.commit('add', response.data)
    }).catch(error => {
          console.log('Request canceled', error)
    })
}

