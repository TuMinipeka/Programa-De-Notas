const { createElement } = require("react");

const boton=document.getElementById("buttonAdd");


boton.addEventListener("click", function(event){
    event.preventDefault()
    const inputValue=document.getElementById("nombre").value;
    const certamen1=document.getElementById("certamen1").value;
    const certamen2=document.getElementById("certamen2").value;
    const certamen3=document.getElementById("certamen3").value;

    const p =createElement("p")
    p.innerHTML=`Nombre: ${inputValue}`
    
});