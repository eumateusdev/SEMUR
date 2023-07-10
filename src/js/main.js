$(document).ready(function() {
  setEventCards('evento');
  setAtracaoCards('atracao');
});

function setEventCards(type) {

  $.ajax({
    url: 'http://localhost:3333/users/getAllAttraction',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      "type": type
    }),
    success: function(response) {
      const container = document.querySelector('#containerCard');
      for(const item of response){
        const card = setCards(item.Name,item.Local,item.Data,item.Time,item.Image);
        container.appendChild(card);
      }
    },
    error: function(xhr, status, error) {
      console.error(error);
    }
  });
}

function setAtracaoCards(type) {
  $.ajax({
    url: 'http://localhost:3333/users/getAllAttraction',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify({
      "type": type
    }),
    success: function(response) {
      const container = document.querySelector('#containerAtracaoCard');
      for(const item of response){
        const card = setCards(item.Name,item.Local,item.Data,item.Time,item.Image);
        container.appendChild(card);
      }
    },
    error: function(xhr, status, error) {
      console.error(error);
    }
  });
}

function setCards (name, local, data, time, image){
  
  const card = document.createElement('div');
  card.classList.add('col-sm-12','col-md-6','col-lg-4');
  
  const card2 = document.createElement('div');
  card2.classList.add('card');

  const imagem = document.createElement('img');
  imagem.classList.add('img-fluid');
  imagem.src = image;
  imagem.alt = name;

  let card3 = document.createElement('div');
  card3.classList.add('card-header');
  
  let NomeEvent = document.createElement('h5');
  NomeEvent.classList.add('text-center');
  NomeEvent.textContent = name;
  
  const localEvent = document.createElement('p');
  localEvent.classList.add('m-0', 'p-0');
  
  const localEvent2 = document.createElement('i');
  localEvent2.classList.add('bi', 'bi-geo-alt-fill', 'text-secondary', 'me-2');
  localEvent2.textContent = ' Local: ' + local;
  
  const hourEvent = document.createElement('p');
  hourEvent.classList.add('m-0', 'p-0');
  
  const hourEvent2 = document.createElement('i');
  hourEvent2.classList.add('bi', 'bi-clock', 'text-secondary', 'me-2');
  hourEvent2.textContent = ' Hora: ' + time;
  
  const dataEvent = document.createElement('p');
  dataEvent.classList.add('m-0', 'p-0');
  
  const dataEvent2 = document.createElement('i');
  dataEvent2.classList.add('bi', 'bi-calendar3', 'text-secondary', 'me-2');
  dataEvent2.textContent = ' Data: ' + data;
  
  dataEvent.appendChild(dataEvent2);
  hourEvent.appendChild(hourEvent2);
  localEvent.appendChild(localEvent2);
  
  card3.appendChild(NomeEvent);
  card3.appendChild(localEvent);
  card3.appendChild(hourEvent);
  card3.appendChild(dataEvent);
  
  
  card2.appendChild(imagem);
  card2.appendChild(card3);

  card.appendChild(card2);
  
  return card;
}