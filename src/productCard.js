import { productsCatalogue } from './utilities';
import { addToCart } from './menuCart';

export function renderCatalogue() {
  productsCatalogue.map(product => {
    const productCardHtml = `<div 
    class="border-solid w-48 m-2 flex flex-col p-2 justify-between shadow-xl shadow-slate-400 rounded-lg group ${
      product.feminine ? 'feminine' : 'masculine'
    }"
    id="card-produto-${product.id}">
  
  <img
    class='group-hover:scale-110 duration-300 my-3 rounded-lg'
    src="./assets/img/${product.image}"
    alt="Imagem do Produto ${product.id}."
  />
  <p class='text-sm'>${product.brand}</p>
  <p class='text-sm'>${product.name}</p>
  <p class='text-sm'>Tamanho: ${product.size}</p>
  <p class='text-sm'>$${product.price}</p>
  <button 
  id="add-${product.id}"
  class='bg-slate-950 hover:bg-slate-700 text-slate-200'
  >
  <i class="fa-solid fa-cart-plus"></i>
  </button>
  </div>`;

    const productsContainer = document.querySelector('#products-container');
    productsContainer.innerHTML += productCardHtml;
  });

  for (const item of productsCatalogue) {
    document
      .getElementById(`add-${item.id}`)
      .addEventListener('click', () => addToCart(item.id));
  }
}
