var initialKikanTimer = '00:15'
var initialShortBreakTimer = '00:10'
var initialLongBreakTimer = '00:11'
var onKikan = false
var onShortBreak = false
var onLongBreak = false
var currentTimer = initialKikanTimer
var intervalTimer = null
var kikanCounter = 0
var shortBreakKiKanCounter = 0
var longBreakKikanCounter = 0
var timerSelected = 'kikan' // kikan | longbrake | shortBrake 
var isMobile = false

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

// this function change the currentTimer of the kikan based on the timerSelected
// and change the buttons color and restart the other ones
console.log(window.getComputedStyle(arrowMobile).display)
function onShortBreakChange () {
  currentTimer = initialShortBreakTimer
  chronometer.innerText = currentTimer
  if (timerSelected === 'kikan') {
    kikanButton.classList.remove('yellow')
    kikanButton.classList.add('blue')

  }
  if (timerSelected === 'longBreak') {
    longBreakButton.classList.remove('yellow')
    longBreakButton.classList.add('blue')
  }
  timerSelected = 'shortBreak'
  shortBreakButton.classList.remove('blue')
  shortBreakButton.classList.add('yellow')
  playPauseButton.innerHTML = "<i class='fas fa-play'></i>"

}
function onLongBreakChange () {
  console.log(initialLongBreakTimer)
  currentTimer = initialLongBreakTimer
  chronometer.innerText = currentTimer
  if (timerSelected === 'kikan') {
    kikanButton.classList.remove('yellow')
    kikanButton.classList.add('blue')
  }
  if (timerSelected === 'shortBreak') {
    shortBreakButton.classList.remove('yellow')
    shortBreakButton.classList.add('blue')
  }
  timerSelected = 'longBreak'
  longBreakButton.classList.remove('blue')
  longBreakButton.classList.add('yellow')
  playPauseButton.innerHTML = "<i class='fas fa-play'></i>"
}

function onKikanChange() {
  currentTimer = initialKikanTimer
  chronometer.innerText = currentTimer
  if (timerSelected === 'shortBreak') {
    shortBreakButton.classList.remove('yellow')
    shortBreakButton.classList.add('blue')
  }
  if (timerSelected === 'longBreak') {
    longBreakButton.classList.remove('yellow')
    longBreakButton.classList.add('blue')
  }
  timerSelected = 'kikan'
  kikanButton.classList.remove('blue')
  kikanButton.classList.add('yellow')
  playPauseButton.innerHTML = "<i class='fas fa-play'></i>"
}

function kikanAlert (callback) {
  if (onShortBreak || onLongBreak) {
    var accept = confirm('El tiempo aun esta corriendo, estas seguro de querer interrumpirlo?')
    if (accept) {
      onReset()
    } else {
      return null
    }
  }
  if (callback) {
    callback()
    body.classList.remove('break-time')
    logo.src = './img/kikan-timer.svg'
  }
  onKikanChange()
}
function shortBreakAlert (callback) {
    if (onKikan|| onLongBreak) {
    var accept = confirm('El tiempo aun esta corriendo, estas seguro de querer interrumpirlo?')
    if (accept) {
      onReset()
    }else {
      return null
    }
  }
  if (callback) {
    callback()
    body.classList.add('break-time')
    logo.src = './img/kikan_logo_blue.svg'
  }
  onShortBreakChange()
}
function longBreakAlert (callback) {
  if (onKikan || onShortBreak) {
    var accept = window.confirm('El tiempo aun esta corriendo, estas seguro de querer interrumpirlo?')
    if (accept) {
      onReset()
    } else {
      return null
    }
  }
  if (callback) {
    callback()
    body.classList.add('break-time')
    logo.src = './img/kikan_logo_blue.svg'
  }
  onLongBreakChange()
}

function startTimer (time, type) {
  if (type === 'kikan') {
    onKikan = true
    onShortBreak = false
    onLongBreak = false
  }
  if (type === 'shortBreak') {
    onShortBreak = true
    onKikan = false
    onLongBreak = false
  }
  if (type === 'longBreak') {
    onLongBreak = true
    onKikan = false
    onShortBreak = false
  }
  const minutosSegundos = time.split(':')  // hacer un objeto que regrese minutos y horas ( @cyberpolin )
  var minutos = parseInt(minutosSegundos[0])
  var displayMinutos = null
  var segundos = parseInt(minutosSegundos[1])
  var displaySegundos = null
  intervalTimer = setInterval(function () {
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
    currentTimer = displayMinutos + ':' + displaySegundos
    chronometer.innerText = currentTimer
    if (minutos === 0 && segundos === 0) {
      if (intervalTimer !== null) {
        clearInterval(intervalTimer)
        intervalTimer = null
      }
      if (onKikan) {
        kikanCounter = kikanCounter + 1
        if ((kikanCounter % 4) === 0) {
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
      if (onShortBreak) {
        shortBreakKiKanCounter = shortBreakKiKanCounter + 1
        if (window.getComputedStyle(arrowMobile).display === 'block') {
          changeButton(shortBreakButton, kikanButton, 'show-mobile-button')
        }
        return onKikanChange()
      }
      if (onLongBreak) {
        longBreakKikanCounter = longBreakKikanCounter + 1
        if (window.getComputedStyle(arrowMobile).display === 'block') {
          changeButton(longBreakButton, kikanButton, 'show-mobile-button')
        }
        return onKikanChange()
      }
    }
  }, 1000)
}

function pauseTimer () {
  if (intervalTimer !== null) {
    clearInterval(intervalTimer)
  }
  if (onKikan) {
    onKikan = false
  }
  if (onShortBreak) {
    onShortBreak = false
  }
  if (onLongBreak) {
    onLongBreak = false
  }
}

function onReset () {
  if (timerSelected === 'kikan') {
    onKikanChange()
  }
  if (timerSelected === 'shortBreak') {
    onShortBreakChange()
  }
  if (timerSelected === 'longBreak') {
    onLongBreakChange()
  }
  pauseTimer()
  playPauseButton.innerHTML = "<i class='fas fa-play'></i>"
  intervalTimer = null
}

playPauseButton.addEventListener('click', function () {
  if (onKikan || onShortBreak || onLongBreak) {
    pauseTimer()
    this.innerHTML = "<i class='fas fa-play'></i>" 
  } else {
    startTimer(currentTimer, timerSelected)
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
  if (timerSelected === 'kikan') {
    return longBreakAlert(function () {
      changeButton(kikanButton, longBreakButton, 'show-mobile-button')
    })
  }
  if (timerSelected === 'shortBreak') {
    return kikanAlert(function () {
      changeButton(shortBreakButton, kikanButton, 'show-mobile-button')
    })
  }
  if (timerSelected === 'longBreak') {
    return shortBreakAlert(function () {
      changeButton(longBreakButton, shortBreakButton, 'show-mobile-button')
    })
  }
}

function onRightChange () {
  if (timerSelected === 'kikan') {
    return shortBreakAlert(function () {
      changeButton(kikanButton, shortBreakButton, 'show-mobile-button')
    })
  }
  if (timerSelected === 'shortBreak') {
    return longBreakAlert(function () {
      changeButton(shortBreakButton, longBreakButton, 'show-mobile-button')
    })
  }
  if (timerSelected === 'longBreak') {
    return kikanAlert(function () {
      changeButton(longBreakButton, kikanButton, 'show-mobile-button')
    })
  }
}

function hideArticle() {
  aside.classList.toggle('trasition')
  aside.children[0].classList.toggle('displayNone')
  aside.children[1].classList.toggle('displayNone')

  if(arrowButton.innerHTML === '<i class="fas fa-chevron-right"></i>') {
    arrowButton.innerHTML = '<i class="fas fa-chevron-left"></i>'
  } else {
    arrowButton.innerHTML = '<i class="fas fa-chevron-right"></i>'
  }
}

window.onload = function () {
  // this code works to set the initial active button based on the timerSelected variable
  if (timerSelected === 'kikan') {
    if (kikanButton.classList.contains('yellow') === false) {
      kikanButton.classList.add('yellow')
      kikanButton.classList.remove('blue')
    }
    // this code add the currentTimer on the chronometer element when is kikan
    chronometer.innerText = currentTimer
  }
}