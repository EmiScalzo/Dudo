const categoryDeck = {
    easy: [
        "Animales que tengan manchas.", "Cosas de cocina.", "Marcas de zapatillas.", "Frutas rojas.", 
        "Personajes de Disney.", "Cosas para la playa.", "Superhéroes.", "Objetos con pilas.",
        "Nombres de mujer con A.", "Países del mundo.", "Deportes con pelota.", "Sabores de helado.",
        "Herramientas.", "Series de Netflix.", "Cosas de kiosco.", "Animales que vuelan.",
        "Tipos de transporte.", "Colores no primarios.", "Objetos de madera.", "Comidas rápidas.",
        "Nombres de hombre.", "Materias escolares.", "Cosas que hay en un baño.", "Partes de la cara.",
        "Animales de la granja.", "Cosas verdes.", "Marcas de gaseosas.", "Juguetes clásicos.",
        "Cosas que se compran por kilo.", "Ropa de invierno.", "Dulces o golosinas.", "Muebles de una casa.",
        "Cosas que hacen ruido.", "Animales domésticos.", "Frutas con cáscara.", "Cosas que hay en una mochila.",
        "Nombres de flores.", "Países que hablen español.", "Cosas redondas.", "Tipos de calzado."
    ],
    medium: [
        "Capitales de Europa.", "Películas con Oscar.", "Razas de perros.", "Cosas más pesadas que un elefante.",
        "Instrumentos de viento.", "Palabras en inglés de comida.", "Apps del celular.", "Personajes históricos.",
        "Cosas transparentes.", "Marcas de autos de lujo.", "Juegos de mesa.", "Inventos del siglo XX.",
        "Animales marinos (no peces).", "Villanos de cine.", "Cosas de gimnasio.", "Políticos famosos.",
        "Canciones de karaoke.", "Profesiones con uniforme.", "Plantas específicas.", "Partes del cuerpo (bajo cintura).",
        "Ciudades de Estados Unidos.", "Cosas que se encuentran en el espacio.", "Películas de los 90.", "Cantantes solistas.",
        "Cosas que pinchan.", "Instrumentos de cuerda.", "Provincias o estados de tu país.", "Cosas que huelen mal.",
        "Tipos de queso.", "Marcas de tecnología.", "Personajes de videojuegos.", "Cosas que se venden en una farmacia.",
        "Animales en peligro de extinción.", "Deportes olímpicos de invierno.", "Cosas que brillan.", "Tipos de árboles.",
        "Cosas que se heredan.", "Palabras que rimen con 'CASA'.", "Cosas que se hacen en una boda.", "Marcas de cerveza."
    ],
    hard: [
        "Elementos tabla periódica.", "Países sin salida al mar.", "Terror antes de 1980.", "Libros clásicos.",
        "Huesos del cuerpo.", "Ganadores del Mundial (Año/País).", "Cosas menores a 1cm.", "Dinosaurios.",
        "Constelaciones.", "Palabras de más de 5 sílabas.", "Ríos famosos.", "Dioses griegos o romanos.",
        "Premios Nobel.", "Capitales de África o Asia.", "Relojes de alta gama.", "Lenguajes de programación.",
        "Obras de arte.", "Sinónimos de 'inteligente'.", "Tipos de nubes.", "Directores con +1 Oscar.",
        "Elementos químicos gaseosos.", "Sultanes o Emperadores famosos.", "Óperas famosas.", "Cosas que viajan a la velocidad de la luz.",
        "Peces de agua dulce específicos.", "Leyes de la física.", "Filósofos existencialistas.", "Componentes de una placa madre.",
        "Países de Oceanía.", "Subgéneros del Heavy Metal.", "Arquitectos famosos.", "Partes de un motor.",
        "Aves rapaces.", "Siglas de organismos internacionales.", "Cosas que solo existen en la Antártida.", "Monedas del mundo (no Euro/Dólar).",
        "Héroes de la mitología nórdica.", "Cursos de agua subterráneos.", "Especies de tiburones.", "Tratados de paz históricos."
    ]
};

let selectedDifficulty = null;
let timerInterval = null;
const totalTime = 30;
let currentTime = totalTime;

// DOM
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
    
    // Activar botón EMPEZAR
    btnStart.classList.remove('disabled');
    btnStart.disabled = false;
    
    const names = { easy: "Fácil 🟢", medium: "Medio 🟡", hard: "Difícil 🔴" };
    currentDiffNameText.innerText = names[diff];
}

function startGame() {
    if (!selectedDifficulty) return;
    
    // Cambiar fondo según dificultad (usando colores modernos)
    const colors = { easy: "#2ecc71", medium: "#f1c40f", hard: "#e74c3c" };
    body.style.backgroundColor = colors[selectedDifficulty];
    gameDiffBadge.innerText = selectedDifficulty.toUpperCase();
    
    changeCategory(); // Cargar primera categoría

    // Transición suave de pantalla
    screenSetup.classList.remove('active');
    setTimeout(() => {
        screenGame.classList.add('active');
    }, 400);
}

function changeCategory() {
    const deck = categoryDeck[selectedDifficulty];
    const randomCategory = deck[Math.floor(Math.random() * deck.length)];
    categoryText.innerText = randomCategory;
    
    // Reiniciar temporizador
    startTimer();
}

function startTimer() {
    currentTime = totalTime;
    timerText.innerText = currentTime;
    timerText.classList.remove("blink"); // Quitar parpadeo previo
    timerBar.style.width = "100%";
    timerBar.style.backgroundColor = "white"; // Barra siempre blanca
    
    clearInterval(timerInterval);
    
    timerInterval = setInterval(() => {
        currentTime--;
        timerText.innerText = currentTime;
        
        const percentage = (currentTime / totalTime) * 100;
        timerBar.style.width = `${percentage}%`;
        
        // Feedback visual sutil (parpadeo) a los 5s
        if (currentTime <= 5 && currentTime > 0) {
            timerText.classList.add("blink");
        }

        if (currentTime <= 0) {
            clearInterval(timerInterval);
            timerText.innerText = " ¡TIEMPO! ";
            timerText.classList.remove("blink");
        }
    }, 1000);
}

function resetGame() {
    clearInterval(timerInterval);
    
    // Restaurar fondo oscuro
    body.style.backgroundColor = "#121212";
    
    // Transición suave de vuelta
    screenGame.classList.remove('active');
    setTimeout(() => {
        screenSetup.classList.add('active');
        
        // Resetear selección
        selectedDifficulty = null;
        document.querySelectorAll('.btn-diff').forEach(btn => btn.classList.remove('selected'));
        btnStart.classList.add('disabled');
        btnStart.disabled = true;
        currentDiffNameText.innerText = "Ninguna";
    }, 400);
}