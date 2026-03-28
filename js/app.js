const boton=document.getElementById("buttonAdd");

var alumnos =[]


boton.addEventListener("click", function(event){
    event.preventDefault()
    const inputValue=document.getElementById("nombre").value;
    let contador = alumnos.push(inputValue);
    console.log(contador)
    if (contador==10){
        boton.hidden=true;
    }
    console.log(alumnos)
});