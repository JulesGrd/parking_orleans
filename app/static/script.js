document.addEventListener('DOMContentLoaded', function() {

    var map = L.map('map').setView([47.8914, 1.9052], 13);

    var osmLayer = L.tileLayer('http://{s}.tile.osm.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19
    });

    map.addLayer(osmLayer);

    const url = "https://data.orleans-metropole.fr/api/records/1.0/search/?dataset=mobilite-places-disponibles-parkings-en-temps-reel&rows=100"

    const request = new Request(url);
    fetch(request)
        .then(response => {
            if (response.status === 200) {
                return response.json();
            } else {
                throw new Error('Something went wrong on api server!');
            }
        })

        .then(response => {
            console.debug(response.records);
            response.records.forEach(function(record) {
                console.log(record);
                var coo = record.geometry.coordinates.reverse();
                var dispo = record.fields.dispo;
                var total = record.fields.total;
                var name = record.fields.name;

                var className;

                if (dispo == 0) {
                    color = "red";
                } else if (dispo < 40) {
                    color = "orange";
                } else {
                    color = "green";
                }

                var icon = new L.Icon({
                    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-' + color + '.png',
                    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
                    iconSize: [25, 41],
                    iconAnchor: [12, 41],
                    popupAnchor: [1, -34],
                    shadowSize: [41, 41]
                });

                var marker = L.marker(coo, {
                    icon: icon,
                    title: name + " : " + dispo + " place(s) disponibles(s)"
                }).addTo(map);

                marker.bindPopup("<bold>" + name + "</bold><br> place(s) disponible(s) : " + dispo + " sur " + total);

            });
        })
}, false);