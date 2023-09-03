import { updateCartPrice } from './src/menuCart';
import {
  drawProductCartInCheckout,
  readLocalStorage,
  deleteFromLocalStorage,
  saveLocalStorage,
} from './src/utilities';

function drawProductsInCheckout() {
  const cartProductsIdsWithQuantity = readLocalStorage('cart') ?? {};

  for (const productId in cartProductsIdsWithQuantity) {
    drawProductCartInCheckout(
      productId,
      'container-products-checkout',
      cartProductsIdsWithQuantity[productId]
    );
  }
}

function finishBuying() {
  const cartProductsIdsWithQuantity = readLocalStorage('cart') ?? {};

  if (Object.keys(cartProductsIdsWithQuantity).length === 0) {
    alert('Carrinho vazio')
    return;
  }

  const currentDate = new Date();
  const orderPlaced = {
    orderDate: currentDate,
    order: cartProductsIdsWithQuantity,
  };

  const ordersHistory = readLocalStorage('history') ?? [];
  // utilizado o operador spread para extrair apenas o conteúdo de 'ordersHistory' e não a array em si
  const ordersHistoryUpdated = [orderPlaced, ...ordersHistory];

  saveLocalStorage('history', ordersHistoryUpdated);
  deleteFromLocalStorage('cart');

  window.location.href = './orders.html';
}

drawProductsInCheckout();

document.addEventListener('submit', e => {
  e.preventDefault();
  finishBuying();
});

updateCartPrice()