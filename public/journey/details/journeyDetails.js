const Slides = document.querySelectorAll('.slide');
let i = 1;
let length = Slides.length

// Make the first slide and buttom image as the active main
const activeSlide = document.querySelector(`#slide-${i}`);
activeSlide.classList.toggle('activeSlide')


if(document.querySelectorAll('.buttomImages').length != 0) {
    const activeButtomImg = document.querySelector(`#buttomImg-${i}`);
    activeButtomImg.classList.toggle('activeButtomImg')

    // Next slide on arrow click
    const Next = document.querySelector('.Next')
    Next.addEventListener('click', () => {
        next();
    })

    // Previous slide on arrow click
    const Prev = document.querySelector('.Prev')
    Prev.addEventListener('click', () => {
        prev();
    })

    // Next slide every 5 seconds
    setInterval(function() {
        next();
    }, 5000);

    // Previous slide
    const prev = () => {
        document.querySelector(`#slide-${i}`).classList.toggle('activeSlide')
        document.querySelector(`#buttomImg-${i}`).classList.toggle('activeButtomImg')
        if(i < length) {
            i += 1
        } else {
            i = 1
        }
        document.querySelector(`#slide-${i}`).classList.toggle('activeSlide')
        document.querySelector(`#buttomImg-${i}`).classList.toggle('activeButtomImg')
    }

    // Next slide
    const next = () => {
        document.querySelector(`#slide-${i}`).classList.toggle('activeSlide')
        document.querySelector(`#buttomImg-${i}`).classList.toggle('activeButtomImg')
        if(i > 1) {
            i -= 1
        } else {
            i = length
        }
        document.querySelector(`#slide-${i}`).classList.toggle('activeSlide')
        document.querySelector(`#buttomImg-${i}`).classList.toggle('activeButtomImg')
    }

    // Button images click

    const buttomImages = document.querySelectorAll('.buttomImgLi')

    buttomImages.forEach(image => {
        image.addEventListener('click', () => {
            document.querySelector(`#slide-${i}`).classList.toggle('activeSlide')
            document.querySelector(`#buttomImg-${i}`).classList.toggle('activeButtomImg')
            i = parseInt(image.id[10])
            document.querySelector(`#slide-${i}`).classList.toggle('activeSlide')
            document.querySelector(`#buttomImg-${i}`).classList.toggle('activeButtomImg')

        })
    })

}