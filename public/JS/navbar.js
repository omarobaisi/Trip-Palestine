//! Side Bar

const openNav = document.querySelector(".openNav")
const closeNav = document.querySelector(".closeNav")
const sideNav = document.querySelector(".sideNav")
const innerSideNav = document.querySelector(".innerSideNav")

openNav.addEventListener('click', () => {
  sideNav.style.width = "250px";
  closeNav.style.display = 'block'
  openNav.style.display = 'none'
  ShowNavText()
})

closeNav.addEventListener('click', () => {
  sideNav.style.width = "0px";
  openNav.style.display = 'block'
  closeNav.style.display = 'none'
  hideNavText()
})

const ShowNavText = () => {
  setTimeout(() => {
    innerSideNav.style.display = 'flex'
  }, 250)
}

const hideNavText = () => {
  setTimeout(() => {
    innerSideNav.style.display = 'none'
  }, 80)
}


//! Mobile Search

const mobileSearchButton = document.querySelector('.mobileSearchButton')
const hideMobileForm = document.querySelector('.hideMobileForm')
const mobileSearchForm = document.querySelector('.mobileSearchForm')
const mobileNavHeader = document.querySelector('.mobileNavHeader')

mobileSearchButton.addEventListener('click', () => {
  mobileSearchButton.style.display = 'none';
  mobileNavHeader.style.display = 'none';
  openNav.style.display = 'none';
  mobileSearchForm.style.display = 'flex';
})

hideMobileForm.addEventListener('click', () => {
  mobileSearchForm.style.display = 'none';
  mobileSearchButton.style.display = 'flex';
  mobileNavHeader.style.display = 'flex';
  openNav.style.display = 'flex';
})

//! User

let toggled = false

const navUserIcon = document.querySelector('.navUserIcon')
const navUserDropdown = document.querySelector('.navUserDropdown')
const body = document.querySelector('body')

navUserIcon.addEventListener('click', () => {
  if(toggled === true) {
    toggled = false
    navUserDropdown.style.display = 'none';
  } else if (toggled === false) {
    toggled = true
    navUserDropdown.style.display = 'block';
  }
})

// Click on the anything expect navUserIcon
document.addEventListener('click', function(e) {
  if ( !navUserIcon.contains(e.target) ) {
    toggled = false
    navUserDropdown.style.display = 'none';
  }
})