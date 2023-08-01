var map = L.map("map");
map.setView([-7.46418, 110.36278], 17);
var OpenStreetMap = L.tileLayer(
  "https://tile.openstreetmap.org/{z}/{x}/{y}.png",
  {
    maxZoom: 19,
    attribution: '<a href="https://kkn.ugm.ac.id/"> KKN UGM 2023 </a>',
  }
).addTo(map);

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
  });

// Create popup
const popupKadus = document.createElement("div");
const popupRT1 = document.createElement("div");
const popupRT2 = document.createElement("div");
const popupRT3 = document.createElement("div");
const popupRT4 = document.createElement("div");
const popupPenasehat = document.createElement("div");
const popupPosKamling = document.createElement("div");

popupKadus.innerHTML = `
<div class='grid justify-items-center text-center w-48'>
    <div>
        <p class='text-xl font-bold text-black font-Poppins'>"Bapak Suwoto"</p> 
        <p class='text-base font-Poppins font-light'>Kepala Dusun</p>
    </div>
    <div>
        <img class='gambar-kepala-dusun w-300 h-auto' src='asset/Rumah Kadus.png'>
    </div>
</div>
`;
popupRT1.innerHTML = `
<div class='grid justify-items-center text-center w-48'>
    <div>
        <p class='text-xl font-bold text-black font-Poppins'>"Bapak Midi"</p> 
        <p class='text-base font-Poppins font-light'>Ketua RT 1</p>
    </div>
    <div>
        <img class='gambar-rt-1 w-300 h-auto' src='asset/belum ada foto.png'>
    </div>
</div>
`;
popupRT2.innerHTML = `
<div class='grid justify-items-center text-center w-48'>
    <div>
        <p class='text-xl font-bold text-black font-Poppins'>"Bapak Sumad"</p> 
        <p class='text-base font-Poppins font-light'>Ketua RT 2</p>
    </div>
    <div>
        <img class='gambar-rt-2 w-300 h-auto' src='asset/Rumah RT 02.png'>
    </div>
</div>
`;
popupRT3.innerHTML = `
<div class='grid justify-items-center text-center w-48'>
    <div>
        <p class='text-xl font-bold text-black font-Poppins'>"Bapak Sarojo"</p> 
        <p class='text-base font-Poppins font-light'>Ketua RT 3</p>
    </div>
    <div>
        <img class='gambar-rt-3 w-300 h-auto' src='asset/belum ada foto.png'>
    </div>
</div>
`;
popupRT4.innerHTML = `
<div class='grid justify-items-center text-center w-48'>
    <div>
        <p class='text-xl font-bold text-black font-Poppins'>"Bapak Dermo"</p> 
        <p class='text-base font-Poppins font-light'>Ketua RT 4</p>
    </div>
    <div>
        <img class='gambar-rt-4 w-300 h-auto' src='asset/belum ada foto.png'>
    </div>
</div>
`;
popupPenasehat.innerHTML = `
<div class='grid justify-items-center text-center w-48'>
    <div>
        <p class='text-xl font-bold text-black font-Poppins'>"Bapak Wardi"</p> 
        <p class='text-base font-Poppins font-light'>Penasehat Karang Taruna</p>
    </div>
    <div>
        <img class='gambar-penasehat-karang-taruna w-300 h-auto' src='asset/belum ada foto.png'>
    </div>
</div>
`;
popupPosKamling.innerHTML = `
<div class='grid justify-items-center text-center w-48'>
    <div>
        <p class='text-xl font-bold text-black font-Poppins'>Pos Kamling</p>
    </div>
    <div>
        <img class='gambar-pos-kamling w- h-auto' src='asset/Pos Kamling.png'>
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
  marker = L.marker([latitude, longitude], { icon: userIcon })
    .addTo(map)
    .bindPopup(
      "<p class='text-xl text-black font-bold text-center font-Poppins'>Lokasi anda sekarang</p>"
    );
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
var kadus = L.marker([-7.46416, 110.36342], { icon: houseIcon }).bindPopup(
  popupKadus
);
var rt1 = L.marker([-7.4645016, 110.3637053], { icon: houseIcon }).bindPopup(
  popupRT1
);
var rt2 = L.marker([-7.46429, 110.36283], { icon: houseIcon }).bindPopup(
  popupRT2
);
var rt3 = L.marker([-7.4635515, 110.3637231], { icon: houseIcon }).bindPopup(
  popupRT3
);
var rt4 = L.marker([-7.4633355, 110.3642056], { icon: houseIcon }).bindPopup(
  popupRT4
);
var posKamling = L.marker([-7.46425, 110.36299], {
  icon: buildingIcon,
}).bindPopup(popupPosKamling);
var penasehat = L.marker([-7.4646, 110.36318], { icon: houseIcon }).bindPopup(
  popupPenasehat
);

// mencoba embed image
var rumahWarga = "asset/petaSemimpenWeb.png";
var errorOverlayUrl = 'https://cdn-icons-png.flaticon.com/512/110/110686.png';
var altText = 'Peta Rumah Warga Dusun';
var latLngBounds = L.latLngBounds([[-7.46294,110.36513], [-7.46513,110.36173]]);

var imageOverlay = L.imageOverlay(rumahWarga, latLngBounds, {
    opacity: 0.8,
    errorOverlayUrl: errorOverlayUrl,
    alt: altText,
    interactive: true
});

var pejabatDaerah = L.layerGroup([kadus, rt1, rt2, rt3, rt4, penasehat]);
var fasilitasUmum = L.layerGroup([posKamling]);
var rumahWarga = L.layerGroup([imageOverlay]);

// Add layer control
var baseLayers = {
  "Peta Biasa": OpenStreetMap,
};

var overlayLayers = {
  "Fasilitas Umum": fasilitasUmum,
  "Pejabat Daerah": pejabatDaerah,
  "Rumah Warga" : rumahWarga,
};

L.control.layers(baseLayers, overlayLayers).addTo(map);
