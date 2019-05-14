import React from 'react';
import Navigation from './LoggedoutNavigation';
import largePhone from '../image/phoneMokc.png';
import Line from '../image/Line.png';
import bio from '../image/Group 1.png';
import hobbies from '../image/Group 2.png';
import location from '../image/Group 3.png';
import messaging from '../image/pics.png';
import heart from '../image/heart.png';
import email from '../image/email.png';
import insta from '../image/insta.png';
import web from '../image/website.png';

import './MainPage.css';

const MainPage = () => {
  return (
    <div>
      <div className="MPcontainer">
        <Navigation />
        <section className="section1">
          <div className="s1LeftSide">
            <h1>
              Finaly an app that is aimed at taking the stigma out of being{' '}
              <span>positive</span>.
            </h1>
          </div>
          <div className="s1RightSide">
            <img src={largePhone} alt="phone" />
          </div>
          <div className="s1line">
            <img src={Line} alt="greenLine" />
          </div>
        </section>
        <section className="section2">
          <div className="s2Top">
            <h1>Matching</h1>
            <p>
              We want you to feel comfortable talking about your self that is
              why we get the uncomfortable stuff out of the way in the
              beginning!
            </p>
          </div>
          <div className="s2Middle">
            <div id="s2img1">
              <img src={bio} alt="profile pic" />
            </div>
            <div id="s2img2">
              <img id="I2" src={hobbies} alt="pictures" />
            </div>
            <div id="s2img3">
              <img src={location} alt="graph" />
            </div>
          </div>
          <div className="s2Line">
            <img src={Line} alt="line" />
          </div>
        </section>
        <section className="section3">
          <h1>In App Messaging</h1>
          <img src={messaging} alt="messaging" />
          <div className="s3Line">
            <img src={Line} alt="line" />
          </div>
        </section>
        <section className="section4">
          <h1>Your New Relationship Just A Few Swipes Away</h1>
          <div className="s4heart">
            <img src={heart} alt="heart" />
          </div>
          <footer>
            <a href="#">
              <img src={email} alt="letter" />
              <span id="footerText">Blush@UnBlush.com</span>
            </a>

            <a href="#">
              <img src={insta} alt="letter" />
              <span id="footerText">@UnBlush.com</span>
            </a>
            <a href="#">
              <img src={web} alt="letter" />
              <span id="footerText">@UnBlush.com</span>
            </a>
          </footer>
        </section>
      </div>
    </div>
  );
};

export default MainPage;
