function getAreas() {
    areaXHR = new XMLHttpRequest();
    areaXHR.open('GET', 'http://127.0.0.1:81/Hackathon2019/Materias/mostrarAllArea');
    areaXHR.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    areaXHR.send();
    areaXHR.onreadystatechange = function () {
        if (areaXHR.readyState == 4 && areaXHR.status == 200) {

            var area = JSON.parse(areaXHR.responseText);
            for (var i = 0; i < area.length; i++) {
                //obtiene todas las materias, falta concatenar la variable al select
                var opcionesArea = "<option value=" + area[i].NombreArea + ">" + area[i].NombreArea + "</option>";
                console.log(opcionesArea);
            }
        }
    }
}

function goBack() {
    window.history.back();
}