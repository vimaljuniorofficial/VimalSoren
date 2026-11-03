import 'tailwindcss/tailwind.css'
import '../styles/index.css'

if (typeof window !== 'undefined') {
  try {
    let currentFetch = window.fetch;
    Object.defineProperty(window, 'fetch', {
      get() {
        return currentFetch;
      },
      set(val) {
        currentFetch = val;
      },
      configurable: true,
      enumerable: true,
    });
  } catch (e) {}
}

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />
}

export default MyApp
