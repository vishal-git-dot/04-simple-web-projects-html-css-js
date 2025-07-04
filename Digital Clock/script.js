const tickSound = new Audio('tick.mp3'); // Optional

const clockContainer = document.getElementById('clock');

// Initialize digit spans
let prevDigits = [];

function createClockElements() {
  clockContainer.innerHTML = '';

  for (let i = 0; i < 8; i++) {
    if (i === 2 || i === 5) {
      const sep = document.createElement('span');
      sep.className = 'separator';
      sep.textContent = ':';
      clockContainer.appendChild(sep);
    } else {
      const span = document.createElement('span');
      span.className = 'digit';
      span.textContent = '0';
      clockContainer.appendChild(span);
      prevDigits.push('0');
    }
  }
}

function updateClock() {
  const now = new Date();
  const h = String(now.getHours()).padStart(2, '0');
  const m = String(now.getMinutes()).padStart(2, '0');
  const s = String(now.getSeconds()).padStart(2, '0');
  const timeString = `${h}${m}${s}`;

  const digitElements = clockContainer.querySelectorAll('.digit');

  for (let i = 0; i < timeString.length; i++) {
    const newDigit = timeString[i];
    if (prevDigits[i] !== newDigit) {
      const el = digitElements[i];
      el.classList.remove('flip');
      void el.offsetWidth; // trigger reflow
      el.classList.add('flip');
      el.textContent = newDigit;
      prevDigits[i] = newDigit;
    }
  }

  // Update date
  const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
  document.getElementById('date').textContent = now.toLocaleDateString(undefined, options);

  // Play tick sound
  tickSound.currentTime = 0;
  tickSound.play();
}

createClockElements();
updateClock();
setInterval(updateClock, 1000);

document.getElementById('toggleTheme').addEventListener('click', () => {
  document.body.classList.toggle('dark');
  document.body.classList.toggle('light');
});
