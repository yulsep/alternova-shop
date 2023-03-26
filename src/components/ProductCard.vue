<script>
export default {
  name: "ProductCard",
  props: {
    name: {
      type: String,
      required: true,
    },
    unit_price: {
      type: Number,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
  },

  emits: ["add-to-cart"],
  data() {
    return {
      hasStock: true,
    };
  },

  methods: {
    addToCart() {
      if (this.stock > 0) {
        this.$emit("add-to-cart", {
          name: this.name,
          unit_price: this.unit_price,
          stock: this.stock,
        });
      } else {
        this.hasStock = false;
        setTimeout(() => {
          this.hasStock = true;
        }, 2000);
      }
    },
  },
};
</script>
<template>
  <div class="product-card">
    <img
      src="https://imagenes.elpais.com/resizer/EbBrSmajk9TptLzmXKNAi8kkAz4=/1960x1470/cloudfront-eu-central-1.images.arcpublishing.com/prisa/P6BBCG2LF2FO4PQ3OU7CODKPUI.gif"
      alt="Product image"
      class="product-image"
    />
    <h2 class="product-name">{{ name }}</h2>
    <p class="product-quantity">Stock -- {{ stock }}</p>
    <span class="product-price">Price/unit ${{ unit_price }}</span>
    <button class="add-to-cart-btn" @click="addToCart()">Add to Cart</button>
    <div v-if="!hasStock" class="out-of-stock">Out of stock</div>
  </div>
</template>

<style lang="scss" scoped>
.product-card {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: 270px;
  padding: 1rem;
  margin: 1rem;
}

.product-card:hover img {
  transform: scale(1.1);
  transition: all 0.5s;
}

.product-image {
  width: 100%;
  height: 250px;
  object-fit: cover;
  margin-bottom: 1rem;
}

.product-name {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 0.5rem;
}

.product-quantity {
  font-size: 1rem;
  line-height: 1.5;
  margin-bottom: 1rem;
}

.product-price {
  font-size: 1.25rem;
  font-weight: 700;
  margin-bottom: 1rem;
}

.add-to-cart-btn {
  background-color: #333;
  color: #fff;
  border: none;
  border-radius: 5px;
  padding: 0.5rem 1rem;
  font-size: 1rem;
  cursor: pointer;
}

.out-of-stock {
  color: rgb(255, 0, 89);
  font-weight: bold;
}

.add-to-cart-btn:hover {
  background-color: #e71e6e;
}
</style>
