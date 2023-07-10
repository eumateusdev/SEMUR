$(document).ready(function() {
  getEvent('atracao');
  getAttraction('evento');
  createAttraction('atracao');
  createEvent('evento');
  searchAttraction();
  searchEvent();

  $('#exampleFormControlInput3').keyup(function(event){setMask('time','exampleFormControlInput3', event)});
  $('#exampleFormControlInput4').keyup(function(){setMask('data','exampleFormControlInput4', event)}); 
  $('#InputEvent3').keyup(function(){setMask('time','InputEvent3', event)});
  $('#InputEvent4').keyup(function(){setMask('data','InputEvent4', event)});
  $('#editAttractionInput3').keyup(function(){setMask('time','editAttractionInput3', event)});
  $('#editAttractionInput4').keyup(function(){setMask('data','editAttractionInput4', event)});
});

function getEvent(type) {

  $.ajax({
    url: 'http://localhost:3333/users/getAllAttraction',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      "type": type
    }),
    success: function(response) {
      let counter = 1;
      const container = document.querySelector('#tableAttractions');
      for(const item of response){
        const card = setCards(counter, item.AttractionId, item.Name, item.Local, item.Data, item.Time, item.Image);
        container.appendChild(card);
        counter++;
      }
    },
    error: function(xhr, status, error) {
      console.error(error);
    }
  });
}

function getAttraction(type) {
  $.ajax({
    url: 'http://localhost:3333/users/getAllAttraction',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      "type": type
    }),
    success: function(response) {
      let counter = 1;
      const container = document.querySelector('#tableEvents');
      for(const item of response){
        const card = setCards(counter, item.AttractionId, item.Name, item.Local, item.Data, item.Time, item.Image);
        container.appendChild(card);
        counter++;
      }
    },
    error: function(xhr, status, error) {
      console.error(error);
    }
  });
}

function searchAttraction() {
  $('#searchAttraction').keyup (function(){
    let name = $('#searchAttraction').val();
    $.ajax({
      url: 'http://localhost:3333/users/getAttractionByNameAndType',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        "name": name,
        "type": 'atracao'
      }),
      success: function(response) {
        let counter = 1;
        const container = document.querySelector('#tableAttractions');
        container.innerHTML = '';
        
        for(const item of response){
          const card = setCards(counter, item.AttractionId, item.Name, item.Local, item.Data, item.Time, item.Image);
          container.appendChild(card);
          counter++;
        }
      },
      error: function(xhr, status, error) {
        console.error(error);
      }
    });
  });
}

function searchEvent() {
  $('#searchEvent').keyup (function(){
    let name = $('#searchEvent').val();
    $.ajax({
      url: 'http://localhost:3333/users/getAttractionByNameAndType',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        "name": name,
        "type": 'evento'
      }),
      success: function(response) {
        let counter = 1;
        const container = document.querySelector('#tableEvents');
        container.innerHTML = '';
        
        for(const item of response){
          const card = setCards(counter, item.AttractionId, item.Name, item.Local, item.Data, item.Time, item.Image);
          container.appendChild(card);
          counter++;
        }
      },
      error: function(xhr, status, error) {
        console.error(error);
      }
    });
  });
}

function createEvent(type){

  $('#createEvent').click (function(){
    const name = $('#InputEvent1').val();
    const local = $('#InputEvent2').val();
    const time = $('#InputEvent3').val();
    const data = $('#InputEvent4').val();
    let image = $('#InputEventFile').val();console.log(image);
    image = image.replace('C:\\fakepath\\', './src/assets/gerais/');  

    if(!name || !local || !time || !data || !image){
      $.notify("Preencha todos os campos", {
        className: 'error',
        position: 'top center'
      });

    return;
    }
    $.ajax({
      url: 'http://localhost:3333/users/createAttraction',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        "name": name,
        "local": local,
        "data": data,
        "time": time,
        "image": image,
        "type": type
      }),
      success: function(response) {
        return true;
      },
      error: function(xhr, status, error) {
        $.notify("Atração ja cadastrada", {
          className: 'error',
          position: 'top center'
        });
      }
    });
    
  });
}

function createAttraction(type){

  $('#createAttraction').click (function(){
    const name = $('#exampleFormControlInput1').val();
    const local = $('#exampleFormControlInput2').val();
    const time = $('#exampleFormControlInput3').val();
    const data = $('#exampleFormControlInput4').val();
    let image = $('#formFile').val();
    image = image.replace('C:\\fakepath\\', './src/assets/gerais/');  

    if(!name || !local || !time || !data || !image){
      $.notify("Preencha todos os campos", {
        className: 'error',
        position: 'top center'
      });

    return;
    }
    $.ajax({
      url: 'http://localhost:3333/users/createAttraction',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        "name": name,
        "local": local,
        "data": data,
        "time": time,
        "image": image,
        "type": type
      }),
      success: function(response) {
        return true;
      },
      error: function(xhr, status, error) {
        $.notify("Atração ja cadastrada", {
          className: 'error',
          position: 'top center'
        });
      }
    });
    
  });
}

function getAttractionById(id){

  $.ajax({
    url: 'http://localhost:3333/users/getAttractionById',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      "Id": id
    }),
    success: function(response) {console.log('response '+response)
      return response;        
    },
    error: function(xhr, status, error) {
      console.error(error);
    }
  });
}

function deleteAttractionById(e){ 
  const id = $(e).attr('data-index');
  
  $('.removeAttractionOrEvent').click (function(){
    $.ajax({
      url: 'http://localhost:3333/users/removeAttractionById',
      method: 'POST',
      contentType: 'application/json',
      data: JSON.stringify({
        "Id": id
      }),
      success: function(response) {
        $.notify("Atração ja cadastrada", {
          className: 'error',
          position: 'top center'
        });     
      },
      error: function(xhr, status, error) {
        console.error(error);
      }
    });
  });
}

function viewAttractionById(e){ 
  const id = $(e).attr('data-index');
  
  $.ajax({
    url: 'http://localhost:3333/users/getAttractionById',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      "Id": id
    }),
    success: function(response) {
      let name = $('#ViewAttractionInput1').val(response.Name);    
      let local = $('#ViewAttractionInput2').val(response.Local); 
      let time = $('#ViewAttractionInput3').val(response.Time); 
      let data = $('#ViewAttractionInput4').val(response.Data); 
      let image = $('#ViewAttractionFile').attr('src', response.Image);

    },
    error: function(xhr, status, error) {
      console.error(error);
    }
  });
}

function editAttractionById(e){ 
  const id = $(e).attr('data-index');
  
  $.ajax({
    url: 'http://localhost:3333/users/getAttractionById',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      "Id": id
    }),
    success: function(response) {
      let name = $('#editAttractionInput1').val(response.Name);    
      let local = $('#editAttractionInput2').val(response.Local); 
      let time = $('#editAttractionInput3').val(response.Time); 
      let data = $('#editAttractionInput4').val(response.Data); 
      let image = response.Image
      $('.editAttractionOrEvent').click (function(){

        $.ajax({
          url: 'http://localhost:3333/users/editAttractionById',
          method: 'POST',
          contentType: 'application/json',
          data: JSON.stringify({
            "Id": id,
            "name": $('#editAttractionInput1').val(),
            "local": $('#editAttractionInput2').val(),
            "time": $('#editAttractionInput3').val(),
            "data": $('#editAttractionInput4').val(),
            "image": $('#editAttractionFile').val() == '' ? response.Image : $('#editAttractionFile').val().replace('C:\\fakepath\\', './src/assets/gerais/')
          }),
          success: function(response) {
            return true;
      
          },
          error: function(xhr, status, error) {
            console.error(error);
          }
        });

      });
    },
    error: function(xhr, status, error) {
      console.error(error);
    }
  });
}

function setCards (id, attractionId, name, local, data, time, image){
  
  const tr = document.createElement('tr');
  
  const td1 = document.createElement('td');
  td1.textContent  = id;

  const td2 = document.createElement('td');
  td2.setAttribute('data-index', attractionId);
  td2.textContent = name;

  const td3 = document.createElement('td');
  td3.textContent = local;

  const td4 = document.createElement('td');
  td4.textContent = time;

  const td5 = document.createElement('td');
  td5.textContent = data;

  const td6 = document.createElement('td');

  const eye = document.createElement('a');
  eye.classList.add('view');
  eye.setAttribute('data-bs-toggle', 'modal');
  eye.setAttribute('data-bs-target', '#visualizarAtracao');
  eye.setAttribute('title', 'Visualizar');
  eye.setAttribute('data-toggle', 'tooltip');
  eye.setAttribute('style', 'cursor: pointer;');
  eye.setAttribute('data-index', attractionId);

  eye.onclick =  function() {
    viewAttractionById(this);
  };
  
  const ieye = document.createElement('i');
  ieye.classList.add('bi', 'bi-eye-fill');

  const pencil = document.createElement('a');
  pencil.classList.add('edit');
  pencil.setAttribute('data-bs-toggle', 'modal');
  pencil.setAttribute('data-bs-target', '#editarAtracao');
  pencil.setAttribute('title', 'Editar');
  pencil.setAttribute('data-toggle', 'tooltip');
  pencil.setAttribute('style', 'cursor: pointer;');
  pencil.setAttribute('data-index', attractionId);

  pencil.onclick =  function() {
    editAttractionById(this);
  };

  const ipencil = document.createElement('i');
  ipencil.classList.add('bi', 'bi-pencil-fill');

  const trash = document.createElement('a');
  trash.classList.add('delete');
  trash.setAttribute('data-bs-toggle', 'modal');
  trash.setAttribute('data-bs-target', '#excluirAtracao');
  trash.setAttribute('title', 'Deletar');
  trash.setAttribute('data-toggle', 'tooltip');
  trash.setAttribute('data-index', attractionId);

  trash.onclick =  function() {
    deleteAttractionById(this);
  };

  trash.setAttribute('style', 'cursor: pointer;');

  const itrash = document.createElement('i');
  itrash.classList.add('bi', 'bi-trash3-fill', 'remove');

  eye.appendChild(ieye);
  pencil.appendChild(ipencil);
  trash.appendChild(itrash);
  
  td6.appendChild(eye);
  td6.appendChild(pencil);
  td6.appendChild(trash); 
  
  tr.appendChild(td1);
  tr.appendChild(td2);
  tr.appendChild(td3);
  tr.appendChild(td4);
  tr.appendChild(td5);
  tr.appendChild(td6);

  return tr;
}

function setMask (type, id, event){

  if (type === 'time') {
    const input = document.getElementById(id);
    let value = input.value.replace(/[^0-9]/g, '');
    if (value.length > 4) {
      value = value.slice(0, 4);
    }
    if (value.length >= 3) {
      value = value.slice(0, 2) + ':' + value.slice(2);
    }
    input.value = value;
  }
  else{
    const input = document.getElementById(id);
    let value = input.value.replace(/[^0-9]/g, '');
    if (value.length > 8) {
      value = value.slice(0, 8);
    }console.log(event.key)
    if (value.length == 2 && event.key != 'Backspace') {
      input.value = value.slice(0, 2) + '/' ;
    }
    if (value.length == 4 && event.key != 'Backspace') {
      input.value = value.slice(0, 2) + '/' + value.slice(2, 4) + '/';
    }   

  } 
}

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}