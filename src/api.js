import axios from 'axios'

export function fetchData(key) {
    return axios.get('http://localhost:8080/fetchData?key=' + key)
}

export function changeData() {
    return axios.post('http://localhost:8080/changeData')
}