//! Side Bar

const bar = document.querySelector('.bar');
const sideload = document.querySelector('.nav-sideload')
const searchButton = document.querySelector('.mobileNav-search')
const header = document.querySelector('.mobileNav-header')
const host = document.querySelector('.host')

sideload.style.display = 'none'

bar.addEventListener('click', function() {
    if(sideload.style.display == 'none') {
        sideload.style.display = 'block'
        searchButton.style.display = 'none'
        header.style.display = 'none'
        host.style.display = 'none'
    } else {
        sideload.style.display = 'none'
        if(screen.width <= 650) {
            searchButton.style.display = 'block'
            header.style.display = 'block'
        } else {
            host.style.display = 'block'
        }
    }
})


//! Mobile Search

const mobileLabel = document.querySelector('.mobileNav-label')
const x = document.querySelector('.removeInput')


searchButton.addEventListener('click', function() {
    header.style.display = 'none'
    searchButton.style.display = 'none'
    bar.style.display = 'none'

    mobileLabel.style.display = 'flex'
})

x.addEventListener('click', function() {
    header.style.display = 'block'
    searchButton.style.display = 'block'
    bar.style.display = 'block'

    mobileLabel.style.display = 'none'
})