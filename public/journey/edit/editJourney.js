//! 

let routesNum = document.querySelector("#routesNum").innerText;
routesNum = parseInt(routesNum)

let currNumber = document.querySelector("#routesSelect");
const routeNumOption = document.querySelectorAll(".routeNumOption");

currNumber.value = routesNum;

const hideAndShow = document.querySelectorAll(".hideAndShow");

const changeRoutes = () => {
    for(var i=currNumber.value; i<routeNumOption.length; i++) {
        hideAndShow.forEach(res => {
            if( i == res.id ) {
                res.disabled = true;
                res.style.display = 'none';
            }
        });
    }

    for(var j=0; j<currNumber.value; j++) {
        hideAndShow.forEach(res => {
            if( j == res.id ) {
                res.disabled = false;
                res.style.display = 'inline';
            }
        });
    }
}

changeRoutes();

currNumber.addEventListener('change', function() {
    currNumber.value = this.value;
    changeRoutes();
});

//! Select city value

const $select = document.querySelectorAll('.cityHasValue');

$select.forEach(select => {
    select.value = select.previousElementSibling.innerHTML
})

//! Images Preview

window.onload = function () {
    var fileUpload = document.getElementById("fileupload");
    fileUpload.onchange = function () {
        if (typeof (FileReader) != "undefined") {
            var dvPreview = document.getElementById("dvPreview");
            dvPreview.innerHTML = "";
            var regex = /^([a-zA-Z0-9\s_\\.\-:])+(.jpg|.jpeg|.gif|.png|.bmp)$/;
            for (var i = 0; i < fileUpload.files.length; i++) {
                var file = fileUpload.files[i];
                if (regex.test(file.name.toLowerCase())) {
                    var reader = new FileReader();
                    reader.onload = function (e) {
                        var img = document.createElement("IMG");
                        img.height = "100";
                        img.width = "100";
                        img.src = e.target.result;
                        dvPreview.appendChild(img);
                    }
                    reader.readAsDataURL(file);
                } else {
                    alert(file.name + " is not a valid image file.");
                    dvPreview.innerHTML = "";
                    return false;
                }
            }
        } else {
            alert("This browser does not support HTML5 FileReader.");
        }
    }
};

document.querySelector('.imageButton').addEventListener('click', () => {
    document.getElementById('fileupload').click()
})

//! Remove old images

const images = document.querySelectorAll('.oldimage')

images.forEach(image => {
    image.addEventListener('click', function() {
        if(this.nextElementSibling.checked === false) {
            this.nextElementSibling.checked = true
            this.previousElementSibling.style.display = 'block'
            this.classList.toggle('deleteImage')
        } else {
            this.nextElementSibling.checked = false
            this.previousElementSibling.style.display = 'none'
            this.classList.toggle('deleteImage')
        }
    })
})

//! Placeholder (Keep it in the end)

const formInput = document.querySelectorAll('.form-input');
const formPlaceholder = document.querySelectorAll('.form-placeholder');

formInput.forEach(input => {
    
    const placeholder = input.previousElementSibling;

    placeholder.style.transform = 'translatey(-17px)';
    placeholder.style.fontSize = '15px';

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

//! Textarea Expaned

// function getScrollHeight(elm){
//     var savedValue = elm.value
//     elm.value = ''
//     elm._baseScrollHeight = elm.scrollHeight
//     elm.value = savedValue
//   }
  
//   function onExpandableTextareaInput({ target:elm }){
//     // make sure the input event originated from a textarea and it's desired to be auto-expandable
//     if( !elm.classList.contains('editDescription') || !elm.nodeName == 'TEXTAREA' ) return
    
//     var minRows = elm.getAttribute('data-min-rows')|0, rows;
//     !elm._baseScrollHeight && getScrollHeight(elm)
  
//     elm.rows = minRows
//     rows = Math.ceil((elm.scrollHeight - elm._baseScrollHeight) / 16)
//     elm.rows = minRows + rows
//   }
  
  
//   // global delegated event listener
//   document.addEventListener('input', onExpandableTextareaInput)