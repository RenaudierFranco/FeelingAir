
// Cambio de variable selección idioma

var idiomaActual = 'en';

// Cargar el archivo de traducción según el idioma actual
function cargarContenidos() {

    //JSON con las traducciones
    fetch(`../../assets/JSON/${idiomaActual}.JSON`)
      .then(response => response.json())
      .then(data => {
        // Navbar
        document.getElementById('NAVBAR_HOME').innerText = data.navBar.home;
        document.getElementById('NAVBAR_COMPANY').innerText = data.navBar.company;
        document.getElementById('NAVBAR_FLEET').innerText = data.navBar.fleet;
        document.getElementById('NAVBAR_SERVICES').innerText = data.navBar.services;
        document.getElementById('NAVBAR_CONTACT').innerText = data.navBar.contact;
        // Quote Form 
        document.getElementById('QUOTE_FORM_ORIGIN').placeholder = data.quoteForm.origin;
        document.getElementById('QUOTE_FORM_DESTINATION').placeholder = data.quoteForm.destination;
        document.getElementById('QUOTE_FORM_DATE').placeholder = data.quoteForm.date;
        document.getElementById('QUOTE_FORM_PAX').placeholder = data.quoteForm.pax;
        document.getElementById('QUOTE_FORM_SEND').innerText = data.quoteForm.send;
        // Company
        document.getElementById('COMPANY_HEADING_1').innerText = data.company.heading1;
        document.getElementById('COMPANY_TEXT_1').innerText = data.company.text1;
        document.getElementById('COMPANY_HEADING_2').innerText = data.company.heading2;
        document.getElementById('COMPANY_TEXT_2').innerText = data.company.text2;
        // Services
        document.getElementById('SERVICE_SECTION_HEADING').innerText = data.services.heading1;
        document.getElementById('SERVICE_SECTION_TEXT').innerText = data.services.text1;
        document.getElementById('SERVICE_SECTION_HEADING_1').innerText = data.services.heading2;
        document.getElementById('SERVICE_SECTION_TEXT_1').innerText = data.services.text2;
        document.getElementById('SERVICE_SECTION_HEADING_2').innerText = data.services.heading1;
        document.getElementById('SERVICE_SECTION_TEXT_2').innerText = data.services.text1;
        document.getElementById('SERVICE_SECTION_HEADING_3').innerText = data.services.heading3;
        document.getElementById('SERVICE_SECTION_TEXT_3').innerText = data.services.text3;
        // Contact Form
        document.getElementById('CONTACT_HEADING').innerText = data.contact.heading;
        document.getElementById('CONTACT_FORM_NAME').innerText = data.contact.name;
        document.getElementById('CONTACT_FORM_EMAIL').innerText = data.contact.email;
        document.getElementById('CONTACT_FORM_PHONE').innerText = data.contact.phone;
        document.getElementById('CONTACT_FORM_COMMENTS').placeholder = data.contact.comments;
        document.getElementById('CONTACT_FORM_SEND').innerText = data.contact.send;
        // Footer
        document.getElementById('FOOTER_LINK_1').innerText = data.footer.link1;
        document.getElementById('FOOTER_LINK_2').innerText = data.footer.link2;
        document.getElementById('FOOTER_LINK_3').innerText = data.footer.link3;
        document.getElementById('FOOTER_COPY_RIGHT').innerText = data.footer.copyRight;
      })
      .catch(error => console.error('Error al cargar los contenidos:', error));
  }
// Carga el contenido 
  cargarContenidos()
  


// Asigna eventos a los enlaces de idioma
document.getElementById('EN').addEventListener('click', function () {
    cambiarIdioma('en')
    cargarContenidos()
  });
  
  document.getElementById('ES').addEventListener('click', function () {
    cambiarIdioma('es')
    console.log('español')
    console.log('idioma actual', idiomaActual)
    cargarContenidos()
  });
  
  // Cambiar el idioma
  function cambiarIdioma(nuevoIdioma) {
    idiomaActual = nuevoIdioma;
  }

// Asigna funcionalidad al ícono de Whatsapp flotante
  $(document).ready(function() {
    $(".whatsapp-icon a").on("click", function(e) {
      e.preventDefault();
      $("html, body").animate({ scrollTop: 0 }, "slow");
    });
  });
  
  