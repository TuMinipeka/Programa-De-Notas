const boton = document.getElementById("buttonAdd");
const resultados = document.querySelector('#contenido-resultados');
const botonResultados = document.getElementById("buttonCal");
const contadorTexto = document.getElementById("contador-alumnos");

var alumnos = [];
var matrizNotas = [];

// FUNCIONES DE VALIDACIÓN
function validarNombre(nombre) {
    if (nombre.trim() === "") {
        alert("El nombre no puede estar vacío");
        return false;
    }
    return true;
}
function validarNotas(c1, c2, c3) {
    if (isNaN(c1) || isNaN(c2) || isNaN(c3)) {
        alert("Las notas deben ser números válidos");
        return false;
    }
    if (c1 < 1 || c2 < 1 || c3 < 1 || c1 > 100 || c2 > 100 || c3 > 100) {
        alert("Las notas deben estar en el rango de 1 a 100");
        return false;
    }
    return true;
}

// Calcula el promedio de un arreglo de notas usando reduce
function calcularPromedio(notas) {
    return notas.reduce((sum, nota) => sum + nota, 0) / notas.length;
}

// Calcula el promedio de una columna específica de la matriz (un certamen)
function calcularPromedioCertamen(matriz, columna) {
    let notasCertamen = matriz.map(notas => notas[columna]);
    return calcularPromedio(notasCertamen);
}
// Calcula el promedio general del curso
function calcularPromedioGeneral(matriz) {
    let promediosIndividuales = matriz.map(notas => calcularPromedio(notas));
    return calcularPromedio(promediosIndividuales);
}
// Cuenta aprobados (promedio >= 55) usando filter
function contarAprobados(matriz) {
    let promedios = matriz.map(notas => calcularPromedio(notas));
    return promedios.filter(p => p >= 55).length;
}
// Cuenta reprobados (promedio < 55) usando filter
function contarReprobados(matriz) {
    let promedios = matriz.map(notas => calcularPromedio(notas));
    return promedios.filter(p => p < 55).length;
}
// Ordena los alumnos por promedio de mayor a menor usando sort
function ordenarPorPromedio(nombres, matriz) {
    // Crear arreglo de objetos con nombre y promedio
    let alumnosConPromedio = nombres.map((nombre, indice) => ({
        nombre: nombre,
        promedio: calcularPromedio(matriz[indice])
    }));
    // Ordenar de mayor a menor
    alumnosConPromedio.sort((a, b) => b.promedio - a.promedio);
    return alumnosConPromedio;
}

// Muestra el detalle de cada alumno
function mostrarDetalleAlumnos(contenedor, nombres, matriz) {
    nombres.forEach((alumno, indice) => {
        let promedio = calcularPromedio(matriz[indice]);
        let esReprobado = promedio < 55;

        contenedor.innerHTML += `
            <div class="alumno-bloque ${esReprobado ? 'alumno-reprobado' : ''}">
                <p class="alumno-nombre">Nombre ${indice + 1}: ${alumno}</p>
                <p>C1: ${matriz[indice][0]}</p>
                <p>C2: ${matriz[indice][1]}</p>
                <p>C3: ${matriz[indice][2]}</p>
                <p class="alumno-promedio">Promedio: ${promedio.toFixed(2)}</p>
            </div>
        `;
    });
}

// Muestra el resumen del curso
function mostrarResumenCurso(contenedor, matriz) {
    let promedioC1 = calcularPromedioCertamen(matriz, 0);
    let promedioC2 = calcularPromedioCertamen(matriz, 1);
    let promedioC3 = calcularPromedioCertamen(matriz, 2);
    let promedioGeneral = calcularPromedioGeneral(matriz);
    let aprobados = contarAprobados(matriz);
    let reprobados = contarReprobados(matriz);
    contenedor.innerHTML += `
        <div class="resumen-bloque">
            <h3>Resumen del Curso</h3>
            <p>Promedio del curso C1: <span class="resumen-valor">${promedioC1.toFixed(2)}</span></p>
            <p>Promedio del curso C2: <span class="resumen-valor">${promedioC2.toFixed(2)}</span></p>
            <p>Promedio del curso C3: <span class="resumen-valor">${promedioC3.toFixed(2)}</span></p>
            <p>Promedio Final Curso: <span class="resumen-valor">${promedioGeneral.toFixed(2)}</span></p>
            <div class="badge-container">
                <div class="badge badge-aprobado">Aprobados: ${aprobados}</div>
                <div class="badge badge-reprobado">Reprobados: ${reprobados}</div>
            </div>
        </div>
    `;
}

// Muestra el ranking ordenado por promedio
function mostrarRanking(contenedor, nombres, matriz) {
    let ordenados = ordenarPorPromedio(nombres, matriz);

    let rankingHTML = `
        <div class="ranking-bloque">
            <h3>Ranking por Promedio</h3>
    `;

    ordenados.forEach((alumno, indice) => {
        rankingHTML += `
            <div class="ranking-item">
                <span class="ranking-pos">${indice + 1}°</span>
                <span class="ranking-nombre">${alumno.nombre}</span>
                <span class="ranking-promedio">${alumno.promedio.toFixed(2)}</span>
            </div>
        `;
    });

    rankingHTML += `</div>`;
    contenedor.innerHTML += rankingHTML;
}
// Limpia el formulario
function limpiarFormulario() {
    document.getElementById("nombre").value = "";
    document.getElementById("certamen1").value = "";
    document.getElementById("certamen2").value = "";
    document.getElementById("certamen3").value = "";
}
// Actualiza el contador de alumnos
function actualizarContador() {
    contadorTexto.textContent = `Alumnos agregados: ${alumnos.length} / 10`;
}
// EVENTOS
// Evento: Agregar alumno
boton.addEventListener("click", function(event) {
    event.preventDefault();
    const inputValue = document.getElementById("nombre").value;
    const c1 = Number(document.getElementById("certamen1").value);
    const c2 = Number(document.getElementById("certamen2").value);
    const c3 = Number(document.getElementById("certamen3").value);

    // Validaciones
    if (!validarNombre(inputValue)) return;
    if (!validarNotas(c1, c2, c3)) return;

    // Guardar datos
    alumnos.push(inputValue);
    matrizNotas.push([c1, c2, c3]);

    // Actualizar contador
    actualizarContador();

    // Deshabilitar botón si hay 10 alumnos
    if (alumnos.length >= 10) {
        boton.disabled = true;
        boton.textContent = "Máximo de alumnos alcanzado";
    }
    // Limpiar formulario
    limpiarFormulario();
});
// Evento: Calcular y mostrar resultados
botonResultados.addEventListener("click", function(event) {
    event.preventDefault();
    // Verificar que hay alumnos
    if (alumnos.length === 0) {
        alert("No hay alumnos registrados. Agrega al menos uno.");
        return;
    }
    // Limpiar resultados anteriores
    resultados.innerHTML = "";
    // Mostrar detalle de cada alumno
    mostrarDetalleAlumnos(resultados, alumnos, matrizNotas);
    // Mostrar resumen del curso
    mostrarResumenCurso(resultados, matrizNotas);
    // Mostrar ranking ordenado
    mostrarRanking(resultados, alumnos, matrizNotas);
});