document.addEventListener('DOMContentLoaded', function () {
    iniciarApp();
});

function iniciarApp() {
    crearGaleria();
    scrollNav();
    navegacionFija();
}

function navegacionFija() {
    const barra = document.querySelector('.header');
    const sobreFestival = document.querySelector('.sobre-festival');
    const body = document.querySelector('body');


    window.addEventListener('scroll', function() { 

        if( sobreFestival.getBoundingClientRect().bottom < 0  ){

            barra.classList.add('fijo');
            body.classList.add('body-scroll');

        }else {
            barra.classList.remove('fijo');
            body.classList.remove('body-scroll');

        }

        


    });
}


function scrollNav() {
    const enlaces = document.querySelectorAll('.navegacion-principal');
    enlaces.forEach( enlace => {
        enlace.addEventListener('click', function(e) {
            e.preventDefault();

            const sectionScroll = e.target.attributes.href.value;
            const section = document.querySelector(sectionScroll);

            section.scrollIntoView({behavior: "smooth"});
        });
    });
}


function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes');

    for (let i = 1; i <= 12; i++) {

        const imagen = document.createElement('picture');
        imagen.innerHTML = `
            <source srcset="build/img/thumb/${i}.jpg type="image/jpg">
            <img src="build/img/thumb/${i}.jpg" alt="imagen">
        `;

        imagen.onclick = function () {
            mostrarImagen(i);
        }

        galeria.appendChild(imagen);

    }
}

function mostrarImagen(id) {
    const imagen = document.createElement('picture');
    imagen.innerHTML = `
            <source srcset="build/img/grande/${id}.jpg type="image/jpg">
            <img src="build/img/grande/${id}.jpg" alt="imagen">
        `;

    //Crear Overlay con imgaen 

    const overlay = document.createElement('div');
    overlay.appendChild(imagen);
    overlay.classList.add('overlay');
    overlay.onclick = function () {
        const body = document.querySelector('body');
        body.classList.remove('fijar-body');

        overlay.remove();
    }


    //Agregar boton para cerrar modal
    const cerrarModal = document.createElement('P');
    cerrarModal.textContent = 'X';
    cerrarModal.classList.add('btn-cerrar');
    cerrarModal.onclick = function () {

        const body = document.querySelector('body');
        body.classList.remove('fijar-body');

        overlay.remove();
    }
    overlay.appendChild(cerrarModal);


    //Anadirlo al html
    const body = document.querySelector('body');
    body.appendChild(overlay);
    body.classList.add('fijar-body');
}


