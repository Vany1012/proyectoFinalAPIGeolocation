window.onload = (e) => {
    console.log('JS is in tha house!');

    function nulls(valor){
        return (valor === null || valor === undefined || valor === "") ? 'Indefinido' : valor;
    }

    const btnBuscar = document.querySelector('#btn-buscar');
    const inpIP = document.querySelector('#ip-input');
        
    function buscarIP(){
        const ip = inpIP.value.toLowerCase().trim();

        if(inpIP.value == ""){
            alert('Ingrese una dirección IP');
        }
        else{
            //Iniciamos el consumo del servicio
            fetch(`https://iplocate.io/api/lookup/${ip}?apikey=f4e95e2eafe47975040d6a9878ccba69`)
            .then((response) => {
                console.log('Datos recibidos:', response);
                return response.json();
            })
            .then((data) => {
            console.log('Datos de la respuesta',data);

            let divRespuesta = document.querySelector('#respuesta');
            divRespuesta.innerHTML = "";
            
            divRespuesta.innerHTML += "<p>Información de IP:</p>";
            divRespuesta.innerHTML += `<li>IP: ${nulls(data.ip)}</li>`
            divRespuesta.innerHTML += `<li>Compañia de internet: ${nulls(data.company.name)}</li>`
            divRespuesta.innerHTML += `<li>Latitud: ${nulls(data.latitude)}</li>`
            divRespuesta.innerHTML += `<li>Longitud: ${nulls(data.longitude)}</li>`
            divRespuesta.innerHTML += `<li>Continente: ${nulls(data.continent)}</li>`
            divRespuesta.innerHTML += `<li>Región: ${nulls(data.subdivision)}</li>`
            divRespuesta.innerHTML += `<li>País: ${nulls(data.country)}</li>`
            divRespuesta.innerHTML += `<li>Ciudad: ${nulls(data.city)}</li>`
            divRespuesta.innerHTML += `<li>Código de país: ${nulls(data.country_code)}</li>`
            divRespuesta.innerHTML += `<li>Código postal: ${nulls(data.postal_code)}</li>`

            let divReportar = document.querySelector('#reportar');
            divReportar.innerHTML = "";

            divReportar.innerHTML += "<p>En caso de detectar un abuso reportar</p>";
            divReportar.innerHTML += `<p>Email: ${nulls(data.abuse.email)}</p>`
            divReportar.innerHTML += `<p>Telefono: ${nulls(data.abuse.phone)}</p>`
            divReportar.innerHTML += `<p>Dirección: ${nulls(data.abuse.address)}</p>`
        
        })

        .catch((error) => {
            console.error('Hubo un error');
            let divRespuesta = document.querySelector('#respuesta');
            let divReportar = document.querySelector('#reportar');
            divRespuesta.innerHTML = "";
            divReportar.innerHTML = "";
            divRespuesta.innerHTML += "<p>La IP ingresada no fue encontrada</p>";
        })
        }
    };
    btnBuscar.addEventListener('click', buscarIP);
    inpIP.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            buscarIP();
        }
    });
}

