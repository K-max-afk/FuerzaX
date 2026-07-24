let personaje="";
let energia=0;
let cristales=0;


function elegirPersonaje(nombre){

    personaje=nombre;

    document.getElementById("seleccion").innerHTML=
    "Tu explorador será: 🚀 " + personaje;

}



function iniciarJuego(){

    if(personaje==""){

        alert("Primero elige tu explorador");

        return;

    }


    document.getElementById("personajes").style.display="none";

    document.getElementById("juego")
    .classList.remove("oculto");


    document.getElementById("bienvenida")
    .innerHTML=
    "Bienvenido "+personaje+" al mundo de Física Extrema";


}



function resolverReto(){

    energia+=10;
    cristales+=1;


    document.getElementById("energia")
    .innerHTML=energia;


    document.getElementById("cristales")
    .innerHTML=cristales;


    alert(
    "¡Excelente! Descubriste una fuerza en la vida cotidiana.\n\n"+
    "Pronto aprenderás cómo Newton explicó este fenómeno."
    );

}
