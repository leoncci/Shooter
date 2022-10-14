let press = null;
let code = null;
let score = 0;

let n = 5000;
const bullets = [];
const enemies = [];
const playerWidth = 120;
const playerHeight = 120;
const bulletWidth = 4;
const bulletHeight = 4;
const enemyWidth = 60;
const enemyHeight = 60;
let playerLeft = (window.innerWidth - playerWidth) / 2;
let playerTop = (window.innerHeight - playerHeight);

const game = document.getElementById('game');
const player = document.getElementById('player');

player.style.width = playerWidth + 'px';
player.style.height = playerHeight + 'px';


window.addEventListener('keydown', function (event) {
    code = event.keyCode;
    press = true;
    console.log(code)
    if (code == 32) {
        const bullet = document.createElement('div');
        bullet.style.width = bulletWidth + 'px';
        bullet.style.height = bulletHeight + 'px';
        bullet.style.left = parseInt(player.style.left) + ((playerWidth - bulletWidth) / 2) + 'px';
        bullet.style.top = player.style.top;
        bullet.className = 'bullet';
        game.appendChild(bullet);
        bullets.push(bullet);

    }


})

window.addEventListener('keyup', function () {
    press = false;

})

function generate() {
    const enemy = document.createElement('div');
    enemy.style.width = enemyWidth + 'px';
    enemy.style.height = enemyHeight + 'px';
    enemy.style.left = Math.round(Math.random() * (window.innerWidth - enemyWidth)) + 'px';
    enemy.style.top = 0 + 'px';
    ran = Math.round(Math.random() * 2);

    if (ran == 0) {
        enemy.className = 'enemy1';

    }
    if (ran == 1) {
        enemy.className = 'enemy2';
    }

    game.appendChild(enemy);
    enemies.push(enemy);
    n = n - 100

    setTimeout(generate, Math.round(Math.random() * 1000));
}
generate();


document.addEventListener('mousemove', function (e) {
    let body = document.querySelector('body');
    let player = document.getElementById('player');
    const onMouseMove = (e) => {
        player.style.left = e.pageX + 'px';
        player.style.top = e.pageY + 'px';
    }
    document.addEventListener('mousemove', onMouseMove);
});
function draw() {



    // Bullets
    for (let index = 0; index < bullets.length; index++) {
        const bullet = bullets[index];
        bullet.style.top = (parseInt(bullet.style.top) - 5) + 'px';

        if (parseInt(bullet.style.top) < 0) {
            game.removeChild(bullet);
            bullets.splice(index, 1);
        }
    }

    // Collisions

    for (let i = 0; i < enemies.length; i++) {
        const enemy = enemies[i];
        for (let j = 0; j < bullets.length; j++) {
            const bullet = bullets[j];

            if (bullet.offsetLeft + (bullet.clientWidth / 2) > enemy.offsetLeft
                && bullet.offsetLeft + (bullet.clientWidth / 2) < enemy.offsetLeft + enemy.clientWidth
                && bullet.offsetTop + (bullet.clientWidth / 2) > enemy.offsetTop
                && bullet.offsetTop + (bullet.clientWidth / 2) < enemy.offsetTop + enemy.clientWidth
            ) {
                score = score + 1;

                game.removeChild(enemy);
                enemies.splice(i, 1);

                game.removeChild(bullet);
                bullets.splice(j, 1);
            }
        }

    }
    document.getElementById("score").innerText = score;
    // Enemies
    for (let index = 0; index < enemies.length; index++) {
        const enemy = enemies[index];
        enemy.style.top = (parseInt(enemy.style.top) + 2) + 'px';

        if (parseInt(enemy.style.top) > window.innerHeight - enemyHeight) {
            game.removeChild(enemy);
            enemies.splice(index, 1);
        }

    }
    requestAnimationFrame(draw);
}
draw();

