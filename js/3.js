const colorPicker = document.querySelector("#paint");
const previousColors = document.querySelector(".previous-colors");
let chosenColor = "#FFFFFFF";
const paths = document.querySelectorAll("path");
const undo = document.querySelector(".undo");
let history = [];

const download = document.querySelector(".download");


paint.onchange = function () {
    chosenColor = colorPicker.value;
    previousColors.innerHTML += `<div class="prev-color" style="background-color: ${chosenColor}", margin:2%"></div>`; //agrega el color en un cuadradito. Con el += se van agregando cuadraditos de colores (historial de colores seleccionados)
}

//Para poder elegir el color previo (circulos)
previousColors.onclick = function (event) {
    chosenColor = event.target.style.backgroundColor;
}

paths.forEach(function (path) {
    path.onclick = function (event) {
        let originalColor = "rgb(255,255,255)";
        if (event.target.style.fill) {
            originalColor = event.target.style.fill;
        }
        const action = {
            element: event.target,
            previousColor: originalColor,
        }
        history.push(action);
        console.log(history);
        event.target.style.fill = chosenColor;
        chosenColor;
    }
})

//Boton Deshacer
// undo.onclick = function () {
//     const lastItemIndex = history.length - 1;
//     history[lastItemIndex].element.style.fill = history[lastItemIndex].previousColor;

// }

//Descarga de SVG
function downloadSVGAsText() {
    const svg = document.querySelector('#Capa_1');
    const base64doc = btoa(unescape(encodeURIComponent(svg.outerHTML)));
    const a = document.createElement('a');
    const e = new MouseEvent('click');
    a.download = 'download.svg';
    a.href = 'data:image/svg+xml;base64,' + base64doc;
    a.dispatchEvent(e);
}

const downloadSVG = document.querySelector('#downloadSVG');
downloadSVG.addEventListener('click', downloadSVGAsText);


//Boton RESET
let drawing = document.getElementById("Capa_1")
let reset = document.querySelector('.reset')
reset.addEventListener('click', (e) => {
    e.preventDefault()
    let test = drawing.querySelectorAll('path')
    test.forEach((element) => {
        if (e.target.parentNode.id != 'Black' && e.target.id != 'Capa_1') {
            element.style.fill = '#fff'
        }
    })
})

