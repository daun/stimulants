import { assert } from 'chai'
import jsdom from 'jsdom-global'

import { useAnnouncements, useDebug, useEvents, useInstances } from '../src'

const useFunctions = [useAnnouncements, useDebug, useEvents, useInstances]

jsdom(`<!DOCTYPE html><div></div>`)

const baseController = {
  element: document.querySelector('div'),
  identifier: 'base',
  initialize() {},
  connect() {},
  disconnect() {}
}

function createController(use) {
  const controller = { ...baseController }
  use(controller)
  controller.initialize()
  controller.connect()
  controller.disconnect()
  return controller
}

describe('Library', function () {
  it('exports functions', () => {
    const types = useFunctions.map((func) => typeof func)
    assert(types.every((t) => t === 'function'))
  })
})

describe('useAnnouncements', function () {
  const controller = createController(useAnnouncements)

  it('adds an announce method', () => {
    assert(typeof controller.announce === 'function')
  })

  controller.announce('Message')
})

describe('useDebug', function () {
  const controller = createController(useDebug)

  it('adds a debug method', () => {
    assert(typeof controller.debug === 'function')
  })
})

describe('useEvents', function () {
  const controller = createController(useEvents)

  it('adds an emit method', () => {
    assert(typeof controller.emit === 'function')
  })
  it('adds an on method', () => {
    assert(typeof controller.on === 'function')
  })
  it('adds a once method', () => {
    assert(typeof controller.once === 'function')
  })
  controller.once('some-event', () => {})
  controller.on('some-event', () => {})
  controller.emit('some-event')
})

describe('useInstances', function () {
  const controller = createController(useInstances)

  it('adds an instances property method', () => {
    assert(Array.isArray(controller.instances))
  })
})
