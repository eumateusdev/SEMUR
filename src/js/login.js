$(document).ready(function() {

  logar();
});

function logar(){
  $('#btnLogin').click(function(){

  
    const email = $('#typeEmailX-2').val();
    const password = $('#typePasswordX-2').val();

    if(!email || !password){
      $.notify("Insira suas credenciais", {
        className: 'error',
        position: 'top center'
      });
    return;
    }
    
    $.ajax({
      url: 'http://localhost:3333/users/login',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        "email": email,
        "password": password
      }),
      success: function(response) {
        $.notify("Bem Vindo", {
          className: 'success',
          position: 'top center'
      });

      sleep(1000).then(() => {
        window.location.href = "./gerenciamento.html";
      });
      },
      error: function(xhr, status, error) {
        $.notify("Verifique suas credenciais", {
          className: 'error',
          position: 'top center'
      });
      }
    });     
  });
  
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}