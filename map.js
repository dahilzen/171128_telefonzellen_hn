function setInitialZoom() {
    var viewportWidth = window.innerWidth;
    var initZoom;
    if (viewportWidth < [800]) {
        initZoom = 11;
    } else {
        initZoom = 12;
    }
    return initZoom;
};

function main() {

	// Kartenoptionen bestimmen
    var mapOptions = {
        center: [49.1507310, 9.1873570],
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
        }, 2000);
        setTimeout(function() {
            map.removeLayer(zellen2017)
            document.getElementById("text").innerHTML = "<center><p><b>So nach 2017</b></p></center>";
        }, 4000);
        setTimeout(function() {
            map.removeLayer(zellen2018)
            document.getElementById("text").innerHTML = "<center><p><b>So soll es nach 2018 aussehen</b></p></center>";
        }, 6000);
        setTimeout(function() {
            map.removeLayer(zellenRest)
            document.getElementById("text").innerHTML = "<center><p><b>Und so hoch ist der geschätzte Bedarf an Telefonzellen</b></p></center>";
        }, 8000);
        setTimeout(function() {
            zellen2016.addTo(map)
            zellen2017.addTo(map)
            zellen2018.addTo(map)
            zellenRest.addTo(map)
            document.getElementById("text").innerHTML = "<center><p><b>So sieht das Telefonzellennetz in Heilbronn derzeit aus</b></p></center>";
        }, 10000)
    }

    loop();
    setInterval(loop, 10000)


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
