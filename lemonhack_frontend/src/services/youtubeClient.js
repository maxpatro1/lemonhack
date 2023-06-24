import axios from 'axios'

const YOUTUBE_API_KEY = 'AIzaSyBe6JUaqfmDO2O1Us1PMyfs-x1PkgM4VMk'

export const youtubeClient = axios.create({
  baseURL: 'https://youtube.googleapis.com/youtube/v3',
  params: { key: YOUTUBE_API_KEY }
})
