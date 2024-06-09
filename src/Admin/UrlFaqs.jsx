import React, { useEffect } from "react";
import trashicon from "../assets/icons/trash-icon.png";
import editicon from "../assets/icons/edit-icon.png";
import { useDispatch, useSelector } from "react-redux";

import { useFormik } from "formik";
import Link from "next/link";
import {
  CreateNewUrlfaqAsync,
  DeleteUrlfaqByIdAsync,
  GetAllUrlfaqsAsync,
} from "../Api/Faq/UrlFaqSlice";
import Image from "next/image";

function UrlFaqs() {
  const dispatch = useDispatch();
  const faqs = useSelector((state) => state.urlfaqs.items);

  const FaqFrom = useFormik({
    initialValues: {
      Question: "",
      Answer: "",
    },
    onSubmit: async (values) => {
      await dispatch(CreateNewUrlfaqAsync(values));
      FaqFrom.resetForm();
    },
  });

  useEffect(() => {
    dispatch(GetAllUrlfaqsAsync());
  }, [dispatch]);
  const DeleteFaq = async (id) => {
    await dispatch(DeleteUrlfaqByIdAsync(id));
  };
  return (
    <div className="cp-data-container">
      <div className="faq-container">
        <form className="cp-details-form" onSubmit={FaqFrom.handleSubmit}>
          <h4>Sıkça Sorulan Sorular</h4>
          <label htmlFor="">Soru:</label>
          <textarea
            className="cp-form-inputs"
            type="text"
            style={{ height: 100 }}
            name="Question"
            value={FaqFrom.values.Question}
            onChange={FaqFrom.handleChange}
          />
          <label htmlFor="">Cevap:</label>
          <textarea
            className="cp-form-inputs"
            style={{ height: 100 }}
            name="Answer"
            value={FaqFrom.values.Answer}
            onChange={FaqFrom.handleChange}
          ></textarea>
          <button type="submit" className="cp-form-btn">
            Yeni Soru Ekle
          </button>
        </form>
      </div>
      {faqs !== null &&
        faqs.map((faq) => (
          <div key={faq.ID} className="cp-data-card">
            <h3>{faq.Question}</h3>
            <p>{faq.Answer}</p>
            <div className="cp-card-btns">
              <button type="button" onClick={() => DeleteFaq(faq.ID)}>
                <Image
                  style={{
                    height: 28,
                    width: 28,
                  }}
                  src={trashicon}
                  alt="sil"
                />
              </button>
              <Link href={"/controlpanel?section=updateurlfaq&id=" + faq.ID}>
                <Image
                  style={{
                    height: 28,
                    width: 28,
                  }}
                  src={editicon}
                  alt="guncelle"
                />
              </Link>
            </div>
          </div>
        ))}
    </div>
  );
}

export default UrlFaqs;
