const startBtn = document.querySelector('#start'),
	  screens = document.querySelectorAll('.screen'),
	  timeList =  document.querySelector('#time-list'),
	  timeEl = document.querySelector('#time'),
	  board =  document.querySelector('#board');

const colors = ['#f6bd60','#f7ede2','#f5cac3','#84a59d','#f28482','#8e9aaf','#cbc0d3','#efd3d7','#feeafa','#dee2ff'];
let time = 0,
	score = 0;


startBtn.addEventListener('click', (e) => {
	e.preventDefault()
	screens[0].classList.add('up');
	
})


timeList.addEventListener('click', e => {
	if (e.target.classList.contains('time-btn')) {
		time = parseInt(e.target.getAttribute('data-time'));
		screens[1].classList.add('up');
		startGame()
	}
	
})

board.addEventListener('click', e => {
	if ( e.target.classList.contains('circle')) {
		score++;
		e.target.remove();
		createRandomCircle();
		
	}
})

function startGame() {
	setInterval(decreaseTime, 1000);
	createRandomCircle();
	setTime(time);
}

function decreaseTime() {
	if (time === 0) {
		finishGame();
	} else {
		let current = --time;
		if (current < 10 ){
			current = `0${current}`;
		}
		setTime(current);
	}
	
}

function setTime(value) {
	timeEl.innerHTML = `00:${value}`;
}

function finishGame() {
	timeEl.parentNode.classList.add('hide');
	board.innerHTML = `<h1>Счет: <span class="primary">${score}</span></h1>`;
}

function createRandomCircle() {
	const circle = document.createElement('div'),
		  size = getRandomNuumber(10, 60),
		  {width, height} = board.getBoundingClientRect(),
		   x = getRandomNuumber(0, width -size),
		   y = getRandomNuumber(0, height -size);
	let color = getColor();
	
	circle.classList.add('circle');
	
	circle.style.width = `${size}px`;
	circle.style.height = `${size}px`;
	circle.style.background = color;
	circle.style.top = `${y}px`;
	circle.style.left = `${x}px`;
	
	board.append(circle);
}

function getRandomNuumber(min, max) {
	return Math.round(Math.random() * (max - min) + min)
}
 
function getColor() {
	const index = Math.floor(Math.random() * colors.length);
	return colors[index]
}