// API endpoint for the Store Products data
const API_URL = "https://www.course-api.com/javascript-store-products";

/* =========================================================
   Uses fetch() + .then() to retrieve data and logs each
   product's name to the console. Errors are caught with
   .catch().
   ========================================================= */
function fetchProductsThen() {
  fetch(API_URL)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then((products) => {
      products.forEach((product) => {
        console.log(product.fields.name);
      });
    })
    .catch((error) => {
      console.log(`An error occurred: ${error.message}`);
    });
}

async function fetchProductsAsync() {
  try {
    const response = await fetch(API_URL);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const products = await response.json();
    displayProducts(products);
  } catch (error) {
    handleError(error);
  }
}

/* =========================================================
   Selects #product-container and renders the first 5
   products, showing each product's name, image, and price.
   ========================================================= */
function displayProducts(products) {
  const container = document.getElementById("product-container");

  // Loop through only the first 5 products
  products.slice(0, 5).forEach((product) => {
    const { name, price, image } = product.fields;

    // Price comes in cents from the API, so convert to dollars
    const formattedPrice = `$${(price / 100).toFixed(2)}`;
    const imageUrl = image[0].url;

    const card = document.createElement("div");
    card.className = "product-card";

    const img = document.createElement("img");
    img.src = imageUrl;
    img.alt = name;

    const title = document.createElement("h2");
    title.textContent = name;

    const priceTag = document.createElement("p");
    priceTag.className = "price";
    priceTag.textContent = formattedPrice;

    card.appendChild(img);
    card.appendChild(title);
    card.appendChild(priceTag);

    container.appendChild(card);
  });
}

function handleError(error) {
  console.log(`An error occurred: ${error.message}`);
}

   ========================================================= */
fetchProductsThen();
fetchProductsAsync();
