<script setup>
import { ShoppingCart } from 'lucide-vue-next';
import { useShopStore } from '../stores/useShopStore';

const shop = useShopStore();
</script>

<template>
  <nav class="navbar">
    <div class="logo">
      <img src="/logo.jpg" alt="Yufor uz" @error="(e) => (e.target.style.display = 'none')" />
      <span>Yufor uz</span>
    </div>
    <div class="cart-btn" @click="shop.toggleCart">
      <ShoppingCart :size="24" />
      <span v-if="shop.cartCount > 0" class="badge">{{ shop.cartCount }}</span>
    </div>
  </nav>
</template>

<style scoped>
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
  background: var(--white);
  border-bottom: 1px solid var(--border-color);
  position: sticky;
  top: 0;
  z-index: 100;
}

.logo {
  font-weight: 700;
  font-size: 20px;
  color: var(--primary-color);
  display: flex;
  align-items: center;
  gap: 8px;
}

.logo img {
  height: 32px;
}

.cart-btn {
  position: relative;
  cursor: pointer;
  padding: 4px;
}

.badge {
  position: absolute;
  top: -4px;
  right: -4px;
  background: #ff4d4f;
  color: white;
  font-size: 10px;
  padding: 2px 6px;
  border-radius: 10px;
  font-weight: bold;
}
</style>
