import React from "react";
import styles from "./ServiceInfo.module.css";
import delevery_map_icon from "../../assets/delevery_map_icon.svg";
import contact_info_icon from "../../assets/contact_info_icon.svg";
import operational_info_icon from "../../assets/operational_clocks_icon.svg";

function ServiceInfo() {
  return (
    <div className={styles.serviceinfo}>
      <div className={styles.serviceinfo_deleveryContainer}>
        <div className={styles.sectionHeader}>
          <img src={delevery_map_icon} alt="Delivery icon" />
          <h2>Delivery information</h2>
        </div>
        <p>
          <b>Monday</b>: 12:00 AM–3:00 AM, 8:00 AM–3:00 AM
        </p>
        <p>
          <b>Tuesday</b>: 8:00 AM–3:00 AM
        </p>
        <p>
          <b>Wednesday</b>: 8:00 AM–3:00 AM
        </p>
        <p>
          <b>Thursday</b>: 8:00 AM–3:00 AM
        </p>
        <p>
          <b>Friday</b>: 8:00 AM–3:00 AM
        </p>
        <p>
          <b>Saturday</b>: 8:00 AM–3:00 AM
        </p>
        <p>
          <b>Sunday</b>: 8:00 AM–12:00 AM
        </p>
        <p>
          <b>Estimated time until delivery</b>: 20 min
        </p>
      </div>

      <div className={styles.serviceinfo_contactContainer}>
        <div className={styles.sectionHeader}>
          <img src={contact_info_icon} alt="Contact icon" />
          <h2>Contact information</h2>
        </div>
        <p> If you have allergies or other dietary </p>
        <p>restrictions, please contact the restaurant. The </p>
        <p>    restaurant will provide food-specific</p>
        <p>  information upon request.</p>

        <p><b>Phone number</b></p>
        <p id={styles.phone_number}>+934443-43</p>
        <p><b>Website</b></p>
        <p><a href="https://mcdindia.com/" target="_blank">http://mcdonalds.uk/</a></p>
      </div>

      <div className={styles.serviceinfo_timesContainer}>
        <div className={styles.sectionHeader}>
          <img src={operational_info_icon} alt="Contact icon" />
          <h2>Operational Times</h2>
        </div>
        <p><b>Monday</b>: 8:00 AM–3:00 AM</p>
        <p><b>Tuesday</b>: 8:00 AM–3:00 AM</p>
        <p><b>Wednesday</b>: 8:00 AM–3:00 AM</p>
        <p><b>Thursday</b>: 8:00 AM–3:00 AM</p>
        <p><b>Friday</b>: 8:00 AM–3:00 AM</p>
        <p><b>Saturday</b>: 8:00 AM–3:00 AM</p>
        <p><b>Sunday</b>: 8:00 AM–3:00 AM</p>
      </div>
    </div>
  );
}

export default ServiceInfo;
