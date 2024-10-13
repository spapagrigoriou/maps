const { Map: GoogleMap } = await google.maps.importLibrary("maps");
const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker");

const mapCenterposition = { lat: 38.756902303061175, lng: 22.85970286675081 };

const coffeeIcon = document.createElement("div");
coffeeIcon.innerHTML = '<i class="fa-solid fa-mug-hot"></i>';

const drinkIcon = document.createElement("div");
drinkIcon.innerHTML = '<i class="fa-solid fa-martini-glass-citrus"></i>';

const foodIcon = document.createElement("div");
foodIcon.innerHTML = '<i class="fa-solid fa-pizza-slice"></i>';

//fix this
const koodIcon = document.createElement("div");
koodIcon.innerHTML = '<i class="fa-solid fa-pizza-slice"></i>';

const aside = document.querySelector("aside");

const markers = [
  { 
    "id": "paralos", 
    "position": { lat: 38.75600309475122, lng: 22.860685229025847 }, 
    "icon": coffeeIcon,
    "contentString": '<div id="content"><h1 id="coffeeHeading" class="coffeeHeading">Coffee</h1></div>',
    "label": "coffee"
  },
  { 
    "id": "kapogiannhs", 
    "position": { lat: 38.756902303061175, lng: 22.85970286675081 }, 
    "icon": foodIcon,
    "contentString": '<div id="content"><h1 id="foodHeading" class="foodHeading">Food</h1></div>',
    "label": "food",
  },
  { 
    "id": "kalamos", 
    "position": { lat: 38.77532203008254, lng: 22.897170012683077 }, 
    "icon": drinkIcon,
    "contentString": '<div id="content"><h1 id="drinkHeading" class="drinkHeading">Drink</h1></div>',
    "label": "drink",
  },
  { 
    "id": "asteriou", 
    "position": { lat: 38.75930110222655,lng: 22.858179489810745 }, 
    "icon": koodIcon,
    "contentString": '<div id="content"><h1 id="drinkHeading" class="drinkHeading">Drink</h1></div>',
    "label": "drink",
  },
];

let map;

(async function initMap() {
  map = createMap();
  

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
    scale: 1.5,
    background: "#000",
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

function goToMarker(id) {   
  setTimeout(() => {
    const marker = markers.find(mark => mark.id === id)
    
    if (marker)
      map.panTo(marker.position);

  }, 500);
}

aside.addEventListener("click", (event) => {

  if (event.target.matches("li")) {
    goToMarker(event.target.id)
    return;
  }
  
  const category = event.target.closest(".category")
  
  if (!category)
    return
  
  const categoryList = category.querySelector(".category-list")
  
  toggle(categoryList)
});

function toggle(element) {
  element.classList.toggle("show");
}