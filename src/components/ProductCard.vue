<script>
import { ref } from "vue";
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
    image_url: {
      type: String,
      required: true,
    },
  },

  emits: ["add-to-cart"],

  setup(props, ctx) {
    const hasStock = ref(true);

    function addToCart() {
      if (props.stock > 0) {
        ctx.emit("add-to-cart", {
          name: props.name,
          unit_price: props.unit_price,
          stock: props.stock,
          image_url: props.image_url,
        });
      } else {
        hasStock.value = false;
        setTimeout(() => {
          hasStock.value = true;
        }, 2000);
      }
    }
    return {
      addToCart,
      hasStock,
    };
  },
};
</script>
<template>
  <div class="product-card">
    <img :src="image_url" alt="Product image" class="product-image" />
    <div class="header__card">
      <h2 class="product-name">{{ name }}</h2>
      <p class="product-quantity">Stock {{ stock }}</p>
    </div>
    <span class="product-price">${{ unit_price }}</span>
    <button class="add-to-cart-btn" @click="addToCart()">Add to Cart</button>
    <div v-if="!hasStock" class="out-of-stock">Out of stock</div>
  </div>
</template>

<style lang="scss" scoped>
.header__card {
  display: flex;
  justify-content: space-between;
}
.product-card {
  background-color: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
  overflow: hidden;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  padding: 1rem;
}

.product-card:hover img {
  transform: scale(1.1);
  transition: all 0.5s;
}

.product-image {
  width: 100%;
  height: 300px;
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
