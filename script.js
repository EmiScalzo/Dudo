const categoryDeck = {
    easy: [
        "Animales que tengan manchas.", "Cosas de cocina.", "Marcas de zapatillas.", "Frutas rojas.", 
        "Personajes de Disney.", "Cosas para la playa.", "Superhéroes.", "Objetos con pilas.",
        "Nombres de mujer con A.", "Países del mundo.", "Deportes con pelota.", "Sabores de helado.",
        "Herramientas.", "Series de Netflix.", "Cosas de kiosco.", "Animales que vuelan.",
        "Tipos de transporte.", "Colores no primarios.", "Objetos de madera.", "Comidas rápidas.",
        "Nombres de hombre.", "Materias escolares.", "Partes de la cara.", "Animales de la granja.", 
        "Cosas verdes.", "Marcas de gaseosas.", "Juguetes clásicos.", "Ropa de invierno.", 
        "Dulces o golosinas.", "Clubes de fútbol argentino.", "Idiomas.", "Razas de perros.",
        "Modismos (Jerga común).", "Carreras de la facultad.", "Personas de la farándula argentina."
    ],
    medium: [
        "Capitales de Europa.", "Películas con Oscar.", "Cosas más pesadas que un elefante.",
        "Instrumentos de viento.", "Palabras en inglés de comida.", "Apps del celular.", "Personajes históricos.",
        "Cosas transparentes.", "Marcas de autos de lujo.", "Juegos de mesa.", "Inventos del siglo XX.",
        "Villanos de cine.", "Cosas de gimnasio.", "Políticos famosos.", "Canciones de karaoke.", 
        "Profesiones con uniforme.", "Plantas específicas.", "Partes del cuerpo (bajo cintura).",
        "Juegos de Play o PC (Sin secuelas).", "Enfermedades.", "Elementos de carpintería.", "Drogas.", 
        "Tragos (Cocteles).", "Apellidos de presidentes argentinos.", "Monedas mundiales.", 
        "Frases célebres de la argentina.", "Cosas que se encuentran en el espacio.", "Cantantes solistas."
    ],
    hard: [
        "Elementos tabla periódica.", "Países sin salida al mar.", "Terror antes de 1980.", "Libros clásicos.",
        "Huesos del cuerpo.", "Ganadores del Mundial (Año/País).", "Cosas menores a 1cm.", "Dinosaurios.",
        "Constelaciones.", "Palabras de más de 5 sílabas.", "Ríos famosos.", "Dioses griegos o romanos.",
        "Premios Nobel.", "Capitales de África o Asia.", "Relojes de alta gama.", "Lenguajes de programación.",
        "Obras de arte.", "Sinónimos de 'inteligente'.", "Directores con +1 Oscar.", "Dictadores.",
        "Maneras de decirle al aparato reproductor masculino.", "Maneras de decirle al aparato reproductor femenino.",
        "Sultanes o Emperadores famosos.", "Leyes de la física.", "Filósofos existencialistas.", "Países de Oceanía.",
        "Siglas de organismos internacionales.", "Tratados de paz históricos.", "Óperas famosas."
    ]
};

let selectedDifficulty = null;
let timerInterval = null;
const totalTime = 30;
let currentTime = totalTime;

const body = document.body;
const screenSetup = document.getElementById('screen-setup');
const screenGame = document.getElementById('screen-game');
const btnStart = document.getElementById('btn-start');
const currentDiffNameText = document.getElementById('current-diff-name');
const categoryText = document.getElementById('category-text');
const gameDiffBadge = document.getElementById('game-diff-badge');
const timerText = document.getElementById('timer-text');
const timerBar = document.getElementById('timer-bar');

function selectDifficulty(diff) {
    selectedDifficulty = diff;
    document.querySelectorAll('.btn-diff').forEach(btn => btn.classList.remove('selected'));
    document.querySelector(`.btn-diff.${diff}`).classList.add('selected');
    
    btnStart.classList.remove('disabled');
    btnStart.disabled = false;
    
    const names = { easy: "Fácil 🟢", medium: "Medio 🟡", hard: "Difícil 🔴", any: "Cualquiera 🎲" };
    currentDiffNameText.innerText = names[diff];
}

function startGame() {
    if (!selectedDifficulty) return;
    
    const colors = { easy: "#2ecc71", medium: "#f1c40f", hard: "#e74c3c", any: "#9b59b6" };
    body.style.backgroundColor = colors[selectedDifficulty];
    gameDiffBadge.innerText = selectedDifficulty === 'any' ? "MIX" : selectedDifficulty.toUpperCase();
    
    changeCategory();

    screenSetup.classList.remove('active');
    setTimeout(() => {
        screenGame.classList.add('active');
    }, 400);
}

function changeCategory() {
    let deck;
    if (selectedDifficulty === 'any') {
        // Mezcla todas las categorías de todos los niveles
        deck = [...categoryDeck.easy, ...categoryDeck.medium, ...categoryDeck.hard];
    } else {
        deck = categoryDeck[selectedDifficulty];
    }
    
    const randomCategory = deck[Math.floor(Math.random() * deck.length)];
    categoryText.innerText = randomCategory;
    startTimer();
}

function startTimer() {
    currentTime = totalTime;
    timerText.innerText = currentTime;
    timerText.classList.remove("blink");
    timerBar.style.width = "100%";
    
    clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        currentTime--;
        timerText.innerText = currentTime;
        
        const percentage = (currentTime / totalTime) * 100;
        timerBar.style.width = `${percentage}%`;
        
        if (currentTime <= 5 && currentTime > 0) {
            timerText.classList.add("blink");
        }

        if (currentTime <= 0) {
            clearInterval(timerInterval);
            timerText.innerText = "¡TIEMPO!";
            timerText.classList.remove("blink");
        }
    }, 1000);
}

function resetGame() {
    clearInterval(timerInterval);
    body.style.backgroundColor = "#121212";
    screenGame.classList.remove('active');
    setTimeout(() => {
        screenSetup.classList.add('active');
        selectedDifficulty = null;
        document.querySelectorAll('.btn-diff').forEach(btn => btn.classList.remove('selected'));
        btnStart.classList.add('disabled');
        btnStart.disabled = true;
        currentDiffNameText.innerText = "Ninguna";
    }, 400);
}
