
// 🔥 Firebase Initialization
const firebaseConfig = {
  apiKey: "AIzaSyClBCeAzfDPIubmwZoV1CLoMcAIfRJ7mW0",
  authDomain: "ghostrank-f85b7.firebaseapp.com",
  databaseURL: "https://ghostrank-f85b7-default-rtdb.firebaseio.com",
  projectId: "ghostrank-f85b7",
  storageBucket: "ghostrank-f85b7.appspot.com",
  messagingSenderId: "539150374186",
  appId: "1:539150374186:web:15ac2dd1c58a3c724e09cc"
};
firebase.initializeApp(firebaseConfig);
const db = firebase.database();


const candidates = Array.from({ length: 32 }, (_, i) => ({
  name: "Candidate " + (i + 1),
  img: (i + 1) + ".jpg",
  votes: 0
}));

let round = [];
let currentIndex = 0;

function shuffle(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function startBattle() {
  round = [...candidates];
  shuffle(round);
  currentIndex = 0;
  showNextPair();
}

function showNextPair() {
  if (round.length === 1) {
    document.getElementById('battle').style.display = 'none';
    document.getElementById('result').style.display = 'block';
    document.getElementById('winner-img').src = round[0].img;
    document.getElementById('winner-name').textContent = round[0].name;

    const ref = db.ref('votes/' + round[0].name);
    ref.get().then(snapshot => {
      const current = snapshot.val() || 0;
      ref.set(current + 1);
    });
    return;
  }

  document.getElementById('left-img').src = round[0].img;
  document.getElementById('left-name').textContent = round[0].name;
  document.getElementById('right-img').src = round[1].img;
  document.getElementById('right-name').textContent = round[1].name;
}

function vote(winner) {
  const winnerCandidate = winner === 'left' ? round[0] : round[1];
  round.splice(0, 2);
  round.push(winnerCandidate);
  showNextPair();
}

function restart() {
  document.getElementById('result').style.display = 'none';
  document.getElementById('battle').style.display = 'flex';
  startBattle();
}

function loadLeaderboard() {
  db.ref('votes').orderByValue().limitToLast(5).on('value', snapshot => {
    const data = snapshot.val();
    const sorted = Object.entries(data).sort((a, b) => b[1] - a[1]);
    const list = document.getElementById('leaderboard-list');
    list.innerHTML = '';
    sorted.forEach(([name, score]) => {
      const li = document.createElement('li');
      li.textContent = name + ' — ' + score + ' votes';
      list.appendChild(li);
    });
  });
}

window.onload = () => {
  startBattle();
  loadLeaderboard();
};
