$(document).ready(function(){ //Ejecutar funcion "ver" al cargar la pagina y cargar archivo a leer
    console.log('conectado a dates1.js');

   // $('#btn1').click(loadDoc)  
   $('#btn1').click(loadDoc) 

   function loadDoc(){
    $.ajax({
      url: 'gh1.csv',
      dataType: 'text',
    }).done(successFunction)
   }  
   //----Cargar archivo local al abrir la pagina
    // $.ajax({
    //   url: 'gh1.csv',
    //   dataType: 'text',
    // }).done(btn);
    //-------------------------------------------

    //Seleccionar archivo desde el navegador

    const fileSelector = document.getElementById('fl');

    fileSelector.addEventListener('change', event=>{
      const fileList = event.target.files;
      console.log(fileList[0]);

      const reader = new FileReader();
      reader.addEventListener('load', (event)=>{
        const img = document.getElementById('img1');
        //img.src = event.target.result;    
        console.log(event.target.result);
        let doc = event.target.result;
        successFunction(doc)
        dropArea.style.display = "none";
          
      })
      //reader.readAsDataURL(fileList[0]);
      reader.readAsText(fileList[0])
      //reader.onload(console.log(reader.result));
    });  


    //DRAG AND DROP ---------------------------------

const dropArea = document.querySelector(".drop-area");
const dragText = dropArea.querySelector("h3");
const button = dropArea.querySelector("button");
const input = dropArea.querySelector("#fl");
const divDrp = document.querySelector("#drp");
let files;

button.addEventListener('click',(e)=> {input.click()}
);

input.addEventListener('change',(e)=>{
  files= this.files;
  dropArea.classList.add('active');
  showFiles(files);
  dropArea.classList.remove('active');  
});

dropArea.addEventListener('dragover', (e)=>{
  e.preventDefault();
  dropArea.classList.add('active');
  dragText.textContent='Suelta para subir los archivos';
})

dropArea.addEventListener('dragleave', (e)=>{
  dropArea.classList.remove('active');
  dragText.textContent='Arrastra y suelta el archivo';

})

dropArea.addEventListener('drop', (e)=>{
  e.preventDefault();
  files= e.dataTransfer.files;
  showFiles(files);
  dropArea.classList.remove('active');
  dragText.textContent='Arrastra y suelta el archivo';

  const reader = new FileReader();
  reader.addEventListener('load', (event)=>{          
        //console.log(event.target.result);
        let doc = event.target.result;
        successFunction(doc)          
      });
  reader.readAsText(files[0]);
  dropArea.style.display = "none";
})

function showFiles(files) {
  if(files.length === undefined){
    processFile(file);
  }else{
    for (const file of files){
      processFile(file);
    }
    }
}

function processFile(file){
  const docType = file.type;
  console.log(docType);
  const validExtension = ['text/plain','text/csv'];

  if (validExtension.includes(docType)){
    
  }else{
    alert('Archivo no valido');
  }
}



//FIN DRAG AND DROP------------------------------


})
//-----------fin document.ready





const empleado = {
    names: '',
    registros:[
              
    ],
    diaTurno:[],
    turnoCompleto:[],
    otrodiaTurno:[],
    
};

const diasTurno ={
    name:'',
    registros:[],
    turnoCompleto:0,
    tiempoAlmuerzo:0
};


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

}
//fin funcion tiempo turno-----------------------------------------------------------------------------------------------------------

//--------Cargar documento-------------
  
  //Ver contenido del archivo en consola, alert y body del html
  const ver = (data)=>{/*alert(data);*/successFunction(data);/*console.log(verR(data))*/};
  //function verR (data){var R= data.split(/\r?\n|\r/); return R[1];};
// día de la semana
function dia(dia){
  let day;
  switch (new Date(dia).getDay()) {
    case 0:
      day = "Domingo";
      break;
    case 1:
      day = "Lunes";
      break;
    case 2:
       day = "Martes";
      break;
    case 3:
      day = "Miercoles";
      break;
    case 4:
      day = "Jueves";
      break;
    case 5:
      day = "Viernes";
      break;
    case 6:
      day = "Sabado";
  }
  return day
}

  // Agregando datos en la tabla-------------------------------------------------

  function successFunction(data) {
    
    const employes = []; // listar empleados
    let employ = new Set (); //lista de empleados sin repetir
    var allRows = data.split(/\r?\n|\r/);//convertir data en filas
    //var table = '<table class="highlight">';
    //recorrer las filas
    for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
      
      if (singleRow === 0) {
        //table += '<thead>';
        //table += '<tr>';
      } else {
        //table += '<tr>';
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
          //table += '<th>';
          //table += rowCells[rowCell];
          //table += '</th>';
        } else {
          /*if(!employ.has(rowCells[1])){employ.add(rowCells[1]);
            employes.push({
            names: rowCells[2],
            doc: rowCells[1],
          })         
          };//Agregamos cada empleado*/
          //table += '<td>';
          //table += rowCells[rowCell];
          //table += '</td>';
        }
      }
      if (singleRow === 0) {
        //table += '</tr>';
        //table += '</thead>';
        //table += '<tbody>';
      } else {
        //table += '</tr>';
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

    //table += '</tbody>';
    //table += '</table>';
    //$('body').append(table);
    //console.log(employes[1]);
    //console.log(employ);

        //---------------------------- MOSTRAR TODOS en collapsibles --------------------------------------

        var collap = '<div class="container"><ul class="collapsible expandable">\n';
        
        employes.forEach(x=>(
          console.log(x),
           collap+='<li>\n', 
           collap+='<div class="collapsible-header">\n',
           collap+='<i class="material-icons">face</i>\n',  
           collap+=x.doc, collap+= ' - '+x.names, 
           collap+='<span class="new badge">',
           collap+=x.otrodiaTurno.length, 
           collap+='</span>', 
           collap+='</div>',
           collap+= '<div class="collapsible-body">',
                
           console.log(x.doc+'xxxxxxxxxxxxxxxxx'),
           console.log(x.names+'xxxxxxxxxxxxxxxxx'),

           collap+='<table class="striped">\n'+
                    '<thead>\n'+
                      '<tr>\n'+
                        '<th>Día</th>\n'+                        
                        '<th>Fecha</th>\n'+
                        '<th>Turno</th>\n'+
                        '<th>Almuerzo</th>\n'+
                        '<th>Registros</th>\n'+
                      '</tr>\n'+
                    '</thead>\n'+
                    '<tbody>\n',

            x.otrodiaTurno.forEach(x=>(console.log(new Date(new Date(x.name).getTime() + x.turnoCompleto).getHours()//recorrer cada día
            + ':' + new Date(new Date(x.name).getTime() + x.turnoCompleto).getMinutes()),
            console.log(x.name+' '+new Date(x.name)),            
            collap+='<tr>',
            collap+='<td>', 
            collap+= dia(x.name+" "),
            collap+='</td>', 
            collap+='<td>', 
            collap+= x.name,
            collap+='</td>', 
            //collap+='  --Turno->  ', 
            collap+='<td>',
            collap+= new Date(
              new Date(x.name+' ').getTime() 
            + x.turnoCompleto).getHours()
            + ':' + new Date(new Date(x.name).getTime() + x.turnoCompleto).getMinutes().toString(), //formatear en horas y minutos  el total del turno            
            collap+='</td>',  
            //collap+='--Almuerzo->',
            collap+='<td>',          
            collap+= new Date(x.registros[x.registros.length-2]- x.registros[1]+new Date(x.name+' ').getTime()).getHours()+":"+
                     new Date(x.registros[x.registros.length-2]- x.registros[1]+new Date(x.name+' ').getTime()).getMinutes(),
            //collap+="--",
            collap+='</td>',
            //collap+=" -- Registros -->",
            collap+='<td>',


                x.registros.forEach(r=>(collap+=" -- "+new Date(r).getHours()+":"+ new Date(r).getMinutes() +"--")),//recorrer los registros del día  
            collap+='</td>',
            collap+='</tr>'        
                   
            )),
            collap+=  '</tbody>\n'+
                    '</table>\n',     
            collap+= '</div></li>'
        ));
        collap+='</ul></div>\n';

        collap+= '<script>\n'+
        'var elem = document.querySelector(".collapsible.expandable");\n'+
        'var instance = M.Collapsible.init(elem, {\n'+
        'accordion: true\n'+
        '});\n'+         
        '</script>\n'

        $('#div1').append(collap);//lleno el divvv
  }


    
    
 