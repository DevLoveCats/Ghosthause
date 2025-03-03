// inicio do script fuga da ghosthause 

const logo = document.getElementById("logo");
let hoverCount = 0;
let isScared = false;
let escapeTimeout = null;

// Conta quantas vezes o mouse passa pela logo
logo.addEventListener("mouseover", () => {
    if (!isScared) {
        hoverCount++;
        if (hoverCount >= 3) {
            isScared = true; // Ativa o modo "fugir" após 3 passadas
        }
    }
});

// Faz a logo fugir do mouse
document.addEventListener("mousemove", (event) => {
    if (isScared) {
        const mouseX = event.clientX;
        const mouseY = event.clientY;
        const logoRect = logo.getBoundingClientRect();

        // Calcula a direção para fugir do mouse
        const deltaX = logoRect.x + logoRect.width / 2 - mouseX;
        const deltaY = logoRect.y + logoRect.height / 2 - mouseY;

        const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);

        // Ajuste para mais velocidade e distância:
        const moveDistance = Math.min(300, 4000 / distance); // Aumentei a velocidade para 200 (antes era 150)
        const escapeFactor = 4.5; // Aumentei a distância para 3.5 (antes era 2.5)

        const newX = logoRect.x + (deltaX / distance * moveDistance * escapeFactor);
        const newY = logoRect.y + (deltaY / distance * moveDistance * escapeFactor);

        // Mantém a logo dentro da janela
        const maxX = window.innerWidth - logoRect.width;
        const maxY = window.innerHeight - logoRect.height;

        // Transição mais rápida para fugir
        logo.style.transition = "transform 0.1s ease-in-out"; // Ajuste para mais velocidade (antes era 0.2s)
        logo.style.transform = `translate(${Math.max(0, Math.min(maxX, newX)) - logoRect.x}px, ${Math.max(0, Math.min(maxY, newY)) - logoRect.y}px)`;

        // Desativa temporariamente o hover da logo para evitar "piscadas"
        logo.style.pointerEvents = "none";
        
        // Ativa novamente o hover após 200ms (mais rápido para não atrasar)
        clearTimeout(escapeTimeout);
        escapeTimeout = setTimeout(() => {
            logo.style.pointerEvents = "auto";
        }, 200); // Ajustado para 200ms (antes era 300ms)
    }
});

// final do script fuga da ghosthause 



// sobre ghosthause










// works

document.addEventListener("DOMContentLoaded", function () {
    const items = document.querySelectorAll(".galeria_item");
    const prevBtn = document.querySelector(".prev");
    const nextBtn = document.querySelector(".next");
    let currentIndex = 1;

    function updateCarousel() {
        items.forEach((item, index) => {
            item.classList.remove("active", "left", "right" );

            if (index === currentIndex) {
                item.classList.add("active");
            }else if (index === (currentIndex - 1 + items.length) % items.length) {   
                item.classList.add("left");
            }else if (index === (currentIndex + 1) % items.length) {    
                item.classList.add("right");
            }
        });
    }

    prevBtn.addEventListener("click", function (){
        currentIndex = (currentIndex - 1 + items.length) % items.length;
        updateCarousel();
    });

    nextBtn.addEventListener("click", function (){
        currentIndex = (currentIndex + 1) % items.length;
        updateCarousel();
    });
    updateCarousel();
});




// paint

const canvas = document.getElementById("drawingCanvas");
const ctx = canvas.getContext("2d");
let drawing = false;
let color = "#000000";
let size = 5;
let bgColor = "#ffffff";

canvas.addEventListener("mousedown", () => drawing = true);
canvas.addEventListener("mouseup", () => {
    drawing = false;
    ctx.beginPath();
});
canvas.addEventListener("mousemove", draw);

document.getElementById("colorPicker").addEventListener("input", (event) => color = event.target.value);
document.getElementById("sizePicker").addEventListener("input", (event) => size = event.target.value);
document.getElementById("bgColorPicker").addEventListener("input", (event) => {
    bgColor = event.target.value;
    canvas.style.backgroundColor = bgColor;
});

function draw(event) {
    if (!drawing) return;
    ctx.lineWidth = size;
    ctx.lineCap = "round";
    ctx.strokeStyle = color;
    ctx.lineTo(event.offsetX, event.offsetY);
    ctx.stroke();
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
}

function clearCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.fillStyle = bgColor;
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function saveCanvas() {
    const tempCanvas = document.createElement("canvas");
    const tempCtx = tempCanvas.getContext("2d");
    tempCanvas.width = canvas.width;
    tempCanvas.height = canvas.height;

    tempCtx.fillStyle = bgColor;
    tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
    tempCtx.drawImage(canvas, 0, 0);

    const link = document.createElement('a');
    link.download = 'desenho.png';
    link.href = tempCanvas.toDataURL();
    link.click();
}


// info credits

const modal = document.querySelector('.modal_container')

function openModal() {
    modal.classList.add('active')
}

function closeModal() {
    modal.classList.remove('active')
}