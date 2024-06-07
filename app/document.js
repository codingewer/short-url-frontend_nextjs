import { Html, Head} from "next/document";

export default function Document() {
  return (
    <Html lang="tr">
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
      <body>
        <noscript>Linkleri kısaltıp para kazanmak çok kolay</noscript>
        <div id="root"></div>
      </body>
    </Html>
  );
}
