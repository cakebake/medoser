import { info, isCached } from '@/lib/youtube-dl/info.js'

const id = 'cg0TQyjdHJ0'
const url = `https://www.youtube.com/watch?v=${id}`

describe('Test youtube-dl library', () => {
  test('It should get info', async () => {
    try {
      const data = await info(url)
      expect(data.id).toBe(id)
      expect(isCached('hello')).not.toBeTruthy()
      expect(isCached(url)).toBeTruthy()
    } catch (e) {
      throw e
    }
  })
})
