const inputEl = document.querySelector('input');
const buttonEl = document.querySelector('button');
const timerEl = document.querySelector('span');
let timerId;

// Напишите реализацию createTimerAnimator
// который будет анимировать timerEl
function getZero(num) {
  if(num >= 0 && num < 10) {
    return `0${num}`;
  } else {
    return num;
  }
}
function filterStringToNumber (str) {
  let result = '';
  for (let i = 0; i < str.length; i++) {
    if (!isNaN(parseInt(str[i]))) {
      result += str[i];
    }
  }
  return result;
}
const createTimerAnimator = () => {
  return (secondsArg) => {
    if (secondsArg > 0) {
      let computedSeconds = secondsArg;
      let hours, minutes, seconds;
      if (computedSeconds >= 0) {
        function updateTimer () {
          hours = Math.floor((computedSeconds / (60 * 60)) % 24);
          minutes = Math.floor((computedSeconds / (60) % 60));
          seconds = Math.floor((computedSeconds) % 60);
          timerEl.textContent = `${getZero(hours)}:${getZero(minutes)}:${getZero(seconds)}`
          if (computedSeconds === 0 && timerId) {
            clearInterval(timerId)
          }
          computedSeconds -= 1;
        }
        updateTimer();
        timerId = setInterval(() => updateTimer(), 1000);
      }
    }

  };
};

const animateTimer = createTimerAnimator();


inputEl.addEventListener('input', (e) => {
  // Очистите input так, чтобы в значении
  // оставались только числа

  const value = e.target.value;
  const lastSymbol = value.substring(value.length - 1);

  if (isNaN(parseInt(lastSymbol))) {
    e.target.value = value.substring(0, value.length - 1)
  }
});
//Отфильтруем вставленный текст в input на числа (в соответствии с заданием)
inputEl.addEventListener('paste', (e) => {
  e.preventDefault();
  const text = e.clipboardData.getData('text');
  e.target.value += filterStringToNumber(text);
})

buttonEl.addEventListener('click', () => {
  if (timerId) {
    clearInterval(timerId)
  }
  const seconds = Number(inputEl.value);

  animateTimer(seconds);

  inputEl.value = '';

});
