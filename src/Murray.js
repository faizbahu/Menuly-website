import React, { useEffect, useRef } from "react";
import { useSpring, animated, to } from "@react-spring/web";
import { useGesture } from "react-use-gesture";
import "./Murray.css";
import AOS from "aos";
import "aos/dist/aos.css";
import logo from "./images/Logo Icon.png";
import phones from "./images/Group 236(1).png";
import frame2 from "./images/Frame 2.png";
import frame1 from "./images/Frame 1.png";
import biglogo from "./images/biglogo.png";
import card from "./images/card.png";

import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";


export default function Murray() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
    });
    AOS.refresh();
  }, []);

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
                  <button>Get Early Access</button>
                </div>
              </div>
            </div>
            <section>
              <div className="container2">
                <div className={Murray.container}>
                  <div className="phones-aimation">
                    <div className="for-phones">
                      <img src={phones}/>
                    </div>
                    <div className="padding-first">
                      <div className="meal-planning">
                        <h2>Meal planning made easy</h2>
                        <p>
                          Tired of coming up with meal ideas every week? Menuly
                          solves the “What’s for dinner?” problem for families
                          with helpers in one easy-to-use app.
                        </p>
                        <h6>Register for early access before we launch</h6>
                      </div>
                      <div className="email1">
                        <input
                          type="text"
                          className="enter"
                          placeholder="Enter email address"
                        />
                        <button>Register</button>
                      </div>
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
              <div data-aos="fade-left" className="chicken">
                <img src={card} />
              </div>

              <div data-aos="fade-right" className="discover">
                <h3>Discover new favourites every week</h3>
                <p>
                  Quickly swipe through weekly dish inspiration and simply ❤️
                  your fav’s, teaching Menuly what you love, like and dislike.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <div data-aos="fade-right" className="frame-div">
              <div>
                <img src={frame2} />
              </div>
              <div data-aos="fade-left" className="meals">
                <h1>Make meal plans in an instant</h1>
                <p>
                  See the family favourites, drag & drop to create a weekly plan
                  in seconds, then tap to share with your family or helper.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section>
          <div className="container">
            <div className="frame-div2">
              <div data-aos="fade-left">
                <img src={frame1} />
              </div>

              <div data-aos="fade-right" className="meals">
                <h1>Streamline dinner planning with your Helper</h1>
                <p>
                  Menuly keeps track of family favourites, matches with what
                  your helper can make, generates a meal plan and automatically
                  creates a shopping list. Menuly makes dinner planning a
                  breeze.
                </p>
              </div>
            </div>
          </div>
        </section>
        <section style={{ position: "relative" }}>
          <Carousel
            autoplay={true}
            infiniteLoop
            showIndicators={true}
            showStatus={false}
            interval={1000}
            showThumbs={true}
          >
            <div className="contain">
              <h1>
                “Menuly has changed my life and made meal planning a breeze in
                my household! I highly recommend this app to anyone.”
              </h1>
              <p>Aron A. - Beta user</p>
            </div>
            <div className="contain">
              <h1>
                “Menuly has changed my life and made meal planning a breeze in
                my household! I highly recommend this app to anyone.”
              </h1>
              <p>Aron A. - Beta user</p>
            </div>
            <div className="contain">
              <h1>
                “Menuly has changed my life and made meal planning a breeze in
                my household! I highly recommend this app to anyone.”
              </h1>
              <p>Aron A. - Beta user</p>
            </div>
          </Carousel>

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
            <p>Register below for early access</p>
            <div className="email">
              <input
                type="text"
                className="enter1"
                placeholder="Enter email address"
              />
              <button>Register</button>
            </div>
            <img src={biglogo} />
            <h2>MENULY</h2>
            <h5>Copyright © 2021 HYPR Digital Pte Ltd. All rights reserved.</h5>
          </div>
        </section>
      </div>
    </div>
  );
}
