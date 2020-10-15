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
  legend.onAdd = function() {
    var div = L.DomUtil.create("div", "info legend"),
    mags = [10,20,30],
    labels = [];


    limits.forEach(function(mags, index) {
      labels.push("<li style=\"background-color: " + colors[index] + "\"></li>");
    });

    div.innerHTML += "<ul>" + labels.join("") + "</ul>";
    return div;
  };
 // Adding legend to the map
 legend.addTo(myMap);
