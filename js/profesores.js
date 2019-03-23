function iniciarSesion(){
    var correo =  document.getElementById('usuario');
    var pass = document.getElementById('password');

    var loginXHR = new XMLHttpRequest();
    loginXHR.open('POST', 'http://127.0.0.1:81/Hackathon2019/Profesores/login');
    loginXHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    loginXHR.send('mail='+ 'fer@mail.com' +'&pass='+'12345');
    loginXHR.onreadystatechange = function(){
        if(loginXHR.status == 200 && loginXHR.readyState == 4){
            console.log(JSON.parse(loginXHR.responseText));
            if (loginXHR.responseText != '0'){
                alert('Exito, '+ JSON.parse(loginXHR.responseText).Nombre);
            }

        }
       
    }
}