var APIKey = "at_zFadPeHQPpRngraDwbC49OEF34p1N";
var map = L.map('map');
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
}).addTo(map);




const form = document.getElementById("ipAddressForm");
const formInput = form.querySelector("input");

form.addEventListener ("submit", function (e) {
    e.preventDefault();
    if (formInput.value !== "") {
        document.querySelector(".form-section").classList.add("display-states");
        getData (formInput.value);
    }
});

function getData (input) {
    fetch (`https://geo.ipify.org/api/v2/country,city,vpn?apiKey=${APIKey}&ipAddress=${input}`).then((data) => data.json())
    .then((data) => {
        
        try {
            
            if (data) {
                fillContent(data);
                var popup = L.popup()
                .setLatLng([data.location.lat, data.location.lng])
                .setContent(`${input}`)
                .openOn(map);
                var marker = L.marker([data.location.lat, data.location.lng]).addTo(map);
                map.setView([data.location.lat, data.location.lng], 14)
            }
        }catch (e) {
            console.log(e.message);
        }

    }).catch ((e) => {
        console.log(e.message);
    }); 
}

function fillContent (data) {

    var ipAddress = document.querySelector("#IPAddressInfo h2");
    ipAddress.textContent = data.ip;

    var location = document.querySelector("#LocationString h2");
    location.textContent = `${data.location.city}, ${data.location.country} ${data.location.geonameId}`;

    var timezone = document.querySelector("#Timezone h2");
    timezone.textContent = `${data.location.timezone}`
    
    var isp = document.querySelector("#ISP h2");
    isp.textContent = `${data.isp}`;

}
