import React, { useEffect, useState } from "react";
import AllUsers from "./AllUsers";
import AllFaq from "./AllFaq";
import BalanceRequests from "./BalanceRequests";
import HelpRequests from "./HelpRequests";
import TopBar from "../Bars/TopBar";
import UpdateSiteSettings from "./UpdateSiteSettings";
import UpdateFaq from "./UpdateFaq";
import UserPage from "../User/UserPage";
import { useDispatch, useSelector } from "react-redux";
import { GetAllSeenLengthAsync } from "../Api/ChartData/ChartSlice";
import UpdateUrlFaq from "./UpdateUrlFaq";
import UrlFaqs from "./UrlFaqs";
import Link from "next/link";
import { useRouter } from "next/router";

function ControlPanel() {
  const allseen = useSelector((state) => state.chardata.seenlenght);
  const dispatch = useDispatch();
  const [selected, setSelect] = useState("/");
  const handleActiveLink = (select) => {
    setSelect(select);
  };
  var domain;
  if (typeof window !== "undefined") {
    domain = window.location.href;
  }
  const dom2 = domain?.split("/controlpanel/");
  useEffect(() => {
    dispatch(GetAllSeenLengthAsync());
    setSelect(dom2[1]);
  }, [dispatch]);

  const router = useRouter();
  const [section, setSection] = useState("/");

  useEffect(() => {
    const currentSection = router.query.section || "statistics";
    setSection(currentSection);
  }, [router.query.section]);

  const renderSection = () => {
    switch (section) {
      case "/":
        return <BalanceRequests paid={true} />;
      case "balance-requests-notpaid":
        return <BalanceRequests paid={false} />;
      case "help-requests-answered":
        return <HelpRequests answered={true} />;
      case "help-requests-notanswered":
        return <HelpRequests answered={false} />;
      case "allfaq":
        return <AllFaq />;
      case "updatefaq":
        return <UpdateFaq />;
      case "allurlsfaqs":
        return <UrlFaqs />;
      case "users":
        return <AllUsers />;
      case "updatesitesettings":
        return <UpdateSiteSettings />;
      case "/":
      default:
        return <BalanceRequests paid={true} />;
    }
  };
  console.log(section);
  return (
    <>
      <TopBar />
      <div className="control-panel">
        <div className="site-details-faq">
          <div className="allseens-length">
            <span>{allseen}</span>
            <h4>Toplam Görüntülenme</h4>
          </div>
          <div className="request-navbar">
            <Link
              className={
                selected === "/" ? "cp-navbar-item-selected" : "cp-navbar-item"
              }
              onClick={() => handleActiveLink("/")}
              href="/controlpanel/"
            >
              Ödendi
            </Link>
            <Link
              className={
                selected === "balance-requests-notpaid"
                  ? "cp-navbar-item-selected"
                  : "cp-navbar-item"
              }
              onClick={() => handleActiveLink("balance-requests-notpaid")}
              href="/controlpanel/?section=balance-requests-notpaid"
            >
              Ödenmedi
            </Link>
            <Link
              className={
                selected === "help-requests-answered"
                  ? "cp-navbar-item-selected"
                  : "cp-navbar-item"
              }
              onClick={() => handleActiveLink("help-requests-answered")}
              href="/controlpanel/?section=help-requests-answered"
            >
              Cevaplanmış Destekler
            </Link>
            <Link
              className={
                selected === "help-requests-notanswered"
                  ? "cp-navbar-item-selected"
                  : "cp-navbar-item"
              }
              onClick={() => handleActiveLink("help-requests-notanswered")}
              href="/controlpanel/?section=help-requests-notanswered"
            >
              Cevaplanmamış Destekler
            </Link>
            <Link
              className={
                selected === "allfaq"
                  ? "cp-navbar-item-selected"
                  : "cp-navbar-item"
              }
              onClick={() => handleActiveLink("allfaq")}
              href="/controlpanel/?section=allfaq"
            >
              S.S.S
            </Link>
            <Link
              className={
                selected === "allurlsfaqs"
                  ? "cp-navbar-item-selected"
                  : "cp-navbar-item"
              }
              onClick={() => handleActiveLink("allurlsfaqs")}
              href="/controlpanel/?section=allurlsfaqs"
            >
              Link Sayafası S.S.S
            </Link>
            <Link
              className={
                selected === "users"
                  ? "cp-navbar-item-selected"
                  : "cp-navbar-item"
              }
              onClick={() => handleActiveLink("users")}
              href="/controlpanel/?section=users"
            >
              Tüm Kullanıcılar
            </Link>
            <Link
              className={
                selected === "settings"
                  ? "cp-navbar-item-selected"
                  : "cp-navbar-item"
              }
              onClick={() => handleActiveLink("settings")}
              href="/controlpanel/settings"
            >
              Ayarlar
            </Link>
          </div>
        </div>
        <div className="requests">{renderSection()}</div>
      </div>
      {
        //!user.Admin && (window.location.href= "/dashboard")
      }
    </>
  );
}

export default ControlPanel;
