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