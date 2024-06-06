import { useState } from "react";
import React, { useEffect } from "react";
import trashicon from "../assets/icons/trash-icon.png";
import copyicon from "../assets/icons/copy-icon.png";
import editicon from "../assets/icons/edit-icon.png";
import { useDispatch, useSelector } from "react-redux";
import loadingicon from "../assets/icons/loading.gif";

import {
  DeleteUrlByIdAsync,
  GetUrlByCreatedByAsync,
} from "../Api/Url/UrlSlice";
import  Link  from "next/link";


function LastUrls() {
  const dispatch = useDispatch();
  const items = useSelector((state) => state.url.items);
  const currentURL = window.location.href;
  const urlgetloading = useSelector((state) => state.url.getloading);
  const domain = currentURL.split("/dashboard")[0];

  const usersuccess = useSelector((state) => state.users.success);
  const user0 = useSelector((state) => state.users.userrealtime);
  const user = usersuccess ? user0 : {};
  
  const CopyContent = (urll) => {
    navigator.clipboard
    .writeText(domain + "/l/" + urll + "/r/1")
    .then(() => {
      alert("Kopyalandı: " + domain + urll);
    })
    .catch((err) => {
      alert("Metin kopyalanırken bir hata oluştu!");
    });
  };
  
  const DeleteContent = async (id) => {
    if (window.confirm("Silmek istediğinize emin misiniz?")) {
      dispatch(DeleteUrlByIdAsync(id));
    }
  };
  
  const [showLimit, setShowLimit] = useState(10);
  const hanldeShowMore = () => {
    setShowLimit(showLimit + 25);
  };

  useEffect(() => {
    dispatch(GetUrlByCreatedByAsync(user.ID));
  }, [usersuccess]);

  const [filtereUrls, setFiltereUrls] = useState([]);
  var filteredurls = [];
  const handleSearch = (searchTerm) => {
    filteredurls = items?.filter(
      (url) =>
        url.OrginalUrl.toLowerCase().includes(searchTerm.toLowerCase()) ||
        url.ShortenedUrl.includes(searchTerm.toLowerCase())
    );
    setFiltereUrls(filteredurls);
  };
  useEffect(() => {
    setFiltereUrls(items);
  }, [items]);
console.log(items)
  return (
      <div className="last-shortened-urls">
      {urlgetloading && <img src={loadingicon} className="loading-icon" />}

      {items?.length !== 0 && (
        <>
          <input
            placeholder="Ara(orneksite.com)"
            className="searchurlinput"
            type="text"
            onChange={(e) => handleSearch(e.target.value)}
            />
          <table>
            <thead>
              <tr>
                <th style={{ width: 100 }}>#</th>
                <th style={{ width: 200 }}>Başlık</th>
                <th style={{ width: 300 }}>Orijinal Link</th>
                <th style={{ width: 200 }}>Tıklanma</th>
                <th style={{ width: 200 }}>Gelir</th>
                <th style={{ width: 200 }}>İşlem</th>
              </tr>
            </thead>
            <tbody>
              {filtereUrls?.slice(0, showLimit).map((item, index) => (
                  <tr key={index}>
                  <td style={{ width: 100 }}>{index + 1}</td>
                  <td style={{ width: 200 }}>
                    <a
                      className="url-name"
                      target="_blank"
                      rel="noreferrer"
                      href={domain + "/" + user?.UserName + "/"+ item.ShortenedUrl + "/r/1"}
                      >
                      {item.ShortenedUrl}
                    </a>
                  </td>
                  <td style={{ width: 300 }}>
                    <a
                      className="url-name"
                      target="_blank"
                      rel="noreferrer"
                      href={item.OrginalUrl}
                      >
                      { 
                      item.OrginalUrl.length > 25 ?
                      item.OrginalUrl.substring(0, 25)+"...":
                      item.OrginalUrl}
                    </a>
                  </td>
                  <td style={{ width: 200 }}>{item?.ClickCount}</td>
                  <td style={{ width: 200 }}>{parseInt(item?.ClickEarning)}</td>

                  <td style={{ width: 200 }}>
                    <div
                      style={{
                          width: "100%",
                          display: "flex",
                          justifyContent: "space-around",
                        }}
                        >
                      <button
                        className="card-btns"
                        type="button"
                        onClick={() => CopyContent(item?.ShortenedUrl)}
                        >
                        <img src={copyicon} alt="Kopyala" />
                      </button>
                      <button
                        type="button"
                        className="card-btns"
                        onClick={() => DeleteContent(item?.ID)}
                        >
                        <img src={trashicon} alt="Sil" />
                      </button>
                      <Link
                        className="card-btns"
                        href={"/dashboard/updateurl/" + item.ID}
                        >
                        <img src={editicon} alt="Kopyala" />
                      </Link>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {showLimit < filtereUrls?.length && (
              <button
              className="show-more-btn"
              onClick={hanldeShowMore}
              type="button"
              >
              Daha Falza Göster({filtereUrls.length - showLimit})
            </button>
          )}
          </>
      )}
    </div>
  );
}

export default LastUrls;
