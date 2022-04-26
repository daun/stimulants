/**
 * Use instance collection
 *
 * Use `this.instances` to get an array of all currently connected instances
 * of this controller.
 *
 */

const instances = {}

export default (controller) => {
  const controllerConnect = controller.connect.bind(controller)
  const controllerDisconnect = controller.disconnect.bind(controller)

  instances[controller.identifier] =
    instances[controller.identifier] || new Set()

  Object.defineProperty(controller, 'instances', {
    get() {
      return Array.from(instances[controller.identifier])
    }
  })

  Object.assign(controller, {
    connect() {
      instances[this.identifier].add(this)
      controllerConnect()
    },
    disconnect() {
      instances[this.identifier].delete(this)
      controllerDisconnect()
    }
  })
}
