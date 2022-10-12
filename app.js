const minutesValue = document.querySelector('#minutes')
const progress = document.querySelector('#progress')
const settingsText = document.querySelector('#settings-text')
let minutes = Number(minutesValue.value)
let seconds = minutes * 60
let total = 300
let rest = total / seconds
let completedTimers = 0
let on = false

const timer = () => {

    /* Timer */

    minutes = Number(minutesValue.value)
    seconds = minutes * 60
    rest = total / seconds
    on = true

    if (progress.classList.contains('finish')) {
        progress.classList.toggle('finish')
    }

    const timer = setInterval (() => {
        total = total - rest
        progress.style.strokeDashoffset = total
        seconds -= 1
        var hour = Math.floor(seconds / 3600);
        hour = (hour < 10)? '0' + hour : hour;
        var minute = Math.floor((seconds / 60) % 60);
        minute = (minute < 10)? '0' + minute : minute;
        var second = seconds % 60;
        second = (second < 10)? '0' + second : second;
        if (seconds > 0) {
            settingsText.style.fontSize = "2rem"
            settingsText.textContent = hour + ':' + minute + ':' + second;
        }

        /* Finish */

        if (seconds === 0) {
            setTimeout (() => {
                progress.classList.toggle('finish')
                settingsText.style.fontSize = "1.4rem"
                completedTimers += 1
                settingsText.textContent = `${completedTimers} completed pomodoros`
                total = 300
                seconds = minutes * 60
                progress.style.strokeDashoffset = total
                on = false
                clearInterval(timer)
                if (sound === true) {
                    finishSound.play()
                }
            }, 1000)
        }
    }, 1000)

    /* Skip button */
    const skip = document.querySelector('#skip')
    skip.addEventListener('click', () => {
        if (on === true) {
            total = 300
            seconds = minutes * 60
            progress.style.strokeDashoffset = total
            clearInterval(timer)
            if (sound === true) {
                finishSound.play()
            }
            if (!(progress.classList.contains('finish'))) {
                progress.classList.toggle('finish')
            }
            setTimeout (() => {
                settingsText.style.fontSize = "1.4rem"
                settingsText.textContent = `${completedTimers} completed pomodoros`
                on = false
            }, 1000)
        }
    })
}

/* Play button */

const play = document.querySelector('#play')
play.addEventListener('click', () => {
    if (total === 300 && seconds > 0 && on === false) {
        timer()
    }
})

/* Settings visibility*/

const settingsButton = document.querySelector('#settings')
const settingsInterface = document.querySelector('.settings')
const backButton = document.querySelector('#back')
const mainButtons = document.querySelectorAll('.main-button')

settingsButton.addEventListener('click', () => {
    settingsInterface.classList.toggle('visible')
    mainButtons.forEach(e => {
        e.classList.toggle('visible')
    })
})

backButton.addEventListener('click', () => {
    settingsInterface.classList.toggle('visible')
    mainButtons.forEach(e => {
        e.classList.toggle('visible')
    })
})


/* Sound buttons */


let sound = true
const finishSound = document.querySelector('audio')
const soundButton = document.querySelector('#sound')
const muteButton = document.querySelector('#mute')

soundButton.addEventListener('click', () => {
    sound = false
    soundButton.classList.toggle('visible')
    muteButton.classList.toggle('visible')
})

muteButton.addEventListener('click', () => {
    sound = true
    muteButton.classList.toggle('visible')
    soundButton.classList.toggle('visible')
})

/* Dark mode buttons */

const light = document.querySelector('#light')
const dark = document.querySelector('#dark')

light.addEventListener('click', () => {
    light.classList.toggle('visible')
    dark.classList.toggle('visible')
    document.querySelector('html').classList.toggle('dark-mode')
})

dark.addEventListener('click', () => {
    dark.classList.toggle('visible')
    light.classList.toggle('visible')
    document.querySelector('html').classList.toggle('dark-mode')
})