const map = L.map('map').setView([40.4168, -3.7038], 5);
const totalDistanceElement = document.getElementById('totalDistance');
const pointsList = document.getElementById('pointsList');

let waypoints = [];  
let totalDistance = 0;  

L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors'
}).addTo(map);

function haversineDistance(coords1, coords2) {
    const toRad = (x) => x * Math.PI / 180;
    const R = 6371;

    const lat1_rad = toRad(coords1.lat);
    const lon1_rad = toRad(coords1.lon);
    const lat2_rad = toRad(coords2.lat);
    const lon2_rad = toRad(coords2.lon);

    const dLat = lat2_rad - lat1_rad;
    const dLon = lon2_rad - lon1_rad;

    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1_rad) * Math.cos(lat2_rad) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c; 
}

function reverseGeocode(lat, lon) {
    const url = `https://nominatim.openstreetmap.org/reverse?lat=${lat}&lon=${lon}&format=json&addressdetails=1`;

    fetch(url, {
        headers: {
            "User-Agent": "PlanificadorRuta/1.0 (tuemail@ejemplo.com)"
        }
    })
    .then(res => res.json())
    .then(data => {
        const address = data.address || {};
        const displayName = data.display_name || 'Dirección no disponible';
        
        const li = document.createElement('li');
        li.textContent = `${displayName} (${lat}, ${lon})`;
        pointsList.appendChild(li);
        const marker = L.marker([lat, lon]).addTo(map);
        marker.bindPopup(displayName);

        waypoints.push({ lat, lon });

        if (waypoints.length > 1) {
            const lastPoint = waypoints[waypoints.length - 2];
            const distance = haversineDistance(lastPoint, { lat, lon });
            totalDistance += distance;
        }

        totalDistanceElement.textContent = `${totalDistance.toFixed(2)} km`;
        const latLngs = waypoints.map(point => [point.lat, point.lon]);
        const polyline = L.polyline(latLngs, { color: 'blue' }).addTo(map);
        map.fitBounds(polyline.getBounds());
    })
    .catch(error => {
        console.error('Error al obtener la dirección:', error);
    });
}

document.getElementById('addPointBtn').addEventListener('click', () => {
    const lat = parseFloat(document.getElementById('lat').value);
    const lon = parseFloat(document.getElementById('lon').value);

    if (isNaN(lat) || isNaN(lon)) {
        alert('Por favor, ingresa coordenadas válidas.');
        return;
    }

    reverseGeocode(lat, lon);
});
