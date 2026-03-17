---
layout: page
title: photography
permalink: /photography/
description: A collection of moments from my travels. 📷
nav: true
nav_order: 4
---

<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>

<style>
/* ── Map ── */
#travel-map {
  width: 100%;
  height: 480px;
  border-radius: 12px;
  border: 1px solid var(--global-divider-color, #e0e0e0);
  margin-bottom: 1.5rem;
  z-index: 1;
}

/* ── Custom marker pulse ── */
.marker-pin {
  width: 14px;
  height: 14px;
  border-radius: 50%;
  background: #1D6BE5;
  border: 2.5px solid #fff;
  box-shadow: 0 0 0 2px rgba(29,107,229,0.3), 0 2px 8px rgba(0,0,0,0.15);
  cursor: pointer;
  transition: transform 0.2s, box-shadow 0.2s;
}
.marker-pin:hover {
  transform: scale(1.4);
  box-shadow: 0 0 0 4px rgba(29,107,229,0.25), 0 4px 12px rgba(0,0,0,0.2);
}
.marker-pin.active {
  background: #e74c3c;
  box-shadow: 0 0 0 3px rgba(231,76,60,0.3), 0 2px 8px rgba(0,0,0,0.15);
}

/* ── Location label on map ── */
.location-label {
  font-size: 11px;
  font-weight: 600;
  color: #333;
  background: rgba(255,255,255,0.9);
  padding: 2px 6px;
  border-radius: 4px;
  white-space: nowrap;
  box-shadow: 0 1px 3px rgba(0,0,0,0.1);
  pointer-events: none;
}

/* ── Gallery section ── */
.gallery-section {
  opacity: 0;
  transform: translateY(20px);
  transition: opacity 0.4s ease, transform 0.4s ease;
}
.gallery-section.visible {
  opacity: 1;
  transform: translateY(0);
}
.gallery-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 1rem;
  padding-bottom: 0.5rem;
  border-bottom: 2px solid #1D6BE5;
}
.gallery-header h2 {
  margin: 0;
  font-size: 1.4rem;
}
.gallery-header .loc-badge {
  font-size: 0.75rem;
  background: #EBF2FD;
  color: #1D6BE5;
  padding: 2px 10px;
  border-radius: 20px;
  font-weight: 500;
}
.gallery-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 12px;
  margin-bottom: 2rem;
}
.gallery-grid img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  border-radius: 10px;
  cursor: pointer;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
  border: 1px solid var(--global-divider-color, #e0e0e0);
}
.gallery-grid img:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0,0,0,0.12);
}

/* ── Lightbox ── */
.photo-lightbox {
  display: none;
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.85);
  z-index: 9999;
  justify-content: center;
  align-items: center;
  cursor: zoom-out;
  backdrop-filter: blur(4px);
}
.photo-lightbox.open { display: flex; }
.photo-lightbox img {
  max-width: 90vw;
  max-height: 90vh;
  border-radius: 8px;
  box-shadow: 0 0 40px rgba(0,0,0,0.4);
}

/* ── Hint text ── */
.map-hint {
  text-align: center;
  color: #6B6B67;
  font-size: 0.85rem;
  margin-top: -0.5rem;
  margin-bottom: 1.5rem;
}

/* ── Stats bar ── */
.travel-stats {
  display: flex;
  gap: 24px;
  justify-content: center;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}
.travel-stats .stat {
  text-align: center;
}
.travel-stats .stat-num {
  font-size: 1.5rem;
  font-weight: 700;
  color: #1D6BE5;
}
.travel-stats .stat-label {
  font-size: 0.75rem;
  color: #6B6B67;
  text-transform: uppercase;
  letter-spacing: 0.5px;
}
</style>

<div class="travel-stats">
  <div class="stat">
    <div class="stat-num" id="stat-places">0</div>
    <div class="stat-label">Places</div>
  </div>
  <div class="stat">
    <div class="stat-num" id="stat-countries">0</div>
    <div class="stat-label">Countries</div>
  </div>
  <div class="stat">
    <div class="stat-num" id="stat-photos">0</div>
    <div class="stat-label">Photos</div>
  </div>
</div>

<div id="travel-map"></div>
<p class="map-hint">Click a pin on the map to view photos from that location</p>

<div id="gallery-container"></div>

<!-- Lightbox -->
<div class="photo-lightbox" id="lightbox">
  <img src="" alt="Full size photo" id="lightbox-img" />
</div>

<script>
document.addEventListener('DOMContentLoaded', function () {
  // ════════════════════════════════════════════════
  // 📍 TRAVEL DATA — Edit this to add your locations & photos!
  //
  // Each location needs:
  //   name:    Display name
  //   coords:  [latitude, longitude]
  //   country: Country name (for stats)
  //   date:    When you visited (optional)
  //   photos:  Array of image paths (relative to site root)
  //
  // To add a new location:
  //   1. Add your photos to assets/img/photography/<city>/
  //   2. Add an entry below
  // ════════════════════════════════════════════════
  var locations = [
    {
      name: 'Zürich',
      coords: [47.3769, 8.5417],
      country: 'Switzerland',
      date: '2024 — present',
      photos: [
        '{{ site.baseurl }}/assets/img/1.jpg',
        '{{ site.baseurl }}/assets/img/2.jpg',
        '{{ site.baseurl }}/assets/img/3.jpg',
      ]
    },
    {
      name: 'Lausanne',
      coords: [46.5197, 6.6323],
      country: 'Switzerland',
      date: '2024',
      photos: [
        '{{ site.baseurl }}/assets/img/4.jpg',
        '{{ site.baseurl }}/assets/img/5.jpg',
        '{{ site.baseurl }}/assets/img/6.jpg',
      ]
    },
    {
      name: 'Paris',
      coords: [48.8566, 2.3522],
      country: 'France',
      date: '2024',
      photos: [
        '{{ site.baseurl }}/assets/img/7.jpg',
        '{{ site.baseurl }}/assets/img/8.jpg',
      ]
    },
    {
      name: 'Interlaken',
      coords: [46.6863, 7.8632],
      country: 'Switzerland',
      date: '2024',
      photos: [
        '{{ site.baseurl }}/assets/img/9.jpg',
        '{{ site.baseurl }}/assets/img/10.jpg',
        '{{ site.baseurl }}/assets/img/11.jpg',
      ]
    },
    // ── Add more locations below ──
    // {
    //   name: 'Tokyo',
    //   coords: [35.6762, 139.6503],
    //   country: 'Japan',
    //   date: '2025',
    //   photos: [
    //     '{{ site.baseurl }}/assets/img/photography/tokyo/1.jpg',
    //   ]
    // },
  ];

  // ── Stats ──
  var countries = new Set(locations.map(function(l) { return l.country; }));
  var totalPhotos = locations.reduce(function(sum, l) { return sum + l.photos.length; }, 0);
  document.getElementById('stat-places').textContent = locations.length;
  document.getElementById('stat-countries').textContent = countries.size;
  document.getElementById('stat-photos').textContent = totalPhotos;

  // ── Map ──
  var map = L.map('travel-map', {
    scrollWheelZoom: false,
    zoomControl: true,
  }).setView([35, 10], 3);

  L.tileLayer('https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/">OSM</a> &copy; <a href="https://carto.com/">CARTO</a>',
    maxZoom: 19,
  }).addTo(map);

  var activeMarker = null;
  var markers = [];

  // ── Create markers ──
  locations.forEach(function (loc, idx) {
    var icon = L.divIcon({
      className: '',
      html: '<div class="marker-pin" data-idx="' + idx + '"></div>',
      iconSize: [14, 14],
      iconAnchor: [7, 7],
    });

    var marker = L.marker(loc.coords, { icon: icon }).addTo(map);

    // Label tooltip
    marker.bindTooltip(loc.name, {
      permanent: false,
      direction: 'top',
      offset: [0, -10],
      className: 'location-label',
    });

    marker.on('click', function () {
      // Deactivate previous
      if (activeMarker !== null) {
        var prevPin = document.querySelector('.marker-pin.active');
        if (prevPin) prevPin.classList.remove('active');
      }
      // Activate current
      var pin = marker.getElement().querySelector('.marker-pin');
      if (pin) pin.classList.add('active');
      activeMarker = idx;

      map.flyTo(loc.coords, 6, { duration: 0.8 });
      showGallery(loc);
    });

    markers.push(marker);
  });

  // Fit all markers
  if (markers.length > 0) {
    var group = L.featureGroup(markers);
    map.fitBounds(group.getBounds().pad(0.3));
  }

  // ── Gallery ──
  function showGallery(loc) {
    var container = document.getElementById('gallery-container');
    container.innerHTML = '';

    var section = document.createElement('div');
    section.className = 'gallery-section';

    var header = '<div class="gallery-header">' +
      '<h2>' + loc.name + '</h2>' +
      '<span class="loc-badge">' + loc.country + '</span>' +
      (loc.date ? '<span class="loc-badge">' + loc.date + '</span>' : '') +
      '</div>';

    var grid = '<div class="gallery-grid">';
    loc.photos.forEach(function (src) {
      grid += '<img src="' + src + '" alt="Photo from ' + loc.name + '" loading="lazy" onclick="openLightbox(this.src)" />';
    });
    grid += '</div>';

    section.innerHTML = header + grid;
    container.appendChild(section);

    // Trigger animation
    requestAnimationFrame(function () {
      section.classList.add('visible');
    });

    // Scroll to gallery
    container.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }

  // ── Lightbox ──
  window.openLightbox = function (src) {
    var lb = document.getElementById('lightbox');
    document.getElementById('lightbox-img').src = src;
    lb.classList.add('open');
  };

  document.getElementById('lightbox').addEventListener('click', function () {
    this.classList.remove('open');
  });

  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      document.getElementById('lightbox').classList.remove('open');
    }
  });
});
</script>
