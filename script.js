let numPlanes = 200; // Numero di piani
let positions = [];
let images = [];
let planeImages = [];
let imageNames = [  // Array per i nomi delle immagini
    "meme1.png",
    "meme3.png",
    "meme4.png",
    "meme5.png",
    "meme6.png",
    "meme7.png",
    "meme8.png",
    "meme9.png",
    "meme10.png",
    "meme11.png",
    "meme12.png",
    "meme13.png",
    "meme14.png",
    "meme15.png",
    "meme16.png",
    "meme17.png",
    "meme18.png",
    "meme19.png",
    "MEME20.png",
    "MEME21.png",
    "MEME22.png",
    "MEME23.png",
    "MEME24.png",
    "MEME25.png",
    "MEME26.png",
    "MEME27.png",
    "MEME28.png",
    "MEME29.png",
    "MEME30.png",
    "MEME31.png",
    "MEME32.png",
    "MEME33.png",
    "MEME34.png",
    "MEME35.png",
    "MEME36.png",
    "MEME37.png",
    "MEME38.png",
    "MEME39.png",
    "MEME40.png",
    "MEME41.png",
    "MEME42.png",
    "MEME43.png",
    "MEME44.png",
    "MEME45.png",
    "MEME46.png",
    "MEME46.png",
    "MEME47.png",
    "MEME48.png",
    "MEME49.png",
    "MEME50.png",
    "MEME51.png",
    "MEME52.png",
    "MEME53.png",
    "MEME54.png",
    "MEME55.png",
    "MEME56.png",
    "MEME57.png",
    "MEME58.png",
    "MEME59.png",
    "MEME60.png",
    "MEME61.png",
    "MEME62.png",
    "MEME63.png",
    "MEME64.png",
    "MEME65.png",
    "MEME66.png",
    "MEME67.png",
    "MEME68.png",
    "MEME69.png",
    "MEME70.png",
    "MEME71.png",
    "MEME72.png",
    "MEME73.png",
    "MEME74.png",
    "MEME75.png",
    "MEME76.png",
    "MEME77.png",
    "MEME78.png",
    "MEME79.png",
    "MEME80.png",
    "MEME81.png",
    "MEME82.png",
    "MEME83.png",
    "MEME84.png",
    "MEME85.png",
    "MEME86.png",
];

let cameraX = 0, cameraY = 0, zoom = 500;
let targetCameraX = 0, targetCameraY = 0, targetZoom = 500;
let easing = 0.1;
let zoomSpeed = 50;
let moveSpeed = 0.01;

let isDragging = false;
let lastMouseX, lastMouseY;
let minDistance = 170; // Aumentato per distanziare i piani

function preload() {
    for (let i = 0; i < imageNames.length; i++) {
        let imagePath = "images/" + imageNames[i];
        images.push(loadImage(imagePath, 
            () => console.log("✅ Immagine caricata:", imagePath), 
        ));
    }
}

function setup() {
    // Creiamo il canvas che si adatta a tutta la pagina
    createCanvas(windowWidth, windowHeight, WEBGL);
    noStroke();

    if (images.length === 0) {
        return;
    }

    for (let i = 0; i < numPlanes; i++) {
        let newPos;
        let validPosition;

        do {
            newPos = createVector(random(-600, 600), random(-400, 400), random(-600, 600)); // Maggiore distanza
            validPosition = true;

            for (let j = 0; j < i; j++) {
                if (p5.Vector.dist(newPos, positions[j]) < minDistance) {
                    validPosition = false;
                    break;
                }
            }
        } while (!validPosition);

        positions.push(newPos);
        planeImages.push(random(images));
    }
}

function draw() {
    background(255);

    cameraX += (targetCameraX - cameraX) * easing;
    cameraY += (targetCameraY - cameraY) * easing;
    zoom += (targetZoom - zoom) * easing;

    translate(0, 0, -zoom);
    rotateX(cameraY);
    rotateY(cameraX);

    // Mostra i piani 3D
    for (let i = 0; i < numPlanes; i++) {
        push();
        translate(positions[i].x, positions[i].y, positions[i].z);
        if (planeImages[i]) {
            texture(planeImages[i]);
        }
        plane(50, 50);
        pop();
    }

    // Visualizza i nomi dei file in 2D sopra i piani
    displayImageNames();
}

function displayImageNames() {
    // Passiamo alla modalità 2D per il testo
    push();
    resetMatrix();  // Resetta la matrice di trasformazione per passare alla modalità 2D
    textSize(12);  // Grandezza del testo
    textFont("Hoefler Text");  // Font richiesto
    fill(0);  // Colore del testo (nero)
    textAlign(CENTER, TOP);  // Allineamento del testo

    for (let i = 0; i < numPlanes; i++) {
        // Proietta la posizione 3D del piano nella posizione 2D sullo schermo
        let screenPos = createVector(positions[i].x, positions[i].y, positions[i].z);
        let x = map(screenPos.x, -width / 2, width / 2, 0, width);
        let y = map(screenPos.y, -height / 2, height / 2, 0, height);
        
        // Mostra il nome sotto il piano a soli 2px di distanza
        text(imageNames[i], x, y + 2);  // Aggiungi uno spazio di 2px sotto
    }

    pop();  // Torna alla modalità 3D
}

function mouseWheel(event) {
    targetZoom += event.delta * zoomSpeed * 0.1;
}

function mousePressed() {
    isDragging = true;
    lastMouseX = mouseX;
    lastMouseY = mouseY;
}

function mouseReleased() {
    isDragging = false;
}

function mouseDragged() {
    if (isDragging) {
        let deltaX = (mouseX - lastMouseX) * moveSpeed;
        let deltaY = (mouseY - lastMouseY) * moveSpeed;

        targetCameraX += deltaX;
        targetCameraY += deltaY;

        lastMouseX = mouseX;
        lastMouseY = mouseY;
    }
}

// Funzione per adattare il canvas alla dimensione della finestra
function windowResized() {
    resizeCanvas(windowWidth, windowHeight);
}
