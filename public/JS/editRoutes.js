let routesNum = document.querySelector("#routesNum").innerText;
routesNum = parseInt(routesNum)

let currNumber = document.querySelector("#routesNumber");
const routeNumOption = document.querySelectorAll(".routeNumOption");

currNumber.value = routesNum;

const Cities = document.querySelectorAll(".city");
const Locations = document.querySelectorAll(".location");

const changeRoutes = () => {
    for(var i=currNumber.value; i<routeNumOption.length; i++) {
        Cities.forEach((city) => {
            if( i == city.id ) {
                city.disabled = true;
                city.style.display = 'none';
            }
        });
        Locations.forEach((location) => {
            if( i == location.id ) {
                location.disabled = true;
                location.style.display = 'none';
            }
        });
    }

    for(var j=0; j<currNumber.value; j++) {
        Cities.forEach((city) => {
            if( j == city.id ) {
                city.disabled = false;
                city.style.display = 'inline';
            }
        });
        Locations.forEach((location) => {
            if( j == location.id ) {
                location.disabled = false;
                location.style.display = 'inline';
            }
        });
    }
}

changeRoutes();

currNumber.addEventListener('change', function() {
    currNumber.value = this.value;
    changeRoutes();
});