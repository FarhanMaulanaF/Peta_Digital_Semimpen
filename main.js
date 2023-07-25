var map = L.map("map");
map.setView([-7.46418, 110.36278], 17);
var OpenStreetMap = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {maxZoom: 19, attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a> | KKN UGM 2023',}).addTo(map);

// Track user location
navigator.geolocation.watchPosition(success, error);

// Initialize variables
let marker, circle, zoomed;

// Create custom icons
var userIcon = L.icon({
    iconUrl: "asset/userIcon.png", 
    shadowUrl: "asset/userIconShadow.png", 

    iconSize: [40, 40],
    shadowSize: [40, 40],
    shadowAnchor: [7, 20],
}),
houseIcon = L.icon({
    iconUrl: "asset/houseIcon.png",
    shadowUrl: "asset/houseShadow.png",

    iconSize: [40, 40],
    shadowSize: [40, 40],
    shadowAnchor: [7, 20],
});

function success(position) {
    // Get current latitude, longitude, accuracy 
    const latitude = position.coords.latitude;
    const longitude = position.coords.longitude;
    const accuracy = position.coords.accuracy;

    // Remove previous marker and circle
    if (marker) {
        map.removeLayer(marker);
        map.removeLayer(circle);
    }

    // Add marker and circle
    marker = L.marker([latitude, longitude], { icon: userIcon }).addTo(map).bindPopup("<p class='text-xl text-[#f00] font-bold'>Lokasi anda sekarang</p>");
    circle = L.circle([latitude, longitude], { radius: accuracy }).addTo(map);

    // Zoom map to fit marker and circle
    if (!zoomed) {
        zoomed = map.fitBounds(circle.getBounds());
    }

    // Set map view to current location
    map.setView([latitude, longitude]);
    // map.on("click", function (e) {
    //     console.log(e);
    //     var newMarker = L.marker([e.latlng.lat, e.latlng.lng]).addTo(map);
    //     L.Routing.control({
    //         waypoints: [
    //             L.latLng(latitude, longitude),
    //             L.latLng(e.latlng.lat, e.latlng.lng),
    //         ],
    //     })
    //     .on("routesfound", function (e) {
    //         var routes = e.routes;
    //         console.log(routes);
            
    //         e.routes[0].coordinates.forEach(function (coord, index) {
    //             setTimeout(function () {
    //                 marker.setLatLng([coord.lat, coord.lng]);
    //             }, 100 * index);
    //         });
    //     })
    //     .addTo(map);
    // });
}

function error(error) {
    // Handle geolocation error
    if (error.code === 1) {
        alert("Izinkan akses geolokasi!");
    } else {
        alert("Tidak bisa mendapatkan lokasi saat ini!");
    }
}

// Create layer group for custom markers (Posko and Kadus)
var posko = L.marker([-7.46425, 110.36299], { icon: houseIcon }).bindPopup("<p class='text-xl font-bold text-black'>Pos Keamanan</p> <img class='gambar-pos-keamanan' src='asset/belum ada foto.png'>");
var kadus = L.marker([-7.46416, 110.36342], { icon: houseIcon }).bindPopup("<p class='text-xl font-bold text-black'>Kepala Dusun</p> <img class='gambar-kepala-dusun' src='asset/belum ada foto.png'>");
var pejabatDaerah = L.layerGroup([posko, kadus]);

// Add layer control
var baseLayers = {
    "Peta Biasa" : OpenStreetMap,
};

var overlayLayers = {
    "Pejabat Daerah": pejabatDaerah,
};

L.control.layers(baseLayers, overlayLayers).addTo(map);

