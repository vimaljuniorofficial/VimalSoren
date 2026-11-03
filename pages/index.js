import dynamic from 'next/dynamic';
import ReactGA from 'react-ga4';
import Meta from "../components/SEO/Meta";

const Ubuntu = dynamic(() => import("../components/ubuntu"), {
  ssr: false,
});

const TRACKING_ID = process.env.NEXT_PUBLIC_TRACKING_ID;
if (TRACKING_ID) {
  ReactGA.initialize(TRACKING_ID);
}

function App() {
  return (
    <>
      <Meta />
      <Ubuntu />
    </>
  )
}

export default App;
