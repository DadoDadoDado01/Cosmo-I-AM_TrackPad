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
    "meme20.png",
    "meme21.png",
    "meme22.png",
    "meme23.png",
    "meme24.png",
    "meme25.png",
    "meme26.png",
    "meme27.png",
    "meme28.png",
    "meme29.png",
    "meme30.png",
    "meme31.png",
    "meme32.png",
    "meme33.png",
    "meme34.png",
    "meme35.png",
    "meme36.png",
    "meme37.png",
    "meme38.png",
    "meme39.png",
    "meme40.png",
    "meme41.png",
    "meme42.png",
    "meme43.png",
    "meme44.png",
    "meme45.png",
    "meme46.png",
    "meme46.png",
    "meme47.png",
    "meme48.png",
    "meme49.png",
    "meme50.png",
    "meme51.png",
    "meme52.png",
    "meme53.png",
    "meme54.png",
    "meme55.png",
    "meme56.png",
    "meme57.png",
    "meme58.png",
    "meme59.png",
    "meme60.png",
    "meme61.png",
    "meme62.png",
    "meme63.png",
    "meme64.png",
    "meme65.png",
    "meme66.png",
    "meme67.png",
    "meme68.png",
    "meme69.png",
    "meme70.png",
    "meme71.png",
    "meme72.png",
    "meme73.png",
    "meme74.png",
    "meme75.png",
    "meme76.png",
    "meme77.png",
    "meme78.png",
    "meme79.png",
    "meme80.png",
    "meme81.png",
    "meme82.png",
    "meme83.png",
    "meme84.png",
    "meme85.png",
    "meme86.png",
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
