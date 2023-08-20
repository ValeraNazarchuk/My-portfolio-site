const anchors = document.querySelectorAll('#anchor')
const navList = document.querySelector('.nav__list')
const burger = document.querySelector('.nav__burger')

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

    const overflowValue = burger.classList.contains('nav__burger--active')
      ? 'hidden'
      : 'auto'

    document.body.style.overflow = overflowValue
  })
}

burger.addEventListener('click', () => {
  burger.classList.toggle('nav__burger--active')
  navList.classList.toggle('nav__list--active')

  const overflowValue = burger.classList.contains('nav__burger--active')
    ? 'hidden'
    : 'auto'

  document.body.style.overflow = overflowValue
})

//-----------------Button_back-top------------
const back = document.querySelector('.back__top')

window.onscroll = () => {
  let scrolled = document.documentElement.scrollTop
  if (scrolled > 300) {
    back.classList.add('back__top-active')
  } else {
    back.classList.remove('back__top-active')
  }
}

//----------------Projects_*Slider*--------------------------

const projectBody = document.querySelector('.projects__body')
const projectLink = document.querySelectorAll('.projects__body-link')

const btnNext = document.querySelector('.projects-next')
const btnBack = document.querySelector('.projects-back')

let count = 0 // запоминає кількість кліків на кнопки
let width

// скільки слайдів буде на екрані
function sliderToShow(value) {
  if (value > 640) return 3

  if (value > 490) return 2
  else return 1
}

// функція для собитія 'resize'
function init() {
  const offsetWidth = document.querySelector('.projects__inner').offsetWidth
  // ширину projects__inner ділю на кількіість слайдів
  width = offsetWidth / sliderToShow(offsetWidth)

  // обща ширина для projects__body
  projectBody.style.width = width * projectLink.length + 'px'

  // для кожного елемента задаю ширину і остальні параменти
  projectLink.forEach((item) => {
    item.style.width = width + 'px'
    item.style.height = 'auto'
    item.style.margin = '0 auto'
  })
  rollSliders()
}

init()
window.addEventListener('resize', init)

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

// функція для вимірування довжини прокрутки
// задав для кнопок і для функції init щоб при зміні ширини projects__inner мінялись і ці параметри сразу же а не після перезагрузки сайту
function rollSliders() {
  projectBody.style.transform = `translate(-${count * width}px)`
}

// переключення кнопок *де працював*

const workBtn = document.querySelectorAll('.work__button')
const workItem = document.querySelectorAll('.work__list-item')

workBtn.forEach((button, index) => {
  button.addEventListener('click', () => {
    for (let i = 0; i < workBtn.length; i++) {
      workBtn[i].classList.remove('work__button-active')
      workItem[i].classList.remove('work__item--active')
    }
    button.classList.add('work__button-active')
    workItem[index].classList.add('work__item--active')
  })
})
