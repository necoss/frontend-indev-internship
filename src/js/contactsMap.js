const mapContainer = document.getElementById('map')

const map = L.map(mapContainer).setView([48.8606111, 2.337644], 17);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
}).addTo(map);

const marker = L.marker([48.8606111, 2.337644]).addTo(map);