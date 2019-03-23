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
            
            var grupos = JSON.parse(gruposXHR.responseText);
            console.log(grupos);
            for (var i = 0; i < grupos.length; i++) {
                var grupo = ' <div class="col-xs-12 col-sm-6 col-md-3 grupo flex">' +
                    '<p>' + grupos[i].Grupo + '</p>' +
                    '</div>';
                    localStorage.setItem('idGrupo', grupos[i].idGrupo);
                document.getElementById('grupos').innerHTML += grupo;
            }
        }
    }
}

function getMaterias() {
    var idP = localStorage.getItem('idProfesor');
    var idG = localStorage.getItem('idGrupo');
    materiasXHR = new XMLHttpRequest();
    materiasXHR.open('GET', 'http://127.0.0.1:81/Hackathon2019/Cursos/getMaterias?idProfesor=' + idP + '&idGrupo=' + idG);
    materiasXHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    materiasXHR.send();
    materiasXHR.onreadystatechange = function () {
        if (materiasXHR.readyState == 4 && materiasXHR.status == 200) {
            var materias = JSON.parse(materiasXHR.responseText);
            console.log(materias)
            for(var i = 0 ; i < materias.length; i ++ ){
                var materia =  '<div class="col-xs-12 col-sm-12 col-md-3 materia flex-vertical español" onclick="alumnoMateria()">'+
                '<img src="'+materias[i].Media+'">'+
                '<p>'+materias[i].NombreMateria+'</p>'+
           ' </div>';
                document.getElementById('materias').innerHTML += materia;
            }
        }
    }
}