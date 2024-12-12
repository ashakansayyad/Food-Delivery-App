import React from "react";
import styles from "./Footer.module.css";
import app_logo from "../../assets/app_logo_footer.png";
import google_play_logo from "../../assets/google_play_store_logo.png";
import app_store_logo from "../../assets/app_store_logo.svg";
import facebook_icon from "../../assets/facebook_icon.svg";
import instagram_icon from "../../assets/Instagram_icon.svg";
import snapchat_icon from "../../assets/snapchat_icon.svg";
import ticktok_icon from "../../assets/ticktock_icon.svg";
function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.footer_top}>
        <div className={styles.footer_top_logoContainer}>
          <img src={app_logo} alt="logo" />
          <span>
            <img style={{cursor:"pointer"}} src={app_store_logo} alt="lg" />
            <img style={{cursor:"pointer"}} id={styles.google_play} src={google_play_logo} alt="lg" />
          </span>
          <p>
            Company # 490039-445, Registered with <br /> House of companies.
          </p>
        </div>
        <div className={styles.footer_top_emailContainer}>
          <h3>Get Exclusive Deals in your Inbox</h3>
          <span>
            <input type="email" placeholder="youremail@gmail.com" />
            <button>Subscribe</button>
          </span>
          <p>we wont spam, read our <u>email policy</u></p>
          <div className={styles.footer_top_emailContainer_icons_container}>
            <img style={{cursor:"pointer"}} src={facebook_icon} alt="ik" />
            <img style={{cursor:"pointer"}} src={instagram_icon} alt="ik" />
            <img style={{cursor:"pointer"}} src={ticktok_icon} alt="ik" />
            <img style={{cursor:"pointer"}} src={snapchat_icon} alt="ik" />
          </div>
        </div>
        <div className={styles.footer_top_otherLinksContainer}>
          <div className={styles.footer_top_otherLinksContainer_pages}>
            <h3>Legal Pages</h3>
            <p>Terms and conditions</p>
            <p>Privacy</p>
            <p>Cookies</p>
            <p>Modern Slavery Statement</p>
          </div>
          <div className={styles.footer_top_otherLinksContainer_links}>
            <h3>Important Links</h3>
            <p>Get help</p>
            <p>Add your restaurant</p>
            <p>Sign up to deliver</p>
            <p>Create a business account</p>
          </div>
        </div>
      </div>
      <div className={styles.footer_bottom}>
        <div className={styles.footer_bottom_left}>
          Order.uk Copyright 2024, All Rights Reserved.
        </div>
        <div className={styles.footer_bottom_right}>
         
            <p>Privacy Policy</p> <p>Terms</p> <p>Pricing</p>{" "}
            <p> Do not sell or share my personal information</p>{" "}
         
        </div>
      </div>
    </div>
  );
}

export default Footer;
