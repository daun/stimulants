import OnDemandLiveRegion from 'on-demand-live-region'

/**
 * Use screen reader announcements
 *
 * Use `this.announce(message)` to announce a message.
 * See the `on-demand-live-region` package for details:
 * https://github.com/Heydon/on-demand-live-region
 *
 */

const liveRegion = new OnDemandLiveRegion()

export default (controller) => {
  Object.assign(controller, {
    /**
     * Announce a message.
     */
    announce(message) {
      liveRegion.say(message)
    }
  })
}
