import axios from 'axios'

const baseURL = 'https://627443ea3d2b5100742a2de7.mockapi.io/api/v1/'

const httpClient = axios.create({ baseURL })

export {
  httpClient
}
