import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'boxicons/css/boxicons.min.css';
import type { AppProps } from 'next/app'
import {useEffect} from "react";
import Moment from 'moment';
import 'moment/locale/es';
import "boxicons/css/boxicons.min.css";
import {EventAuthProvider} from "../business/content/contexts/eventAuthContext";
import TagManager from 'react-gtm-module';
import ReactGA from "react-ga4";
Moment.locale('es');

ReactGA.initialize("G-2S5SG2BTBS");
function MyApp({ Component, pageProps }: AppProps) {
  useEffect(() => {
    import("bootstrap/dist/js/bootstrap"!);
      const tagManagerArgs = {
          gtmId: 'GTM-KWZRQMC'
      }

      TagManager.initialize(tagManagerArgs)
  }, []);

  return (
      <EventAuthProvider>
        <Component {...pageProps} />
      </EventAuthProvider>
  )
}

export default MyApp
