const CIRCUMFERENCE = 252;

const bell = document.getElementById("bell");
const countDirection = document.getElementById("count-direction");
const buttonDirection = document.getElementById("button-direction");
const warningMinutes = document.getElementById("warning-minutes");
const warningSeconds = document.getElementById("warning-seconds");
const stopMinutes = document.getElementById("stop-minutes");
const stopSeconds = document.getElementById("stop-seconds");
const continuousMinutes = document.getElementById("continuous-minutes");
const continuousSeconds = document.getElementById("continuous-seconds");

let warning = 0;
let stop = 0;
let continuous = 0;

function padSeconds(seconds) {
  if (seconds !== "" && seconds < 10) {
    seconds = `0${seconds}`.slice(-2);
  }
  return seconds;
}

function defaults() {
  if (warningMinutes.value === "") warningMinutes.value = 0;
  if (warningSeconds.value === "") warningSeconds.value = 0;
  if (stopMinutes.value === "") stopMinutes.value = 0;
  if (stopSeconds.value === "") stopSeconds.value = 0;
  if (continuousMinutes.value === "") continuousMinutes.value = 0;
  if (continuousSeconds.value === "") continuousSeconds.value = 0;
}

function changeWarning() {
  if (warningMinutes.value < 0) warningMinutes.value = 0;
  if (warningSeconds.value < 0) warningSeconds.value = 0;
  if (warningSeconds.value >= 60) warningSeconds.value = 59;
  warningSeconds.value = padSeconds(warningSeconds.value);
  warning = 60 * parseInt(warningMinutes.value) + parseInt(warningSeconds.value);
}

function changeStop() {
  if (stopMinutes.value < 0) stopMinutes.value = 0;
  if (stopSeconds.value < 0) stopSeconds.value = 0;
  if (stopSeconds.value >= 60) stopSeconds.value = 59;
  stopSeconds.value = padSeconds(stopSeconds.value);
  stop = 60 * parseInt(stopMinutes.value) + parseInt(stopSeconds.value);
}

function changeContinuous() {
  if (continuousMinutes.value < 0) continuousMinutes.value = 0;
  if (continuousSeconds.value < 0) continuousSeconds.value = 0;
  if (continuousSeconds.value >= 60) continuousSeconds.value = 59;
  continuousSeconds.value = padSeconds(continuousSeconds.value);
  continuous = 60 * parseInt(continuousMinutes.value) + parseInt(continuousSeconds.value);
}

function countDown() {
  countDirection.innerHTML = "Currently counting down to 0:00.";
  buttonDirection.innerHTML = "Count up";
  buttonDirection.setAttribute("onclick", "countUp()");
}

function countUp() {
  countDirection.innerHTML = "Currently counting up from 0:00.";
  buttonDirection.innerHTML = "Count down";
  buttonDirection.setAttribute("onclick", "countDown()");
}

countUp();


/* 1st Affirmative */ {
  let intervalId1A;
  let continuousId1A;

  const button1A = document.getElementById("button-1a");
  const clockLabel1A = document.getElementById("clock-label-1a");
  const ringRemaining1A = document.getElementById("ring-remaining-1a");
  const ringOvertime1A = document.getElementById("ring-overtime-1a");

  function startTime1A() {
    defaults();
    changeWarning();
    changeStop();
    changeContinuous();
    
    moveTime1A();
    intervalId1A = setInterval(moveTime1A, 1000);
    
    if (time1A > continuous) {
      bell.play();
      continuousId1A = setInterval(() => {bell.currentTime=0;bell.play()}, 500);
    }
    
    button1A.innerHTML = "<b>STOP</b>";
    button1A.style.borderColor = "red";
    button1A.style.backgroundColor = "red";
    button1A.setAttribute("onclick", "stopTime1A()");
  }

  function stopTime1A() {
    clearInterval(intervalId1A);
    clearInterval(continuousId1A);
    
    button1A.innerHTML = "<b>START</b>";
    button1A.style.borderColor = "lime";
    button1A.style.backgroundColor = "lime";
    button1A.setAttribute("onclick", "startTime1A()");
  }

  function resetTime1A() {
    stopTime1A();
    time1A = -1;
    clockLabel1A.innerHTML = "";
    ringRemaining1A.style.stroke = "none";
    ringRemaining1A.setAttribute("stroke-dasharray", `${CIRCUMFERENCE} ${CIRCUMFERENCE}`);
    ringOvertime1A.style.stroke = "none";
    ringOvertime1A.setAttribute("stroke-dasharray", `0 ${CIRCUMFERENCE}`);
  }

  function moveTime1A() {
    time1A += 1;
    
    if (buttonDirection.innerHTML === "Count down") clockLabel1A.innerHTML = `${Math.trunc(time1A / 60)}:${padSeconds(time1A % 60)}`;
    else if (-60 < stop - time1A && stop - time1A < 0) clockLabel1A.innerHTML = `-${Math.trunc((stop - time1A) / 60)}:${padSeconds(Math.abs(stop - time1A) % 60)}`;
    else clockLabel1A.innerHTML = `${Math.trunc((stop - time1A) / 60)}:${padSeconds(Math.abs(stop - time1A) % 60)}`;
    
    if (time1A < stop) {
      if (time1A < warning) ringRemaining1A.style.stroke = "lime";
      else {
        if (time1A == warning) bell.play();
        ringRemaining1A.style.stroke = "orange";
      }
      ringOvertime1A.style.stroke = "none";
      
      ringRemaining1A.setAttribute("stroke-dasharray", `${CIRCUMFERENCE*(stop-time1A-1)/stop} ${CIRCUMFERENCE}`);
    } else {
      if (time1A == stop) {
        bell.play();
        setTimeout(() => {bell.currentTime=0;bell.play()}, 500);
      }
      if (time1A == continuous) {
        bell.play();
        continuousId1A = setInterval(() => {bell.currentTime=0;bell.play()}, 500);
      }
      
      ringRemaining1A.style.stroke = "none";
      ringOvertime1A.style.stroke = "red";
      
      ringOvertime1A.setAttribute("stroke-dasharray", `${CIRCUMFERENCE*(time1A-stop+1)/(continuous-stop)} ${CIRCUMFERENCE}`);
    }
  }

  resetTime1A();
}



/* 1st Negative */ {
  let intervalId1N;
  let continuousId1N;

  const button1N = document.getElementById("button-1n");
  const clockLabel1N = document.getElementById("clock-label-1n");
  const ringRemaining1N = document.getElementById("ring-remaining-1n");
  const ringOvertime1N = document.getElementById("ring-overtime-1n");

  function startTime1N() {
    defaults();
    changeWarning();
    changeStop();
    changeContinuous();
    
    moveTime1N();
    intervalId1N = setInterval(moveTime1N, 1000);
    
    if (time1N > continuous) {
      bell.play();
      continuousId1N = setInterval(() => {bell.currentTime=0;bell.play()}, 500);
    }
    
    button1N.innerHTML = "<b>STOP</b>";
    button1N.style.borderColor = "red";
    button1N.style.backgroundColor = "red";
    button1N.setAttribute("onclick", "stopTime1N()");
  }

  function stopTime1N() {
    clearInterval(intervalId1N);
    clearInterval(continuousId1N);
    
    button1N.innerHTML = "<b>START</b>";
    button1N.style.borderColor = "lime";
    button1N.style.backgroundColor = "lime";
    button1N.setAttribute("onclick", "startTime1N()");
  }

  function resetTime1N() {
    stopTime1N();
    time1N = -1;
    clockLabel1N.innerHTML = "";
    ringRemaining1N.style.stroke = "none";
    ringRemaining1N.setAttribute("stroke-dasharray", `${CIRCUMFERENCE} ${CIRCUMFERENCE}`);
    ringOvertime1N.style.stroke = "none";
    ringOvertime1N.setAttribute("stroke-dasharray", `0 ${CIRCUMFERENCE}`);
  }

  function moveTime1N() {
    time1N += 1;
    
    if (buttonDirection.innerHTML === "Count down") clockLabel1N.innerHTML = `${Math.trunc(time1N / 60)}:${padSeconds(time1N % 60)}`;
    else if (-60 < stop - time1N && stop - time1N < 0) clockLabel1N.innerHTML = `-${Math.trunc((stop - time1N) / 60)}:${padSeconds(Math.abs(stop - time1N) % 60)}`
    else clockLabel1N.innerHTML = `${Math.trunc((stop - time1N) / 60)}:${padSeconds(Math.abs(stop - time1N) % 60)}`;
    
    if (time1N < stop) {
      if (time1N < warning) ringRemaining1N.style.stroke = "lime";
      else {
        if (time1N == warning) bell.play();
        ringRemaining1N.style.stroke = "orange";
      }
      ringOvertime1N.style.stroke = "none";
      
      ringRemaining1N.setAttribute("stroke-dasharray", `${CIRCUMFERENCE*(stop-time1N-1)/stop} ${CIRCUMFERENCE}`);
    } else {
      if (time1N == stop) {
        bell.play();
        setTimeout(() => {bell.currentTime=0;bell.play()}, 500);
      }
      if (time1N == continuous) {
        bell.play();
        continuousId1N = setInterval(() => {bell.currentTime=0;bell.play()}, 500);
      }
      
      ringRemaining1N.style.stroke = "none";
      ringOvertime1N.style.stroke = "red";
      
      ringOvertime1N.setAttribute("stroke-dasharray", `${CIRCUMFERENCE*(time1N-stop+1)/(continuous-stop)} ${CIRCUMFERENCE}`);
    }
  }

  resetTime1N();
}



/* 2nd Affirmative */ {
  let intervalId2A;
  let continuousId2A;

  const button2A = document.getElementById("button-2a");
  const clockLabel2A = document.getElementById("clock-label-2a");
  const ringRemaining2A = document.getElementById("ring-remaining-2a");
  const ringOvertime2A = document.getElementById("ring-overtime-2a");

  function startTime2A() {
    defaults();
    changeWarning();
    changeStop();
    changeContinuous();
    
    moveTime2A();
    intervalId2A = setInterval(moveTime2A, 1000);
    
    if (time2A > continuous) {
      bell.play();
      continuousId2A = setInterval(() => {bell.currentTime=0;bell.play()}, 500);
    }
    
    button2A.innerHTML = "<b>STOP</b>";
    button2A.style.borderColor = "red";
    button2A.style.backgroundColor = "red";
    button2A.setAttribute("onclick", "stopTime2A()");
  }

  function stopTime2A() {
    clearInterval(intervalId2A);
    clearInterval(continuousId2A);
    
    button2A.innerHTML = "<b>START</b>";
    button2A.style.borderColor = "lime";
    button2A.style.backgroundColor = "lime";
    button2A.setAttribute("onclick", "startTime2A()");
  }

  function resetTime2A() {
    stopTime2A();
    time2A = -1;
    clockLabel2A.innerHTML = "";
    ringRemaining2A.style.stroke = "none";
    ringRemaining2A.setAttribute("stroke-dasharray", `${CIRCUMFERENCE} ${CIRCUMFERENCE}`);
    ringOvertime2A.style.stroke = "none";
    ringOvertime2A.setAttribute("stroke-dasharray", `0 ${CIRCUMFERENCE}`);
  }

  function moveTime2A() {
    time2A += 1;
    
    if (buttonDirection.innerHTML === "Count down") clockLabel2A.innerHTML = `${Math.trunc(time2A / 60)}:${padSeconds(time2A % 60)}`;
    else if (-60 < stop - time2A && stop - time2A < 0) clockLabel2A.innerHTML = `-${Math.trunc((stop - time2A) / 60)}:${padSeconds(Math.abs(stop - time2A) % 60)}`
    else clockLabel2A.innerHTML = `${Math.trunc((stop - time2A) / 60)}:${padSeconds(Math.abs(stop - time2A) % 60)}`;
    
    if (time2A < stop) {
      if (time2A < warning) ringRemaining2A.style.stroke = "lime";
      else {
        if (time2A == warning) bell.play();
        ringRemaining2A.style.stroke = "orange";
      }
      ringOvertime2A.style.stroke = "none";
      
      ringRemaining2A.setAttribute("stroke-dasharray", `${CIRCUMFERENCE*(stop-time2A-1)/stop} ${CIRCUMFERENCE}`);
    } else {
      if (time2A == stop) {
        bell.play();
        setTimeout(() => {bell.currentTime=0;bell.play()}, 500);
      }
      if (time2A == continuous) {
        bell.play();
        continuousId2A = setInterval(() => {bell.currentTime=0;bell.play()}, 500);
      }
      
      ringRemaining2A.style.stroke = "none";
      ringOvertime2A.style.stroke = "red";
      
      ringOvertime2A.setAttribute("stroke-dasharray", `${CIRCUMFERENCE*(time2A-stop+1)/(continuous-stop)} ${CIRCUMFERENCE}`);
    }
  }

  resetTime2A();
}



/* 2nd Negative */ {
  let intervalId2N;
  let continuousId2N;

  const button2N = document.getElementById("button-2n");
  const clockLabel2N = document.getElementById("clock-label-2n");
  const ringRemaining2N = document.getElementById("ring-remaining-2n");
  const ringOvertime2N = document.getElementById("ring-overtime-2n");

  function startTime2N() {
    defaults();
    changeWarning();
    changeStop();
    changeContinuous();
    
    moveTime2N();
    intervalId2N = setInterval(moveTime2N, 1000);
    
    if (time2N > continuous) {
      bell.play();
      continuousId2N = setInterval(() => {bell.currentTime=0;bell.play()}, 500);
    }
    
    button2N.innerHTML = "<b>STOP</b>";
    button2N.style.borderColor = "red";
    button2N.style.backgroundColor = "red";
    button2N.setAttribute("onclick", "stopTime2N()");
  }

  function stopTime2N() {
    clearInterval(intervalId2N);
    clearInterval(continuousId2N);
    
    button2N.innerHTML = "<b>START</b>";
    button2N.style.borderColor = "lime";
    button2N.style.backgroundColor = "lime";
    button2N.setAttribute("onclick", "startTime2N()");
  }

  function resetTime2N() {
    stopTime2N();
    time2N = -1;
    clockLabel2N.innerHTML = "";
    ringRemaining2N.style.stroke = "none";
    ringRemaining2N.setAttribute("stroke-dasharray", `${CIRCUMFERENCE} ${CIRCUMFERENCE}`);
    ringOvertime2N.style.stroke = "none";
    ringOvertime2N.setAttribute("stroke-dasharray", `0 ${CIRCUMFERENCE}`);
  }

  function moveTime2N() {
    time2N += 1;
    
    if (buttonDirection.innerHTML === "Count down") clockLabel2N.innerHTML = `${Math.trunc(time2N / 60)}:${padSeconds(time2N % 60)}`;
    else if (-60 < stop - time2N && stop - time2N < 0) clockLabel2N.innerHTML = `-${Math.trunc((stop - time2N) / 60)}:${padSeconds(Math.abs(stop - time2N) % 60)}`
    else clockLabel2N.innerHTML = `${Math.trunc((stop - time2N) / 60)}:${padSeconds(Math.abs(stop - time2N) % 60)}`;
    
    if (time2N < stop) {
      if (time2N < warning) ringRemaining2N.style.stroke = "lime";
      else {
        if (time2N == warning) bell.play();
        ringRemaining2N.style.stroke = "orange";
      }
      ringOvertime2N.style.stroke = "none";
      
      ringRemaining2N.setAttribute("stroke-dasharray", `${CIRCUMFERENCE*(stop-time2N-1)/stop} ${CIRCUMFERENCE}`);
    } else {
      if (time2N == stop) {
        bell.play();
        setTimeout(() => {bell.currentTime=0;bell.play()}, 500);
      }
      if (time2N == continuous) {
        bell.play();
        continuousId2N = setInterval(() => {bell.currentTime=0;bell.play()}, 500);
      }
      
      ringRemaining2N.style.stroke = "none";
      ringOvertime2N.style.stroke = "red";
      
      ringOvertime2N.setAttribute("stroke-dasharray", `${CIRCUMFERENCE*(time2N-stop+1)/(continuous-stop)} ${CIRCUMFERENCE}`);
    }
  }

  resetTime2N();
}



/* 3rd Affirmative */ {
  let intervalId3A;
  let continuousId3A;

  const button3A = document.getElementById("button-3a");
  const clockLabel3A = document.getElementById("clock-label-3a");
  const ringRemaining3A = document.getElementById("ring-remaining-3a");
  const ringOvertime3A = document.getElementById("ring-overtime-3a");

  function startTime3A() {
    defaults();
    changeWarning();
    changeStop();
    changeContinuous();
    
    moveTime3A();
    intervalId3A = setInterval(moveTime3A, 1000);
    
    if (time3A > continuous) {
      bell.play();
      continuousId3A = setInterval(() => {bell.currentTime=0;bell.play()}, 500);
    }
    
    button3A.innerHTML = "<b>STOP</b>";
    button3A.style.borderColor = "red";
    button3A.style.backgroundColor = "red";
    button3A.setAttribute("onclick", "stopTime3A()");
  }

  function stopTime3A() {
    clearInterval(intervalId3A);
    clearInterval(continuousId3A);
    
    button3A.innerHTML = "<b>START</b>";
    button3A.style.borderColor = "lime";
    button3A.style.backgroundColor = "lime";
    button3A.setAttribute("onclick", "startTime3A()");
  }

  function resetTime3A() {
    stopTime3A();
    time3A = -1;
    clockLabel3A.innerHTML = "";
    ringRemaining3A.style.stroke = "none";
    ringRemaining3A.setAttribute("stroke-dasharray", `${CIRCUMFERENCE} ${CIRCUMFERENCE}`);
    ringOvertime3A.style.stroke = "none";
    ringOvertime3A.setAttribute("stroke-dasharray", `0 ${CIRCUMFERENCE}`);
  }

  function moveTime3A() {
    time3A += 1;
    
    if (buttonDirection.innerHTML === "Count down") clockLabel3A.innerHTML = `${Math.trunc(time3A / 60)}:${padSeconds(time3A % 60)}`;
    else if (-60 < stop - time3A && stop - time3A < 0) clockLabel3A.innerHTML = `-${Math.trunc((stop - time3A) / 60)}:${padSeconds(Math.abs(stop - time3A) % 60)}`
    else clockLabel3A.innerHTML = `${Math.trunc((stop - time3A) / 60)}:${padSeconds(Math.abs(stop - time3A) % 60)}`;
    
    if (time3A < stop) {
      if (time3A < warning) ringRemaining3A.style.stroke = "lime";
      else {
        if (time3A == warning) bell.play();
        ringRemaining3A.style.stroke = "orange";
      }
      ringOvertime3A.style.stroke = "none";
      
      ringRemaining3A.setAttribute("stroke-dasharray", `${CIRCUMFERENCE*(stop-time3A-1)/stop} ${CIRCUMFERENCE}`);
    } else {
      if (time3A == stop) {
        bell.play();
        setTimeout(() => {bell.currentTime=0;bell.play()}, 500);
      }
      if (time3A == continuous) {
        bell.play();
        continuousId3A = setInterval(() => {bell.currentTime=0;bell.play()}, 500);
      }
      
      ringRemaining3A.style.stroke = "none";
      ringOvertime3A.style.stroke = "red";
      
      ringOvertime3A.setAttribute("stroke-dasharray", `${CIRCUMFERENCE*(time3A-stop+1)/(continuous-stop)} ${CIRCUMFERENCE}`);
    }
  }

  resetTime3A();
}



/* 3rd Negative */ {
  let intervalId3N;
  let continuousId3N;

  const button3N = document.getElementById("button-3n");
  const clockLabel3N = document.getElementById("clock-label-3n");
  const ringRemaining3N = document.getElementById("ring-remaining-3n");
  const ringOvertime3N = document.getElementById("ring-overtime-3n");

  function startTime3N() {
    defaults();
    changeWarning();
    changeStop();
    changeContinuous();
    
    moveTime3N();
    intervalId3N = setInterval(moveTime3N, 1000);
    
    if (time3N > continuous) {
      bell.play();
      continuousId3N = setInterval(() => {bell.currentTime=0;bell.play()}, 500);
    }
    
    button3N.innerHTML = "<b>STOP</b>";
    button3N.style.borderColor = "red";
    button3N.style.backgroundColor = "red";
    button3N.setAttribute("onclick", "stopTime3N()");
  }

  function stopTime3N() {
    clearInterval(intervalId3N);
    clearInterval(continuousId3N);
    
    button3N.innerHTML = "<b>START</b>";
    button3N.style.borderColor = "lime";
    button3N.style.backgroundColor = "lime";
    button3N.setAttribute("onclick", "startTime3N()");
  }

  function resetTime3N() {
    stopTime3N();
    time3N = -1;
    clockLabel3N.innerHTML = "";
    ringRemaining3N.style.stroke = "none";
    ringRemaining3N.setAttribute("stroke-dasharray", `${CIRCUMFERENCE} ${CIRCUMFERENCE}`);
    ringOvertime3N.style.stroke = "none";
    ringOvertime3N.setAttribute("stroke-dasharray", `0 ${CIRCUMFERENCE}`);
  }

  function moveTime3N() {
    time3N += 1;
    
    if (buttonDirection.innerHTML === "Count down") clockLabel3N.innerHTML = `${Math.trunc(time3N / 60)}:${padSeconds(time3N % 60)}`;
    else if (-60 < stop - time3N && stop - time3N < 0) clockLabel3N.innerHTML = `-${Math.trunc((stop - time3N) / 60)}:${padSeconds(Math.abs(stop - time3N) % 60)}`
    else clockLabel3N.innerHTML = `${Math.trunc((stop - time3N) / 60)}:${padSeconds(Math.abs(stop - time3N) % 60)}`;
    
    if (time3N < stop) {
      if (time3N < warning) ringRemaining3N.style.stroke = "lime";
      else {
        if (time3N == warning) bell.play();
        ringRemaining3N.style.stroke = "orange";
      }
      ringOvertime3N.style.stroke = "none";
      
      ringRemaining3N.setAttribute("stroke-dasharray", `${CIRCUMFERENCE*(stop-time3N-1)/stop} ${CIRCUMFERENCE}`);
    } else {
      if (time3N == stop) {
        bell.play();
        setTimeout(() => {bell.currentTime=0;bell.play()}, 500);
      }
      if (time3N == continuous) {
        bell.play();
        continuousId3N = setInterval(() => {bell.currentTime=0;bell.play()}, 500);
      }
      
      ringRemaining3N.style.stroke = "none";
      ringOvertime3N.style.stroke = "red";
      
      ringOvertime3N.setAttribute("stroke-dasharray", `${CIRCUMFERENCE*(time3N-stop+1)/(continuous-stop)} ${CIRCUMFERENCE}`);
    }
  }

  resetTime3N();
}
