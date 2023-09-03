import {
  productsCatalogue,
  saveLocalStorage,
  readLocalStorage,
} from './utilities';

const quantityOfProductsInCart = readLocalStorage('cart') ?? {};

function openCart() {
  const cart = document.getElementById('cart');
  cart.classList.remove('right-[-360px]');
  cart.classList.add('right-[0]');
}

function closeCart() {
  const cart = document.getElementById('cart');
  cart.classList.remove('right-[0]');
  cart.classList.add('right-[-360px]');
}

export function toggleCart() {
  const closeCartBtn = document.getElementById('close-cart');
  const openCartBtn = document.getElementById('open-cart');
  const goToCheckoutBtn = document.getElementById('finish-buying');

  closeCartBtn.addEventListener('click', closeCart);
  openCartBtn.addEventListener('click', openCart);
  goToCheckoutBtn.addEventListener('click', goToCheckout);
}

export function addToCart(idProduct) {
  if (idProduct in quantityOfProductsInCart) {
    incrementProductQuantity(idProduct);
    return;
  }
  quantityOfProductsInCart[idProduct] = 1;
  saveLocalStorage('cart', quantityOfProductsInCart);
  drawProductInCart(idProduct);
  updateCartPrice();
}

function drawProductInCart(idProduct) {
  /*
  'find' é um método da array que executa uma callback que mapeia seus itens e os filtra de acordo com o critério passado
  */
  const product = productsCatalogue.find(p => p.id === idProduct);

  const productsCardContainer = document.getElementById('cart-products');

  const articleElement = document.createElement('article');
  const articleElementClasses = [
    'flex',
    'bg-slate-100',
    'rounded-lg',
    'p-1',
    'relative',
  ];
  articleElementClasses.map(elementClass =>
    articleElement.classList.add(elementClass)
  );

  const cartProductsCard = `<button id="remove-${
    product.id
  }" class="absolute top-0 right-2">
      <i
        class="fa-solid fa-circle-xmark text-slate-500 hover:text-slate-800"
      ></i>
    </button>
    <img
      src="./assets/img/${product.image}"
      alt="Carrinho: ${product.name}"
      class="h-24 rounded-lg"
    />
    <div class="p-2 flex flex-col justify-between">
      <p class="text-slate-900 text-sm">
        ${product.name}
      </p>
      <p class="text-slate-400 text-xs">Tamanho: ${product.size}</p>
      <p class="text-green-700 text-lg">$${product.price}</p>
    </div>

    <div class="flex text-slate-900 items-end text-lg absolute right-2 bottom-0">
      <button id="decrement-${product.id}">-</button>
      <p class="ml-2" id="quantity-${product.id}">${
    quantityOfProductsInCart[product.id]
  }</p>
      <button class="ml-2" id="increment-${product.id}">+</button>
    </div>`;

  articleElement.innerHTML = cartProductsCard;
  productsCardContainer.appendChild(articleElement);

  document
    .getElementById(`decrement-${product.id}`)
    .addEventListener('click', () => decrementProductQuantity(product.id));
  document
    .getElementById(`increment-${product.id}`)
    .addEventListener('click', () => incrementProductQuantity(product.id));
  document
    .getElementById(`remove-${product.id}`)
    .addEventListener('click', () => removeFromCart(product.id));
}

function incrementProductQuantity(idProduct) {
  quantityOfProductsInCart[idProduct]++;
  saveLocalStorage('cart', quantityOfProductsInCart);
  updateCartPrice();
  updateQuantityInfo(idProduct);
}

function decrementProductQuantity(idProduct) {
  if (quantityOfProductsInCart[idProduct] === 1) {
    removeFromCart(idProduct);
    return;
  }

  quantityOfProductsInCart[idProduct]--;
  saveLocalStorage('cart', quantityOfProductsInCart);
  updateCartPrice();
  updateQuantityInfo(idProduct);
}

function updateQuantityInfo(idProduct) {
  document.getElementById(`quantity-${idProduct}`).innerText =
    quantityOfProductsInCart[idProduct];
}

export function renderCartProducts() {
  const productsCardContainer = document.getElementById('cart-products');
  productsCardContainer.innerHTML = '';

  for (const productId in quantityOfProductsInCart) {
    drawProductInCart(productId);
  }
}

function removeFromCart(idProduct) {
  delete quantityOfProductsInCart[idProduct];
  saveLocalStorage('cart', quantityOfProductsInCart);
  updateCartPrice();
  renderCartProducts();
}

export function updateCartPrice() {
  const cartPrice = document.getElementById('total-price');
  let totalCartPrice = 0;

  for (const productIdInCart in quantityOfProductsInCart) {
    totalCartPrice +=
      productsCatalogue.find(p => p.id === productIdInCart).price *
      quantityOfProductsInCart[productIdInCart];
  }

  cartPrice.innerText = `Total $${totalCartPrice}`;
}

function goToCheckout() {
  if (Object.keys(quantityOfProductsInCart).length === 0) {
    alert('Carrinho vazio');
    return;
  }

  window.location.href = './checkout.html';
}
