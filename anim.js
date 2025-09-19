 
 
// Sincronizar las letras con la canción

var audioMusic = document.createElement("AUDIO")
audioMusic.src = "sound/flores.mp3"
document.body.appendChild(audioMusic);

onload = () => {
  document.body.classList.remove("container");
  var message = document.querySelector("#message");
  message.innerHTML = "Da click en una flor Dani Bonita!";

};

const myDiv = document.getElementById('flower');
// Add a click event listener
myDiv.addEventListener('click', function () {
  message.style.opacity = 0;
  message.innerHTML = "";            // You can perform any action here, e.g., change content, redirect, etc.
  playAudio();
});
var lyrics = document.querySelector("#lyrics");

// Array de objetos que contiene cada línea y su tiempo de aparición en segundos
var lyricsData = [
  { text: "Él la estaba esperando con una flor amarilla", time: 16 },
  { text: "Ella lo estaba soñando con la luz en su pupila", time: 24 },
  { text: "Y el amarillo del sol iluminaba la esquina (la esquina)", time: 32 },
  { text: "Lo sentía tan cercano, lo sentía desde niña", time: 39 },
  { text: "Ella sabía que él sabía, que algún día pasaría", time: 45 },
  { text: "Que vendría a buscarla, con sus flores amarillas", time: 49 },
  { text: "No te apures no detengas, el instante del encuentro", time: 59 },
  { text: "Está dicho que es un hecho, no la pierdas no hay derecho", time: 63 },
  { text: "No te olvides, que la vida", time: 66 },
  { text: "Casi nunca está dormida", time: 69 },
  { text: "En ese bar tan desierto los esperaba el encuentro (el encuentro)", time: 93 },
  { text: "Ella llegó en limosina amarilla por supuesto", time: 101 },
  { text: "Él se acercó de repente y la miró tan de frente (de frente)", time: 109 },
  { text: "Toda una vida soñada y no pudo decir nada", time: 117 },
  { text: "Ella sabía que él sabía, que algún día pasaría", time: 123 },
  { text: "Que vendría a buscarla, con sus flores amarillas", time: 126 },
  { text: "No te apures no detengas, el instante del encuentro", time: 136 },
  { text: "Está dicho que es un hecho, no la pierdas no hay derecho", time: 138 },
  { text: "No te olvides, que la vida", time: 143 },
  { text: "Casi nunca está dormida", time: 148 },
  { text: "Ella sabía que él sabía, que algún día pasaría", time: 168 },
  { text: "Que vendría a buscarla, con sus flores amarillas", time: 173 },
  { text: "No te apures no detengas, el instante del encuentro", time: 180 },
  { text: "Está dicho que es un hecho, no la pierdas no hay derecho", time: 183 },
  { text: "No te olvides, que la vida", time: 189 },
  { text: "Casi nunca está dormida", time: 193 },
  { text: "Ella sabía que él sabía", time: 198 },
  { text: "Él sabía, ella sabia, Él sabía, ella sabía y se olvidaron, de sus flores amarillas", time: 301 },

];

// Animar las letras
function updateLyrics() {
  var time = Math.floor(audioMusic.currentTime);
  var currentLine = lyricsData.find(
    (line) => time >= line.time && time < line.time + 6
  );

  if (currentLine) {
    // Calcula la opacidad basada en el tiempo en la línea actual
    var fadeInDuration = 0.1; // Duración del efecto de aparición en segundos
    var opacity = Math.min(1, (time - currentLine.time) / fadeInDuration);

    // Aplica el efecto de aparición
    lyrics.style.opacity = opacity;
    lyrics.innerHTML = currentLine.text;
  } else {
    // Restablece la opacidad y el contenido si no hay una línea actual
    lyrics.style.opacity = 0;
    lyrics.innerHTML = "";
  }
}


// Llama a la función después de 216 segundos (216,000 milisegundos)
setTimeout(playAudio, 500);
setInterval(updateLyrics, 90);

// call this in the root or something
function playAudio() {
  // check for user activation first to avoid the error
  if (navigator.userActivation.hasBeenActive) {
    console.log("User activated, playing audio.");
    audioMusic.play();
    updateLyrics();
  } else {
    console.log("User not activated, tracking activation.");
    trackUserActivation();
  }
}

function trackUserActivation() {
  addEventListener('keydown', onKeyDown);
  addEventListener('mousedown', onUserActivation, { once: true });
  addEventListener('pointerdown', onPointerDown);
  addEventListener('pointerup', onPointerUp);
}

function onKeyDown(event) {
  // ignore the ESC key
  if (event.keyCode === 27) {
    return;
  }
  onUserActivation();
}

function onPointerDown(event) {
  if (event.pointerType !== 'mouse') {
    return;
  }
  onUserActivation();
}

function onPointerUp(event) {
  if (event.pointerType === 'mouse') {
    return;
  }
  onUserActivation();
}

function onUserActivation() {
  if (audioMusic.paused) {
    playAudio();

  }
  removeEventListener('keydown', onKeyDown);
  removeEventListener('mousedown', onUserActivation);
  removeEventListener('pointerdown', onPointerDown);
  removeEventListener('pointerup', onPointerUp);
}
 
