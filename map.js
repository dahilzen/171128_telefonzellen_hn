// GeoJSON laden und main(geojson) aufrufen
getJson('./telefonzellen.geojson', main);

function main(geojson) {

    var map = L.map('map').setView([49.1507310,9.1873570], 13);

    var Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri &mdash; Esri, DeLorme, NAVTEQ | Icons: <a href="http://www.freepik.com" title="Freepik">Freepik</a> / <a href="https://www.flaticon.com/" title="Flaticon">www.flaticon.com</a>, Lizenz: <a href="http://creativecommons.org/licenses/by/3.0/" title="Creative Commons BY 3.0" target="_blank">CC 3.0 BY</a>',
        maxZoom: 14,
        minZoom: 12
    }).addTo(map);

    var phoneIcon = new L.Icon({
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -18],
        iconUrl: 'phone-box.png'
    });

    // Marker hinzufügen
    L.geoJson(geojson, {
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng, {
                // Eigenes Icon verwenden
                icon: phoneIcon
            });
        },
        // Maus-Events definieren
        // onEachFeature: function (feature, layer) {
        //   // Popup öffnen, welches die OSM-ID anzeigt
        //   layer.bindPopup(feature.properties['@id']);
        // }
    }).addTo(map);
};


// Generische Funktion um externe JSON-Dateien zu laden
function getJson(path, callback) {
    var httpRequest = new XMLHttpRequest();
    httpRequest.overrideMimeType('application/json');
    httpRequest.onreadystatechange = function() {
        if (httpRequest.readyState === 4) {
            if (httpRequest.status === 200) {
                if (callback) callback(JSON.parse(httpRequest.responseText));
            }
        }
    };
    httpRequest.open('GET', path);
    httpRequest.send();
}