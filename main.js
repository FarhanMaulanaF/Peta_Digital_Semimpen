var loader = document.querySelector(".loader");
function hideLoader() {
    loader.classList.add("disappear"); 
}

window.addEventListener("load", function () {
    setTimeout(hideLoader, 2000);
});

var map = L.map("map");
map.setView([-7.46418, 110.36278], 17);
var OpenStreetMap = L.tileLayer("https://tile.openstreetmap.org/{z}/{x}/{y}.png", {maxZoom: 19, attribution: '<a href="https://kkn.ugm.ac.id/"> KKN UGM 2023 </a>',}).addTo(map);

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
}),
buildingIcon = L.icon({
    iconUrl: "asset/buildingIcon.png",
    shadowUrl: "asset/buildingIconShadow.png",

    iconSize: [30, 30],
    shadowSize: [30, 30],
    shadowAnchor: [5, 15],
})
;

// Create popup
const popupKades = document.createElement('div');
const popupRT1 = document.createElement('div');
const popupPosKeamanan = document.createElement('div');

popupKades.innerHTML = `
<div class='grid justify-items-center text-center w-48'>
    <div>
        <p class='text-xl font-bold text-black font-Poppins'>Kepala Dusun</p> 
        <p class='text-base font-Poppins font-light'>"Bapak Suwoto"</p>
    </div>
    <div>
        <img class='gambar-kepala-dusun w-300 h-auto' src='asset/Rumah Kadus.png'>
    </div>
</div>
`;
popupRT1.innerHTML = `
<div class='grid justify-items-center text-center w-48'>
    <div>
        <p class='text-xl font-bold text-black font-Poppins'>Ketua RT 1</p> 
        <p class='text-base font-Poppins font-light'>"Bapak Sumad"</p>
    </div>
    <div>
        <img class='gambar-rt-01 w-300 h-auto' src='asset/Rumah RT 01.png'>
    </div>
</div>
`;
popupPosKeamanan.innerHTML = `
<div class='grid justify-items-center text-center w-48'>
    <div>
        <p class='text-xl font-bold text-black font-Poppins'>Pos Keamanan</p>
    </div>
    <div>
        <img class='gambar-pos-keamanan w- h-auto' src='asset/Pos Kamling.png'>
    </div>
</div>
`;

// Get current location
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
    marker = L.marker([latitude, longitude], { icon: userIcon }).addTo(map).bindPopup("<p class='text-xl text-black font-bold text-center font-Poppins'>Lokasi anda sekarang</p>");
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

// Create layer group for custom markers
var kadus = L.marker([-7.46416, 110.36342], { icon: houseIcon }).bindPopup(popupKades);
var rt1 = L.marker([-7.46429,110.36283], { icon: houseIcon }).bindPopup(popupRT1);
var posKeamanan = L.marker([-7.46425, 110.36299], { icon: buildingIcon }).bindPopup(popupPosKeamanan);

var pejabatDaerah = L.layerGroup([kadus, rt1]);
var fasilitasUmum = L.layerGroup([posKeamanan]);

// Add layer control
var baseLayers = {
    "Peta Biasa" : OpenStreetMap,
};

var overlayLayers = {
    "Fasilitas Umum": fasilitasUmum,
    "Pejabat Daerah": pejabatDaerah,
};

L.control.layers(baseLayers, overlayLayers).addTo(map);

