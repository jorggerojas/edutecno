function iniciarSesion(){
    var correo =  document.getElementById('usuario').value;
    var pass = document.getElementById('password').value;

    var loginXHR = new XMLHttpRequest();
    loginXHR.open('POST', 'http://127.0.0.1:81/Hackathon2019/Profesores/login');
    loginXHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    loginXHR.send('mail='+ correo +'&pass='+ pass);
    loginXHR.onreadystatechange = function(){
        if(loginXHR.status == 200 && loginXHR.readyState == 4){
            console.log(JSON.parse(loginXHR.responseText));
            if (loginXHR.responseText != '0'){
                localStorage.setItem('idProfesor', JSON.parse(loginXHR.responseText).idProfesor);
                alert('Exito, '+ JSON.parse(loginXHR.responseText).Nombre);
            }

        }
       
    }
}

function getAllMaterias(){
    materiasXHR = new XMLHttpRequest();
    materiasXHR.open('GET', 'http://127.0.0.1:81/Hackathon2019/Materias/mostrarAllMateria');
    materiasXHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    materiasXHR.send();
    materiasXHR.onreadystatechange = function(){
        if(materiasXHR.readyState == 4 && materiasXHR.status == 200){
          
             var materias = JSON.parse(materiasXHR.responseText);
             for(var i = 0; i < materias.length ; i++){
                //obtiene todas las materias, falta concatenar la variable al select
                var opcionesMaterias = "<option value="+materias[i].NombreMateria+">"+materias[i].NombreMateria+"</option>";
                document.getElementById('materia').innerHTML += opcionesMaterias;
                //console.log(opcionesMaterias);
             }
        }
    }
}

function getGrupos(){
    var idP = localStorage.getItem('idProfesor');
    gruposXHR = new XMLHttpRequest();
    gruposXHR.open('GET', 'http://127.0.0.1:81/Hackathon2019/Cursos/getGrupos?idProfesor=' + idP);
    gruposXHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    gruposXHR.send();
    gruposXHR.onreadystatechange = function(){
        if(gruposXHR.readyState == 4 && gruposXHR.status == 200){
            //exito
        }
    }
}

function getMaterias(){
    var idP = localStorage.getItem('idProfesor');
    var idM = localStorage.getItem('idMateria');
    materiasXHR = new XMLHttpRequest();
    materiasXHR.open('GET', 'http://127.0.0.1:81/Hackathon2019/Cursos/getMaterias?idProfesor='+idP+'&idGrupo='+idM);
    materiasXHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    materiasXHR.send();
    materiasXHR.onreadystatechange = function(){
        if(materiasXHR.readyState == 4 && materiasXHR.status == 200){
            //exito 
        }
    }
}