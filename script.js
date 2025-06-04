
const candidates = [...Array(32).keys()].map(i => ({
  name: `Candidate ${i + 1}`,
  img: `images/${i + 1}.png`
}));

let round = [...candidates];
let nextRound = [];
let currentMatch = [null, null];

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function showNextMatch() {
  if (round.length >= 2) {
    currentMatch = [round.pop(), round.pop()];
    document.getElementById('left-img').src = currentMatch[0].img;
    document.getElementById('left-name').innerText = currentMatch[0].name;
    document.getElementById('right-img').src = currentMatch[1].img;
    document.getElementById('right-name').innerText = currentMatch[1].name;
  } else if (nextRound.length > 1) {
    round = [...nextRound];
    nextRound = [];
    shuffle(round);
    showNextMatch();
  } else {
    const winner = nextRound[0];
    document.getElementById('battle').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('winner-img').src = winner.img;
    document.getElementById('winner-name').innerText = winner.name;
    launchConfetti();
  }
}

function vote(side) {
  nextRound.push(currentMatch[side === 'left' ? 0 : 1]);
  showNextMatch();
}

function restart() {
  location.reload();
}

function launchConfetti() {
  const canvas = document.getElementById('confetti');
  const ctx = canvas.getContext('2d');
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const confetti = Array.from({ length: 100 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height - canvas.height,
    r: Math.random() * 6 + 4,
    d: Math.random() * 100 + 100,
    color: `hsl(${Math.random() * 360}, 100%, 70%)`
  }));

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    for (let c of confetti) {
      ctx.beginPath();
      ctx.arc(c.x, c.y, c.r, 0, Math.PI * 2, false);
      ctx.fillStyle = c.color;
      ctx.fill();
    }
    update();
  }

  function update() {
    for (let c of confetti) {
      c.y += Math.cos(c.d) + 2;
      c.x += Math.sin(c.d);
      if (c.y > canvas.height) {
        c.y = -10;
        c.x = Math.random() * canvas.width;
      }
    }
  }

  setInterval(draw, 30);
}

shuffle(round);
showNextMatch();
