const { Map: GoogleMap } = await google.maps.importLibrary("maps");
const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

const mapCenterposition = { lat: 37.926654, lng: 23.734320 };
const buttonArea = document.querySelector('.button-section');

const coffeeIcon = document.createElement("div");
coffeeIcon.innerHTML = '<i class="fa-solid fa-mug-hot"></i>';

const drinkIcon = document.createElement("div");
drinkIcon.innerHTML = '<i class="fa-solid fa-martini-glass-citrus"></i>';

const foodIcon = document.createElement("div");
foodIcon.innerHTML = '<i class="fa-solid fa-pizza-slice"></i>';

(async function initMap() {
  const map = createMap();
  const markers = [
    { 
      "id": "coffee", 
      "position": { lat: 37.926654, lng: 23.734320 },
      "icon": coffeeIcon,
      "contentString": '<div id="content"><h1 id="coffeeHeading" class="coffeeHeading">Coffee</h1></div>',
      "label": "coffee"
    },
    { 
      "id": "food", 
      "position": { lat: 37.916654, lng: 23.734320 },
      "icon": foodIcon,
      "contentString": '<div id="content"><h1 id="foodHeading" class="foodHeading">Food</h1></div>',
      "label": "food",
    },
    { 
      "id": "drink", 
      "position": { lat: 37.936654, lng: 23.734320 },
      "icon": drinkIcon,
      "contentString": '<div id="content"><h1 id="drinkHeading" class="drinkHeading">Drink</h1></div>',
      "label": "drink",
    },
  ];

  markers.forEach((m) => {
    const pin = createPin(m.icon);
    const infoWindow = createInfoWindow(m.contentString, m.label)
    const marker = createMarker(map, m.position, pin)

    marker.addListener('click', ({domEvent, latLng}) => {
      infoWindow.open({
        anchor: marker,
        map,
      });
    });
  });

  function goToMarker(id) {   
      setTimeout(() => {
        const marker = markers.find(mark => mark.id === id)
        
        if (marker)
          map.panTo(marker.position);

      }, 500);
  }

  buttonArea.addEventListener("click", (event) => { 
    if(event.target && event.target.matches('button'))
      goToMarker(event.target.id)
  });

})();

function createMap() {
  return new GoogleMap(document.getElementById("map"), {
    zoom: 15,
    center: mapCenterposition,
    mapId: "d946fda9b123a241",
  });
}

function createPin(icon) {
  return new PinElement({
    glyph: icon,
    glyphColor: "#ffffff",
    scale: 2,
    background: "#a149ee",
    borderColor: "none",

  });
}

function createInfoWindow(contentString, label) {
  return new google.maps.InfoWindow({
    content: contentString,
    ariaLabel: label,
  });
}

function createMarker(map, markerPosition, pin) {
  return new AdvancedMarkerElement({
    map: map,
    position: markerPosition,
    content: pin.element,
    gmpClickable: true,
  });
}