import React, { useEffect, useState } from "react";
import doneicon from "../assets/icons/Done.svg";
import pending from "../assets/icons/Hourglass.svg";
import { useDispatch, useSelector } from "react-redux";
import { GetBalanceByUserIDAsync } from "../Api/Balance/BalanceSlice";
import { formatDate } from "./Profile";
import Image from "next/image";

function LastBalanceRequests(props) {
  const user0 = useSelector((state) => state.users.userrealtime);
  const items = useSelector((state) => state.balance.balanceRequests);
  const dispatch = useDispatch();

  const data2 =
    (props.page === "profile") & (items?.length > 2)
      ? items?.slice(0, 2)
      : items;

  console.log(data2);
  useEffect(() => {
    dispatch(GetBalanceByUserIDAsync());
  }, [user0]);
  return (
    <div className="balance-requests">
      <h1>Para Çekme Geçmişi</h1>
      {data2.length > 0 ? (
        data2?.map((item) => (
          <div key={item.ID} className="balance-request">
            <span style={{ color: "red", fontSize: 18, fontWeight: "bold" }}>
              -{item.amount} &#8378;
            </span>
            <span style={{ fontWeight: 600, fontSize: 18 }}>
              {formatDate(item.createdAt)}
            </span>
            {item.status ? (
              <Image src={doneicon} style={{ height: 32 }} />
            ) : (
              <Image src={pending} style={{ height: 32 }} />
            )}
          </div>
        ))
      ) : (
        <p>Gösterilecek veri yok.</p>
      )}
    </div>
  );
}

export default LastBalanceRequests;
