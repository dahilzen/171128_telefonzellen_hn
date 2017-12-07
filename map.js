function setInitialZoom() {
    var viewportWidth = window.innerWidth;
    var initZoom;
    if (viewportWidth < [600]) {
        initZoom = 11;
    } else {
        initZoom = 12;
    }
    return initZoom;
};

function setInitialCenter() {
    var viewportWidth = window.innerWidth;
    var initCenter;
    if (viewportWidth < [600]) {
       initCenter = [49.1800738,9.1755168];
    } else {
        initCenter = [49.1507310, 9.1873570];
    }
    return initCenter;
};

function main() {

    console.log(window.innerWidth);

	// Kartenoptionen bestimmen
    var mapOptions = {
        center: setInitialCenter(),
        zoom: setInitialZoom(),
        zoomControl: false,
        attributionControl: true,
        legends: false
    };

    var map = L.map('map', mapOptions);
    var Esri_WorldGrayCanvas = L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/Canvas/World_Light_Gray_Base/MapServer/tile/{z}/{y}/{x}', {
        attribution: 'Tiles &copy; Esri',
    }).addTo(map);

    var phoneIcon = new L.Icon({
        iconSize: [24, 24],
        iconAnchor: [12, 12],
        popupAnchor: [0, -18],
        iconUrl: 'phone-icon.png'
    });

    // Marker hinzufügen
    var zellen2016 = L.geoJson(zellen, {
        filter: function(feature) {
            if (feature.properties.planung === '2016') return true
        },
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng, {
                icon: phoneIcon
            });
        },
    }).addTo(map);

    var zellen2017 = L.geoJson(zellen, {
        filter: function(feature) {
            if (feature.properties.planung === '2017') return true
        },
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng, {
                icon: phoneIcon
            });
        },
    }).addTo(map);

    var zellen2018 = L.geoJson(zellen, {
        filter: function(feature) {
            if (feature.properties.planung === '2018') return true
        },
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng, {
                icon: phoneIcon
            });
        },
    }).addTo(map);

    var zellenRest = L.geoJson(zellen, {
        filter: function(feature) {
            if (feature.properties.planung === '') return true
        },
        pointToLayer: function(feature, latlng) {
            return L.marker(latlng, {
                icon: phoneIcon
            });
        },
    }).addTo(map);


    function loop() {
        setTimeout(function() {
            map.removeLayer(zellen2016)
            document.getElementById("text").innerHTML = "<center><p><b>So hätte das Netz nach 2016 aussehen sollen.</b></p></center>";
        }, 4000);
        setTimeout(function() {
            map.removeLayer(zellen2017)
            document.getElementById("text").innerHTML = "<center><p><b>So nach 2017.</b></p></center>";
        }, 8000);
        setTimeout(function() {
            map.removeLayer(zellen2018)
            document.getElementById("text").innerHTML = "<center><p><b>So könnte es nach 2018 aussehen. Diese 21 Zellen sind die einzigen, die noch mehr als 50 Euro Umsatz generieren.</b></p></center>";
        }, 12000);
/*        setTimeout(function() {
            map.removeLayer(zellenRest)
            document.getElementById("text").innerHTML = "<center><p><b>Und so hoch ist der geschätzte Bedarf an Telefonzellen</b></p></center>";
        }, 8000);*/
        setTimeout(function() {
            zellen2016.addTo(map)
            zellen2017.addTo(map)
            zellen2018.addTo(map)
            zellenRest.addTo(map)
            document.getElementById("text").innerHTML = "<center><p><b>So sieht das Telefonzellennetz in Heilbronn derzeit aus.</b></p></center>";
        }, 20000)
    }

    loop();
    setInterval(loop, 20000)


    function disableMap() {
        map.dragging.disable();
        map.touchZoom.disable();
        map.doubleClickZoom.disable();
        map.scrollWheelZoom.disable();
        map.boxZoom.disable();
        map.keyboard.disable();
    }

    disableMap();


};

window.onload = main()
