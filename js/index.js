// ELEMENTS START
const kikanButton = document.getElementById('kikanBtn')
const shortBreakButton = document.getElementById('shortBreakBtn')
const longBreakButton = document.getElementById('longBreakBtn')
const chronometer = document.getElementById('chronometer')
const playPauseButton = document.getElementById('playPause')
const resetButton = document.getElementById('reset')
const aside = document.getElementById('infoKikan')
const arrowButton = aside.children[2]
const arrowMobile = document.getElementById('mobile')
const body = document.getElementById('c-body')
const logo = document.getElementById('logo-kikan')

// ELEMENTS END
class Kikan {
  constructor () {
    this.initialKikanTimer = '00:15'
    this.initialShortBreakTimer = '00:05'
    this.initialLongBreakTimer = '00:10'
    this.onKikan = false
    this.onShortBreak = false
    this.onLongBreak = false
    this.currentTimer = this.initialKikanTimer
    this.intervalTimer = null
    this.kikanCounter = 0
    this.shortBreakKiKanCounter = 0
    this.longBreakKikanCounter = 0
    this.timerSelected = 'kikan' // kikan | longbrake | shortBrake
    this.startTimer = this.startTimer.bind(this)
  }
  startTimer (time, type) {
    console.log(this.intervalTimer,'intervaltimer 0 ',this)
    if (type === 'kikan') {
      this.onKikan = true
      this.onShortBreak = false
      this.onLongBreak = false
    }
    if (type === 'shortBreak') {
      this.onShortBreak = true
      this.onKikan = false
      this.onLongBreak = false
    }
    if (type === 'longBreak') {
      this.onLongBreak = true
      this.onKikan = false
      this.onShortBreak = false
    }
    const minutosSegundos = time.split(':') // hacer un objeto que regrese minutos y horas ( @cyberpolin )
    var minutos = parseInt(minutosSegundos[0])
    var displayMinutos = null
    var segundos = parseInt(minutosSegundos[1])
    var displaySegundos = null
    this.intervalTimer = setInterval(() => {
      if (segundos === 0) {
        segundos = 60
      }
      if (segundos > 0) {
        segundos = segundos - 1
      }
      if (minutos > 0 && segundos === 59) {
        minutos = minutos - 1
      }
      if (minutos < 10) {
        displayMinutos = '0' + minutos
      } else {
        displayMinutos = minutos
      }
      if (segundos < 10) {
        displaySegundos = '0' + segundos
      } else {
        displaySegundos = segundos
      }
      this.currentTimer = displayMinutos + ':' + displaySegundos
      chronometer.innerText = this.currentTimer
      if (minutos === 0 && segundos === 0) {
        console.log(this.intervalTimer, 'intervaltimer ', this)
        if (this.intervalTimer !== null) {
          clearInterval(this.intervalTimer)
          this.intervalTimer = null
        }
        if (this.onKikan) {
          this.kikanCounter = this.kikanCounter + 1
          console.log(this.kikanCounter, 'counter ')
          if ((this.kikanCounter % 4) === 0) {
            if (window.getComputedStyle(arrowMobile).display === 'block') {
              changeButton(kikanButton, longBreakButton, 'show-mobile-button')
            }
            return onLongBreakChange()
          } else {
            if (window.getComputedStyle(arrowMobile).display === 'block') {
              changeButton(kikanButton, shortBreakButton, 'show-mobile-button')
            }
            return onShortBreakChange()
          }
        }
        if (this.onShortBreak) {
          this.shortBreakKiKanCounter = this.shortBreakKiKanCounter + 1
          if (window.getComputedStyle(arrowMobile).display === 'block') {
            changeButton(shortBreakButton, kikanButton, 'show-mobile-button')
          }
          return onKikanChange()
        }
        if (this.onLongBreak) {
          this.longBreakKikanCounter = this.longBreakKikanCounter + 1
          if (window.getComputedStyle(arrowMobile).display === 'block') {
            changeButton(longBreakButton, kikanButton, 'show-mobile-button')
          }
          return onKikanChange()
        }
      }
    }, 1000)
  }

  kikanAlert (type, callback) {
    var comparisonStatus1 = null
    var comparisonStatus2 = null
    var setLogo = null
    var setOnKikanChange = null
    var isActive = kikan.onKikan || kikan.onLongBreak || kikan.onShortBreak
    switch (type) {
      case 'shortBreak':
        setLogo = './img/kikan_logo_blue.svg'
        setOnKikanChange = onShortBreakChange()
        break
      case 'longBreak':
        setLogo = './img/kikan_logo_blue.svg'
        setOnKikanChange = onLongBreakChange()
        break
      default:
        setLogo = './img/kikan-timer.svg'
        setOnKikanChange = onKikanChange()
        break
    }
    if (isActive) {
      var message = 'El tiempo aun esta corriendO, estas seguro de querer interrumpirlo?'
      var accept = window.confirm(message)
      if (accept) {
        onReset()
      } else {
        return null
      }
    }
    if (callback) {
      callback()
      body.classList.remove('break-time')
      logo.src = setLogo
    }
    setOnKikanChange()
  }
}
// this function change the currentTimer of the kikan based on the timerSelected
// and change the buttons color and restart the other ones
function onShortBreakChange () {
  kikan.currentTimer = kikan.initialShortBreakTimer
  chronometer.innerText = kikan.currentTimer
  if (kikan.timerSelected === 'kikan') {
    kikanButton.classList.remove('yellow')
    kikanButton.classList.add('blue')
  }
  if (kikan.timerSelected === 'longBreak') {
    longBreakButton.classList.remove('yellow')
    longBreakButton.classList.add('blue')
  }
  kikan.timerSelected = 'shortBreak'
  shortBreakButton.classList.remove('blue')
  shortBreakButton.classList.add('yellow')
  playPauseButton.innerHTML = "<i class='fas fa-play'></i>"
}
function onLongBreakChange () {
  console.log(kikan.initialLongBreakTimer)
  kikan.currentTimer = kikan.initialLongBreakTimer
  chronometer.innerText = kikan.currentTimer
  if (kikan.timerSelected === 'kikan') {
    kikanButton.classList.remove('yellow')
    kikanButton.classList.add('blue')
  }
  if (kikan.timerSelected === 'shortBreak') {
    shortBreakButton.classList.remove('yellow')
    shortBreakButton.classList.add('blue')
  }
  kikan.timerSelected = 'longBreak'
  longBreakButton.classList.remove('blue')
  longBreakButton.classList.add('yellow')
  playPauseButton.innerHTML = "<i class='fas fa-play'></i>"
}

function onKikanChange () {
  kikan.currentTimer = kikan.initialKikanTimer
  chronometer.innerText = kikan.currentTimer
  if (kikan.timerSelected === 'shortBreak') {
    shortBreakButton.classList.remove('yellow')
    shortBreakButton.classList.add('blue')
  }
  if (kikan.timerSelected === 'longBreak') {
    longBreakButton.classList.remove('yellow')
    longBreakButton.classList.add('blue')
  }
  kikan.timerSelected = 'kikan'
  kikanButton.classList.remove('blue')
  kikanButton.classList.add('yellow')
  playPauseButton.innerHTML = "<i class='fas fa-play'></i>"
}

function pauseTimer () {
  if (kikan.intervalTimer !== null) {
    clearInterval(kikan.intervalTimer)
  }
  if (kikan.onKikan) {
    kikan.onKikan = false
  }
  if (kikan.onShortBreak) {
    kikan.onShortBreak = false
  }
  if (kikan.onLongBreak) {
    kikan.onLongBreak = false
  }
}

function onReset () {
  if (kikan.timerSelected === 'kikan') {
    onKikanChange()
  }
  if (kikan.timerSelected === 'shortBreak') {
    onShortBreakChange()
  }
  if (kikan.timerSelected === 'longBreak') {
    onLongBreakChange()
  }
  pauseTimer()
  playPauseButton.innerHTML = "<i class='fas fa-play'></i>"
  kikan.intervalTimer = null
}

playPauseButton.addEventListener('click', function () {
  if (kikan.onKikan || kikan.onShortBreak || kikan.onLongBreak) {
    pauseTimer()
    this.innerHTML = "<i class='fas fa-play'></i>"
  } else {
    kikan.startTimer(kikan.currentTimer, kikan.timerSelected)
    this.innerHTML = "<i class='fas fa-pause'></i>"
  }
})

resetButton.addEventListener('click', function () {
  onReset()
})

function changeButton (removeElement, addElement, className) {
  removeElement.classList.remove(className)
  addElement.classList.add(className)
}

function onLeftChange () {
  if (kikan.timerSelected === 'kikan') {
    return kikan.kikanAlert(function () {
      changeButton(kikanButton, longBreakButton, 'show-mobile-button')
    }, 'longBreak')
  }
  if (kikan.timerSelected === 'shortBreak') {
    return kikan.kikanAlert(function () {
      changeButton(shortBreakButton, kikanButton, 'show-mobile-button')
    }, 'kikan')
  }
  if (kikan.timerSelected === 'longBreak') {
    return kikan.kikanAlert(function () {
      changeButton(longBreakButton, shortBreakButton, 'show-mobile-button')
    }, 'shortBreak')
  }
}

function onRightChange () {
  if (kikan.timerSelected === 'kikan') {
    return kikan.kikanAlert(function () {
      changeButton(kikanButton, shortBreakButton, 'show-mobile-button')
    }, 'shortBreak')
  }
  if (kikan.timerSelected === 'shortBreak') {
    return kikan.kikanAlert(function () {
      changeButton(shortBreakButton, longBreakButton, 'show-mobile-button')
    }, 'longBreak')
  }
  if (kikan.timerSelected === 'longBreak') {
    return kikan.kikanAlert(function () {
      changeButton(longBreakButton, kikanButton, 'show-mobile-button')
    }, 'kikan')
  }
}

function hideArticle () {
  aside.classList.toggle('trasition')
  aside.children[0].classList.toggle('displayNone')
  aside.children[1].classList.toggle('displayNone')
  if (arrowButton.innerHTML === '<i class="fas fa-chevron-right"></i>') {
    arrowButton.innerHTML = '<i class="fas fa-chevron-left"></i>'
  } else {
    arrowButton.innerHTML = '<i class="fas fa-chevron-right"></i>'
  }
}

window.onload = function () {
  // this code works to set the initial active button based on the timerSelected variable
  if (kikan.timerSelected === 'kikan') {
    if (kikanButton.classList.contains('yellow') === false) {
      kikanButton.classList.add('yellow')
      kikanButton.classList.remove('blue')
    }
    // this code add the currentTimer on the chronometer element when is kikan
    chronometer.innerText = kikan.currentTimer
  }
}

const kikan = new Kikan()
