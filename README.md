# Stimuli

[![NPM version](https://img.shields.io/npm/v/stimuli?color=97aab4)](https://www.npmjs.com/package/stimuli)
[![GitHub license](https://img.shields.io/github/license/daun/stimuli?color=97aab4)](./LICENSE)
[![Bundle size](https://img.shields.io/bundlephobia/minzip/stimuli?color=97aab4&label=size)](https://bundlephobia.com/result?p=stimuli)
<!-- [![GitHub (pre-)release date](https://img.shields.io/github/release-date-pre/daun/stimuli?label=updated)](https://github.com/daun/stimuli/releases) -->

Composable behaviors for Stimulus controllers.

Borrows from the `useBehavior` pattern introduced by
[stimuli](https://github.com/stimuli/stimuli).

**Work in progress**. Needs better documentation and tests.

## Installation

```bash
npm install stimuli
```

## Usage

Add the desired behaviors by applying the use functions on your controllers.

```js
import { Controller } from 'stimulus'
import { useDebug, useEvents } from 'stimuli'

export default class extends Controller {
  constructor(...args) {
    super(...args)
    useDebug(this)
    useEvents(this)
  }

  connect() {
    this.debug('...')
  }

  disconnect() {
    this.emit('custom-event', {})
  }
}
```

## Behaviors

### useDebug

Console log helper prefixed with the controller name, disabled in production.

```js
this.debug('Lorem ipsum dolor sit amet', 42)
// console.log output in development:
// [test-controller] Lorem ipsum dolor sit amet  42
```

### useEvents

Emit and receive custom DOM events. Useful for communicating between
parent-child controllers.

The emitting controller's identifier is prepended to the event type for
namespacing: `type` → `controller:type`

All event listeners are removed when the controller is disconnected.

```js
// Dispatch event from 'child' controller

this.emit('custom-event', { lorem: 'ipsum' })

// Listen for event in 'parent' controller

this.on('child:custom-event', ({ detail }) => {
  console.log(detail)
})

this.once('child:custom-event', () => {
  console.log('I will only run once')
})
```

### useInstances

Track and access all connected instances of the current controller. Useful for
sibling communication between controllers.

Returns an array of instantiated controller objects. If you need to access the
controllers' DOM elements, map over the array to pluck the `element` property.

```js
// Get all connected instances
this.instances.forEach(controller => {
  console.log(controller.identifier)
})

// Get array of DOM elements
const elements = this.instances.map(controller => controller.element)
```

### useAnnouncements

Adds a live region for announcing updates to screen reader users. Great for
partial page updates when loading pages via AJAX (Turbolinks, Barba, swup, etc).

```js
// Announce first heading inside newly fetched content
const heading = document.querySelector('h1, h2')
this.announce(heading.textContent || document.title)
```

## License

[MIT License](https://opensource.org/licenses/MIT) © Philipp Daun
