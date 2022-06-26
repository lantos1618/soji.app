import App from './App.svelte'

declare global {
  interface Window {
    ethereum: any;
  }
}

const app = new App({
  target: document.getElementById('app')
})

export default app
