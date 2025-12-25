document.addEventListener("DOMContentLoaded", function () {
  // ===== MENÚ LATERAL =====
  const menuBtn = document.getElementById("menuBtn");
  const sidebarMenu = document.getElementById("sidebarMenu");
  const closeMenu = document.getElementById("closeMenu");

  // Abrir menú lateral
  if (menuBtn) {
    menuBtn.addEventListener("click", () => {
      sidebarMenu.classList.add("show");
    });
  }

  // Cerrar menú lateral
  if (closeMenu) {
    closeMenu.addEventListener("click", () => {
      sidebarMenu.classList.remove("show");
    });
  }

  // ===== MODAL FORMULARIO DEMO =====
  const botonesDemo = document.querySelectorAll(".solicitar-demo, .btn-secondary, .cta-btn-primary");
  const modalDemo = document.getElementById("formulario-demo");
  const cerrarDemo = document.getElementById("cerrarDemo");

  // Mostrar modal al hacer clic en cualquier botón
  botonesDemo.forEach((btn) => {
    btn.addEventListener("click", function (e) {
      e.preventDefault();
      modalDemo.classList.remove("oculto");
      document.body.style.overflow = "hidden"; // Bloquea el scroll de fondo
    });
  });

  // Cerrar modal con el botón X
  if (cerrarDemo) {
    cerrarDemo.addEventListener("click", () => {
      modalDemo.classList.add("oculto");
      document.body.style.overflow = "auto";
    });
  }

  // Cerrar modal al hacer clic fuera del contenedor
  if (modalDemo) {
    modalDemo.addEventListener("click", (e) => {
      if (e.target === modalDemo) {
        modalDemo.classList.add("oculto");
        document.body.style.overflow = "auto";
      }
    });
  }

// ===== ENVIAR FORMULARIO - FORMSUBMIT =====
  const demoForm = document.querySelector(".demo-form");

  if (demoForm) {
    demoForm.addEventListener("submit", async function (e) {
      e.preventDefault(); // Evita que se recargue la página
      
      // Obtener todos los datos del formulario
      const formData = new FormData(demoForm);
      
      // Cambiar texto del botón mientras envía
      const botonEnviar = demoForm.querySelector(".demo-boton");
      const textoOriginal = botonEnviar.textContent;
      botonEnviar.disabled = true;
      botonEnviar.textContent = "Enviando...";
      botonEnviar.style.opacity = "0.7";
      
      try {
        // Preparar datos para enviar
      const datos = {
  nombre: formData.get('nombre'),
  apellido: formData.get('apellido'),
  empresa: formData.get('empresa'),
  cargo: formData.get('cargo'),
  rubro: formData.get('rubro'),
  empleados: formData.get('empleados'),
  email: formData.get('email'),
  telefono: formData.get('telefono'),
  mensaje: formData.get('mensaje') || 'Sin mensaje adicional'
};

        
        // Enviar a FormSubmit usando AJAX
        const response = await fetch("https://script.google.com/macros/s/AKfycbwSue2PXfXFd5FC6t6XOrmWeqxj78zRONzWLXYXg56WfApegsGwiQJzvq_hrGhCGcAodw/exec", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(datos)
        });
        
        const resultado = await response.json();
        
        if (resultado.success === "success" || response.ok) {
          // ✅ ÉXITO - El email fue enviado
          alert("¡Gracias por contactarnos! 🎉\n\n✅ Hemos recibido tu solicitud.\n📧 Nos comunicaremos contigo pronto.");
          
          // Cerrar el modal
          if (modalDemo) {
            modalDemo.classList.add("oculto");
            document.body.style.overflow = "auto";
          }
          
          // Limpiar el formulario
          demoForm.reset();
          
          console.log("✅ Formulario enviado exitosamente");
        } else {
          // ❌ ERROR
          alert("❌ Hubo un problema al enviar el formulario.\n\nPor favor, intenta nuevamente.");
          console.error("Error en la respuesta:", resultado);
        }
      } catch (error) {
        // ❌ ERROR DE CONEXIÓN
        console.error("Error al enviar:", error);
        alert("❌ Error de conexión.\n\nVerifica tu internet e intenta nuevamente.");
      } finally {
        // Restaurar botón
        botonEnviar.disabled = false;
        botonEnviar.textContent = textoOriginal;
        botonEnviar.style.opacity = "1";
      }
    });
  }

});
