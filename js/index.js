var initialKikanTimer = '02:00'
var initialShortBreakTimer = '00:30'
var initialLongBreakTimer = '01:00'
var onKikan = false
var onShortBreak = false
var onLongBreak = false
var currentTimer = initialKikanTimer
var intervalTimer = null
var kikanCounter = 0
var shortBreakKiKanCounter = 0
var longBreakKikanCounter = 0
var timerSelected = 'kikan'

// ELEMENTS START
const kikanButton = document.getElementById('kikanBtn')
const shortBreakButton = document.getElementById('shortBreakBtn')
const longBreakButton = document.getElementById('longBreakBtn')
const chronometer = document.getElementById('chronometer')
const playPauseButton = document.getElementById('playPause')
const resetButton = document.getElementById('reset')
// ELEMENTS END

// this function change the currentTimer of the kikan based on the timerSelected
// and change the buttons color and restart the other ones
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
}
function onLongBreakChange () {
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
  const minutosSegundos = time.split(':')
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
           return startTimer(initialLongBreakTimer, 'longBreak')
        } else {
          return startTimer(initialShortBreakTimer, 'shortBreak')
        }
      }
      if (onShortBreak) {
        shortBreakKiKanCounter = shortBreakKiKanCounter + 1
        return startTimer(initialKikanTimer, 'kikan')
      }
      if (onLongBreak) {
        longBreakKikanCounter = longBreakKikanCounter + 1
        return startTimer(initialKikanTimer, 'kikan')
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

function onReset() {
  if (onKikan) {
    onKikanChange()
  }
  if (onShortBreak) {
    onShortBreakChange()
  }
  if (onLongBreak) {
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
