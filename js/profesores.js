function iniciarSesion() {
    var correo = document.getElementById('usuario').value;
    var pass = document.getElementById('password').value;

    var loginXHR = new XMLHttpRequest();
    loginXHR.open('POST', 'http://127.0.0.1:81/Hackathon2019/Profesores/login');
    loginXHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    loginXHR.send('mail=' + correo + '&pass=' + pass);
    loginXHR.onreadystatechange = function () {
        if (loginXHR.status == 200 && loginXHR.readyState == 4) {
            console.log(JSON.parse(loginXHR.responseText));
            if (loginXHR.responseText != '0') {
                localStorage.setItem('idProfesor', JSON.parse(loginXHR.responseText).idProfesor);
                localStorage.setItem('nombreProfesor', JSON.parse(loginXHR.responseText).Nombre + JSON.parse(loginXHR.responseText).Apellido);
                
                alert('Exito, ' + JSON.parse(loginXHR.responseText).Nombre);
            }

        }

    }
}

function getAllMaterias() {
    materiasXHR = new XMLHttpRequest();
    materiasXHR.open('GET', 'http://127.0.0.1:81/Hackathon2019/Materias/mostrarAllMateria');
    materiasXHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    materiasXHR.send();
    materiasXHR.onreadystatechange = function () {
        if (materiasXHR.readyState == 4 && materiasXHR.status == 200) {

            var materias = JSON.parse(materiasXHR.responseText);
            for (var i = 0; i < materias.length; i++) {
                //obtiene todas las materias, falta concatenar la variable al select
                var opcionesMaterias = "<option value=" + materias[i].NombreMateria + ">" + materias[i].NombreMateria + "</option>";
                document.getElementById('materia').innerHTML += opcionesMaterias;
                //console.log(opcionesMaterias);
            }
        }
    }
}

function getGrupos() {
    
    var idP = localStorage.getItem('idProfesor');
    gruposXHR = new XMLHttpRequest();
    gruposXHR.open('GET', 'http://127.0.0.1:81/Hackathon2019/Cursos/getGrupos?idProfesor=' + idP);
    gruposXHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    gruposXHR.send();
    gruposXHR.onreadystatechange = function () {
       
        if (gruposXHR.readyState == 4 && gruposXHR.status == 200) {
           
            document.getElementById('nombre').innerHTML = localStorage.getItem('nombreProfesor');
            var grupos = JSON.parse(gruposXHR.responseText);
            console.log(grupos);
            for (var i = 0; i < grupos.length; i++) {
                var grupo = ' <div class="col-xs-12 col-sm-6 col-md-3 grupo flex" onclick=pMateria('+grupos[i].idGrupo+')>' +
                    '<p>' + grupos[i].Grupo + '</p>' +
                    '</div>';
                    localStorage.setItem('idGrupo', grupos[i].idGrupo);
                document.getElementById('grupos').innerHTML += grupo;
            }
        }
    }
}

function getMaterias(idG) {
    var idP = localStorage.getItem('idProfesor');
    var idG = localStorage.getItem('idGrupo');
    materiasXHR = new XMLHttpRequest();
    materiasXHR.open('GET', 'http://127.0.0.1:81/Hackathon2019/Cursos/getMaterias?idProfesor=' + idP + '&idGrupo=' + idG);
    materiasXHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    materiasXHR.send();
    materiasXHR.onreadystatechange = function () {
        if (materiasXHR.readyState == 4 && materiasXHR.status == 200) {
            var materias = JSON.parse(materiasXHR.responseText);
            document.getElementById('nombre').innerHTML = localStorage.getItem('nombreProfesor');
            console.log(materias)
          
            for(var i = 0 ; i < materias.length; i ++ ){
                var materia =  '<div class="col-xs-12 col-sm-12 col-md-3 materia flex-vertical español" onclick="alumnoMateria('+materias[i].idMateria+')">'+
                '<img src="'+materias[i].Media+'">'+
                '<p>'+materias[i].NombreMateria+'</p>'+
           ' </div>';
                document.getElementById('materias').innerHTML += materia;
            }
            document.getElementById('grupo').innerHTML = materias[0].Grupo;
        }
    }
}

function pMateria(idG){
    localStorage.setItem('idGrupo', idG);
    window.location = 'materia.html';
}

function alumnoMateria(idM){
    localStorage.setItem('idMateria', idM );
    window.location = ('alumnos-materia.html');
}

function getAlumnosMateria(){
    var idP = localStorage.getItem('idProfesor');
    var idG = localStorage.getItem('idGrupo');
    var idM = localStorage.getItem('idMateria');
    
    materiasAlumnosHXR = new XMLHttpRequest();
    materiasAlumnosHXR.open('GET', 'http://127.0.0.1:81/Hackathon2019/Alumnos/getAlumnosMaterias?idProfesor=' + idP + '&idGrupo=' + idG+'&idMateria='+ idM);
    materiasAlumnosHXR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    materiasAlumnosHXR.send();
    
    materiasAlumnosHXR.onreadystatechange= function(){
        if (materiasAlumnosHXR.status == 200 && materiasAlumnosHXR.readyState == 4){
            
            
            var alumnos = JSON.parse(materiasAlumnosHXR.responseText);

            for(var i = 0; i<alumnos.length; i++){
                var alumno =  '<div class="col-xs-12 col-sm-5 col-md-5 alumno flex between" id="alumno">'+
                '<h2>'+alumnos[i].Nombre+' '+alumnos[i].Apellidos+'</h2>'+
               ' <i onclick="actividadesA('+alumnos[i].idAlumno+')" class="far fa-file" data-title="Actividades"></i>'+
            '</div>';
            
                document.getElementById('alumnos').innerHTML += alumno;
            }
        }
    }

}

function actividadesA(idA){
    localStorage.setItem('idAlumno', idA);
    window.location = 'actividades.html';
}

function verActividades(){
    var alumno = localStorage.getItem('idAlumno');
    var grupo = localStorage.getItem('idGrupo');
    var profe = localStorage.getItem('idProfesor');

    actividadesXHR = new XMLHttpRequest();
    actividadesXHR.open('GET', 'http://127.0.0.1:81/Hackathon2019/Actividades/getActividadMateria?idProfesor='+profe+'&idGrupo='+grupo+'&idAlumno='+alumno);
    actividadesXHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    actividadesXHR.send();
    
    actividadesXHR.onreadystatechange = function(){
        console.log(actividadesXHR.status)
        if(actividadesXHR.readyState == 4 && actividadesXHR.status == 200){
            //console.log('hola');
            var actividades = JSON.parse(actividadesXHR.responseText);
             //console.log(actividades['res']);
             for(var i = 0; i < actividades['res'].length; i++){
                 console.log('1')
                 var actividad = ' <div class="col-xs-12 col-sm-3 col-md-3 actividad flex-vertical" id="actividad">'+
                ' <b>Calificación</b>'+
                ' <div class="circle verde">'+
                    ' <p>'+actividades["res"][i].Calificacion+'</p>'+
                ' </div>'+
                 '<h2 id="titulo-act">'+actividades["act"][i].NombreActividad+'</h2>'+
                ' <div class="col-xs-12">'+
                     '<b>Materia: </b>'+
                     '<p id="materia">'+actividades["act"][i].NombreMateria+'</p>'+
                 '</div>'+

                 '<div class="col-xs-12">'+
                    ' <b>Descripción: </b>'+
                     '<p id="descripcion">'+actividades["act"][i].Descripcion+'</p>'+
                 '</div>'+
                ' <div class="col-xs-12">'+
                     '<b>Área de conocimiento:</b>'+
                     '<p id="area">'+actividades["act"][i].NombreArea+'</p>'+
                ' </div>'+

                ' <div class="col-xs-12">'+
                    ' <b>Comentario:</b>'+
                     '<p id="comentario">'+actividades["res"][i].Comentario+'</p>'+
                 '</div>'+
             '</div>';
                 document.getElementById('actividades').innerHTML += actividad;
            }
        }
    }
}