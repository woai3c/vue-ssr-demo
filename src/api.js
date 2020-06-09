import axios from 'axios';

export function fetchItem(id) {
  return axios.get('http://localhost:8080/detail?id=' + id);
}
export function fetchList() {
  return axios.get('http://localhost:8080/list');
}
