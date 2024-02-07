import  {getContactData, getQuoteData}  from "./services.js";

// Variable idioma
let idiomaActual = 'en';

// Form data
let formData = {}

// Cargar el archivo de traducción según el idioma actual
function cargarContenidos() {

    //JSON con las traducciones
    fetch(`./assets/JSON/${idiomaActual}.JSON`)
    .then(response => response.json())
    .then(data => {
      //console.log(data)
        // Navbar
        document.getElementById('NAVBAR_HOME').innerText = data.navBar.home;
        document.getElementById('NAVBAR_COMPANY').innerText = data.navBar.company;
        document.getElementById('NAVBAR_FLEET').innerText = data.navBar.fleet;
        document.getElementById('NAVBAR_SERVICES').innerText = data.navBar.services;
        document.getElementById('NAVBAR_CONTACT').innerText = data.navBar.contact;
        document.getElementById('NAVBAR_LENGUAGE').innerHTML = data.navBar.flag;
        // Quote Form Flight
        document.getElementById('QUOTE_FORM_ORIGIN').placeholder = data.quoteForm.departure;
        document.getElementById('QUOTE_FORM_DESTINATION').placeholder = data.quoteForm.arrival;
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
        document.getElementById('FLEET_SUBTITLE').innerText = data.fleet.subtitle;
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
        // Modal
        document.getElementById("successModalLabel").innerText = data.modal.title;
        document.getElementById("MODAL_BODY").innerText = data.modal.body;
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
        // Split the captured date into its components (year, month, day)
        let dateComponents = quoteDate.split('-');
    
        // Get the day, month, and year in the new order (day-month-year)
        let day = dateComponents[2];
        let month = dateComponents[1];
        let year = dateComponents[0];
        
        // Format the date into the new format (day-month-year)
        quoteDate = day + '-' + month + '-' + year;
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
    getQuoteData(formData);
    document.getElementById('QUOTE_FORM_PERSONAL_DATA').style.visibility = 'hidden'
    document.getElementById('QUOTE_FORM_QUOTE').style.visibility = 'visible'
    setTimeout(() => {
      showModalSucces();
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
    getContactData(formData)
    setTimeout(() => {
      showModalSucces();
    }, 500);
    document.getElementById('CONTACT_FORM').reset();
    formData = {};
  });
});

  // Activar el modal programáticamente cuando la consulta se envía correctamente
  function showModalSucces() {
    $('#successModal').modal('show');
  }

  function fillSlider() {
    let slider = document.getElementById('SLIDER')
    slider.innerHTML = "";
    fetch(`./assets/JSON/airplanes.JSON`)
    .then(response => response.json())
    .then(data => {
      for(let item of data){
        let sliderItem = `
        <div class="slider-item col-12 col-md-10 col-lg-6">               
            <!-- Item -->
            <div class="position-relative">
                <!-- Card -->
                <a class="card border-0" href="shop-item.html">                   
                    <!-- Image -->
                    <img src="assets/img/Cessna-206.jpg" alt="..." class="card-img">                   
                    <!-- Body -->
                    <div class="card-body">
                        <div class="row align-items-center mb-3">
                            <div class="col">
                                <!-- Heading -->
                                <h4 class="card-title mb-0">
                                    Cessna 206
                                </h4>     
                            </div>
                        </div> <!-- / .row -->
                        <!-- Text -->
                        <div class="mb-0 text-sm text-muted d-flex flex-wrap">
                            <div class="w-50">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-people-fill mr-2" style="color: #35698d;" viewBox="0 0 16 16">
                                <path d="M7 14s-1 0-1-1 1-4 5-4 5 3 5 4-1 1-1 1zm4-6a3 3 0 1 0 0-6 3 3 0 0 0 0 6m-5.784 6A2.24 2.24 0 0 1 5 13c0-1.355.68-2.75 1.936-3.72A6.3 6.3 0 0 0 5 9c-4 0-5 3-5 4s1 1 1 1zM4.5 8a2.5 2.5 0 1 0 0-5 2.5 2.5 0 0 0 0 5"/>
                              </svg>6
                            </div>
                            <div class="w-50">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-speedometer mr-2" style="color: #35698d;" viewBox="0 0 16 16">
                                <path d="M8 2a.5.5 0 0 1 .5.5V4a.5.5 0 0 1-1 0V2.5A.5.5 0 0 1 8 2M3.732 3.732a.5.5 0 0 1 .707 0l.915.914a.5.5 0 1 1-.708.708l-.914-.915a.5.5 0 0 1 0-.707M2 8a.5.5 0 0 1 .5-.5h1.586a.5.5 0 0 1 0 1H2.5A.5.5 0 0 1 2 8m9.5 0a.5.5 0 0 1 .5-.5h1.5a.5.5 0 0 1 0 1H12a.5.5 0 0 1-.5-.5m.754-4.246a.39.39 0 0 0-.527-.02L7.547 7.31A.91.91 0 1 0 8.85 8.569l3.434-4.297a.39.39 0 0 0-.029-.518z"/>
                                <path fill-rule="evenodd" d="M6.664 15.889A8 8 0 1 1 9.336.11a8 8 0 0 1-2.672 15.78zm-4.665-4.283A11.95 11.95 0 0 1 8 10c2.186 0 4.236.585 6.001 1.606a7 7 0 1 0-12.002 0"/>
                              </svg>333 ktas
                            </div>
                            <div class="w-50">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-right mr-2" style="color: #35698d;" viewBox="0 0 16 16">
                                <path fill-rule="evenodd" d="M1 8a.5.5 0 0 1 .5-.5h11.793l-3.147-3.146a.5.5 0 0 1 .708-.708l4 4a.5.5 0 0 1 0 .708l-4 4a.5.5 0 0 1-.708-.708L13.293 8.5H1.5A.5.5 0 0 1 1 8"/>
                              </svg>1,667 km
                            </div>
                            <div class="w-50">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-airplane-engines mr-2" style="color: #35698d;" viewBox="0 0 16 16">
                                <path d="M8 0c-.787 0-1.292.592-1.572 1.151A4.35 4.35 0 0 0 6 3v3.691l-2 1V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v1.191l-1.17.585A1.5 1.5 0 0 0 0 10.618V12a.5.5 0 0 0 .582.493l1.631-.272.313.937a.5.5 0 0 0 .948 0l.405-1.214 2.21-.369.375 2.253-1.318 1.318A.5.5 0 0 0 5.5 16h5a.5.5 0 0 0 .354-.854l-1.318-1.318.375-2.253 2.21.369.405 1.214a.5.5 0 0 0 .948 0l.313-.937 1.63.272A.5.5 0 0 0 16 12v-1.382a1.5 1.5 0 0 0-.83-1.342L14 8.691V7.5a.5.5 0 0 0-.5-.5h-1a.5.5 0 0 0-.5.5v.191l-2-1V3c0-.568-.14-1.271-.428-1.849C9.292.591 8.787 0 8 0M7 3c0-.432.11-.979.322-1.401C7.542 1.159 7.787 1 8 1s.458.158.678.599C8.889 2.02 9 2.569 9 3v4a.5.5 0 0 0 .276.447l5.448 2.724a.5.5 0 0 1 .276.447v.792l-5.418-.903a.5.5 0 0 0-.575.41l-.5 3a.5.5 0 0 0 .14.437l.646.646H6.707l.647-.646a.5.5 0 0 0 .14-.436l-.5-3a.5.5 0 0 0-.576-.411L1 11.41v-.792a.5.5 0 0 1 .276-.447l5.448-2.724A.5.5 0 0 0 7 7z"/>
                              </svg>Turboprop
                            </div>
                            <div class="w-50">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-flag mr-2" style="color: #35698d;" viewBox="0 0 16 16">
                                <path d="M14.778.085A.5.5 0 0 1 15 .5V8a.5.5 0 0 1-.314.464L14.5 8l.186.464-.003.001-.006.003-.023.009a12 12 0 0 1-.397.15c-.264.095-.631.223-1.047.35-.816.252-1.879.523-2.71.523-.847 0-1.548-.28-2.158-.525l-.028-.01C7.68 8.71 7.14 8.5 6.5 8.5c-.7 0-1.638.23-2.437.477A20 20 0 0 0 3 9.342V15.5a.5.5 0 0 1-1 0V.5a.5.5 0 0 1 1 0v.282c.226-.079.496-.17.79-.26C4.606.272 5.67 0 6.5 0c.84 0 1.524.277 2.121.519l.043.018C9.286.788 9.828 1 10.5 1c.7 0 1.638-.23 2.437-.477a20 20 0 0 0 1.349-.476l.019-.007.004-.002h.001M14 1.221c-.22.078-.48.167-.766.255-.81.252-1.872.523-2.734.523-.886 0-1.592-.286-2.203-.534l-.008-.003C7.662 1.21 7.139 1 6.5 1c-.669 0-1.606.229-2.415.478A21 21 0 0 0 3 1.845v6.433c.22-.078.48-.167.766-.255C4.576 7.77 5.638 7.5 6.5 7.5c.847 0 1.548.28 2.158.525l.028.01C9.32 8.29 9.86 8.5 10.5 8.5c.668 0 1.606-.229 2.415-.478A21 21 0 0 0 14 7.655V1.222z"/>
                              </svg>Asfalto/Pasto
                            </div>
                            <div class="w-50">
                              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-badge-wc mr-2" style="color: #35698d;" viewBox="0 0 16 16">
                                <path d="M10.348 7.643c0-1.112.488-1.754 1.318-1.754.682 0 1.139.47 1.187 1.108H14v-.11c-.053-1.187-1.024-2-2.342-2-1.604 0-2.518 1.05-2.518 2.751v.747c0 1.7.905 2.73 2.518 2.73 1.314 0 2.285-.792 2.342-1.939v-.114h-1.147c-.048.615-.497 1.05-1.187 1.05-.839 0-1.318-.62-1.318-1.727zM4.457 11l1.02-4.184h.045L6.542 11h1.006L9 5.001H7.818l-.82 4.355h-.056L5.97 5.001h-.94l-.972 4.355h-.053l-.827-4.355H2L3.452 11z"/>
                                <path d="M14 3a1 1 0 0 1 1 1v8a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V4a1 1 0 0 1 1-1zM2 2a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2z"/>
                              </svg>SI
                            </div>
                        </div>                         
                    </div>
                </a>
            </div>                
        </div> <!-- /Slider item --> `
        slider.innerHTML += sliderItem;
      } 
    })
    .catch(error => console.error('Error al cargar los contenidos:', error));
  };

  


