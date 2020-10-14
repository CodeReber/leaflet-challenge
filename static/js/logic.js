// d3.json("https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_day.geojson").then((data) => {
//   //  Create the Traces
//   // data = object.assign(data1)
//   // var data = Object.assign({}, data1)

//   console.log(data)
// });

//Creating map object
var myMap = L.map("map-id", {
    center: [10,-40],
    zoom: 2
  });

  var baseURL = "https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_week.geojson";

//   // Adding tile layer to the map
L.tileLayer("https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token={accessToken}", {
    attribution: "© <a href='https://www.mapbox.com/about/maps/'>Mapbox</a> © <a href='http://www.openstreetmap.org/copyright'>OpenStreetMap</a> <strong><a href='https://www.mapbox.com/map-feedback/' target='_blank'>Improve this map</a></strong>",
    tileSize: 512,
    maxZoom: 18,
    zoomOffset: -1,
    id: "mapbox/streets-v11",
    accessToken: API_KEY
  }).addTo(myMap);

d3.json(baseURL, data => {
  data.features.forEach(data => {
    let mag = data.properties.mag;
    let place = data.properties.place;
    let lat = data.geometry.coordinates[1];
    let lng = data.geometry.coordinates[0];
    let depth = data.geometry.coordinates[2];
    
    function getColor(depth) {
      switch (true) {
        case depth > 40:
          return 'red';
          break;
        case depth > 20:
          return 'orange';
          break;
        case depth < 21:
          return 'green';
          break;
        default:
          return 'white';
      };
    };
    
    
    L.circle([lat,lng], {
      radius: mag * 30000,
      color: getColor(depth),
      fillOpacity: 1,
    }).addTo(myMap)
  });
});

  // Set up the legend
  var legend = L.control({ position: "bottomleft" });
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend");

    // Add min & max
    var legendInfo = "<h1>Median Income</h1>" +
      "<div class=\"labels\">" +
        "<div class=\"min\">test</div>" +
        "<div class=\"max\">test</div>" +
      "</div>";

    div.innerHTML = legendInfo;

    limits.forEach(function(limit, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };
 // Adding legend to the map
 legend.addTo(myMap);
//   // Grab the data with d3
// d3.json(baseURL, function(response) {

//     // Create a new marker cluster group
//     var markers = L.markerClusterGroup();
  
//     // Loop through data
//     for (var i = 0; i < response.length; i++) {
  
//       // Set the data location property to a variable
//       var location = response[i].location;
  
//       // Check for location property
//       if (location) {
  
//         // Add a new marker to the cluster group and bind a pop-up
//         markers.addLayer(L.marker([location.coordinates[1], location.coordinates[0]])
//           .bindPopup(response[i].descriptor));
//       }
  
//     }
  
//     // Add our marker cluster layer to the map
//     myMap.addLayer(markers);
  
//   })