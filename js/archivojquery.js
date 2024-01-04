/*Ejecutar JQuery*/
$(document).ready(function() {

  /***************************************************************SELECCIÓN IMAGEN - VIDEO - ANIMACIÓN*******************************************************************/
     /*Al hacer click sobre el objeto1 (Imagen)*/
   $(".objeto1").on('click', () => {

       /*Efecto de transición */
       $(".ocultar, .ocultarVideo, .ocultarAnimacion").fadeOut(0); //Ocultamos ventana principal
       $(".ocultarImagen").fadeIn("slow"); //Mostramos zona de imagen


       /*Se le añade al objeto1 el efecto CSS de seleccionados, que es poner el color rojo y aumentar el tamaño de la lectra*/
       $(".objeto1").addClass("seleccionados");
       /*Borramos la clase seleccionados de los objetos2 y objetos3 si estuvieran seleccionados de antes, de ese modo solo queda seleccionado el objeto1*/
       $(".objeto2, .objeto3").removeClass("seleccionados");
     });

   /*Al hacer click sobre el objeto2 (Video)*/
   $(".objeto2").on('click', () => {

       /*Efecto de transición */
       $(".ocultar, .ocultarImagen, .ocultarAnimacion").fadeOut(0); //Ocultamos ventana principal
       $(".ocultarVideo").fadeIn("slow"); //Mostramos zona de Video

       $(".objeto2").addClass("seleccionados");
       $(".objeto1, .objeto3").removeClass("seleccionados");
     });

   /*Al hacer click sobre el objeto3 (Animación)*/
   $(".objeto3").on('click', () => {

       /*Efecto de transición */
       $(".ocultar, .ocultarImagen, .ocultarVideo").fadeOut(0); //Ocultamos ventana principal
       $(".ocultarAnimacion").fadeIn("slow"); //Mostramos zona de animación

       $(".objeto3").addClass("seleccionados");
       $(".objeto1, .objeto2").removeClass("seleccionados");
     });


/***************************************************************IMAGEN_COLLAGE******************************************************************************************/

 /*Al hacer click sobre el dis_1 coge un collage porque le damos enabled, al que está activo*/
  $("#dis_1:enabled").on('click', () => {

      /*Añadimos un esquema GRID*/
      $(".cambioGRID_Imagen").addClass("GRID_Imagen1");
      /*Eliminamos el otro esquema GRID para que se deseleccione y así poder cambiar de uno y otro, sino se queda perenne el último elegido*/
      $(".cambioGRID_Imagen").removeClass("GRID_Imagen2");
    });


   $("#dis_2:enabled").on('click', () => {

       $(".cambioGRID_Imagen").addClass("GRID_Imagen2");
       $(".cambioGRID_Imagen").removeClass("GRID_Imagen1");
     });


  /**********************************************************************************Marca/Desmarcar imágenes*********************************************************************************/

  /*Detecta los cambios de checkear opciones */
  $('input[type=checkbox]').on('change', function() {

    /*Si seleccionamos (this) se hace lo de dentro*/
    if ($(this).is(':checked')) {

      /*Recorremos los números del 1 al 6 */
      for(i=0; i<7; i++){

        /*Si el valor que marcamos img+número que se encuentra en el html como value="img+nº" */
        if ($(this).val() == "img"+i){


          /*Seleccionamos la imagen+número y añadimos la clase borde */
         imagen = $(".seleccionImagen"+i).addClass("bordeImagen");  //Lo guardamos en la variable global (al no poner let) para usarlo en otra función, la de efectos.

/**********************************************************************************Aplicar efecto*********************************************************************************/
/****************************************BOTÓN*****************************************/
          /*Al hacer click aplica el efecto*/
          $("#aplicar:button").click((h) => {

            for(g=0; g<7; g++){
              
              if ($(this).val() == "img"+g){
                
                /****************************************Detecta los cambios de select************************** */
                  /*Volvemos a hacerlo para poder seleccionar con efectos*/
              $('select#s_efecto').prop('change', function () {

                /*Elegimos switch porque son 3 opciones y se ve más claro */
               switch ($(this).val()) {
                   case ('grayscale'):

                         //Añadimos efecto, hay que dar primero al botón aplicar efectos y luego le damos al número para elegir el porcentaje
                         grayscale = $(".seleccionImagen"+g).addClass('grayscale');

                        //Borramos los efectos no usados
                        $(".seleccionImagenes").each(function(){

                          //Borramos los efectos no usados
                          $("seleccionImagenes").removeClass('sepia', 'invert');

                          /*Para elegir el porcentaje que recibimos del input */
                          $('#porcentaje').click('input', function () {

                              $(".seleccionImagenes").css('filter', 'grayscale(' + $(this).val() + '%)');

                          });
                        });

                         //Borramos la selección al aplicarse el efecto
                         $('*').removeClass('bordeImagen');
                           break;
                   case 'sepia':
                        sepia = $(".seleccionImagen"+g).addClass("sepia");

                        $(".seleccionImagenes").each(function(){

                          $(".seleccionImagenes").removeClass('grayscale', 'invert');

                          $('#porcentaje').click('input', function () {
                            $(".seleccionImagenes").css('filter', 'sepia(' + $(this).val() + '%)');

                          });
                        });

                        $('*').removeClass('bordeImagen');


                           break;
                   case 'invert':
                        invert = $(".seleccionImagen"+g).addClass("invert");

                        $(".seleccionImagenes").each(function(){

                          $(".seleccionImagenes").removeClass('sepia', 'grayscale');

                          $('#porcentaje').on('input', function () {
                            $(".seleccionImagenes").css('filter', 'invert(' + $(this).val() + '%)');

                          });
                        });

                        $('*').removeClass('bordeImagen');


                           break;

               }

               /*Mensaje PopPup que informa de la imagen y el filtro elegidos */
              //  alert("Imagen: "+$(".seleccionImagen"+g).attr("alt")+ '\nFiltro: '+  $(this).val());  //Cogemos la variable de arriba que elige la imagen para seleccionarla y this.val porque estamos eligiendo actualmente el filtro

              /*Historial de las imágenes y efectos */
               historial="<tr><td>"+$(".seleccionImagen"+g).attr("alt")+"</td><td>"+$(this).val()+"</td></tr>"
               $("table tbody").append(historial);


              }); /****************************************FIN SELECT************************** */

            }


          }
        });/****************************************FIN BOTÓN************************** */

        }

      }
    /*Si no está elegido se quita los bordes y efectos */
    }else if (!$(this).is(':checked')) {

      /*Recorremos los números del 1 al 6 */
      for(i=1; i<=6; i++){

        if ($(this).val() == "img"+i){
          /*Seleccionamos la imagen+número y borramos la clase borde */
          $(".seleccionImagen"+i).removeClass("bordeImagen");

          /*Borramos los efectos */
          $(".seleccionImagen"+i).removeClass("grayscale");
          $(".seleccionImagen"+i).removeClass("invert");
          $(".seleccionImagen"+i).removeClass("sepia");


        }
      }
    }

});


/**********************************************************************************VÍDEO con CANVA*********************************************************************************/
/****************************************ELEGIR VÍDEO QUE SE MOSTRARÁ usando CANVA*******************************************************************/
//Quitar las comillas para que me coja CANVA, y hacer que si hacemos click en el botón me realice lo de abajo, me aparezca el vídeo seleccionado.
$(boton_cargar).click(function(){
    // alert("Cargar");

  /*Metemos en la variable si es seleccionado y luego mostramos uno u otro*/
   let selectedOption = $('#videoSeleccion option:selected');
  // $('#divResult').html('Value = ' + selectedOption.val() + " , Text =" + selectedOption.text());

  /*Si el select seleccionado es igual a video01*/
  if($(selectedOption).val() == 'video01'){
    /*Desaparece rápido el vídeo2 si estuviera seleccionado*/
    $("#myVideo2").fadeOut(0);
    /*Aparece lento el vídeo1*/
    $("#myVideo1").fadeIn("slow");
  }else if ($(selectedOption).val() == 'video02'){
    $("#myVideo1").fadeOut(0);
    $("#myVideo2").fadeIn("slow");
    /*Si no seleccionamos ninguno, es decir elegimos Vídeos disponibles */
  }else{
    /*Desaparece ambos vídeos de forma lenta*/
    $("#myVideo1").fadeOut(500);
    $("#myVideo2").fadeOut(500);
  }

  /********************************REPRODUCIR / PAUSAR*******************************************************************************************/
  //Reproducir
  $(boton_reproducir).click(function(){

    if($(selectedOption).val() == 'video01'){
      video1[0].play();
      //Meto pause del otro porque sino cuando le daba a play en el 2º me reproducía la música del 1º
      video2[0].pause();
    }else if ($(selectedOption).val() == 'video02'){
      video2[0].play();
      video1[0].pause();
    }
    
  });

  //Pause
  $(boton_pausar).click(function(){

    if($(selectedOption).val() == 'video01'){
      video1[0].pause();
    }else if ($(selectedOption).val() == 'video02'){
      video2[0].pause();
    }
    
  });

});

/*********************************DEFINIR INICIO DE LA REPRODUCIÓN*************************************************************************/

  let video1 = $('#myVideo1');  //Declaramos la variable cogida de los vídeos 1 y 2
  let video2 = $('#myVideo2');  

  /*Elegir los segundos que queramos que empiece el vídeo */
  $('#segundo').on('input', function() {  //Se activa al introducir dato
    // tiempo = video1[0].duration+ 0.100;  //Muestra la duración y podemos sumarle 0.100 u otro
  //  tiempo2 = video1[0].currentTime;  //Muestra el tiempo que ha reproducido o puesto
    video1[0].currentTime = $(this).val();  //Muestra el tiempo que le ponemos antes de iniciar el vídeo. Metemos en currentTime (video1[0].currentTime) el número introducido ($(this).val()) a mano o con las flechas 
    video2[0].currentTime = $(this).val();  
    //  alert($(this).val());   //Me coge el número que meta a mano o pulsando
    //  alert('Current real: ' + video1[0].currentTime);  //Muestra el tiempo elegido que queremos que empiece la reproducción
  });

  
  

/*******************************ANIMACION**********************************************************************************************************************/
/*Elegir la velocidad del tiempo que durará la animación*/
$("#tiempo").on('input',function(){
  // alert($(this).val());
  $("#animado").animate({animationDuration: + $(this).val() + 's'});//duracion
});

/*Elegir el nivel de borde, de cuadrado a redondo */
$("#borde").on('input',function(){
  // alert($(this).val());
  $("#animado").animate({borderRadius: + $(this).val() + '%'});//Cuadrado a círculo
});

  
});



 /***************************************************************************CANVA**************************************************************************************/
/*Botón que hace que funcione la carga del vídeo */
function cargar(){ 
  let miCanvas=document.getElementById("boton_cargar"); 
  let dibujo=miCanvas.getContext("2d"); 

       /*Agregar texto*/
       dibujo.font="0.8em Verdana"; /*Tamaño de la letra y tipo */
       dibujo.fillText("Cargar",15,68); /*Texto y tamaño */

/*Dibujamos la 1º flecha de las dos flechas que simularía el símbolo de carga */
//Indica al contexto que se va a comenzar un trazado
dibujo.beginPath();
  //Define las coordenadas de inicio (x,y).
  dibujo.moveTo(8,35);
  //Crea una línea desde el punto anterior (8,35) hasta las coordenadas (38,5)  // (x,y)
  dibujo.lineTo(38,5);
  //Crea una línea hasta las nuevas coordenadas (68,35)
  dibujo.lineTo(68,35);
  //Definimos el color de las líneas
  dibujo.strokeStyle="#000099";
//dibuja el contorno del trazado definido anteriormente.
dibujo.stroke();

/*Dibujamos la segunda flecha para simular el símbolo de carga*/
dibujo.beginPath();
  dibujo.moveTo(8,55);
  dibujo.lineTo(38,25);
  dibujo.lineTo(68,55);
dibujo.stroke();
   
  }

  /* Escucha que llama a la función boton cuando se cargue la página*/
  window.addEventListener('load',cargar);


  
/*Botón que hace que funcione la reproducción del vídeo */
function reproducir(){ 
  let miCanvas=document.getElementById("boton_reproducir"); 
  let dibujo=miCanvas.getContext("2d"); 

       dibujo.font="0.8em Verdana"; 
       dibujo.fillText("Reproducir",5,68); 

       dibujo.beginPath();
       //Comenzamos desde la posición horizontal (x) 25 y vertical 5 (y)
       dibujo.moveTo(25,5);
       //Trazamos desde ese punto hasta el punto x=63 e y=30
       dibujo.lineTo(63,30);
       //Desde el trazo anterior, ponemos otro trazo del x=25 al y=55
       dibujo.lineTo(25,55);
       //Color del borde de la figura
       dibujo.strokeStyle="#000000";
       //Cierra el camino creado anteriormente.
       dibujo.closePath();
       //Color de fondo de la figura
       dibujo.fillStyle="#029716";
       //Rellenamos el fondo
       dibujo.fill();
       dibujo.stroke();
       
  }

  window.addEventListener('load',reproducir);


  /*Botón que hace que funcione la pausa del vídeo */
  function pausar(){ 
    let miCanvas=document.getElementById("boton_pausar"); 
    let dibujo=miCanvas.getContext("2d"); 
  
         dibujo.font="0.8em Verdana"; 
         dibujo.fillText("Pausar",18,68); 
         
         //Creamos dos rectángulos
         dibujo.rect(15,5,20,50);
         dibujo.rect(45,5,20,50);
         dibujo.fillStyle="#FF2D00";
         dibujo.fill(); 
    }
  
    window.addEventListener('load',pausar);
 
     

























