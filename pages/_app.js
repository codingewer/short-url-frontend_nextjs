import Head from "next/head";
import "../src/index.css";
import "../src/styles/aboutus.css";
import "../src/styles/ads.css";
import "../src/styles/balancerequest.css";
import "../src/styles/controlpanel.css";
import "../src/styles/controlpanelglobalstyle.css";
import "../src/styles/faq.css";
import "../src/styles/footer.css";
import "../src/styles/helpreq.css";
import "../src/styles/home.css";
import "../src/styles/paidpage.css";
import "../src/styles/profile.css";
import "../src/styles/shorturl.css";
import "../src/styles/sidebar.css";
import "../src/styles/topbar.css";
import "../src/styles/userform.css";
import "../src/styles/userpage.css";
import { Provider } from "react-redux";
import store from "../src/Api/Store";
import dynamic from "next/dynamic";

const CookiesBar = dynamic(() => import("../src/Bars/CookiesBar"), { ssr: false })
const SideBar = dynamic(() => import("../src/Bars/SideBar"), { ssr: false })

export default function MyApp({ Component, pageProps }) {
  
  return (
    <div>
      <Head>
        <meta name="google-adsense-account" content="ca-pub-5425176553873988" />
        <meta charset="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=0.7" />
        <meta name="theme-color" content="#000000" />
        <meta property="og:url" content="https://linkamon.com" />
        <meta property="og:title" content="Linkamon" />
        <meta
          property="og:description"
          content="Linklerinizi kısaltın, kısalttığınız linke tıklandıkça pasif gelir elde edin."
        />
        <meta
          property="og:image"
          content="https://res.cloudinary.com/dsfggqsdp/image/upload/f_auto,q_auto/v1/shorturl/wfyenfa1guoaxukhv3um"
        />
      </Head>
      <Provider store={store}>
        <SideBar />
        <CookiesBar />
        <Component {...pageProps} />
      </Provider>
    </div>
  );
}
