const boton=document.getElementById("buttonAdd");

var alumnos =[]
var matrizNotas=[]

boton.addEventListener("click", function(event){
    event.preventDefault()
    const inputValue=document.getElementById("nombre").value;
    const c1=Number(document.getElementById("certamen1").value)
    const c2=Number(document.getElementById("certamen2").value)
    const c3=Number(document.getElementById("certamen3").value)
    //Se Guarda El Nombre
    let contador = alumnos.push(inputValue);
    //Se meten las tres notas como arreglo dentro de la Matriz
    matrizNotas.push([c1,c2,c3])
    console.log(contador)
    console.log(alumnos)
    console.log("Matriz de Notas:", matrizNotas);
    if (contador==10){
        boton.hidden=true;
    }
    document.getElementById("nombre").value = "";
    document.getElementById("certamen1").value = "";
    document.getElementById("certamen2").value = "";
    document.getElementById("certamen3").value = "";
});