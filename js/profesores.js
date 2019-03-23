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
                alert('Exito, '+ JSON.parse(loginXHR.responseText).Nombre);
            }

        }
       
    }
}