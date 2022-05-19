//! Textarea Expaned

function getScrollHeight(elm){
    var savedValue = elm.value
    elm.value = ''
    elm._baseScrollHeight = elm.scrollHeight
    elm.value = savedValue
  }
  
  function onExpandableTextareaInput({ target:elm }){
    // make sure the input event originated from a textarea and it's desired to be auto-expandable
    if( !elm.classList.contains('newDescription') || !elm.nodeName == 'TEXTAREA' ) return
    
    var minRows = elm.getAttribute('data-min-rows')|0, rows;
    !elm._baseScrollHeight && getScrollHeight(elm)
  
    elm.rows = minRows
    rows = Math.ceil((elm.scrollHeight - elm._baseScrollHeight) / 16)
    elm.rows = minRows + rows
  }
  
  
  // global delegated event listener
  document.addEventListener('input', onExpandableTextareaInput)

//! Routes Number

const Icons = document.querySelectorAll(".icon");
const Cities = document.querySelectorAll(".city");
const Locations = document.querySelectorAll(".location");

const disable = () => {
    Icons.forEach((city) => {
        city.disabled = true;
        city.style.display = 'none';
    });
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
        Icons.forEach((city) => {
            if( i == city.id ) {
                city.disabled = false;
                city.style.display = 'flex';
            }
        });
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

//! Placeholder

const formInput = document.querySelectorAll('.form-input');
const formPlaceholder = document.querySelectorAll('.form-placeholder');

formInput.forEach(input => {
    const placeholder = input.previousElementSibling;
    input.addEventListener('focusin', () => {
        placeholder.style.transform = 'translatey(-17px)';
        placeholder.style.fontSize = '15px';
    })
    input.addEventListener('focusout', () => {
        if(input.value === '') {
            placeholder.style.transform = 'translatey(0)';
            placeholder.style.fontSize = '20px';
        }
    })
})