var btnAgregar  = document.getElementById("btnAgregar");
var btnCalcular = document.getElementById("btnCalcular");
var contador    = document.getElementById("contador");
var resultados  = document.getElementById("resultados");

var nombres     = [];     
var matrizNotas = [];       

function validarNombre(nombre) {
    if (nombre.trim() === "") {
        alert("El nombre no puede estar vacío.");
        return false;
    }
    return true;
}

function validarNotas(c1, c2, c3) {
    if (isNaN(c1) || isNaN(c2) || isNaN(c3)) {
        alert("Las notas deben ser números.");
        return false;
    }
    if (c1 < 1 || c2 < 1 || c3 < 1 || c1 > 100 || c2 > 100 || c3 > 100) {
        alert("Las notas deben estar entre 1 y 100.");
        return false;
    }
    return true;
}

// Calcula el promedio de un arreglo usando reduce
function calcularPromedio(notas) {
    var suma = notas.reduce(function(acumulador, nota) {
        return acumulador + nota;
    }, 0);
    return suma / notas.length;
}
// Promedio del curso en un certamen (columna de la matriz)
function promedioCertamen(columna) {
    var notasDelCertamen = matrizNotas.map(function(notas) {
        return notas[columna];
    });
    return calcularPromedio(notasDelCertamen);
}
// Promedio general del curso
function promedioGeneral() {
    var promedios = matrizNotas.map(function(notas) {
        return calcularPromedio(notas);
    });
    return calcularPromedio(promedios);
}
// Cuenta los alumnos aprobados (promedio >= 55)
function contarAprobados() {
    return matrizNotas.filter(function(notas) {
        return calcularPromedio(notas) >= 55;
    }).length;
}
// Cuenta los alumnos reprobados (promedio < 55)
function contarReprobados() {
    return matrizNotas.filter(function(notas) {
        return calcularPromedio(notas) < 55;
    }).length;
}
// Ordena los alumnos de mayor a menor promedio
function ordenarAlumnos() {
    var lista = nombres.map(function(nombre, i) {
        return {
            nombre: nombre,
            promedio: calcularPromedio(matrizNotas[i])
        };
    });
    lista.sort(function(a, b) {
        return b.promedio - a.promedio;
    });
    return lista;
}

//mANEJO DEL dom
function mostrarAlumnos() {
    nombres.forEach(function(nombre, i) {
        var promedio    = calcularPromedio(matrizNotas[i]);
        var esReprobado = promedio < 55;

        var div = document.createElement("div");
        div.className = "alumno-card" + (esReprobado ? " reprobado" : "");

        div.innerHTML =
            "<p class='alumno-nombre'>" + nombre + "</p>" +
            "<p>Certamen 1: <strong>" + matrizNotas[i][0] + "</strong></p>" +
            "<p>Certamen 2: <strong>" + matrizNotas[i][1] + "</strong></p>" +
            "<p>Certamen 3: <strong>" + matrizNotas[i][2] + "</strong></p>" +
            "<p class='alumno-promedio'>Promedio: " + promedio.toFixed(2) + "</p>";

        resultados.appendChild(div);
    });
}

function mostrarResumen() {
    var div = document.createElement("div");
    div.className = "resumen";

    div.innerHTML =
        "<h3>Resumen del Curso</h3>" +
        "<p>Promedio Certamen 1 <span>" + promedioCertamen(0).toFixed(2) + "</span></p>" +
        "<p>Promedio Certamen 2 <span>" + promedioCertamen(1).toFixed(2) + "</span></p>" +
        "<p>Promedio Certamen 3 <span>" + promedioCertamen(2).toFixed(2) + "</span></p>" +
        "<p>Promedio General    <span>" + promedioGeneral().toFixed(2) + "</span></p>" +
        "<div class='badges'>" +
            "<div class='badge badge-aprobado'>Aprobados: " + contarAprobados() + "</div>" +
            "<div class='badge badge-reprobado'>Reprobados: " + contarReprobados() + "</div>" +
        "</div>";

    resultados.appendChild(div);
}

function mostrarRanking() {
    var ordenados = ordenarAlumnos();
    var emojis    = ["🥇", "🥈", "🥉"];

    var div = document.createElement("div");
    div.className = "ranking";

    var html = "<h3>Ranking por Promedio</h3>";

    ordenados.forEach(function(alumno, i) {
        var posicion = i < 3 ? emojis[i] : (i + 1) + "°";
        html +=
            "<div class='ranking-item'>" +
                "<span class='ranking-pos'>" + posicion + "</span>" +
                "<span class='ranking-nombre'>" + alumno.nombre + "</span>" +
                "<span class='ranking-promedio'>" + alumno.promedio.toFixed(2) + "</span>" +
            "</div>";
    });

    div.innerHTML = html;
    resultados.appendChild(div);
}

// =============================================
// HELPERS
// =============================================
function limpiarFormulario() {
    document.getElementById("nombre").value    = "";
    document.getElementById("certamen1").value = "";
    document.getElementById("certamen2").value = "";
    document.getElementById("certamen3").value = "";
}

function actualizarContador() {
    contador.textContent = nombres.length + " / 10 alumnos registrados";
}

// Evento: Agregar alumno
btnAgregar.addEventListener("click", function(event) {
    event.preventDefault();

    var nombre = document.getElementById("nombre").value;
    var c1     = Number(document.getElementById("certamen1").value);
    var c2     = Number(document.getElementById("certamen2").value);
    var c3     = Number(document.getElementById("certamen3").value);

    if (!validarNombre(nombre))    return;
    if (!validarNotas(c1, c2, c3)) return;

    nombres.push(nombre);
    matrizNotas.push([c1, c2, c3]);

    actualizarContador();
    limpiarFormulario();
    // Si ya hay 10 alumnos, deshabilitar el botón
    if (nombres.length >= 10) {
        btnAgregar.disabled    = true;
        btnAgregar.textContent = "Máximo alcanzado (10/10)";
    }
});
// Evento: Calcular y mostrar resultados
btnCalcular.addEventListener("click", function() {
    if (nombres.length === 0) {
        alert("Primero agrega al menos un alumno.");
        return;
    }
    // Limpiar resultados anteriores
    resultados.innerHTML = "";

    mostrarAlumnos();
    mostrarResumen();
    mostrarRanking();
    // Scroll suave hacia los resultados
    document.getElementById("seccion-resultados").scrollIntoView({ behavior: "smooth" });
});
