// Iegūst canvas un tā kontekstu
const canvas = document.getElementById("spelesCanvas");
const ctx = canvas.getContext("2d");

// Izveido mainīgos bļodas un konfektes koordinātēm
let bowl_x = 200;
let bowl_y = 400;
const bowlWidth = 100;
const bowlHeight = 100;

// Konfektes koordinātes un izmēri
let candy_x = Math.random() * (canvas.width - 30);
let candy_y = 0;
const candyWidth = 70;
const candyHeight = 70;

// Punktu skaits
let score = 0;

// Laiks spēlei
let timeLeft = 30;
let gameInterval;

// Attēli bļodai un konfektei
const bowlImage = new Image();
bowlImage.src = "bowl.png";  // Aizvieto ar savu attēlu

const candyImage = new Image();
candyImage.src = "candy.png";  // Aizvieto ar savu attēlu

// Funkcija, lai pārbaudītu bļodas un konfektes sadursmi
function checkCollision(bowl_x, bowl_y, bowlWidth, bowlHeight, candy_x, candy_y, candyWidth, candyHeight) {
    if (bowl_x < candy_x + candyWidth && bowl_x + bowlWidth > candy_x && 
        bowl_y < candy_y + candyHeight && bowl_y + bowlHeight > candy_y) {
        return true;
    }
    return false;
}

// Funkcija, lai apstrādātu tastatūras notikumus (bļodas kustība)
function moveBowl(event) {
    if (event.key === "ArrowLeft" && bowl_x > 0) {
        bowl_x -= 10;
    }
    if (event.key === "ArrowRight" && bowl_x + bowlWidth < canvas.width) {
        bowl_x += 10;
    }
}

// Pievieno notikumu klausītāju, lai kontrolētu bļodu
document.addEventListener("keydown", moveBowl);

// Funkcija, lai izveidotu un atjauninātu spēles laukumu
function gameLoop() {
    // Tīra canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Attēlo punktu skaitu
    ctx.fillStyle = "purple";
    ctx.font = "20px Arial";
    ctx.fillText("Punkti: " + score, 10, 30);

    // Attēlo atlikušo laiku
    ctx.fillText("Laiks: " + Math.round(timeLeft), 10, 60);

    // Ja laiks ir beidzies, parāda "Spēles beigas" ziņojumu
    if (timeLeft <= 0) {
        ctx.fillStyle = "Red";
        ctx.font = "bold 40px Arial";
        ctx.textAlign = "center";
        ctx.fillText("Spēles beigas!", canvas.width / 2, canvas.height / 2);
        clearInterval(gameInterval);
        return;
    }

    // Samazinām laiku
    timeLeft -= 1 / 60;

    // Attēlo bļodu
    ctx.drawImage(bowlImage, bowl_x, bowl_y, bowlWidth, bowlHeight);

    // Konfektes kustība
    candy_y += 3;
    if (candy_y > canvas.height) {
        candy_y = 0;
        candy_x = Math.random() * (canvas.width - candyWidth);
    }

    // Attēlo konfekti
    ctx.drawImage(candyImage, candy_x, candy_y, candyWidth, candyHeight);

    // Pārbauda, vai bļoda ir satikusi konfekti
    if (checkCollision(bowl_x, bowl_y, bowlWidth, bowlHeight, candy_x, candy_y, candyWidth, candyHeight)) {
        score++;
        candy_x = -candyWidth;
        candy_y = 0;
    }
}

// Sāk spēli un atjaunina laukumu ik pēc 16 milisekundēm (60fps)
gameInterval = setInterval(gameLoop, 1000 / 60);