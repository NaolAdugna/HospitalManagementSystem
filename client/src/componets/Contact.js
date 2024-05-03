import React from "react";
import "../styles/Contact.css";

import {
  faLocationDot,
  faEnvelope,
  faPhone,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Header from "./layouts/Header";
import Footer from "./layouts/Footer";

import toast, { Toaster } from "react-hot-toast";
import { useFormik } from "formik";

import { sendContactMessage } from "../functions/checker";

import { GoogleGenerativeAI } from "@google/generative-ai";
import config from "./config";
import ChatBot from "react-chatbotify";
export default function Contact() {
  const optionsChatbotify = {
    theme: {
      primaryColor: "#14ac5f",
      secondaryColor: "#143D59",
    },
    voice: { disabled: false },
    chatHistory: { storageKey: "playground" },
    botBubble: { simStream: true },
  };
  const genAI = new GoogleGenerativeAI(config.API_KEY);
  async function run(prompt, streamMessage) {
    // For text-only input, use the gemini-pro model
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });

    const result = await model.generateContentStream(prompt);
    let text = "";
    for await (const chunk of result.stream) {
      const chunkText = chunk.text();
      text += chunkText;
      streamMessage(text);
    }
    return text;
  }

  const flow = {
    start: {
      message: "Hello, I am GebreTsadik Medical Assistant now, How can I help!",
      path: "model_loop",
    },
    model_loop: {
      message: async (params) => {
        return await run(params.userInput, params.streamMessage);
      },
      path: "model_loop",
    },
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      message: "",
    },
    //  validate: registerdValidate,
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values, { resetForm }) => {
      let registerPromise = sendContactMessage(values);
      toast.promise(registerPromise, {
        loading: "sending...",
        success: "Message sent Successfully.",
        error: "could not sent ",
      });

      registerPromise.then(function () {
        // window.location.reload();
        // values.name = "";
        // values.email = "";
        // values.message = "";
        resetForm();
      });
    },
  });
  return (
    <div className="homeContainer">
      <Header />
      <div className="contactPageContainer">
        <div className="contactHeroContainer">
          <h1>CONTACT US</h1>
        </div>
        <div className="contacteOverlay"></div>
        <section className="contactTextFormContainer">
          <div className="contactGetInTouchContainer">
            <h1>GET IN TOUCH</h1>
            {/* <hr style={{ color: "#14ac5f", background: "#14ac5f" }} /> */}
            <div className="contactAddressContainer">
              <FontAwesomeIcon
                icon={faLocationDot}
                className="contactIcon"
                id="addressIcon"
              />
              <div className="contactinfo">
                <h3>Address</h3>
                <p>Bonga,Ethiopia</p>
              </div>
            </div>
            <div className="contactEmailContainer">
              <FontAwesomeIcon icon={faEnvelope} className="contactIcon" />
              <div className="contactinfo">
                <h3>Email</h3>
                <p>contact@gebretsadikshawogene</p>
                <p> gebretsadikshawogeneralhospi</p>
              </div>
            </div>
            <div className="contactTelContainer">
              <FontAwesomeIcon icon={faPhone} className="contactIcon" />
              <div className="contactinfo">
                <h3>Call Us</h3>
                <p>Mobile: +251 912 345 678 </p>
                <p> Whatsapp: +251 912 345 678 </p>
                <p> Telephone: +251 112 345 678</p>
              </div>
            </div>
          </div>
          <div className="contactFormContainer">
            <h1 style={{ textAlign: "center", marginBottom: "8px" }}>
              SEND US A MESSAGE
            </h1>
            <p style={{ textAlign: "center" }}>
              Have questions or want to collaborate? Reach out to us. We’re here
              to connect and assist!
            </p>
            <div>
              <form className="formContainer" onSubmit={formik.handleSubmit}>
                <Toaster position="top-center" reverseOrder={false}></Toaster>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="contactInput"
                  {...formik.getFieldProps("name")}
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="contactInput"
                  {...formik.getFieldProps("email")}
                />
                <textarea
                  type="email"
                  placeholder="Your Message"
                  className="contactInput"
                  style={{ resize: "none" }}
                  rows={5}
                  {...formik.getFieldProps("message")}
                />
                <button type="submit" className="formButton">
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </section>
        <section className="contactMapContainer">
          <iframe
            title="gebretsadik map"
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d4266.894365819723!2d36.2400287108875!3d7.275036892701761!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x17aebd40930482b1%3A0xffe5ba6432b82e6!2sBonga%20Gebre%20Tsadiq%20Shawo%20Memorial%20Hospital!5e1!3m2!1sen!2set!4v1712516931505!5m2!1sen!2set"
            style={{
              width: "90%",
              height: "60vh",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "auto",
            }}
            allowfullscreen=""
            loading="eager"
            referrerpolicy="no-referrer-when-downgrade"
            className="contactMapContent"
          ></iframe>
        </section>
        <ChatBot options={optionsChatbotify} flow={flow} />
      </div>
      <Footer />
    </div>
  );
}
