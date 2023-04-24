/* eslint-disable no-alert */
// importa biblioteca para alerta
// import Swal from 'sweetalert2' (não consegui resolver o bug);

// captura elementos para manipulação via js
const getSection = document.querySelector('section');
const getInput = document.querySelector('input');
const getButton = document.querySelector('button');
const getText = document.querySelector('.type-value');

const number = 3;

// captura url da api em uma variavel
const requestURL = 'https://api.exchangerate.host/latest?base=';

// tratanto api com fetch e a partir desse tratamento criando elementos de forma dinamica
const fetchData = (currency) => fetch(`${requestURL}${currency}`)
  .then((response) => response.json())
  .then((data) => {
    const searchedCoin = (getInput.value).toUpperCase();
    if (!(searchedCoin in data.rates)) {
      throw new Error('Moeda inválida!');
    } else {
      Object.keys(data.rates)
        .forEach((each) => {
          const createDiv = document.createElement('div');
          getText.innerHTML = `O valor referente a 1 ${searchedCoin}`;
          createDiv.innerHTML = ` <img src="src/img/coin.png" alt="">
          <p id="moeda">${each}:</p>
           <span>${data.rates[each].toFixed(number)}</span>
           `;
          createDiv.classList.add('div-coins');
          getSection.appendChild(createDiv);
        });
    }
  })
  .catch((error) => window.alert(error.message));

// evento de click para mostrar informações conforme requisição
getButton.addEventListener('click', () => {
  getSection.innerHTML = '';
  fetchData(getInput.value);
});
