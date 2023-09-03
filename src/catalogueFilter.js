const productsCatalogueContainer =
  document.getElementById('products-container');

function showAll() {
  const hiddenProducts = Array.from(
    productsCatalogueContainer.querySelectorAll('.hidden')
  );

  for (const product of hiddenProducts) {
    product.classList.remove('hidden');
  }
}

function hideMasculine() {
  showAll();
  const masculineProducts = Array.from(
    productsCatalogueContainer.querySelectorAll('.masculine')
  );

  for (const product of masculineProducts) {
    product.classList.add('hidden');
  }
}

function hideFeminine() {
  showAll();
  const feminineProducts = Array.from(
    productsCatalogueContainer.querySelectorAll('.feminine')
  );

  for (const product of feminineProducts) {
    product.classList.add('hidden');
  }
}

export function initializeFilters() {
  document.getElementById('show-all').addEventListener('click', showAll);

  document
    .getElementById('show-masculine')
    .addEventListener('click', hideFeminine);

  document
    .getElementById('show-feminine')
    .addEventListener('click', hideMasculine);
}
