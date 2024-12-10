// Funkcija, kuri gauna dabartinį laiką ir formatuoja jį kaip "HH:MM:SS"
function getCurrentTime() {
    const now = new Date();
    let hours = now.getHours().toString().padStart(2, '0');  // Užtikrina, kad valandos bus dvejetos
    let minutes = now.getMinutes().toString().padStart(2, '0');  // Užtikrina, kad minutės bus dvejetos
    let seconds = now.getSeconds().toString().padStart(2, '0');  // Užtikrina, kad sekundės bus dvejetos

    return `${hours}:${minutes}:${seconds}`;
}

// Funkcija, kuri atnaujina laikrodį
function updateClock() {
    const clockElement = document.getElementById('clock');
    clockElement.textContent = getCurrentTime();
}

// Atnaujinti laiką kas sekundę
setInterval(updateClock, 1000);

// Pirmas atnaujinimas, kad laikrodis pradėtų veikti iškart
updateClock();