require('dotenv').config();
export default productRender;

function productRender() {
  document.addEventListener('DOMContentLoaded', function () {
    const products = window.document.getElementById('products');

    const getProduct = async () => {
      try {
        const res = await fetch(process.env.API_URL);
        const products = await res.json();
        return products;
      } catch (error) {
        console.log('Error fetching data:', error);
      }
    };

    const generateStarRating = (rating) => {
      let starsHTML = '';
      const fullStars = Math.floor(rating);
      const hasHalfStar = rating % 1 !== 0;

      for (let i = 0; i < fullStars; i++) {
        starsHTML += '<i class="bi bi-star-fill"></i>';
      }
      if (hasHalfStar) {
        starsHTML += '<i class="bi bi-star-half"></i>';
      }
      const remainingStars = 5 - fullStars - (hasHalfStar ? 1 : 0);
      for (let i = 0; i < remainingStars; i++) {
        starsHTML += '<i class="bi bi-star"></i>';
      }

      return starsHTML;
    };

    const productCards = async () => {
      let div = document.createElement('div');
      const productLists = await getProduct();

      productLists.map((product) => {
        const starRatingHTML = generateStarRating(product.rating.rate);
        div.innerHTML += `
          <div class='product'>
              <picture class='flex-auto'>
                  <img src=${product.image} alt='Product Image'/>
              </picture>
              <span class='rating'>${starRatingHTML}</span>
              <h2 class='title'>${product.title}</h2>
              <p class='description'>${product.description}</p>
              <strong class='price'>$${product.price}</strong>
              <button class='cart flex'>Add to Cart</button>
              <p class="read-more">Read more</p>
          </div>
          `;
      });
      div.className = 'contents';
      products.append(div);
    };

    productCards();
  });
}