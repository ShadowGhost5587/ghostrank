
const candidates = [
  { name: "Ismile", img: "1.png" },
  { name: "Sageer", img: "2.png" },
  { name: "Sanskar", img: "3.png" },
  { name: "Gufran", img: "4.png" },
  { name: "Satwik", img: "5.png" },
  { name: "Zeeshan", img: "6.png" },
  { name: "Arush", img: "7.png" },
  { name: "Satyam", img: "8.png" },
  { name: "Yuvraj", img: "9.png" },
  { name: "Ansh", img: "10.png" },
  { name: "Ayaj Joker", img: "11.png" },
  { name: "Aditya", img: "12.png" },
  { name: "Shivam", img: "13.png" },
  { name: "Faizan", img: "14.png" },
  { name: "Umang", img: "15.png" },
  { name: "Anukalp", img: "16.png" },
  { name: "Sahid", img: "17.png" },
  { name: "Meraj", img: "18.png" },
  { name: "Jaiswal", img: "19.png" },
  { name: "Chandan", img: "20.png" },
  { name: "Raghvendra", img: "21.png" },
  { name: "Vikas", img: "22.png" },
  { name: "Tauneer", img: "23.png" },
  { name: "Kamran", img: "24.png" },
  { name: "Ehtesham", img: "25.png" },
  { name: "Aryan", img: "26.png" },
  { name: "Aditya", img: "27.png" },
  { name: "Aftab", img: "28.png" },
  { name: "the silent guy", img: "29.png" },
  { name: "Rizwan", img: "30.png" },
  { name: "Rohit", img: "31.png" },
  { name: "Aryman", img: "32.png" }
];

let round = [...candidates];
let nextRound = [];
let currentMatch = [null, null];
let scores = {};
candidates.forEach(c => scores[c.name] = 0);

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
  const votedFor = currentMatch[side === 'left' ? 0 : 1];
  nextRound.push(votedFor);
  scores[votedFor.name]++;
  showNextMatch();
  updateLeaderboard();
}

function updateLeaderboard() {
  const sorted = Object.entries(scores)
    .sort(([, a], [, b]) => b - a)
    .slice(0, 10);
  const list = document.getElementById('leaderboard-list');
  list.innerHTML = sorted.map(([name, score]) => `<li>${name} - ${score}</li>`).join('');
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

window.onload = () => {
  shuffle(round);
  showNextMatch();
  updateLeaderboard();
};
