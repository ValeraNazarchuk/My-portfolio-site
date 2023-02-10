const anchors = document.querySelectorAll('#anchor')
const navList = document.querySelector('.nav__list')
const burger = document.querySelector('.nav__burger')
const back = document.querySelector('.back__top')

for (let anchor of anchors) {
  anchor.addEventListener('click', function (e) {
    e.preventDefault()

    const attr = anchor.getAttribute('href').substr(1)

    document.getElementById(attr).scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    })
    navList.classList.remove('nav__list--active')
    burger.classList.remove('nav__burger--active')

    const overflowValue = burger.classList.contains('nav__burger--active') ? 'hidden' : 'auto'

    document.body.style.overflow = overflowValue
  })
}

burger.addEventListener('click', () => {
  burger.classList.toggle('nav__burger--active')
  navList.classList.toggle('nav__list--active')
  
  const overflowValue = burger.classList.contains('nav__burger--active') ? 'hidden' : 'auto'
  
  document.body.style.overflow = overflowValue
})

window.onscroll = () => {
  let scrolled = document.documentElement.scrollTop
  if (scrolled > 300) {
    back.classList.add('back__top-active')
  } else {
    back.classList.remove('back__top-active')
  }
}

//---------------------Projects_*Slider*-------------------------------

const projectBody = document.querySelector('.projects__body')
const projectLink = document.querySelectorAll('.projects__body-link')

const btnNext = document.querySelector('.projects-next')
const btnBack = document.querySelector('.projects-back')

let count = 0
let width

function sliderToShow(value) {
  if (value > 640) return 3

  if (value > 490) return 2
  else return 1
}

function inits() {
  const offsetWidth = document.querySelector('.projects__inner').offsetWidth
  width = offsetWidth / sliderToShow(offsetWidth)

  projectBody.style.width = width * projectLink.length + 'px'

  projectLink.forEach((item) => {
    item.style.width = width + 'px'
    item.style.height = 'auto'
    item.style.margin = '0 auto' // під вопросом
  })
  rollSliders()
}

inits()
window.addEventListener('resize', inits)

btnNext.addEventListener('click', () => {
  const offsetWidth = document.querySelector('.projects__inner').offsetWidth
  count++
  if (count > projectLink.length - sliderToShow(offsetWidth)) {
    count = 0
  }
  rollSliders()
})

btnBack.addEventListener('click', () => {
  count--
  if (count < 0) {
    const offsetWidth = document.querySelector('.projects__inner').offsetWidth
    count = projectLink.length - sliderToShow(offsetWidth)
  }
  rollSliders()
})

function rollSliders() {
  projectBody.style.transform = `translate(-${count * width}px)`
}