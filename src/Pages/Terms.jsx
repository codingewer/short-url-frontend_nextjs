import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import TopBar from "../Bars/TopBar";
import Footer from "../Bars/Footer";
import { useSelector } from "react-redux";
import { GetSiteDataBySiteName } from "../Api/Settings/SettingsSlice";
import Aos from "aos";
import "aos/dist/aos.css";
import bgbanner from "../assets/imgs/undraw_terms_re_6ak4.svg";
import { Helmet } from "react-helmet";
import Image from "next/image";

function Terms() {
  const dispatch = useDispatch();
  const sitedata = useSelector((state) => state.settings.data);
  useEffect(() => {
    dispatch(GetSiteDataBySiteName());
  }, [dispatch]);
  const data =
    sitedata !== null
      ? sitedata
      : {
          Terms: "Gizlilik",
        };
  useEffect(() => {
    window.scrollTo(0, 0); // Sayfanın en üstüne kaydır
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <>
      <Helmet>
        <title>Linkamon | Kullanım Koşulları</title>
        <meta
          name="description"
          content="Platformu daha iyi bir her haline getirmeye çalışıyoruz."
        />
        <meta
          name="keywords"
          content="linkamon, kullanım koşulları, linkamon koşullar"
        />
      </Helmet>
      <TopBar />
      <div data-aos="fade-up" className="contacus-page">
        <div className="faq-banner">
          <div className="home-banner">
            <div className="home-banner-inner">
              <div className="frame-parent">
                <div className="link-shortener-parent">
                  <div className="link-shortener">
                    <h1 className="link-ksaltn">Kullanım</h1>
                    <h1 className="para-kazann">Koşulları</h1>
                  </div>
                </div>
              </div>
            </div>
            <Image
              loading="lazy"
              alt=""
              src={bgbanner}
            />
          </div>
        </div>
        <div className="contactus-content">
          <div dangerouslySetInnerHTML={{ __html: data.TermsConditions }}></div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default Terms;
