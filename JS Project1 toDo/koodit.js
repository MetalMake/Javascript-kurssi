lataaKaikki();
function lataaKaikki(){
  document.querySelector('form').addEventListener('submit',lähetä);
  document.querySelector('ul').addEventListener('click',poistaTaiMerkkaa);
  document.getElementById('poista').addEventListener('click',poistaLista);

}



function lähetä(e){
  e.preventDefault();
  var taskList;
  var input = document.querySelector('input');
  if(input.value != '')
    syotto(input.value);
  input.value = '';
}


function syotto(tehtava){
  var ul = document.querySelector('ul');
  var li = document.createElement('li');
  li.innerHTML = `<span class="delete"></span><input type="checkbox"><label>${tehtava}</label>`;
  ul.appendChild(li);
  document.querySelector('.Tehtävälista').style.display = 'inline-block';
}

function vainKirjaimet(inputtxt)
      { 
      var kirjaimet = /^[A-Za-z]+$/;
      if(inputtxt.value.match(kirjaimet))
      {
      alert('Tehtävä hyväksytty!');
      return true;
      }
      else
      {
      alert('ACHTUNG! Käytä vain kirjaimia. EI NUMEROITA!');
      return false;
      }
      }

function poistaLista(e){
  var ul = document.querySelector('ul').innerHTML = '';
}


function poistaTaiMerkkaa(e){
  if(e.target.className == 'poista')
    pyyhi(e);
  else {
    merkkaa(e);
  }
}


function pyyhi(e){
  var poista = e.target.yksikko;
  var yksikko = poista.yksikko;
  yksikko.removeChild(poista);
}


function merkkaa(e){
  const tehtava = e.target.nextSibling;
  if(e.target.checked){
    tehtava.style.textDecoration = "line-through", "wavy";
    tehtava.style.color = "black";
  }else {
    tehtava.style.textDecoration = "none";
    tehtava.style.color = "white";
  }
}