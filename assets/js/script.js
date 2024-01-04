import  {getContactData, getQuoteData}  from "./services.js";

// Variable idioma
let idiomaActual = 'en';

// Form data
let formData = {}

// Cargar el archivo de traducción según el idioma actual
function cargarContenidos() {

  function cargarContenidos() {
    // JSON con las traducciones
    fetch(`https://api.github.com/repos/RenaudierFranco/FeelingAir/contents/assets/JSON/${idiomaActual}.JSON`)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        console.log('data:', data);
  
        // Extraer el contenido del archivo
        const contenido = atob(data.content);
        const jsonData = JSON.parse(contenido);
  
        // Navbar
        document.getElementById('NAVBAR_HOME').innerText = jsonData.navBar.home;
        document.getElementById('NAVBAR_COMPANY').innerText = jsonData.navBar.company;
        document.getElementById('NAVBAR_FLEET').innerText = jsonData.navBar.fleet;
        document.getElementById('NAVBAR_SERVICES').innerText = jsonData.navBar.services;
        document.getElementById('NAVBAR_CONTACT').innerText = jsonData.navBar.contact;
        document.getElementById('NAVBAR_LENGUAGE').innerText = idiomaActual;
  
        // Quote Form Flight
        document.getElementById('QUOTE_FORM_ORIGIN').placeholder = jsonData.quoteForm.origin;
        document.getElementById('QUOTE_FORM_DESTINATION').placeholder = jsonData.quoteForm.destination;
        document.getElementById('QUOTE_FORM_DATE').placeholder = jsonData.quoteForm.date;
        document.getElementById('QUOTE_FORM_PAX').placeholder = jsonData.quoteForm.pax;
        document.getElementById('QUOTE_FORM_QUOTE').innerText = jsonData.quoteForm.quote;
  
        // Quote Form Personal Data
        document.getElementById('QUOTE_FORM_NAME').placeholder = jsonData.quoteForm.name;
        document.getElementById('QUOTE_FORM_EMAIL').placeholder = jsonData.quoteForm.mail;
        document.getElementById('QUOTE_FORM_SUBMIT').innerText = jsonData.quoteForm.submit;
  
        // Company
        document.getElementById('COMPANY_HEADING_1').innerText = jsonData.company.heading1;
        document.getElementById('COMPANY_TEXT_1').innerText = jsonData.company.text1;
        document.getElementById('COMPANY_HEADING_2').innerText = jsonData.company.heading2;
        document.getElementById('COMPANY_TEXT_2').innerText = jsonData.company.text2;
  
        // Fleet
        document.getElementById('FLEET_HEADING').innerText = jsonData.fleet.heading;
        document.getElementById('FLEET_SUBTITLE').innerText = jsonData.fleet.subtitle;
  
        // Services
        document.getElementById('SERVICE_SECTION_HEADING').innerText = jsonData.services.heading;
        document.getElementById('SERVICE_SECTION_TEXT').innerText = jsonData.services.subHeading;
        document.getElementById('SERVICE_SECTION_HEADING_1').innerText = jsonData.services.heading1;
        document.getElementById('SERVICE_SECTION_TEXT_1').innerText = jsonData.services.text1;
        document.getElementById('SERVICE_SECTION_HEADING_2').innerText = jsonData.services.heading2;
        document.getElementById('SERVICE_SECTION_TEXT_2').innerText = jsonData.services.text2;
        document.getElementById('SERVICE_SECTION_HEADING_3').innerText = jsonData.services.heading3;
        document.getElementById('SERVICE_SECTION_TEXT_3').innerText = jsonData.services.text3;
  
        // Contact Form
        document.getElementById('CONTACT_HEADING').innerText = jsonData.contact.heading;
        document.getElementById('CONTACT_FORM_NAME').innerText = jsonData.contact.name;
        document.getElementById('CONTACT_FORM_EMAIL').innerText = jsonData.contact.email;
        document.getElementById('CONTACT_FORM_PHONE').innerText = jsonData.contact.phone;
        document.getElementById('CONTACT_FORM_COMMENTS').innerText = jsonData.contact.comments;
        document.getElementById('CONTACT_FORM_SEND').innerText = jsonData.contact.send;
  
        // Footer
        document.getElementById('FOOTER_LINK_1').innerText = jsonData.footer.link1;
        document.getElementById('FOOTER_LINK_2').innerText = jsonData.footer.link2;
        document.getElementById('FOOTER_LINK_3').innerText = jsonData.footer.link3;
        document.getElementById('FOOTER_COPY_RIGHT').innerText = jsonData.footer.copyRight;
      })
      .catch(error => console.error('Error al cargar los contenidos:', error));
  }
  
  // Carga el contenido
  cargarContenidos();
  
  
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