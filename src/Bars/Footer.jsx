import React from "react";
import Link from "next/link"

function Footer() {

 var logined
  if (typeof localStorage!=="undefined"){
     logined = Boolean(localStorage.getItem("logined"));
  }
    return (
    <div className="footer-bar">
      <div className="footer-container">
        <div className="footer-company">
          <span>&#169;2024 linkamon.com tüm hakları saklıdır.</span>
        </div>
        <div className="footer-urls">
          <Link href="/">Ana Sayfa</Link>
          {
            !logined &&
          <Link href="/register">Kayıt Ol</Link>
          }
          <Link href="/aboutus" >Hakkımızda</Link>
          <Link href="/contactus" >İletişim</Link>
          <Link href="/paid" >Ödeme Kanıtları</Link>
          <Link href="/faq" >S.S.S</Link>
          <Link href="/terms" >Kullanım Şartları</Link>
          <Link href="/privacy" >Gizlilik Politikası</Link>
          <Link href="/cookies" >Çerez Politikası</Link>

        </div>
      </div>
    </div>
  );
}

export default Footer;
