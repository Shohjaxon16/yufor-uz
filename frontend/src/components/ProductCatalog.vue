<script setup>
import { useShopStore } from '../stores/useShopStore';

const shop = useShopStore();

const formatPrice = (price) => {
  return price.toLocaleString() + " so'm";
};
</script>

<template>
  <div class="catalog">
    <div 
      v-for="product in shop.products" 
      :key="product.id" 
      class="product-card animate-slide-up"
      @click="shop.openProduct(product)"
    >
      <div class="image-wrapper">
        <img :src="product.images[0]" :alt="product.name" />
      </div>
      <div class="info">
        <h3 class="name">{{ product.name }}</h3>
        <p class="category">{{ product.category }}</p>
        <p class="price">{{ formatPrice(product.price) }}</p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.catalog {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 16px;
  padding: 16px;
}

.product-card {
  background: white;
  border-radius: 16px;
  overflow: hidden;
  box-shadow: var(--shadow);
  cursor: pointer;
  transition: transform 0.2s;
}

.product-card:active {
  transform: scale(0.98);
}

.image-wrapper {
  aspect-ratio: 1;
  background: #f9f9f9;
  display: flex;
  align-items: center;
  justify-content: center;
}

.image-wrapper img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.info {
  padding: 12px;
}

.name {
  font-size: 14px;
  font-weight: 600;
  margin-bottom: 4px;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.category {
  font-size: 12px;
  color: var(--text-light);
  margin-bottom: 8px;
}

.price {
  font-size: 16px;
  font-weight: 700;
  color: var(--primary-color);
}
</style>
