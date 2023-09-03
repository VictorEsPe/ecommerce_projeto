import { readLocalStorage, drawProductCartInCheckout } from './src/utilities';

function createOrderHistrory(orderWithDate) {
  const orderElement = `<p class='text-xl text-bold my-4' >${new Date(
    orderWithDate.orderDate
  ).toLocaleDateString('pt-BR', {
    hour: '2-digit',
    minute: '2-digit',
  })}</p>
    <section id='container-pedidos-${
      orderWithDate.orderDate
    }' class='bg-slate-300 p-3 rounded-md' ></section>
    `;

  const mainElement = document.querySelector('main');
  mainElement.innerHTML += orderElement;

  for (const productId in orderWithDate.order) {
    drawProductCartInCheckout(
      productId,
      `history-conatiner`,
      orderWithDate.order[productId]
    );
  }
}

function renderOrdersHistory() {
  const history = readLocalStorage('history');
  
  for (const orderWithDate of history) {
    createOrderHistrory(orderWithDate);
  }
}

renderOrdersHistory();