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
});

