import React, { useEffect, useState } from "react";
import Footer from "../Bars/Footer";
import TopBar from "../Bars/TopBar";
import DataChart from "./DataChart";
import UpdateUser from "./UpdateUser";
import HelpReq from "./HelpReq";
import BalanceRequest from "./BalanceRequest";
import ShortUrl from "../Url/ShortUrl";
import UpdateUrl from "../Url/UpdateUrl";

import { GetUserByIDAsync } from "../Api/User/UserSlice";
import { useDispatch, useSelector } from "react-redux";
import { GetSiteDataBySiteName } from "../Api/Settings/SettingsSlice";
import SideBarDash from "../Bars/SideBarDash";
import Link from "next/link";
import { useRouter } from "next/router";

function Profile() {
  var logined;
  var user;
  if (typeof localStorage !== "undefined") {
    logined = Boolean(localStorage.getItem("logined"));
    user = JSON.parse(localStorage.getItem("user"));
  }
  const balancesatatus = useSelector((state) => state.balance.success);
  const dispatch = useDispatch();
  const [width, setWidth] = useState();

  useEffect(() => {
    dispatch(GetUserByIDAsync(user?.ID));
    dispatch(GetSiteDataBySiteName());
  }, [dispatch, balancesatatus]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      const handleWindowResize = () => setWidth(window.innerWidth);
      window.addEventListener("resize", handleWindowResize);
      return () => window.removeEventListener("resize", handleWindowResize);
    }
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.scrollTo(0, 0); // Sayfanın en üstüne kaydır
    }
  }, []);

  const router = useRouter();
  const [section, setSection] = useState("statistics");

  useEffect(() => {
    const currentSection = router.query.section || "statistics";
    setSection(currentSection);
  }, [router.query.section]);

  const renderSection = () => {
    switch (section) {
      case "settings":
        return <UpdateUser />;
      case "help":
        return <HelpReq />;
      case "balance":
        return <BalanceRequest />;
      case "shorturl":
        return <ShortUrl />;
        case "updateurl":
          return <UpdateUrl/>
      case "statistics":
      default:
        return <DataChart />;
    }
  };

  return (
    <div>
      {width < 1080 ? (
        <TopBar />
      ) : (
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            position: "relative",
            top: "24px",
          }}
        >
          <div
            style={{
              width: "75%",
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
              textAlign: "center",
            }}
          >
            <Link
              href="/dashboard/shorturl"
              className="short-url-btn-top"
              style={{
                marginRight: "24px",
                textDecoration: "none",
                textAlign: "center",
                borderRadius: 12,
                borderColor: "#7215fc",
                borderStyle: "solid",
                borderWidth: "2px",
                padding: "12px",
                fontWeight: "bold",
                fontSize: "16px",
                minWidth: "150px",
                transition: "all 0.3s ease-in-out",
              }}
            >
              Link Kısalt
            </Link>
          </div>
        </div>
      )}
      <div className="profile-container">
        <div className="profile-nav">
          <SideBarDash />
        </div>
        <div className="profile-pages">{renderSection()}</div>
      </div>
      <Footer />
      {
        //!logined &&  ( window?.location.href="/")
      }
    </div>
  );
}

export default Profile;

export const formatDate = (date) => {
  const d = new Date(date);
  const year = d.getFullYear();
  const month = d.toLocaleString("tr-TR", { month: "long" });
  const day = d.getDate();
  const hour = d.getHours();
  const minute = d.getMinutes();
  return `${day}-${month}-${year} - ${hour}:${minute}`;
};
