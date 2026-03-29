const boton=document.getElementById("buttonAdd");

var alumnos =[]
var matrizNotas=[]

boton.addEventListener("click", function(event){
    event.preventDefault()
    const inputValue=document.getElementById("nombre").value;
    const c1=Number(document.getElementById("certamen1").value)
    const c2=Number(document.getElementById("certamen2").value)
    const c3=Number(document.getElementById("certamen3").value)
    //Validacion De Espacios
    if (inputValue===""){
        alert("Nombre incompletos")
        return;
    }
    //Validacion de Rango 1 a 100
    if (c1 < 1 || c2 < 1 || c3 < 1 || c1 > 100 || c2 > 100 || c3 > 100){
        alert("Nota fuera de rango (1-100)")
        return;
    }
    //Se Guarda El Nombre
    let contador = alumnos.push(inputValue);
    console.log(alumnos)
    //Se meten las tres notas como arreglo dentro de la Matriz
    matrizNotas.push([c1,c2,c3])
    console.log(matrizNotas)
    if (contador==10){
        boton.hidden=true;
    }
    document.getElementById("nombre").value = "";
    document.getElementById("certamen1").value = "";
    document.getElementById("certamen2").value = "";
    document.getElementById("certamen3").value = "";
});

//Calcular y Dom
const resultados = document.querySelector('#contenido-resultados');
const botonResultados = document.getElementById("buttonCal");

botonResultados.addEventListener("click", function(event){ 
    event.preventDefault();
    resultados.innerHTML = "";
    alumnos.forEach((alumno,indice) => {
        resultados.innerHTML+=`<p>(${indice+1}: ${alumno})</p>`;
        resultados.innerHTML+=`<p>C1: ${matrizNotas[indice][0]}</p>`;
        resultados.innerHTML+=`<p>C2: ${matrizNotas[indice][1]}</p>`;
        resultados.innerHTML+=`<p>C3: ${matrizNotas[indice][2]}</p>`;
        let promedio = ((matrizNotas[indice][0] + matrizNotas[indice][1] + matrizNotas[indice][2]) / 3).toFixed(2);
        resultados.innerHTML += `<p>Promedio: ${promedio}</p>`;
    });
    // Promedio del curso por certamen
let promedioC1 = matrizNotas.map(notas => notas[0]).reduce((sum, nota) => sum + nota, 0) / alumnos.length;
let promedioC2 = matrizNotas.map(notas => notas[1]).reduce((sum, nota) => sum + nota, 0) / alumnos.length;
let promedioC3 = matrizNotas.map(notas => notas[2]).reduce((sum, nota) => sum + nota, 0) / alumnos.length;

// Promedio general del curso
let promedioGeneral = ((promedioC1 + promedioC2 + promedioC3) / 3).toFixed(2);

// Aprobados y reprobados
let promedios = matrizNotas.map(notas => (notas[0] + notas[1] + notas[2]) / 3);
let aprobados = promedios.filter(p => p >= 55).length;
let reprobados = promedios.filter(p => p < 55).length;

// Mostrar en el DOM
resultados.innerHTML += `<br>`;
resultados.innerHTML += `<p>Promedio del curso C1: ${promedioC1.toFixed(2)}</p>`;
resultados.innerHTML += `<p>Promedio del curso C2: ${promedioC2.toFixed(2)}</p>`;
resultados.innerHTML += `<p>Promedio del curso C3: ${promedioC3.toFixed(2)}</p>`;
resultados.innerHTML += `<p>Promedio Final Curso: ${promedioGeneral}</p>`;
resultados.innerHTML += `<p>Aprobados: ${aprobados}</p>`;
resultados.innerHTML += `<p>Reprobados: ${reprobados}</p>`;
});

