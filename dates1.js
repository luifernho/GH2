$(document).ready(function(){
    console.log('conectado a dates1.js')    

   // $('#btn1').click(loadDoc)

    $.ajax({
      url: 'gh1.csv',
      dataType: 'text',
    }).done(ver);
})

const empleado = {
    names: 'Diana Fernanda',
    registros:[
        '2024-08-07 7:17:49',
        '2024-08-08 12:03:49',
        '2024-08-07 13:00:49',
        '2024-08-08 17:17:49',
        '2024-08-08 8:01:49',
        '2024-08-07 11:56:49',
        '2024-08-07 12:49:49',
        '2024-08-07 17:17:49',
        '2024-08-06 8:01:49',
        '2024-08-06 11:56:49',
        '2024-08-06 12:49:49',        
    ],
    diaTurno:[],
    turnoCompleto:[],
    otrodiaTurno:[],
    
}

const diasTurno ={
    name:'',
    registros:[],
    turnoCompleto:0,
    tiempoAlmuerzo:0
};

//console.log(empleado);
//$('body').append(`<p>${empleado.names}</p>`);

const date1 = new Date(empleado.registros[0]);
const date2 = new Date(empleado.registros[3])
const result1 = new Date (date2 - date1);

/*console.log(date1+" \n"+date2+" \n"+result1.getHours()+":"+result1.getMinutes()+
"::"+result1.getUTCMinutes()+"\n\n\n\n\n\n");*/

//------------------------------------------------------------------------------------------------------------
//ordenar registros


function ordernarDate(empleado){
    let i = 0;
    empleado.registros.forEach(elm => {
        let F = new Date(elm);
        empleado.registros[i] = F.getTime();
        i++;
        });
    empleado.registros.sort();
}

//------------------------------------------------------------------------------------------------------------
//tiempo del turno

console.log('***********'+empleado.registros.length);

function tiempoTurno(empleado){
    let fTurnIni =0;
    let fTurnFin =0;
    let tiempoTurno=0;
    let set = new Set(); 
    let tiemposTurno=[];
    let turnoCompleto=[];

    for(let i=0; i < empleado.registros.length;i++){//recorrer registros de registros del empleado
        //console.log(empleado.registros[i]+"***");

        let diaTurno= new Date (empleado.registros[i]).getFullYear().toString()+'-'+ //crear dia turno en texto
        (parseInt(new Date (empleado.registros[i]).getMonth().toString())+1)+'-'+
        new Date (empleado.registros[i]).getDate().toString();

        // Separamos dias y buscamos el registro inicial y final de cada día
        
        
        if(set.has(diaTurno) ){
            fTurnFin= empleado.registros[i];
            tiempoTurno= fTurnFin - fTurnIni;
            diasTurno.registros.push(empleado.registros[i]);//objeto diasTurno  
            let horasTurno = new Date (new Date(diaTurno).getTime()+ tiempoTurno);             
            //console.log(fTurnFin +" final "+new Date(fTurnFin));
            //transformar a horas tiempoTurno
            /*console.log(tiempoTurno+'----------------'+ new Date(new Date(diaTurno).getTime()+tiempoTurno).getHours()+
            ':'+new Date(new Date(diaTurno).getTime()+tiempoTurno).getMinutes()+" horas turno "+horasTurno.getHours());*/
            tiemposTurno.push(tiempoTurno);            
        }else{
            set.add(diaTurno);
            //let diaTurno={}; //creador de objetos dias turno      
            if(tiemposTurno.length>0){turnoCompleto.push(tiemposTurno[tiemposTurno.length-1])}//agrego el ultimo registro
            diasTurno.turnoCompleto= tiemposTurno[tiemposTurno.length-1];
            if(diasTurno.registros.length>0){empleado.otrodiaTurno.push({
                name:diasTurno.name,
                registros:diasTurno.registros,
                turnoCompleto:diasTurno.turnoCompleto,
                tiempoAlmuerzo:diasTurno.tiempoAlmuerzo
            });diasTurno.registros=[]}; 
            diasTurno.name= diaTurno; //objeto diasTurno          
            fTurnIni= empleado.registros[i];
            fTurnFin= empleado.registros[i];
            tiempoTurno= fTurnFin - fTurnIni;
            tiemposTurno.push(tiempoTurno);
            //console.log(fTurnIni+' ini  '+new Date(fTurnIni))
            diasTurno.registros.push(empleado.registros[i]); //objeto diasTurno  
        }
                
    }
    //empleado.otrodiaTurno.push(diasTurno);//objeto dias turno
    if(tiemposTurno.length>0){turnoCompleto.push(tiemposTurno[tiemposTurno.length-1])};//agrego el ultimo
    diasTurno.turnoCompleto= tiemposTurno[tiemposTurno.length-1];
    empleado.otrodiaTurno.push({
        name:diasTurno.name,
        registros:diasTurno.registros,
        turnoCompleto:diasTurno.turnoCompleto,
        tiempoAlmuerzo:diasTurno.tiempoAlmuerzo
    });
    turnoCompleto.forEach(x=>(empleado.turnoCompleto.push(x)));
    set.forEach(x=>(empleado.diaTurno.push(x)));   

    //console.log(set);    
    //console.log(turnoCompleto);
    //console.log(empleado);

}
//-----------------------------------------------------------------------------------------------------------

//ordernarDate(empleado);
//tiempoTurno(empleado);


/*empleado.registros.forEach(element => {
    let F = new Date(element);
    console.log(F);
}); */
    


const nd = new Date (2024,7,8);
const hora = nd.getTime() + 36000000 
//console.log(nd+"Fecha con hora en ceros "+new Date(hora));

//-------------------------------------------------------------------------------------------------------------


//--------Cargar documento-------------

/*function loadDoc() {
    const xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
      if (this.readyState == 4 && this.status == 200) {
        //document.getElementById("div1").innerHTML = this.responseText;
        $('#div1').text(this.responseText);
        console.log(this.responseText);
      }
    };
    xhttp.open("GET", "text1.txt");
    xhttp.send();
  }*/
  
  //Ver contenido del archivo en consola, alert y body del html
  const ver = (data)=>{alert(data);successFunction(data);console.log(verR(data))};
  function verR (data){var R= data.split(/\r?\n|\r/); return R[1];};

  // Agregando datos en la tabla-------------------------------------------------






  function successFunction(data) {
    
    const employes = []; // listar empleados
    let employ = new Set (); //lista de empleados sin repetir
    var allRows = data.split(/\r?\n|\r/);//convertir data en filas
    var table = '<table class="highlight">';
    //recorrer las filas
    for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
      
      if (singleRow === 0) {
        table += '<thead>';
        table += '<tr>';
      } else {
        table += '<tr>';
      }
      var rowCells = allRows[singleRow].split(';');//dividir fila en celdas
      //sino existe employ agregretar el 1ro --------------LISTAR EMPLEADOS ----------------------
      if(singleRow>0 && singleRow<allRows.length-1 && !employ.has(rowCells[1])){
        employ.add(rowCells[1]);
        employes.push({doc:rowCells[1],names:rowCells[2],reg:[rowCells[3]]});        
      }
      else{for(let x=0; x < employes.length; x++){if(employes[x].doc==rowCells[1]){employes[x].reg.push(rowCells[3])}}};
      // --------------------------------------------------FIN LISTAR EMPLEADOS -------------------

      
      if(singleRow===0){rowCells.push("Turno");}else{rowCells.push("")}//Agregamos columna Turno
      if(singleRow===0){rowCells.push("Almuerzo");}else{rowCells.push("")}//Agregamos columna Almuerzo
      //Recorrer celdas de la fila
      for (var rowCell = 0; rowCell < rowCells.length; rowCell++) {
        if (singleRow === 0) {
          table += '<th>';
          table += rowCells[rowCell];
          table += '</th>';
        } else {
          /*if(!employ.has(rowCells[1])){employ.add(rowCells[1]);
            employes.push({
            names: rowCells[2],
            doc: rowCells[1],
          })         
          };//Agregamos cada empleado*/
          table += '<td>';
          table += rowCells[rowCell];
          table += '</td>';
        }
      }
      if (singleRow === 0) {
        table += '</tr>';
        table += '</thead>';
        table += '<tbody>';
      } else {
        table += '</tr>';
      }
    } 

    //-------------------------- ORDENAR REGISTROS -----------------------------------

    for(let x=0; x < employes.length; x++){
      empleado.names= employes[x].names;
      empleado.registros= employes[x].reg;
      ordernarDate(empleado);
      employes[x].reg= empleado.registros;
    };

    //---------------------------FIN ORDENAR REGISTROS -------------------------------

    // --------------------------TIEMPOS TURNO ---------------------------------------

    for(let x=0; x < employes.length; x++){
      empleado.names= employes[x].names;
      empleado.registros= employes[x].reg;
      empleado.diaTurno = [];
      empleado.turnoCompleto = [];
      empleado.otrodiaTurno = [];

      diasTurno.name='';
      diasTurno.registros=[];
      diasTurno.turnoCompleto=0;
      diasTurno.tiempoAlmuerzo=0;
      
      tiempoTurno(empleado);      
      employes[x].otrodiaTurno= empleado.otrodiaTurno;

    };

    //--------------------------- FIN TIEMPOS TURNOS ----------------------------------

    table += '</tbody>';
    table += '</table>';
    //$('body').append(table);
    console.log(employes[1]);
    console.log(employ);

        //---------------------------- MOSTRAR TODOS --------------------------------------
        var table2 = '<table class="highlight">';
        table2+='<thead><tr><th>Documento</th><th>Nombres</th><th>Fecha</th><th>Tiempo Turno</th></tr></thead>';
        table2+='<tbody>'; 
        employes.forEach(x=>(
          console.log(x),  
          table2+='<tr> <td>', table2+=x.doc, table2+='</td>',
          table2+='<td>', table2+=x.names, table2+='</td></tr>',        
          console.log(x.doc+'xxxxxxxxxxxxxxxxx'),
          console.log(x.names+'xxxxxxxxxxxxxxxxx'),
            x.otrodiaTurno.forEach(x=>(console.log(new Date(new Date(x.name).getTime() + x.turnoCompleto).getHours()
            + ':' + new Date(new Date(x.name).getTime() + x.turnoCompleto).getMinutes()),
            console.log(x.name+' '+new Date(x.name)),
            table2+='<tr><td></td><td></td>',
            table2+='<td>', table2+= x.name, table2+='</td>',
            table2+='<td>', table2+= new Date(
              new Date(x.name+' ').getTime() 
            + x.turnoCompleto).getHours()
            + ':' + new Date(new Date(x.name).getTime() + x.turnoCompleto).getMinutes().toString(), 
            table2+='</td></tr>'         
        
        ))

        ));
        table2+='</tbody>';
        table2+='</table>'
        $('#div1').append(table2);//lleno el div
  }


    
    
 