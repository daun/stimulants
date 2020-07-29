import { assert } from 'chai'
import jsdom from 'jsdom-global'

import { useAnnouncements, useDebug, useEvents, useInstances } from '../src'

const useFunctions = [useAnnouncements, useDebug, useEvents, useInstances]

jsdom()

const baseController = {
  identifier: 'base',
  connect() {},
  disconnect() {}
}

describe('Library', function () {
  it('exports functions', () => {
    const types = useFunctions.map((func) => typeof func)
    assert(types.every((t) => t === 'function'))
  })
})

describe('useAnnouncements', function () {
  useAnnouncements(baseController)

  it('adds an announce method', () => {
    assert(typeof baseController.announce === 'function')
  })
})

describe('useDebug', function () {
  useDebug(baseController)

  it('adds a debug method', () => {
    assert(typeof baseController.debug === 'function')
  })
})

describe('useEvents', function () {
  useEvents(baseController)

  it('adds an emit method', () => {
    assert(typeof baseController.emit === 'function')
  })
  it('adds an on method', () => {
    assert(typeof baseController.on === 'function')
  })
  it('adds a once method', () => {
    assert(typeof baseController.once === 'function')
  })
})

describe('useInstances', function () {
  useInstances(baseController)

  it('adds an instances property method', () => {
    assert(Array.isArray(baseController.instances))
  })
})
