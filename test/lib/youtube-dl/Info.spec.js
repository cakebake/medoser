import { info, isCached } from '@/lib/youtube-dl/info'

const id = 'cg0TQyjdHJ0'
const url = `https://www.youtube.com/watch?v=${id}`

describe('Test library youtube-dl/info', () => {
  test('It should fetch new info', async () => {
    try {
      expect(isCached(url)).not.toBeTruthy()
      const data = await info(url)
      expect(data.id).toBe(id)
      expect(isCached(url)).toBeTruthy()
    } catch (e) {
      throw e
    }
  }, 20000)
  test('It should fetch info from cache', async () => {
    try {
      expect(isCached(url)).toBeTruthy()
      const data = await info(url)
      expect(data.id).toBe(id)
    } catch (e) {
      throw e
    }
  }, 20000)
  test('It should throw error on wrong url', async () => {
    await expect(info('lorem')).rejects.toThrow()
  })
  test('It should throw error on wrong options format', async () => {
    await expect(info('lorem', 'should be array')).rejects.toThrow()
  })
  test('It should throw error on unknown options', async () => {
    await expect(info('lorem', ['--hello=user', '--world=hunter2'])).rejects.toThrow()
  })
})
