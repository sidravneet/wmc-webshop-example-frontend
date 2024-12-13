document
  .querySelector("#btnLoadProducts")
  .addEventListener("click", async () => {
    const url = `http://localhost:3000/api/products`;

    try {
      const response = await fetch(url);
      const products = await response.json();
      console.log(products);
      displayProducts(products);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  });

  document.getElementById('createProductForm').addEventListener('submit', async function (event) {
    event.preventDefault();
    
    const formData = new FormData(this);
    const data = Object.fromEntries(formData.entries());

    try {
      const response = await fetch('http://localhost:3000/api/products', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      if (response.ok) {
        alert('Product created successfully!');
        this.reset();
      } else {
        alert('Failed to create product.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('An error occurred while creating the product.');
    }
  });

function displayProducts(products) {
  const productsList = document.getElementById("productsList");
  productsList.innerHTML = "";

  if (products.length === 0) {
    const noProductsItem = document.createElement("li");
    noProductsItem.classList.add("list-group-item");
    noProductsItem.textContent = "No Products found.";
    productsList.appendChild(noProductsItem);
    return;
  }

  products.forEach((product) => {
    const productItem = document.createElement("li");
    productItem.classList.add("list-group-item");
    productItem.innerHTML = `${product.id} - ${product.name} - ${product.price}€ - ${product.description}`;
    productsList.appendChild(productItem);
  });
}
