import React, { useEffect, useState } from "react";
import { useSpring, animated, to } from "@react-spring/web";
import { useGesture } from "react-use-gesture";
import useWindowSize from "./Windowsize";
import "./Murray.css";
import AOS from "aos";
import "aos/dist/aos.css";
import logo from "./images/Logo Icon.png";
import phones from "./images/Group 236(1).png";
import frame2 from "./images/Frame 2.png";
import frame1 from "./images/Frame 1.png";
import biglogo from "./images/biglogo.png";
import card from "./images/card.png";
import { GoogleSpreadsheet } from "google-spreadsheet";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { IoCheckmarkSharp } from "react-icons/io5";
import Loader from "react-loader-spinner";
import { Checkmark } from 'react-checkmark'
export default function Murray() {
  const [userEmail, setUserEmail] = useState({
    email1: "",
    email2: "",
  });
  const {width,height}=useWindowSize()
  const [isError, setIsError] = useState({
    error1: false,
    error2: false,
  });

  const [success, setSuccess] = useState({
    email1: false,
    email2: false,
  });

  const handleOnChange = (e) => {
    setUserEmail({ ...userEmail, [e.target.name]: e.target.value });
    setIsError({
      error1: false,
      error2: false,
    });
  };

  const [isLoading, setIsLoading] = useState({
    email1: false,
    email2: false,
  });

  const handleSubmit = (id) => {
    id === 1 ? setIsLoading({ ...isLoading, email1: true }) : setIsLoading({ ...isLoading, email2: true });
    const { email1, email2 } = userEmail;
    const selectedEmail = id === 1 ? email1 : email2;
    const emailReg = /.+@.+\.[A-Za-z]+$/;
    if (emailReg.test(selectedEmail)) {
      const newRow = { Email: selectedEmail };
      const result = appendSpreadsheet(newRow);
      if (result) {
        if (id === 1) {
          setIsLoading({ ...isLoading, email1: false });
          setIsError({ ...isError, error1: false });
          setSuccess({ ...success, email1: true });
        } else if (id === 2) {
          setIsLoading({ ...isLoading, email2: false });
          setIsError({ ...isError, error2: false });
          setSuccess({ ...success, email2: true });
        }
        setUserEmail({
          email1: "",
          email2: "",
        });
      }
    } else {
      if (id === 1) setIsError({ ...isError, error1: true });
      else if (id === 2) setIsError({ ...isError, error2: true });
      setIsLoading({
        email1: false,
        email2: false
      })
    }
  };

  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
    AOS.refresh();
  }, []);

  const SPREADSHEET_ID = "1HLHSROWvnBMGloCiCIyTM1vMY4rtCX6U3xwrvg7oUnw";
  const SHEET_ID = "1222723574";
  const CLIENT_EMAIL = "menuly@menuly-316510.iam.gserviceaccount.com";
  const PRIVATE_KEY =
    "-----BEGIN PRIVATE KEY-----\nMIIEvQIBADANBgkqhkiG9w0BAQEFAASCBKcwggSjAgEAAoIBAQCdQDMBhdaSZiiZ\nvjd3V5WyzopxYnumWO9NFSAm4rVECAV6qGMYOwjCVjHSgGfQxvstZ6X564zSXsce\nOxgneNfpX4y8KzRYMG1CnPLy8FiqCDSJWu5EVlvtPAIkh0xeU3Jkweq+BnWpeebi\nmBKGES+sXYkbG21T7gy+iam7ayqofMDzNPO8jsug8/EjuJt6lv43cgxmQVnjKLT3\nJCll2AXdHkozByItYnKTBeNb5pa68e8isZyD5+HiN9k0YAp6bFLzS7DeRyx74lyh\npk+CvUaT7TBl0xwU8pEPptwrcnKZJAGghEspq/jB97x5dJjHP7UKKdXMN+A4cvlC\nW37xqZ3fAgMBAAECggEAJuBo288FcfNMxVnIJ7qhGXBDvO1+qW0iWHnJFaQF8XhU\nNnNr8GEj9LvPnH2/bNfM4HhYCfYovhfNfZVZjuSq6JkFV74MtmLemFHqJJK0MPFP\nX8f50S5Sks+7reE/SbCyvuNMUEeTjl9DbDDxn3CfSytiyq9Ys5/OScsKCfpgNQAj\nlGq1tnODDSJ7XhIXnC4I01p9UYIYM6RbUnKTmj6nl/wUqRh75wWEhQyQkSHtg2iL\n6zokUP4KsRRxmTU/0tcnVw/GafSyH3uBYuzlsF2NzxuS222bjwBPtXK+1Ru1tbCF\n4R3kv2PHojkWQr11U0Y+9/h1Aj9sb9XnY5zRCMEBqQKBgQDJMFhYui69MRSxJsxH\nAYTCbwOVOHVw+ISWm07KcCSVayXIO7EzJfr1RjVywKWgovJV8ZyldwP4kMGgiibK\nUOB79+4YMwjjc2o6OiJoWLLLctAcOq8xTvBZl1UOIGi6DlG2EvBO8sJ69CYYaFPR\nOFpFP9nwLOLaPnlnb6GH3UwrmQKBgQDIF3NV8+QU13LakxxqHVuPtud/vBG8GJYu\n+8NTlil30E9ZqlcAD69KwznpQJvrdoFf65GWS/dbu3I+rKjESeOnS0O5ZSEBr2sT\n5qlY5Yc2KN+N1CdenhmO0wMv91Om70pJkWOz1IBLYM2YqXn0MImOP9N0zI2JgfPU\npizMJlZANwKBgB/yrGTSk+95JscG2TOBWzqg9Fmy0HtzC2L7IKTm7/hGPoawa/Aq\nXNKsJnqleueqWH8rUeu4nYnQOt8qcQR5mVw2P7naCNRNlJXQe3xEcYf7IG8LJpzW\n4zXm4RvQK7E36uPV2BFBXX623IHNt1mm8DbE7+/CwPdVKmQxht4TVzApAoGAL+/W\nVPBSY1/eh1kZRJ718a9bNPIEubCWQnlUqXDfTHIeoJe7sisPzvSIqkYtVLMWebmB\nLqXShCqbS0KoSCZ/oPPaLM96oeG54JGxXrfWtfYC4QLDz9pGuz34lIRHiUXo4Ukw\nvsOZXPW7K+jma8c5HVhTO7dJ7Xixxu9s6hgBL+8CgYEAi8m9TnUDE5sVaEIcsbqT\n6L/VFfB3LF9WnTL+8iPRR6mkM4qvj+6aOG3jdWbwMKEKZYi7g7zu1CnOpHtM4cW1\ntt4wOqnsRaMp8iOGG7JmPO5sfDF2XPyGJCbN1EB6R0jW7jrCOicir9PtO+UUEULO\ncYjSgH1Ek8r/TaZxoO5Z2G8=\n-----END PRIVATE KEY-----\n";

  const doc = new GoogleSpreadsheet(SPREADSHEET_ID);

  const appendSpreadsheet = async (row) => {
    try {
      await doc.useServiceAccountAuth({
        client_email: CLIENT_EMAIL,
        private_key: PRIVATE_KEY,
      });
      // loads document properties and worksheets
      await doc.loadInfo();

      const sheet = doc.sheetsById[SHEET_ID];
      const result = await sheet.addRow(row);
    } catch (e) {
      console.error("Error: ", e);
    }
  };

  return (
    <div>
      <div className="container-for-body">
        <header>
          <div className="for-background">
            <div className="container">
              <div className="header-class">
                <div className="logo">
                  <img src={logo} />
                  <h3>MENULY</h3>
                </div>
                <div className="button-early">
                  <a href={width > 1280 ? "#move" : "#input"}>
                    <button>Get Early Access</button>
                  </a>
                </div>
              </div>
            </div>
            <section>
              <div className="container">
                <div className={Murray.container}>
                  <div id="move" className="phones-aimation">
                    <div className="for-phones">
                      <img src={phones} />
                    </div>
                    <div id="input" className="padding-first">
                      <div className="meal-planning">
                        <h2>Meal planning made easy</h2>
                        <p>
                          Tired of coming up with meal ideas every week? Menuly solves the “What’s for dinner?” problem
                          for families with helpers in one easy-to-use app.
                        </p>
                        <h6 className={`${success.email1 || success.email2 ? "hide" : ""}`}>Register for early access before we launch</h6>
                      </div>
                      
                      <div  className={`${success.email1 || success.email2 ? "hide" : "email1"}`}>
                        <input
                          type="text"
                          className={`${isError.error1 ? "email__error" : "enter"}`}
                          placeholder="Enter email address"
                          name="email1"
                          value={userEmail.email1}
                          onChange={handleOnChange} 
                        />
                        <button disabled={success.email1 && true} onClick={() => handleSubmit(1)}>
                          {isLoading.email1 ? (
                            <Loader type="TailSpin" color="white" height={30} width={30} />
                          ) : success.email1 ? (
                            <IoCheckmarkSharp style={{ color: "white", fontSize: 22 }} />
                          ) : (
                            "Register"
                          )}
                        </button>
                      </div>
                      <div className={`${success.email1 || success.email2 ? "show" : "hide"}`}>
            <Checkmark color='#35c680' className="tick-mark" />
            <h3 className="regestering">Thank you for registering</h3>
            </div>
                      {/* {isError.error1 && <p className="email__error">Enter valid email!</p>} */}
                    </div>
                  </div>
                </div>
              </div>
            </section>
          </div>
        </header>
        <section>
          <div className="container">
            <div className="portion-div">
              <div data-aos={width > 1024 ? "fade-down" : "fade-left"} className="chicken">
                <img src={card} />
              </div>

              <div data-aos={width > 1024 ? "fade-down" : "fade-right"} className="discover">
                <h3>Discover new favourites every week</h3>
                <p>
                  Quickly swipe through weekly dish inspiration and simply ❤️ your fav’s, teaching Menuly what you love,
                  like and dislike.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <div data-aos={width > 1024 ? "fade-down" : "fade-left"} className="frame-div">
              <div>
                <img src={frame2} />
              </div>
              <div data-aos={width > 1024 ? "fade-down" : "fade-right"} className="meals">
                <h1>Make meal plans in an instant</h1>
                <p>
                  See the family favourites, drag & drop to create a weekly plan in seconds, then tap to share with your
                  family or helper.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <div className="frame-div2">
              <div data-aos={width > 1024 ? "fade-down" : "fade-left"}>
                <img src={frame1} />
              </div>

              <div data-aos={width > 1024 ? "fade-down" : "fade-right"} className="meals">
                <h1>Streamline dinner planning with your Helper</h1>
                <p>
                  Menuly keeps track of family favourites, matches with what your helper can make, generates a meal plan
                  and automatically creates a shopping list. Menuly makes dinner planning a breeze.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section className="carousel__container" style={{ position: "relative" }}>
          <div className="container">
          <Carousel
            // autoplay={true}
            // infiniteLoop
            showIndicators={true}
            showStatus={false}
            interval={100000000}
            // showThumbs={true}
          >
            <div className="contain">
              <h1>
                “Menuly makes it incredibly fast and easy to plan a week of meals!”
              </h1>
              <p>Stephanie - Beta user</p>
            </div>
            <div className="contain">
              <h1>
                “This app is a live-saver! Saves us hours every week.”
              </h1>
              <p>Cassandra - Beta user</p>
            </div>
            <div className="contain">
              <h1>
                “I no longer hear “What’s for dinner?” - it’s all in the app for the family to see!”
              </h1>
              <p>Ale - Beta user</p>
            </div>
          </Carousel>
          </div>
          {/* <div className="contain">
            <h1>
              “Menuly has changed my life and made meal planning a breeze in my
              household! I highly recommend this app to anyone.”
            </h1>
            <p>Aron A. - Beta user</p>
            <div className="ellipses">
              <img src={ellipse1} />
              <img src={ellipse2} />
              <img src={ellipse2} />
            </div>
          </div> */}
        </section>
        <section>
          <div className="last-div">
            <h1>Solve the “What's for dinner?” problem</h1>
            <p className={`${success.email2 || success.email1 ? "hide" :  ""}`}>Register below for early access</p>
            <div className={`${success.email2 || success.email1 ? "hide" : "email"}`}>
              <input
                type="text"
                className={`${isError.error2 ? "email__error" : "enter1"}`}
                placeholder="Enter email address"
                name="email2"
                value={userEmail.email2}
                onChange={handleOnChange}
              />
              <button disabled={success.email2 && true} onClick={() => handleSubmit(2)}>
                {isLoading.email2 ? (
                  <Loader type="TailSpin" color="white" height={30} width={30} />
                ) : success.email2 ? (
                  <IoCheckmarkSharp style={{ fontSize: 22, color: "white" }} />
                ) : (
                  "Register"
                )}
              </button>
            </div>
            <div className={`${success.email2 || success.email1 ? "show1" : "hide"}`}>
            <Checkmark color='#35c680' className="tick-mark" />
            <h3 className="regestering">Thank you for registering</h3>
            </div>
            
            {/* {isError.error2 && <p className="email__error">Enter valid email!</p>} */}
            <img src={biglogo} />
            <h2>MENULY</h2>
            <h5>Copyright © 2021 HYPR Digital Pte Ltd. All rights reserved.</h5>
          </div>
        </section>
      </div>
    </div>
  );
}
