import React, { useEffect } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import styles from "./Map.module.css";

const Map = () => {
  useEffect(() => {
    
    const map = L.map("map").setView([51.5049375, -0.0816548], 15);

    
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(map);

    // Define a custom icon
    const customIcon = L.icon({
      iconUrl: "https://cdn-icons-png.flaticon.com/512/2991/2991148.png", // Replace with your custom icon URL
      iconSize: [35, 35], // Adjust icon size
      iconAnchor: [17, 35], // Anchor point for the icon
      popupAnchor: [0, -30], // Position of the popup relative to the icon
    });

    
    const marker = L.marker([51.5049375, -0.0816548], { icon: customIcon }).addTo(map);

    // Add a custom popup
    const popupContent = `
      <div style="font-family: Arial, sans-serif; color: black; background-color:white; padding: 10px; border-radius: 8px; width: 150px;">
            <h2>McDonald’s</h2>
            <p style="font-size:18px"> South London</p>
      </div>
    `;

    marker.bindPopup(popupContent).openPopup();
  }, []);

  return (
    <div className={styles.mapContainer}>
      <div id="map" className={styles.map}>


      </div>
    
    </div>
  );
};

export default Map;
