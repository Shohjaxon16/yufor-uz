<script setup>
import { ref, onMounted } from 'vue';
import { X, CheckCircle } from 'lucide-vue-next';
import { useShopStore } from '../stores/useShopStore';

const shop = useShopStore();
const isSubmitting = ref(false);
const isSuccess = ref(false);

const name = ref('');
const phone = ref('+998');

const props = defineProps(['show']);
const emit = defineEmits(['close']);

const validatePhone = (val) => {
  return val.startsWith('+998') && val.length === 13;
};

const handleSubmit = () => {
  if (!name.value || !validatePhone(phone.value)) {
    alert("Iltimos, ismingizni va telefon raqamingizni to'liq kiriting!");
    return;
  }

  isSubmitting.value = true;
  
  // Format order data for Telegram
  const orderData = {
    user: {
      name: name.value,
      phone: phone.value
    },
    items: shop.cart.map(item => ({
      name: item.name,
      size: item.size,
      quantity: item.quantity,
      price: item.price,
      total: item.price * item.quantity
    })),
    totalPrice: shop.totalPrice,
    shopName: "Yufor uz"
  };

  // Send to Telegram WebApp
  if (window.Telegram?.WebApp) {
    window.Telegram.WebApp.sendData(JSON.stringify(orderData));
  } else {
    console.log("Order Data (Simulated):", orderData);
    setTimeout(() => {
      isSubmitting.value = false;
      isSuccess.value = true;
      shop.clearCart();
    }, 1500);
  }
};
</script>

<template>
  <Transition name="fade">
    <div v-if="show" class="checkout-overlay" @click.self="emit('close')">
      <div class="checkout-content animate-slide-up">
        <button class="close-btn" @click="emit('close')">
          <X :size="24" />
        </button>

        <div v-if="!isSuccess" class="form-container">
          <h2>Buyurtmani rasmiylashtirish</h2>
          <p class="subtitle">Ma'lumotlaringizni kiriting, biz siz bilan tez orada bog'lanamiz.</p>

          <div class="input-group">
            <label>Ismingiz</label>
            <input v-model="name" type="text" placeholder="Ismingizni kiriting" />
          </div>

          <div class="input-group">
            <label>Telefon raqamingiz</label>
            <input v-model="phone" type="tel" placeholder="+998" maxlength="13" />
          </div>

          <div class="summary">
            <div class="summary-row">
              <span>Mahsulotlar soni:</span>
              <span>{{ shop.cartCount }} ta</span>
            </div>
            <div class="summary-row total">
              <span>Jami summa:</span>
              <span>{{ shop.totalPrice.toLocaleString() }} so'm</span>
            </div>
          </div>

          <button 
            class="submit-btn btn-primary" 
            :disabled="isSubmitting"
            @click="handleSubmit"
          >
            {{ isSubmitting ? 'Yuborilmoqda...' : 'Tasdiqlash' }}
          </button>
        </div>

        <div v-else class="success-container">
          <CheckCircle :size="64" color="#52c41a" />
          <h2>Rahmat!</h2>
          <p>Buyurtmangiz muvaffaqiyatli qabul qilindi. Tez orada siz bilan bog'lanamiz.</p>
          <button class="btn-primary" @click="emit('close')">Yopish</button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.checkout-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.6);
  backdrop-filter: blur(8px);
  z-index: 1200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.checkout-content {
  background: white;
  width: 100%;
  max-width: 500px;
  border-radius: 20px;
  padding: 30px;
  position: relative;
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  color: var(--text-light);
}

h2 {
  font-size: 24px;
  font-weight: 700;
  margin-bottom: 8px;
  text-align: center;
}

.subtitle {
  text-align: center;
  color: var(--text-light);
  margin-bottom: 24px;
  font-size: 14px;
}

.input-group {
  margin-bottom: 20px;
}

.input-group label {
  display: block;
  font-weight: 600;
  margin-bottom: 8px;
  font-size: 14px;
}

.input-group input {
  width: 100%;
  padding: 14px;
  border: 1px solid var(--border-color);
  border-radius: 12px;
  font-size: 16px;
  outline: none;
  transition: border-color 0.2s;
}

.input-group input:focus {
  border-color: var(--primary-color);
}

.summary {
  background: #f9f9f9;
  padding: 16px;
  border-radius: 12px;
  margin-bottom: 24px;
}

.summary-row {
  display: flex;
  justify-content: space-between;
  margin-bottom: 8px;
  color: var(--text-light);
}

.summary-row.total {
  border-top: 1px solid #eee;
  padding-top: 8px;
  margin-top: 8px;
  font-weight: 700;
  color: var(--text-color);
  font-size: 18px;
}

.submit-btn {
  width: 100%;
  padding: 16px;
  font-size: 18px;
}

.success-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  padding: 20px 0;
}

.success-container h2 {
  margin-top: 20px;
}

.success-container p {
  color: var(--text-light);
  margin-bottom: 30px;
}

/* Transitions */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
