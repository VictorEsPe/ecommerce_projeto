import { renderCatalogue } from './src/productCard';
import { renderCartProducts, toggleCart, updateCartPrice } from './src/menuCart';
import { initializeFilters } from './src/catalogueFilter';

renderCatalogue();
toggleCart();
renderCartProducts();
initializeFilters();
updateCartPrice();