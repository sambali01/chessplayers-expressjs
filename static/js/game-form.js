document.addEventListener("DOMContentLoaded", function () {
    // Szín kiválasztása
    const colorOptions = document.querySelectorAll('.color-option');
    const colorInput = document.getElementById('color-input');

    // Ha már van kiválasztott szín (módosítás esetén)
    if (colorInput.value) {
        colorOptions.forEach(option => {
            if (option.getAttribute('data-color') === colorInput.value) {
                option.classList.add('selected');
            }
        });
    }

    colorOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Töröljük a korábban kijelölt elemeket
            colorOptions.forEach(opt => opt.classList.remove('selected'));
            // Új opció kijelölése
            option.classList.add('selected');
            // A rejtett input frissítése a kiválasztott színnel
            colorInput.value = option.getAttribute('data-color');
        });
    });

    // Eredmény kiválasztása
    const resultOptions = document.querySelectorAll('.result-option');
    const resultInput = document.getElementById('result-input');

    // Ha már van kiválasztott eredmény (módosítás esetén)
    if (resultInput.value) {
        resultOptions.forEach(option => {
            if (option.getAttribute('data-result') === resultInput.value) {
                option.classList.add('selected');
            }
        });
    }

    resultOptions.forEach(option => {
        option.addEventListener('click', () => {
            // Töröljük a korábban kijelölt elemeket
            resultOptions.forEach(opt => opt.classList.remove('selected'));
            // Új opció kijelölése
            option.classList.add('selected');
            // A rejtett input frissítése a kiválasztott eredménnyel
            resultInput.value = option.getAttribute('data-result');
        });
    });
});
