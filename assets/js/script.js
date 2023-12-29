
// Cambio de variable selección idioma

var idiomaActual = 'en';

// Cargar el archivo de traducción según el idioma actual
function cargarContenidos() {

    //JSON con las traducciones
    fetch(`../../assets/JSON/${idiomaActual}.json`)
      .then(response => response.json())
      .then(data => {
        // Navbar
        document.getElementById('HOME').innerText = data.navbar.home;
        document.getElementById('COMPANY').innerText = data.navbar.company;
        document.getElementById('FLEET').innerText = data.navbar.fleet;
        document.getElementById('SERVICES').innerText = data.navbar.services;
        document.getElementById('CONTACT').innerText = data.navbar.contact;
        // Quote Form 
        document.getElementById('ORIGIN').placeholder = data.quoteForm.origin;
        document.getElementById('DESTINATION').placeholder = data.quoteForm.destination;
        document.getElementById('DATE').placeholder = data.quoteForm.date;
        document.getElementById('PAX').placeholder = data.quoteForm.pax;
        document.getElementById('SEND').innerText = data.quoteForm.send;
        // Company
        document.getElementById('HEADING1').innerText = data.company.heading1;
        document.getElementById('TEXT1').innerText = data.company.text1;
        document.getElementById('HEADING2').innerText = data.company.heading2;
        document.getElementById('TEXT2').innerText = data.company.text2;
      })
      .catch(error => console.error('Error al cargar los contenidos:', error));
  }

  cargarContenidos()
  


// Asigna eventos a los enlaces de idioma
document.getElementById('EN').addEventListener('click', function () {
    cambiarIdioma('en')
    cargarContenidos()
  });
  
  document.getElementById('ES').addEventListener('click', function () {
    cambiarIdioma('es')
    cargarContenidos()
  });
  
  // Función para cambiar el idioma
  function cambiarIdioma(nuevoIdioma) {
    // Cambiar el idioma actual
    idiomaActual = nuevoIdioma;
  }
  