
// Set variables for earthquake and tectonic plates lovations 

let quakeURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";
let techPlatesURL = "https://raw.githubusercontent.com/fraxen/tectonicplates/master/GeoJSON/PB2002_boundaries.json"

// Perform a GET request to the query URL/
d3.json(quakeURL).then(function (data) {
  // Once we get a response, send the data.features object to the createFeatures function.
  createFeatures(data.features);
});

// Set the eartchquake depth color
function setDepthColor(depth) {
    switch (true) {
        case depth > 90:
            return "red";
        case depth > 70:
            return "orangered";
        case depth > 50:
            return "orange";
        case depth > 30:
            return "gold";
        case depth > 10:
            return "yellow";
        default:
            return "lightgreen";
    }
}

function createFeatures(earthquakeData) {

  // Define a function that we want to run once for each feature in the features array.
  // Give each feature a popup that describes the place and time of the earthquake.
//   function onEachFeature(feature, layer) {
//       layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3><hr><p>Date: ${new Date(feature.properties.time)}</p>
//       <p>Magnitude: ${feature.properties.mag}</p><p>Depth: ${feature.geometry.coordinates[2]}</p>`);
//   }

  function onEachFeature(feature, layer) {
    layer.bindPopup(`<h3>Location: ${feature.properties.place}</h3><hr><p>Date: ${feature.properties.time}</p>
    <p>Magnitude: ${feature.properties.mag}</p><p>Depth: ${feature.geometry.coordinates[2]}</p>`);
}

  // Create a GeoJSON layer that contains the features array on the earthquakeData object.
  // Run the onEachFeature function once for each piece of data in the array.
  let earthquakes = L.geoJSON(earthquakeData, {
    onEachFeature: onEachFeature,
    
    pointToLayer: function(feature, latlng) {
        var marker = {
          radius: feature.properties.mag * 20000,
          fillColor: setDepthColor(feature.geometry.coordinates[2]),
          fillOpacity: 1,
          color: "black",
          weight: 1
        }
        return L.circle(latlng,marker);
      }
  });
  techPlates = new L.layerGroup();

    // Perform a GET request to the tectonicplatesURL
    d3.json(techPlatesURL).then(function (plateData) {     
          L.geoJSON(plateData, {
            color: "#ffbf00",
            weight: 2
        }).addTo(techPlates);
    });

  // Send our earthquakes layer to the createMap function/
  createMap(earthquakes);
}

function createMap(earthquakes) {

  // Create the base layers.
  let earthquakeBase = L.tileLayer('https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png', {
 	    attribution: '&copy; <a href="https://stadiamaps.com/">Stadia Maps</a>, &copy; <a href="https://openmaptiles.org/">OpenMapTiles</a> &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors'
  });

  let satellite = L.tileLayer("https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}", {
    attribution: "Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com">Mapbox</a>'

  });

  let topograph = L.tileLayer('https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png', {
    attribution: 'Map data: &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors, <a href="http://viewfinderpanoramas.org">SRTM</a> | Map style: &copy; <a href="https://opentopomap.org">OpenTopoMap</a> (<a href="https://creativecommons.org/licenses/by-sa/3.0/">CC-BY-SA</a>)'
  });

   // Create a baseMaps object.
  let baseMaps = {
    "Greyscale Map": earthquakeBase,
    "Satellite Map": satellite,
    "Topographic Map": topograph
  };

  // Create an overlay object to hold our overlay.
  let overlayMaps = {
    "Earthquakes": earthquakes,
    "Tectonic Plates": techPlates
  };

  // Create our map, giving it the streetmap and earthquakes layers to display on load.
  let myMap = L.map("map", {
    center: [52.245, -104.847],
    zoom: 4,
    layers: [earthquakeBase, earthquakes, techPlates]
  });


  // Create Legend
  
  
  // Create a layer control.
  // Pass it our baseMaps and overlayMaps.
  // Add the layer control to the map.
  L.control.layers(baseMaps, overlayMaps, {
    collapsed: false
  }).addTo(myMap);

}
