import React, {useRef, useState, useCallback} from 'react';

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
const Span = ({timerView}) => {
    return (
        <span>{timerView}</span>
    )
}
const Task1 = () => {
    //помещаем setInterval в useRef, чтобы он пережил вызов рендера компонента
    let timerId = useRef(null);
    //Используем useRef, чтобы использовать DataTransfer API
    const inputRef = useRef(null);
    const [timerView, setTimerView] = useState('hh:mm:ss');

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
                        setTimerView(`${getZero(hours)}:${getZero(minutes)}:${getZero(seconds)}`)
                        if (computedSeconds === 0 && timerId.current) {
                            clearInterval(timerId.current)
                        }
                        computedSeconds -= 1;
                    }
                    updateTimer();
                    timerId.current = setInterval(() => updateTimer(), 1000);
                }
            }

        };
    };
    const animateTimer = useCallback(() => createTimerAnimator(), []);
    const start = () => {
        if (timerId.current) {
            clearInterval(timerId.current);
        }
        const seconds = Number(inputRef.current.value);

        animateTimer()(seconds);

        inputRef.current.value = '';
    }

    const inputHandler = (e) => {
        // Очистите input так, чтобы в значении
        // оставались только числа
        const value = e.target.value;
        const lastSymbol = value.substring(value.length - 1);
        if (isNaN(parseInt(lastSymbol))) {
            inputRef.current.value = value.substring(0, value.length - 1)
        }
    }
    //Отфильтруем вставленный текст в input на числа (в соответствии с заданием).
    const pasteHandler = (e) => {
        e.preventDefault();
        const text = e.clipboardData.getData('text');
        inputRef.current.value += filterStringToNumber(text);
    }
    return (
        <div>
            <input
                placeholder="Seconds"
                type="text"
                ref={inputRef}
                onPaste={pasteHandler}
                onInput={inputHandler}
            />

            <button onClick={start}>Start</button>

            <br />
            <br />

            <Span timerView={timerView}/>
        </div>
    );
};

export default Task1;