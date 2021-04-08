// ELEMENTS START
const buttons = {
  shortBreak: document.getElementById('shortBreakBtn'),
  longBreak: document.getElementById('longBreakBtn'),
  kikan: document.getElementById('kikanBtn')
}
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
    this.onKikan = false
    this.onShortBreak = false
    this.onLongBreak = false
    if (type === 'longBreak') {
      this.onLongBreak = true
    } else if (type === 'shortBreak') {
      this.onShortBreak = true
    } else {
      this.onKikan = true
    }
    const minutosSegundos = time.split(':') // hacer un objeto que regrese minutos y horas ( @cyberpolin )
    var minutos = parseInt(minutosSegundos[0])
    var displayMinutos = null
    var segundos = parseInt(minutosSegundos[1])
    var displaySegundos = null
    this.intervalTimer = setInterval(() => {
      if (segundos === 0) {
        segundos = 59
      } else if (segundos > 0) {
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
        if (this.intervalTimer !== null) {
          clearInterval(this.intervalTimer)
          this.intervalTimer = null
        }
        if (this.onKikan) {
          this.kikanCounter = this.kikanCounter + 1
          if ((this.kikanCounter % 4) === 0) {
            if (window.getComputedStyle(arrowMobile).display === 'block') {
              changeButton(buttons['kikan'], buttons['longBreak'], 'show-mobile-button')
            }
            body.classList.add('break-time')
            logo.src = './img/kikan_logo_blue.svg'
            return this.onKikanChange('longBreak')
          } else {
            if (window.getComputedStyle(arrowMobile).display === 'block') {
              changeButton(buttons['kikan'], buttons['shortBreak'], 'show-mobile-button')
            }
            body.classList.add('break-time')
            logo.src = './img/kikan_logo_blue.svg'
            return this.onKikanChange('shortBreak')
          }
        }
        if (this.onShortBreak) {
          this.shortBreakKiKanCounter = this.shortBreakKiKanCounter + 1
          if (window.getComputedStyle(arrowMobile).display === 'block') {
            changeButton(buttons['shortBreak'], buttons['kikan'], 'show-mobile-button')
          }
          body.classList.remove('break-time')
          logo.src = './img/kikan-timer.svg'
          return this.onKikanChange('kikan')
        }
        if (this.onLongBreak) {
          this.longBreakKikanCounter = this.longBreakKikanCounter + 1
          if (window.getComputedStyle(arrowMobile).display === 'block') {
            changeButton(buttons['longBreak'], buttons['kikan'], 'show-mobile-button')
          }
          body.classList.remove('break-time')
          logo.src = './img/kikan-timer.svg'
          return this.onKikanChange('kikan')
        }
      }
    }, 1000)
  }

  kikanAlert (type, callback) {
    var setOnKikanChange = null
    var isActive = this.onKikan || this.onLongBreak || this.onShortBreak
    var isNotKikan = type !== 'kikan'
    var setLogo = isNotKikan ? './img/kikan_logo_blue.svg' : './img/kikan-timer.svg'
    if (type === 'shortBreak') {
      setOnKikanChange = this.onKikanChange('shortBreak')
    } else if (type === 'longBreak') {
      setOnKikanChange = this.onKikanChange('longBreak')
    } else {
      setOnKikanChange = this.onKikanChange('kikan')
    }
    if (isActive) {
      var message = 'El tiempo aun esta corriendo, estas seguro de querer interrumpirlo?'
      var accept = window.confirm(message)
      if (accept) {
        this.onReset()
      } else {
        return null
      }
    }
    if (callback) {
      callback()
      isNotKikan ? body.classList.add('break-time') : body.classList.remove('break-time')
      logo.src = setLogo
    }
    setOnKikanChange
  }

  pauseTimer () {
    if (kikan.intervalTimer !== null) {
      clearInterval(kikan.intervalTimer)
    }
    if (kikan.onLongBreak){
      kikan.onLongBreak = false
    } else if (kikan.onShortBreak) {
      kikan.onShortBreak = false
    } else {
      kikan.onKikan = false
    }
  }

  onReset () {
    if (kikan.timerSelected === 'longBreak') {
      this.onKikanChange('longBreak')
    } else if (kikan.timerSelected === 'shortBreak') {
      this.onKikanChange('shortBreak')
    } else {
      this.onKikanChange('kikan')
    }
    this.pauseTimer()
    playPauseButton.innerHTML = "<i class='fas fa-play'></i>"
    kikan.intervalTimer = null
  }
// this function change the currentTimer of the kikan based on the timerSelected
// and change the buttons color and restart the other ones
  onKikanChange (item) {
    if (item === 'shortBreak'){
      this.currentTimer = this.initialShortBreakTimer
    } else if (item === 'longBreak'){
      this.currentTimer = this.initialLongBreakTimer
    } else {
      this.currentTimer = this.initialKikanTimer
    }
    chronometer.innerText = this.currentTimer
    for (const [key] of Object.entries(buttons)) {
      buttons[key].classList.remove('yellow')
      buttons[key].classList.add('blue')
    }
    buttons[item].classList.remove('blue')
    buttons[item].classList.add('yellow')
    this.timerSelected = item
    playPauseButton.innerHTML = "<i class='fas fa-play'></i>"
  }

  onLeftChange () {
    if (this.timerSelected === 'kikan') {
      return this.kikanAlert('longBreak', function () {
        changeButton(buttons['kikan'], buttons['longBreak'], 'show-mobile-button')
      })
    } else if (this.timerSelected === 'shortBreak') {
      return this.kikanAlert('kikan', function () {
        changeButton(buttons['shortBreak'], buttons['kikan'], 'show-mobile-button')
      })
    } else if (this.timerSelected === 'longBreak') {
      return this.kikanAlert('shortBreak', function () {
        changeButton(buttons['longBreak'], buttons['shortBreak'], 'show-mobile-button')
      })
    }
  }

  onRightChange () {
    if (this.timerSelected === 'kikan') {
      return this.kikanAlert('longBreak', function () {
        changeButton(buttons['kikan'], buttons['shortBreak'], 'show-mobile-button')
      })
    } else if (this.timerSelected === 'shortBreak') {
      return this.kikanAlert('kikan', function () {
        changeButton(buttons['longBreak'], buttons['kikan'], 'show-mobile-button')
      })
    } else if (this.timerSelected === 'longBreak') {
      return this.kikanAlert('shortBreak', function () {
        changeButton(buttons['shortBreak'], buttons['longBreak'], 'show-mobile-button')
      })
    }
  }
}
playPauseButton.addEventListener('click', function () {
  if (kikan.onKikan || kikan.onShortBreak || kikan.onLongBreak) {
    kikan.pauseTimer()
    this.innerHTML = "<i class='fas fa-play'></i>"
  } else {
    kikan.startTimer(kikan.currentTimer, kikan.timerSelected)
    this.innerHTML = "<i class='fas fa-pause'></i>"
  }
})

resetButton.addEventListener('click', function () {
  kikan.onReset()
})

function changeButton (removeElement, addElement, className) {
  removeElement.classList.remove(className)
  addElement.classList.add(className)
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
    if (buttons['kikan'].classList.contains('yellow') === false) {
      buttons['kikan'].classList.add('yellow')
      buttons['kikan'].classList.remove('blue')
    }
    // this code add the currentTimer on the chronometer element when is kikan
    chronometer.innerText = kikan.currentTimer
  }
}

const kikan = new Kikan()
