const boxes = document.querySelectorAll('.box')
window.addEventListener('scroll', checkBoxes)

checkBoxes()

function checkBoxes() {
  /* innerHeight - внутренняя высота окна в пикселях */
  const triggerBottom = (window.innerHeight / 5) * 4

  boxes.forEach((box) => {
    /* gBCR - информация о размере элемента и его положение относительно окна просмотра. top - расстояние между элементом и верхней гранью окна */
    const boxTop = box.getBoundingClientRect().top
    // console.log('triggerBottom ' + triggerBottom + ' boxTop: ' + boxTop)

    if (boxTop < triggerBottom) {
      box.classList.add('show')
    } else {
      box.classList.remove('show')
    }
  })
}
