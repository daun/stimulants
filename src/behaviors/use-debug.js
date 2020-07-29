/**
 * Use debug helpers
 *
 * Use `this.debug(...data)` to log data to the console in dev mode
 *
 * The controller name is prepended to all output.
 * In production environments, nothing is logged.
 *
 */

const isDev = process.env.NODE_ENV !== 'production'
const style = `color:purple`

export default (controller) => {
  const debug = isDev
    ? console.log.bind(console, `%c[${controller.identifier}]`, style)
    : () => {}
  Object.assign(controller, { debug })
}
