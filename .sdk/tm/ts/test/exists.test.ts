
import { test, describe } from 'node:test'
import { equal } from 'node:assert'


import { FirecrawlSDK } from '..'


describe('exists', async () => {

  test('test-mode', () => {
    const testsdk = FirecrawlSDK.test()
    equal(testsdk instanceof FirecrawlSDK, true,
      'FirecrawlSDK.test() must return a client synchronously')
  })

})
