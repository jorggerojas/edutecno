function iniciarSesionP(){
    var clave = document.getElementById('clave').value;
    var fecha = document.getElementById('nac').value;
    var inicioXHR = new XMLHttpRequest();
    console.log(fecha)

    inicioXHR.open('POST', 'http://127.0.0.1:81/Hackathon2019/Padres/login');
    inicioXHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    inicioXHR.send('idAlumno=' + clave + '&fechaNacimiento=' + fecha);
    inicioXHR.onreadystatechange = function (){
        if(inicioXHR.readyState == 4 && inicioXHR.status == 200){
            //console.log(JSON.parse(inicioXHR.responseText));
            var alumno = JSON.parse(inicioXHR.responseText);
            if(alumno[0].idAlumno != 0){
                //console.log(alumno[0].idCurso);
                localStorage.setItem('idAlumno', alumno[0].idAlumno);
                localStorage.setItem('idGrupo', alumno[0].idGrupo);
                window.location = 'revision-actividad.html';

            }else{
               
                alert('Credenciales no validas')
            }

        }
    }
}

function materiasHijo(){
    localStorage.setItem('idAlumno',);
    localStorage.setItem('idCurso', );
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
                '<p>'+materias[i].promedio+'">'+
                '<p>'+materias[i].NombreMateria+'</p>'+
           ' </div>';
                document.getElementById('materias').innerHTML += materia;
                localStorage.setItem('idCurso', materias[i].idCurso);
            }
            document.getElementById('grupo').innerHTML = materias[0].Grupo;
        }
    }
}