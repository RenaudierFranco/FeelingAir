import  {getContactData, getQuoteData}  from "./services.js";

// Variable idioma
let idiomaActual = 'en';

// Form data
let formData = {}

// Cargar el archivo de traducción según el idioma actual
function cargarContenidos() {

    //JSON con las traducciones
    fetch(`https://api.github.com/repos/RenaudierFranco/FeelingAir/contents/assets/JSON/en.JSON`)
      .then(response => response.json())
      .then(data => {
        // Navbar
        document.getElementById('NAVBAR_HOME').innerText = data.navBar.home;
        document.getElementById('NAVBAR_COMPANY').innerText = data.navBar.company;
        document.getElementById('NAVBAR_FLEET').innerText = data.navBar.fleet;
        document.getElementById('NAVBAR_SERVICES').innerText = data.navBar.services;
        document.getElementById('NAVBAR_CONTACT').innerText = data.navBar.contact;
        document.getElementById('NAVBAR_LENGUAGE').innerText = idiomaActual;
        // Quote Form Flight
        document.getElementById('QUOTE_FORM_ORIGIN').placeholder = data.quoteForm.origin;
        document.getElementById('QUOTE_FORM_DESTINATION').placeholder = data.quoteForm.destination;
        document.getElementById('QUOTE_FORM_DATE').placeholder = data.quoteForm.date;
        document.getElementById('QUOTE_FORM_PAX').placeholder = data.quoteForm.pax;
        document.getElementById('QUOTE_FORM_QUOTE').innerText = data.quoteForm.quote;
        // Quote Form Personal Data
        document.getElementById('QUOTE_FORM_NAME').placeholder = data.quoteForm.name;
        document.getElementById('QUOTE_FORM_EMAIL').placeholder = data.quoteForm.mail;
        document.getElementById('QUOTE_FORM_SUBMIT').innerText = data.quoteForm.submit;
        // Company
        document.getElementById('COMPANY_HEADING_1').innerText = data.company.heading1;
        document.getElementById('COMPANY_TEXT_1').innerText = data.company.text1;
        document.getElementById('COMPANY_HEADING_2').innerText = data.company.heading2;
        document.getElementById('COMPANY_TEXT_2').innerText = data.company.text2;
        // Fleet
        document.getElementById('FLEET_HEADING').innerText = data.fleet.heading;
        document.getElementById('FLEET_HEADING').innerText = data.fleet.subtitle;
        // Services
        document.getElementById('SERVICE_SECTION_HEADING').innerText = data.services.heading;
        document.getElementById('SERVICE_SECTION_TEXT').innerText = data.services.subHeading;
        document.getElementById('SERVICE_SECTION_HEADING_1').innerText = data.services.heading1;
        document.getElementById('SERVICE_SECTION_TEXT_1').innerText = data.services.text1;
        document.getElementById('SERVICE_SECTION_HEADING_2').innerText = data.services.heading2;
        document.getElementById('SERVICE_SECTION_TEXT_2').innerText = data.services.text2;
        document.getElementById('SERVICE_SECTION_HEADING_3').innerText = data.services.heading3;
        document.getElementById('SERVICE_SECTION_TEXT_3').innerText = data.services.text3;
        // Contact Form
        document.getElementById('CONTACT_HEADING').innerText = data.contact.heading;
        document.getElementById('CONTACT_FORM_NAME').innerText = data.contact.name;
        document.getElementById('CONTACT_FORM_EMAIL').innerText = data.contact.email;
        document.getElementById('CONTACT_FORM_PHONE').innerText = data.contact.phone;
        document.getElementById('CONTACT_FORM_COMMENTS').innerText = data.contact.comments;
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
    cargarContenidos()
  });
  
// Cambiar el idioma
  function cambiarIdioma(nuevoIdioma) {
    idiomaActual = nuevoIdioma;
  }

// Asigna funcionalidad al ícono de Whatsapp flotante
  $(document).ready(function() {
    $(".whatsapp-icon a").on("click", function(e) {
      $("html, body").animate({ scrollTop: 0 }, "slow");
    });
  });

// Pax Input validation
    // Agregar un evento onChange al input QUOTE_FORM_PAX
    document.getElementById("QUOTE_FORM_PAX").addEventListener("change", function () {
      // Ajustar el valor de pax si está fuera del rango permitido
      let pax = parseFloat(document.getElementById("QUOTE_FORM_PAX").value);
      if (isNaN(pax) || pax < 1) {
        document.getElementById("QUOTE_FORM_PAX").value = 1;
      } else if (pax > 15) {
        document.getElementById("QUOTE_FORM_PAX").value = 15;
      }
    });

// QuoteForm
document.addEventListener("DOMContentLoaded", function () {
  // Aplicar el estilo 'visibility: visible;' al formulario
  document.getElementById("QUOTE_FORM_QUOTE").addEventListener("click", function () {
    document.getElementById('QUOTE_FORM_PERSONAL_DATA').style.visibility = 'visible'
    document.getElementById('QUOTE_FORM_QUOTE').style.visibility = 'hidden'
  });

  // Agregar un evento de escucha al botón Enviar
  document.getElementById("QUOTE_FORM_SUBMIT").addEventListener("click", function () {
    // Obtener valores de quoteForm
    let quoteOrigin = document.getElementById("QUOTE_FORM_ORIGIN").value;
    let quoteDestination = document.getElementById("QUOTE_FORM_DESTINATION").value;
    let quoteDate = document.getElementById("QUOTE_FORM_DATE").value;
    let quotePax = document.getElementById("QUOTE_FORM_PAX").value;
    let quoteName = document.getElementById("QUOTE_FORM_NAME").value;
    let quoteMail = document.getElementById("QUOTE_FORM_EMAIL").value;
    // Validar que el quoteMail contenga '@'
    if (!quoteMail.trim().includes('@')) {
      document.getElementById("QUOTE_FORM_EMAIL").style.border = '1.5px solid #dc3545'; // Set border to red
      return; // Detener la ejecución si la validación falla
    }
    
    // Datos del formulario
    formData.origin = quoteOrigin || "";
    formData.destination = quoteDestination || "";
    formData.date = quoteDate || "";
    formData.pax = quotePax || "";
    formData.name = quoteName || "";
    formData.mail = quoteMail || "";
    // Enviar datos 
    console.log(formData);
    getQuoteData(formData);
    document.getElementById('QUOTE_FORM_PERSONAL_DATA').style.visibility = 'hidden'
    document.getElementById('QUOTE_FORM_QUOTE').style.visibility = 'visible'
    setTimeout(() => {
      mostrarModalExito();
    }, 500);
    document.getElementById('QUOTE_FORM').reset();
    formData = {};
  });
});

document.addEventListener("DOMContentLoaded", function () {
  // Agregar un evento de escucha al botón Enviar
  document.getElementById("CONTACT_FORM_SEND").addEventListener("click", function () {
    // Obtener valores de contactForm
    let contactName = document.getElementById("CONTACT_FORM_NAME_INPUT");
    let contactEmail = document.getElementById("CONTACT_FORM_EMAIL_INPUT");
    let contactPhone = document.getElementById("CONTACT_FORM_PHONE_INPUT");
    let contactMessage = document.getElementById("CONTACT_FORM_COMMENTS_INPUT");
    // Validar que el nombre contenga al menos 3 caracteres
    if (contactName.value.trim().length < 3) {
      contactName.style.border = '1.5px solid #dc3545'; // Set border to red
      return; // Stop execution if validation fails
    }
    // Validar que el correo electrónico contenga '@'
    if (!contactEmail.value.trim().includes('@')) {
      contactEmail.style.border = '1.5px solid #dc3545'; // Set border to red
      return; // Detener la ejecución si la validación falla
    }
    // Validar que el teléfono contenga solo números
    if (!/^\d+$/.test(contactPhone.value.trim())) {
      contactPhone.style.border = '1.5px solid #dc3545'; // Set border to red
      return; // Detener la ejecución si la validación falla
    }      
    // Datos del formulario
    formData.contactName = contactName.value || "";
    formData.contactEmail = contactEmail.value || "";
    formData.contactPhone = contactPhone.value || "";
    formData.contactMessage = contactMessage.value || "";
    // Enviar datos 
    console.log(formData);
    getContactData(formData)
    setTimeout(() => {
      mostrarModalExito();
    }, 500);
    document.getElementById('CONTACT_FORM').reset();
    formData = {};
  });
});

  // Puedes activar el modal programáticamente cuando la consulta se envía correctamente
  function mostrarModalExito() {
    $('#successModal').modal('show');
  }