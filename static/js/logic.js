
// Set variables for earthquake and tectonic plates lovations 

let quakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
let techPlatesURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

// Perform a GET request to the query URL/
d3.json(quakeURL).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
});

// Set the eartchquake depth color
function setDepthColor(quakeDepth) {
    switch (true) {
        case quakeDepth > 90:
            return "#ff0000";
        case quakeDepth > 70:
            return "#ff8000";
        case quakeDepth > 50:
            return "#ffbf00";
        case quakeDepth > 30:
            return "#ffff00";
        case quakeDepth > 10:
            return "#bfff00";
        default:
            return "#00ff00";
    }
};

function setDepthRadius(feature, layer) {
    let circles = {
      radius: feature.properties.mag * 15000,
      fillColor: setDepthColor(feature.geometry.coordinates[2]),
      fillOpacity: 1,
      stroke: true,
      //color: "black",
      weight: 1
    }
    return L.circle(layer,circles);
  };


function createFeatures(earthquakeData) {

  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.

  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3><hr>
    <p><b>Magnitude</b>: ${feature.properties.mag}</p><p><b>Depth:</b> ${feature.geometry.coordinates[2]}</p>`);
}

  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  let earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    pointToLayer: setDepthRadius
   
  });

  //Add fault lines
  techPlates = new L.layerGroup();

  // Perform a GET request to the tectonicplatesURL
  d3.json(techPlatesURL).then(function (plateData) {     
    L.geoJSON(plateData, {
        color: "#ffff00",
        weight: 2
    }).addTo(techPlates);
  });

  // Send our earthquakes layer to the createMap function/
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Create the base layers.

  let earthquakeBase = L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
  });
  // let earthquakeBase = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
 	//     attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
  // });

  let imagery =  L.tileLayer('https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}', {
	attribution: 'Tiles &copy; Esri &mdash; Source: Esri, i-cubed, USDA, USGS, AEX, GeoEye, Getmapping, Aerogrid, IGN, IGP, UPR-EGP, and the GIS User Community'
  });

  let topograph = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

   // Create a baseMaps object.
  let baseMaps = {
    "Greyscale Map": earthquakeBase,
    "Imagery Map": imagery,
    "Topographic Map": topograph
  };

  // Create an overlay object to hold our overlay.
  let overlayMaps = {
    "Earthquakes": earthquakes,
    "Techtonic Plates": techPlates
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  let myMap = L.map("map", {
    center: [52.245, -104.847],
    zoom: 4,
    layers: [earthquakeBase, earthquakes, techPlates]
  });


  // Create Legend
 
  

  
  
// Create a legend to display information about our map.
   let info = L.control({
     position: "bottomright"
   });
  
   // When the layer control is added, insert a div with the class of "legend".
   info.onAdd = function() {
     let div = L.DomUtil.create("div", "legend");
     return div;
   };
   // Add the info legend to the map.
   info.addTo(myMap);

   var legend = L.control({position: 'bottomright'});

   legend.onAdd = function (map) {
  
    var div = L.DomUtil.create('div', 'info legend'),
        depth = [-10, 10, 30, 50, 70, 90],
        labels = [];

    // loop through our density intervals and generate a label with a colored square for each interval
    for (var i = 0; i < depth.length; i++) {
        div.innerHTML +=
            '<i style="background:' + setDepthColor(depth[i] + 1) + '"></i> ' +
            depth[i] + (depth[i + 1] ? ' &ndash; ' + depth[i + 1] + '<br>' : '+');
    }

    return div;
};

  legend.addTo(myMap);

  
  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

}
