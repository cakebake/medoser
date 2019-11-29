import { getInfo } from 'youtube-dl'
import { set, get, has } from 'lodash'

const cache = {}

export const info = (url, options = []) => {
  return new Promise((resolve, reject) => {
    if (!isCached(url)) {
      try {
        getInfo(url, options, (error, info) => {
          if (error) {
            reject(error)
          } else {
            set(cache, url, info)
            resolve(info)
          }
        })
      } catch (e) {
        reject(e)
      }
    } else {
      resolve(get(cache, url))
    }
  })
}

export const isCached = (key) => {
  return has(cache, key)
}
