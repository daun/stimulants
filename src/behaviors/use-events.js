/**
 * Use custom events
 *
 * Use `this.emit('type', data)` to emit an event from the controller element.
 * Use `this.on('controller:type', callback)` to listen to an event.
 *
 * All listeners are removed on disconnect.
 */

export default (controller) => {
  const controllerConnect = controller.connect.bind(controller)
  const controllerDisconnect = controller.disconnect.bind(controller)

  Object.assign(controller, {
    /**
     * Emit an event from the controller element.
     *
     * Auto-prepends the controller identifier, e.g. click -> nav:click
     */
    emit(type, data = {}) {
      type = `${this.identifier}:${type}`
      const event = new CustomEvent(type, { detail: data, bubbles: true })
      return this.element.dispatchEvent(event)
    },
    /**
     * Listen to an event on the controller element.
     */
    on(type, callback, options = {}) {
      this.element.addEventListener(type, callback, options)
      const handle = () =>
        this.element.removeEventListener(type, callback, options)
      this.eventListeners.push(handle)
    },
    /**
     * Listen to an event on the controller element, at most once.
     */
    once(type, callback, options = {}) {
      return this.on(type, callback, { ...options, once: true })
    },

    connect() {
      this.eventListeners = []
      controllerConnect()
    },
    disconnect() {
      this.eventListeners.forEach((remove) => remove())
      controllerDisconnect()
    }
  })
}
