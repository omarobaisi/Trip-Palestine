const Cities = document.querySelectorAll(".city");
const Locations = document.querySelectorAll(".location");

const disable = () => {
    Cities.forEach((city) => {
        city.disabled = true;
        city.style.display = 'none';
    });
    Locations.forEach((location) => {
        location.disabled = true;
        location.style.display = 'none';
    });
}

const a = () => {
    for(var i=0; i<routesNumber; i++) {
        Cities.forEach((city) => {
            if( i == city.id ) {
                city.disabled = false;
                city.style.display = 'inline';
            }
        });
        Locations.forEach((location) => {
            if( i == location.id ) {
                location.disabled = false;
                location.style.display = 'inline';
            }
        });
    }
}




const currNumber = document.querySelector("#routesNumber");
let routesNumber = currNumber.value;
disable();
a();

currNumber.addEventListener('change', function() {
    routesNumber = this.value
    disable();
    a();
})