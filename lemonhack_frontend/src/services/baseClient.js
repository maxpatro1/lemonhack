import axios from 'axios'

export const baseClient = axios.create({
  baseURL: '/api'
})
