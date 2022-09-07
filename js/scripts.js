const productArray = jsonData["products"];
let cartArray = [];

loadHomePage();

function addToCart() {
  let product = getProductByName(this.id);
  cartArray.push(product);
  let arrayLength = cartArray.length;
  document.getElementById('kosaricaSpan').innerHTML = arrayLength.toString();
}

function removeFromCart() {
  let product = getProductByName(this.id);

  for (let i = 0; i < cartArray.length; i++) {
    if (product.name === cartArray[i].name) {
      cartArray.splice(i, 1);
      let arrayLength = cartArray.length;
      document.getElementById('kosaricaSpan').innerHTML = arrayLength.toString();
      loadCartPage();
      return;
    }
  }
}

const categories = [];

for (let i = 0; i < productArray.length; i++) {
  let products_i = productArray[i];
  let category = products_i.category.toString();

  if (!categories.includes(category)) {
    categories.push(category);
    let listNode = document.createElement('li');
    listNode.addEventListener("click", loadCategoryPage);
    let dropdownItem = document.createElement('a');
    dropdownItem.classList.add('dropdown-item');
    dropdownItem.href = "#!";
    let dropdownItemName = document.createTextNode(category);
    dropdownItem.appendChild(dropdownItemName);
    listNode.appendChild(dropdownItem);
    document.getElementById('navDropdown').appendChild(listNode);
  }

}

document.getElementById('button-cart').addEventListener("click", () => {
  loadCartPage();
} );

function loadHomePage() {

  document.getElementById('content').innerHTML = homePage;

  const randoms = [];

  for (let i = 0; i < 8; i++) {

    let random = Math.floor(Math.random() * productArray.length);

    while (randoms.includes(random)) {
      random = Math.floor(Math.random() * productArray.length);
    }

    randoms.push(random);

    let products_i = productArray[random];

    createProductCard(products_i);

  }
}

function getProductByName(name) {
  for (let i = 0; i < productArray.length; i++) {
    if (name == productArray[i].name) {
      return productArray[i];
    }
  }
}

function loadCartPage() {

  document.getElementById('content').innerHTML = cartPage;


  let container = document.getElementById('cartContainer');
if(cartArray.length === 0) {
    let prazno = document.createElement('h2')
    prazno.classList.add('py-5');
    let text = document.createTextNode("Kosarica je prazna");
    prazno.appendChild(text);
    container.appendChild(prazno);
  }
  cartArray.forEach(element => {

    let row = document.createElement('div');
    row.classList.add('row');

    let col1 = document.createElement('div');
    col1.classList.add('col');

    let img = document.createElement('img')
    img.classList.add('img-thumbnail');
    img.src = element.imageUrl;
    img.alt = element.name;
    col1.appendChild(img);


    row.appendChild(col1);

    let col2 = document.createElement('div');
    col2.classList.add('col');
    col2.classList.add('text-center');

    let productName = document.createElement('h2')
    productName.classList.add('padding-top-50');
    let textname = document.createTextNode(element.name);
    productName.appendChild(textname);
    col2.appendChild(productName);

    row.appendChild(col2);

    let col3 = document.createElement('div');
    col3.classList.add('col');

    let pad = document.createElement('div');
    pad.classList.add('margin-top-50');

    let action = document.createElement('a');
    action.id = element.name;
    action.classList.add('btn');
    action.classList.add('btn-outline-dark');
    action.classList.add('mt-auto');
    action.classList.add('button-add-to-cart');
    action.addEventListener("click", removeFromCart);

    let toCartText = document.createTextNode("Odstrani iz kosarice");
    action.appendChild(toCartText);
    pad.appendChild(action);
    col3.appendChild(pad);


    row.appendChild(col3);

    container.appendChild(row);

  });

}

function loadProductPage() {
  document.getElementById('content').innerHTML = productPage;

  let product = getProductByName(this.alt);

  let img = document.createElement('img')
  img.classList.add('py-5');
  img.src = product.imageUrl;
  img.alt = product.name;
  document.getElementById('imageDiv').appendChild(img);

  let textname = document.createTextNode(product.name);
  document.getElementById('productname').appendChild(textname);

  let descDiv = document.getElementById('descDiv');

  if (product.onSale) {
    let saleDiv = document.createElement('div');
    saleDiv.classList.add('badge');
    saleDiv.classList.add('bg-danger');
    saleDiv.classList.add('text-white');
    saleDiv.classList.add('badge-product-page');
    let badgeTextContent = document.createTextNode("Akcija!");
    saleDiv.appendChild(badgeTextContent);
    descDiv.appendChild(saleDiv);
  }

  let starDiv = document.createElement('div');
  starDiv.classList.add('d-flex');
  starDiv.classList.add('small');
  starDiv.classList.add('text-warning');
  starDiv.classList.add('mb-2');
  descDiv.appendChild(starDiv);

  for (let k = 0; k < product.stars; k++) {
    let star = document.createElement('div');
    star.classList.add('bi-star-fill');
    starDiv.appendChild(star);
  }


  let description = document.createElement('p');
  let textDescription = document.createTextNode(generateLoremIpsum());
  description.appendChild(textDescription);
  descDiv.appendChild(description);


  let priceDiv = document.createElement('div');
  priceDiv.classList.add('d-flex');
  priceDiv.classList.add('display-6');


  descDiv.appendChild(priceDiv);


  if (product.onSale) {


    let oldPriceSpan = document.createElement('span');
    oldPriceSpan.classList.add('text-muted');
    oldPriceSpan.classList.add('text-decoration-line-through');
    oldPriceSpan.classList.add('oldPrice-span');
    let price = document.createTextNode("€" + product.price);
    priceDiv.appendChild(oldPriceSpan);
    oldPriceSpan.appendChild(price);
    let discountPrice = document.createTextNode("€" + product.discountPrice);
    priceDiv.appendChild(discountPrice);

  } else {

    let price = document.createTextNode("€" + product.price);
    priceDiv.appendChild(price);
  }

  let actionDiv = document.createElement('div');
  actionDiv.classList.add('button-add-to-cart');
  let action = document.createElement('a');
  action.id = product.name;
  action.classList.add('btn');
  action.classList.add('btn-outline-dark');
  action.classList.add('mt-auto');
  action.classList.add('button-add-to-cart');
  action.addEventListener("click", addToCart);

  let toCartText = document.createTextNode("Dodaj v kosarico");
  action.appendChild(toCartText);
  actionDiv.appendChild(action);
  descDiv.appendChild(actionDiv);


}

function loadCategoryPage(category) {

  let allProd = (category === undefined);

  let categoryName = allProd ? "vsi produkti" : this.textContent;

  document.getElementById('content').innerHTML = categoryPage;

  let h2 = document.createElement('h2');
  let h2text = document.createTextNode(categoryName);
  h2.appendChild(h2text);
  document.getElementById('headerDiv').appendChild(h2);


  for (let i = 0; i < productArray.length; i++) {

    let products_i = productArray[i];

    if (allProd) {
      createProductCard(products_i);
    } else {

      if (products_i.category === categoryName) {

        createProductCard(products_i);
      }
    }

  }

}

function loadActionPage() {

  document.getElementById('content').innerHTML = categoryPage;

  let h2 = document.createElement('h2');
  let h2text = document.createTextNode("izdelki v akciji");
  h2.appendChild(h2text);
  document.getElementById('headerDiv').appendChild(h2);


  for (let i = 0; i < productArray.length; i++) {

    let products_i = productArray[i];

    if (products_i.onSale) {
      createProductCard(products_i);
    }

  }
}

function loadAboutPage() {
  document.getElementById('content').innerHTML = aboutPage;
}


function createProductCard(products_i) {


  let div1 = document.createElement('div');
  div1.classList.add('col');
  div1.classList.add('mb-5');

  let div2 = document.createElement('div');
  div2.classList.add('card');
  div2.classList.add('h-100');
  div1.appendChild(div2);

  let img = document.createElement('img')
  img.classList.add('card-img-top');
  img.src = products_i.imageUrl;
  img.alt = products_i.name;
  img.addEventListener("click", loadProductPage);
  div2.appendChild(img);

  if (products_i.onSale) {
    let saleDiv = document.createElement('div');
    saleDiv.classList.add('badge');
    saleDiv.classList.add('bg-danger');
    saleDiv.classList.add('text-white');
    saleDiv.classList.add('position-absolute');
    saleDiv.classList.add('badge-style');
    let badgeTextContent = document.createTextNode("Akcija!");
    saleDiv.appendChild(badgeTextContent);
    div2.appendChild(saleDiv);
  }

  let div3 = document.createElement('div');
  div3.classList.add('card-body');
  div3.classList.add('p-4');
  div2.appendChild(div3);

  let div4 = document.createElement('div');
  div4.classList.add('text-center');
  div3.appendChild(div4);

  let productName = document.createElement('h5');
  productName.classList.add('fw-bolder');
  let textContent = document.createTextNode(products_i.name);
  productName.appendChild(textContent);
  div4.appendChild(productName);

  let starDiv = document.createElement('div');
  starDiv.classList.add('d-flex');
  starDiv.classList.add('justify-content-center');
  starDiv.classList.add('small');
  starDiv.classList.add('text-warning');
  starDiv.classList.add('mb-2');
  div4.appendChild(starDiv);

  for (let k = 0; k < products_i.stars; k++) {
    let star = document.createElement('div');
    star.classList.add('bi-star-fill');
    starDiv.appendChild(star);
  }

  if (products_i.onSale) {
    let oldPriceSpan = document.createElement('span');
    oldPriceSpan.classList.add('text-muted');
    oldPriceSpan.classList.add('text-decoration-line-through');
    oldPriceSpan.classList.add('oldPrice-span');
    let price = document.createTextNode("€" + products_i.price);
    div4.appendChild(oldPriceSpan);
    oldPriceSpan.appendChild(price);
    let discountPrice = document.createTextNode("€" + products_i.discountPrice);
    div4.appendChild(discountPrice);

  } else {
    let price = document.createTextNode("€" + products_i.price);
    div4.appendChild(price);
  }

  let footer = document.createElement('div');
  footer.classList.add('card-footer');
  footer.classList.add('p-4');
  footer.classList.add('pt-0');
  footer.classList.add('border-top-0');
  footer.classList.add('bg-transparent');
  div2.appendChild(footer);

  let addToCartDiv = document.createElement('div');
  addToCartDiv.classList.add('text-center');
  footer.appendChild(addToCartDiv);

  let action = document.createElement('a');
  action.id = products_i.name;
  action.classList.add('btn');
  action.classList.add('btn-outline-dark');
  action.classList.add('mt-auto');
  action.addEventListener("click", addToCart);

  let toCartText = document.createTextNode("Dodaj v kosarico");
  action.appendChild(toCartText);
  addToCartDiv.appendChild(action);

  document.getElementById('productSection').appendChild(div1);
}


function generateLoremIpsum() {
  let max = words.length;
  let text = [];
  let x = 50;
  while (--x) text.push(words[Math.floor(Math.random() * max)]);
  return text.join(" ");
}
