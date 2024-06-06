import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import loadingicon from "../assets/icons/loading.gif";
import trashico from "../assets/icons/trash-icon.png";
import { useDispatch, useSelector } from "react-redux";
import {
  GetBalanceByUserIDAsync,
  NewBalanceRequestAsync,
} from "../Api/Balance/BalanceSlice";
import {
  DeleteBankInfoByIDAsync,
  NewBalanceIBANAsync,
  UpdateBankInfoByIDAsync,
} from "../Api/Balance/BankInfoSlice";
import {
  DeletePaparaInfoAsync,
  NewPaparaInfoAsync,
  UpdatePaparaInfoAsync,
} from "../Api/Balance/PaparaSlice";
import LastBalanceRequests from "./LastBalanceReqs";

function BalanceRequest(props) {
  const sitedata = useSelector((state) => state.settings.data);
  const loading = useSelector((state) => state.balance.loading);
  const usersuccess = useSelector((state) => state.users.success);

  const bankloading = useSelector((state) => state.bankinfo.loading);
  const paparaloading = useSelector((state) => state.papara.loading);
  const bankerror = useSelector((state) => state.bankinfo.error);
  const paparaerror = useSelector((state) => state.papara.error);
  const bankmessage = useSelector((state) => state.bankinfo.message);
  const paparamessage = useSelector((state) => state.papara.message);
  const banksuccess = useSelector((state) => state.bankinfo.success);
  const paparsuccess = useSelector((state) => state.papara.success);

  const user0 = useSelector((state) => state.users.userrealtime);
  const user = usersuccess ? user0 : {};
  const items = useSelector((state) => state.balance.balanceRequests);
  const balanceM = sitedata !== null ? sitedata.WithdrawnBalance : 100;
  const balanceW =  parseInt(user.Balance);
  const barWidht = (balanceW / balanceM) * 100 + "%";
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      amount: 0,
      option: "banka",
    },
    onSubmit: async (values) => {
      dispatch(NewBalanceRequestAsync(values));
      formik.resetForm();
    },
  });

  const balanceInForm = useFormik({
    initialValues: {
      iban: "",
      ibanOwner: "",
    },
    onSubmit: async (values) => {
      if (user.BalanceInfo.userId === user.ID) {
        dispatch(UpdateBankInfoByIDAsync(values));
      } else {
        dispatch(NewBalanceIBANAsync(values));
      }
    },
  });

  const paparaImfoForm = useFormik({
    initialValues: {
      PaparaNo: "",
    },
    onSubmit: async (values) => {
      {
        if (user.PaparaNo.userId === user.ID) {
          dispatch(UpdatePaparaInfoAsync(values));
        } else {
          dispatch(NewPaparaInfoAsync(values));
        }
      }
    },
  });

  const [toglet, setToglet] = useState(false);
  const handleToggleForm = (id) => {
    const form = document.getElementById(id);
    if (toglet) {
      form.style.display = "none";
      setToglet(!toglet);
    } else {
      form.style.display = "flex";
      setToglet(!toglet);
    }
  };

  const handleDeletePaparaNo = () => {
    dispatch(DeletePaparaInfoAsync(user.PaparaNo.ID));
    paparaImfoForm.setFieldValue("PaparaNo", "");
  };

  const handleDeleteIBAN = () => {
    dispatch(DeleteBankInfoByIDAsync(user.BalanceInfo.ID));
    balanceInForm.setValues({
      iban: "",
      ibanOwner: "",
    });
  };

  const data = items !== null ? items : [];
  useEffect(() => {
    dispatch(GetBalanceByUserIDAsync());
    if (user0 !== null) {
      balanceInForm.setValues({
        ID: user.BalanceInfo.ID,
        iban: user.BalanceInfo.iban,
        ibanOwner: user.BalanceInfo.ibanOwner,
      });
      paparaImfoForm.setFieldValue("PaparaNo", user.PaparaNo.PaparaNo);
    }
  }, [user0]);
  console.log(items);
  return (
    <div className="balance-container">
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 24,
        }}
      >
        <div className="balance-info">
          <div className="urls-detail">
            <span>{parseInt(balanceW)} &#8378;</span>
            <span> Bakiye</span>
          </div>
          {balanceW < balanceM && (
            <div className="balance-amount">
                                  {barWidht}


              <div className="balance-bar">
                <div
                  style={{
                    height: 20,
                    width: barWidht,
                    backgroundColor: balanceM >= balanceW ? "#7215fc" : "red",
                  }}
                  >
                  </div>
              </div>
            </div>
          )}
          {balanceW < balanceM && (
            <span style={{ color: "red", 
            width:"100%",
            textAlignLast:"left"

            }}>
              Çekmek için en az {balanceM} &#8378; gerekli
            </span>
          )}
        </div>
        <form className="balance-form" onSubmit={formik.handleSubmit}>
          <span
          style={{
            fontSize:28,
            fontWeight:600
          }}
          >Para Çek</span>
          {loading && <img src={loadingicon} className="loading-icon" />}
          {formik.values.amount > balanceW && (
            <span style={{ color: "red", fontSize: 16 }}>
              bakiye yetersiz! En fazla {balanceW} &#8378; çekebilirisiniz.
            </span>
          )}
          <label>Para Çekme Seçeneği:</label>
          {usersuccess &&
          user.BalanceInfo.userId !== user.ID &&
          user.PaparaNo.UserId !== user.ID ? (
            <p style={{ color: "red", textAlign: "center" }}>
              Banka veya Papara bilgileriniz bulunmamaktadır lütfen ekleyin.
              Aksi taktirde paranızı çekemezsiniz!
              <a href="#detailsforms-forbalance"> Burdan Ekleyin</a>
            </p>
          ) : null}
          <select
            className="chart-select"
            name="option"
            value={formik.values.option}
            onChange={formik.handleChange}
          >
            {usersuccess && user.BalanceInfo.userId === user.ID ? (
              <option value="banka">Banka</option>
            ) : null}
            {usersuccess && user.PaparaNo.UserId === user.ID ? (
              <option value="papara">Papara</option>
            ) : null}
          </select>
          <label>Miktar</label>
          <input
            disabled={balanceW < balanceM ? true : false}
            value={formik.values.amount}
            min={balanceM}
            name="amount"
            onChange={formik.handleChange}
            type="number"
            placeholder="Çekmek istediğiniz tutar"
          />
          <button type="submit">Çek</button>
        </form>
      </div>

      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "flex-start",
          flexWrap: "wrap",
          gap: 24,
          paddingTop: 48,
        }}
      >
        <LastBalanceRequests />
        <div className="balance-info-froms">
          <div className="togle-form-btns">
            <div>
              <div className="btn-container">
                <span>Banka Bilgileri</span>
                <button onClick={() => handleToggleForm("iban-noform")}>
                  {usersuccess && user.BalanceInfo.userId === user.ID
                    ? "Güncelle"
                    : "Ekle"}{" "}
                </button>
              </div>
            </div>
            {bankloading && <img src={loadingicon} className="loading-icon" />}
            {banksuccess ? (
              <span style={{ color: "green" }}>{bankmessage}</span>
            ) : (
              <span style={{ color: "red" }}>{bankerror}</span>
            )}
            <form
              id="iban-noform"
              style={{ display: "none" }}
              className="register-form"
              onSubmit={balanceInForm.handleSubmit}
            >
              <h3>IBAN Bilgileri</h3>
              <label htmlFor="password">IBAN</label>
              <input
                type="text"
                name="iban"
                value={balanceInForm.values.iban}
                onChange={balanceInForm.handleChange}
              />
              {balanceInForm.errors.iban && balanceInForm.touched.iban ? (
                <div>{balanceInForm.errors.iban}</div>
              ) : null}

              <label htmlFor="password">IBAN Sahibi Adı Soyadı</label>
              <input
                type="text"
                name="ibanOwner"
                value={balanceInForm.values.ibanOwner}
                onChange={balanceInForm.handleChange}
              />
              {balanceInForm.errors.ibanOwner &&
              balanceInForm.touched.ibanOwner ? (
                <div>{balanceInForm.errors.ibanOwner}</div>
              ) : null}
              <button className="form-btn" type="submit">
                {usersuccess && user.BalanceInfo.userId === user.ID
                  ? "Güncelle"
                  : "Ekle"}
              </button>
              {usersuccess && user.BalanceInfo.userId === user.ID ? (
                <button onClick={handleDeleteIBAN} type="button">
                  <img className="btn-icon" src={trashico} alt="Sil" />
                </button>
              ) : null}
            </form>
            <div>
              <div className="btn-container">
                <span>Papara Bilgileri</span>
                <button onClick={() => handleToggleForm("papara-noform")}>
                  {usersuccess && user.PaparaNo.UserId === user.ID
                    ? "Güncelle"
                    : "Ekle"}
                </button>
              </div>
            </div>

            {paparaloading && (
              <img src={loadingicon} className="loading-icon" />
            )}
            {paparsuccess ? (
              <span style={{ color: "green" }}>{paparamessage}</span>
            ) : (
              <span style={{ color: "red" }}>{paparaerror}</span>
            )}

            <form
              style={{ display: "none" }}
              id="papara-noform"
              className="register-form"
              onSubmit={paparaImfoForm.handleSubmit}
            >
              <h3>Papara No</h3>
              <input
                type="text"
                name="PaparaNo"
                value={paparaImfoForm.values.PaparaNo}
                onChange={paparaImfoForm.handleChange}
              />
              <button className="form-btn" type="submit">
                {usersuccess && user.PaparaNo.UserId === user.ID
                  ? "Güncelle"
                  : "Ekle"}
              </button>
              {usersuccess && user.PaparaNo.UserId === user.ID ? (
                <button onClick={handleDeletePaparaNo} type="button">
                  <img className="btn-icon" src={trashico} alt="Sil" />
                </button>
              ) : null}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BalanceRequest;
