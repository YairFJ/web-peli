let page = 1;

const cargarPeliculas = async() => {

    try {const respuesta = await fetch(`https://api.themoviedb.org/3/movie/popular?api_key=8618bbe331898ccfca5f1ad5955e5eda&language=es-AR&page=${page}`)

        let movies = '';

        if(respuesta.status == 200) {
            const datos = await respuesta.json()
            datos.results.forEach(movie => {
                movies += `
                <div class="pelicula">
                    <img class="poster" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}">
                    <h3 class="titulo">${movie.title}</h3>
                </div>
                
                `
            });
        
            document.getElementById('contenedor').innerHTML = movies;

        } else if (respuesta.status === 401) {
            console.log("Esta mal escrito el id");
        } else if (respuesta.status === 404) {
            console.log("La pelicula no existe");
        } else {
            console.log("Ocurrió un error inesperado");
        }
        


    }catch(error){
        console.log(error);
    }
 }

 const btnSiguiente = document.querySelector("#btnSiguiente");
 const btnAnterior = document.querySelector("#btnAnterior")

 btnSiguiente.addEventListener('click', () => {
    if(page < 50){
        page ++;
        cargarPeliculas();
    }
 })

 btnAnterior.addEventListener('click', () => {
    if(page > 1){
        btnSiguiente.disabled = false;
        page --;
        cargarPeliculas();
    }
 })


 
 cargarPeliculas();