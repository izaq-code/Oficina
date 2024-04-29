
  document.getElementById("enviar").addEventListener("click", function() {
    Swal.fire({
        title: "Enviado!",
        text: "Formulario enviado!",
        icon: "success",
        confirmButtonText: "OK"
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
});