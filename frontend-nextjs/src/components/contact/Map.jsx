'use client';

import {useEffect} from 'react';
import 'leaflet/dist/leaflet.css'; // Ensure this is applied

export default function Map() {
  useEffect(() => {
    // Check if window object is available
    if (typeof window !== 'undefined') {
      // Dynamically import Leaflet library
      const L = require('leaflet');

      // Set up map container
      document.getElementById('contact-map').innerHTML = "<div id='map' style='height: 345px'></div>";

      // Create a map instance with specified coordinates and zoom level
      var map = L.map('map').setView([40.7128, -74.006], 14); // New York coordinates

      // Add OpenStreetMap tile layer to the map
      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 18,
      }).addTo(map);

      // Add a marker to the map at specified coordinates
      L.marker([40.7128, -74.006], {
        // Customize marker icon
        icon: L.icon({
          popupAnchor: [12, 6],
          iconUrl: 'images/map/marker-icon.png',
          shadowUrl: 'images/map/marker-shadow.png',
        }),
      })
        // Bind a popup with custom text to the marker
        .addTo(map)
        .bindPopup('<b>Foshati</b>')
        .openPopup();
    }
  }, []);

  // Return the map container
  return <div id='contact-map' style={{height: '345px'}}></div>;
}
