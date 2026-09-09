import 'bootstrap/dist/css/bootstrap.min.css'
import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import { logDiagnostic } from './utils/diagnostics'

const app = createApp(App)

app.config.errorHandler = (error, instance, info) => {
	logDiagnostic({
		action: 'app:vueError',
		stage: 'runtime',
		status: 'error',
		meta: {
			component: instance?.$options?.name || 'anonymous-component',
			info,
		},
		error,
	})
}

window.addEventListener('unhandledrejection', (event) => {
	logDiagnostic({
		action: 'app:unhandledRejection',
		stage: 'runtime',
		status: 'error',
		error: event.reason,
	})
})

app.use(router)

app.mount('#app')
