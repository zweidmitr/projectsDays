const sounds = ['applause', 'boo', 'gasp', 'tada', 'victory', 'wrong']

sounds.forEach((sound) => {
  const btn = createButton(sound, 'buttons')
  findListener(btn, true)
})

const stopBTN = createButton('stop', 'stop')
findListener(stopBTN, false)

function createButton(btn, id) {
  const myBtn = document.createElement('button')
  myBtn.classList.add(id)
  myBtn.innerText = btn
  document.getElementById(id).appendChild(myBtn)
  return myBtn
}

function findListener(btn, play) {
  btn.addEventListener('click', () => {
    stopSongs()
    if (play) document.getElementById(btn.innerText).play()
  })
}

function stopSongs() {
  sounds.forEach((sound) => {
    const song = document.getElementById(sound)
    song.pause()
    song.currentTime = 0
  })
}
