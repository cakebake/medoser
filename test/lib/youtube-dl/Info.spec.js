import { info, isCached } from '@/lib/youtube-dl/info'

const id = 'cg0TQyjdHJ0'
const url = `https://www.youtube.com/watch?v=${id}`

describe('Test library youtube-dl/info', () => {
  test('It should fetch info', async () => {
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
