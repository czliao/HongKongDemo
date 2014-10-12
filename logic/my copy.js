var map;
mapboxgl.accessToken = 'pk.eyJ1IjoiY3psaWFvIiwiYSI6IlE0b0ZqaW8ifQ.ByvSnyFH0IzbRjGOe0re0A';
if (!mapboxgl.util.supported()) {
  alert('Your browser does not support Mapbox GL');
} else {
  mapboxgl.util.getJSON('https://www.mapbox.com/mapbox-gl-styles/styles/outdoors-v5.json', function (err, style) {
    if (err) throw err;

    // Set the global transition property in the stylesheet
    style.transition = {
      duration: 1000, // 1 second
      delay: 0
    };

    map = new mapboxgl.Map({
      container: 'map',
      style: style,
      center: [22.287, 114.173],
      zoom: 12,
      minZoom: 10,
    });

    // map.addControl(new mapboxgl.Navigation());
  });
}

function fly(destination, el) {
  var _latlng, _zoom;
  switch (destination) {
    case "MongKok":
      _latlng = [22.319, 114.169];
      _zoom = 18;
      break;
    case "Admiralty":
      _latlng = [22.281, 114.165];
      _zoom = 17;
      break;
    case "CausewayBay":
      _latlng = [22.28, 114.184];
      _zoom = 18;
      break;
    default:
      _latlng = [22.287, 114.173];
      _zoom = 12;
      break;
  }
  map.flyTo(_latlng, _zoom);
  if (map.style.classes.night) {
    map.style.removeClass('night');
  } else {
    map.style.addClass('night');
  }
}