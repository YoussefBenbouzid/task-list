/**
 * plugins/index.js
 *
 * Automatically included in `./src/main.js`
 */

// Plugins
import vuetify from './vuetify'
import router from '@/router'
import Notifications from '@kyvg/vue3-notification'

export function registerPlugins (app) {
  app
    .use(vuetify)
    .use(router)
    .use(Notifications)
}
