<script setup>
import { ref, onMounted } from 'vue';
import Navbar from './components/Navbar.vue';
import ProductCatalog from './components/ProductCatalog.vue';
import ProductDetails from './components/ProductDetails.vue';
import CartDrawer from './components/CartDrawer.vue';
import CheckoutForm from './components/CheckoutForm.vue';
import { useShopStore } from './stores/useShopStore';

const shop = useShopStore();
const showCheckout = ref(false);

onMounted(() => {
  if (window.Telegram?.WebApp) {
    const tg = window.Telegram.WebApp;
    tg.ready();
    tg.expand();
    
    // Set theme colors
    document.documentElement.style.setProperty('--primary-color', tg.themeParams.button_color || '#2196f3');
  }
});

const openCheckout = () => {
  showCheckout.value = true;
};
</script>

<template>
  <div class="tma-container">
    <Navbar />
    
    <main class="main-content">
      <ProductCatalog />
    </main>

    <!-- Modals & Overlays -->
    <ProductDetails />
    <CartDrawer @checkout="openCheckout" />
    <CheckoutForm :show="showCheckout" @close="showCheckout = false" />
    
    <footer class="footer">
      <p>&copy; 2026 Yufor uz. Barcha huquqlar himoyalangan.</p>
    </footer>
  </div>
</template>

<style>
@import './index.css';

.main-content {
  flex: 1;
  padding-bottom: 40px;
}

.footer {
  padding: 24px;
  text-align: center;
  font-size: 12px;
  color: var(--text-light);
  border-top: 1px solid var(--border-color);
  background: #f9f9f9;
}
</style>
