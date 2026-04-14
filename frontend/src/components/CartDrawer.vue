<script setup>
import { ShoppingBag, X, Plus, Minus, Trash2 } from 'lucide-vue-next';
import { useShopStore } from '../stores/useShopStore';

const shop = useShopStore();

const formatPrice = (price) => {
  return price.toLocaleString() + " so'm";
};

const handleCheckout = () => {
  shop.isCartOpen = false;
  // This will be handled in the main view to show the checkout form
  emit('checkout');
};

const emit = defineEmits(['checkout']);
</script>

<template>
  <Transition name="slide">
    <div v-if="shop.isCartOpen" class="cart-overlay" @click.self="shop.toggleCart">
      <div class="cart-content">
        <div class="header">
          <div class="title">
            <ShoppingBag :size="20" />
            <span>Savatcha</span>
          </div>
          <button class="close-btn" @click="shop.toggleCart">
            <X :size="24" />
          </button>
        </div>

        <div v-if="shop.cart.length === 0" class="empty-cart">
          <img src="https://cdni.iconscout.com/illustration/premium/thumb/empty-cart-2130356-1800917.png" alt="Bo'sh" />
          <p>Savatchangiz bo'sh</p>
          <button class="btn-primary" @click="shop.toggleCart">Xarid qilish</button>
        </div>

        <div v-else class="cart-items">
          <div v-for="item in shop.cart" :key="item.id + item.size" class="cart-item">
            <img :src="item.images[0]" :alt="item.name" />
            <div class="item-info">
              <h4 class="name">{{ item.name }}</h4>
              <p class="size">O'lcham: {{ item.size }}</p>
              <p class="price">{{ formatPrice(item.price) }}</p>
              <div class="quantity-controls">
                <button @click="shop.updateQuantity(item.id, item.size, -1)">
                  <Minus :size="16" />
                </button>
                <span>{{ item.quantity }}</span>
                <button @click="shop.updateQuantity(item.id, item.size, 1)">
                  <Plus :size="16" />
                </button>
              </div>
            </div>
            <button class="remove-btn" @click="shop.removeFromCart(item.id, item.size)">
              <Trash2 :size="18" />
            </button>
          </div>
        </div>

        <div v-if="shop.cart.length > 0" class="footer">
          <div class="total-row">
            <span>Jami:</span>
            <span class="total-amount">{{ formatPrice(shop.totalPrice) }}</span>
          </div>
          <button class="checkout-btn btn-primary" @click="handleCheckout">
            Buyurtma berish
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.cart-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 1100;
  display: flex;
  justify-content: flex-end;
}

.cart-content {
  background: white;
  width: 100%;
  max-width: 400px;
  height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  padding: 20px;
  border-bottom: 1px solid var(--border-color);
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.title {
  display: flex;
  align-items: center;
  gap: 10px;
  font-weight: 700;
  font-size: 18px;
}

.empty-cart {
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  text-align: center;
}

.empty-cart img {
  width: 200px;
  margin-bottom: 20px;
  opacity: 0.5;
}

.empty-cart p {
  color: var(--text-light);
  margin-bottom: 24px;
}

.cart-items {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
}

.cart-item {
  display: flex;
  gap: 12px;
  margin-bottom: 20px;
  padding-bottom: 20px;
  border-bottom: 1px solid #f5f5f5;
  position: relative;
}

.cart-item img {
  width: 80px;
  height: 80px;
  border-radius: 8px;
  object-fit: cover;
  background: #f9f9f9;
}

.item-info {
  flex: 1;
}

.item-info .name {
  font-size: 14px;
  margin-bottom: 4px;
  padding-right: 24px;
}

.item-info .size {
  font-size: 12px;
  color: var(--text-light);
  margin-bottom: 8px;
}

.item-info .price {
  font-weight: 700;
  color: var(--primary-color);
  margin-bottom: 12px;
}

.quantity-controls {
  display: flex;
  align-items: center;
  gap: 12px;
  background: #f5f5f5;
  width: fit-content;
  padding: 4px 8px;
  border-radius: 8px;
}

.quantity-controls span {
  font-weight: 600;
  min-width: 20px;
  text-align: center;
}

.remove-btn {
  position: absolute;
  top: 0;
  right: 0;
  color: #ff4d4f;
  padding: 4px;
}

.footer {
  padding: 20px;
  border-top: 1px solid var(--border-color);
  background: white;
}

.total-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
  font-size: 18px;
  font-weight: 700;
}

.total-amount {
  color: var(--primary-color);
}

.checkout-btn {
  width: 100%;
  font-size: 16px;
}

/* Transitions */
.slide-enter-active, .slide-leave-active { transition: transform 0.3s ease-out; }
.slide-enter-from, .slide-leave-to { transform: translateX(100%); }
</style>
