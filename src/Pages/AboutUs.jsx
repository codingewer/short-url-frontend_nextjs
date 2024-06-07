import { useDispatch } from "react-redux";
import React, { useEffect } from "react";
import TopBar from "../Bars/TopBar";
import Footer from "../Bars/Footer";
import { useSelector } from "react-redux";
import { GetSiteDataBySiteName } from "../Api/Settings/SettingsSlice";
import Aos from "aos";
import "aos/dist/aos.css";
import bgbanner from "../assets/imgs/undraw_portfolio_website_re_jsdd.svg";
import { Helmet } from "react-helmet";
import Image from "next/image";

function AboutUs() {
  const dispatch = useDispatch();
  const sitedata = useSelector((state) => state.settings.data);
  useEffect(() => {
    dispatch(GetSiteDataBySiteName());
  }, [dispatch]);
  const data =
    sitedata !== null
      ? sitedata
      : {
          AboutUs: "Hakkımızda",
        };
  useEffect(() => {
    window.scrollTo(0, 0); // Sayfanın en üstüne kaydır
    Aos.init({ duration: 2000 });
  }, []);
  return (
    <>
      <Helmet>
        <title>Linkamon | Hakkımızda</title>
        <meta name="description" content="Linkamon Hakkımızda." />
        <meta name="keywords" content="hakkımızda, linkamon hakkında" />
      </Helmet>
      <TopBar />
      <div data-aos="fade-up" className="contacus-page">
        <div className="faq-banner">
          <div className="home-banner">
            <div className="home-banner-inner">
              <div className="frame-parent">
                <div className="link-shortener-parent">
                  <div className="link-shortener">
                    <h1 className="para-kazann">Hakkımızda</h1>
                  </div>
                </div>
              </div>
            </div>
            <Image
              className="undraw-link-shortener-mvf6-1-icon"
              loading="lazy"
              alt=""
              src={bgbanner}
            />
          </div>
        </div>
        <div className="contactus-content">
          <div dangerouslySetInnerHTML={{ __html: data.AboutUs }}></div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default AboutUs;
