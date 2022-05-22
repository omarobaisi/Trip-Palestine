//! Payment

document.querySelector('.moveToSubmit').addEventListener('click', function() {
    document.querySelector('.payment').style.display = 'flex'
    document.querySelector('.info').style.display = 'none'
})

//! Check

const directTButton = document.querySelector('.directTButton')
const check = document.querySelector('.fa-check')

directTButton.addEventListener('click', function() {
    if(this.previousElementSibling.checked === false) {
        this.previousElementSibling.checked = true
        this.classList.toggle('directClicked')
        check.classList.toggle('checkActivated')
    } else {
        this.previousElementSibling.checked = false
        this.classList.toggle('directClicked')
        check.classList.toggle('checkActivated')
    }
})