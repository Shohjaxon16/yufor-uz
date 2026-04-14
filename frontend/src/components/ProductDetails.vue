<script setup>
import { ref, computed } from 'vue';
import { X, ChevronLeft, ChevronRight, ShoppingCart } from 'lucide-vue-next';
import { useShopStore } from '../stores/useShopStore';

const shop = useShopStore();
const selectedSize = ref('');
const activeImageIndex = ref(0);

const product = computed(() => shop.selectedProduct);

const formatPrice = (price) => {
  return price.toLocaleString() + " so'm";
};

const nextImage = () => {
  if (activeImageIndex.value < product.value.images.length - 1) {
    activeImageIndex.value++;
  } else {
    activeImageIndex.value = 0;
  }
};

const prevImage = () => {
  if (activeImageIndex.value > 0) {
    activeImageIndex.value--;
  } else {
    activeImageIndex.value = product.value.images.length - 1;
  }
};

const handleAddToCart = () => {
  if (!selectedSize.value) {
    alert("Iltimos, o'lchamni tanlang!");
    return;
  }
  shop.addToCart(product.value, selectedSize.value);
  shop.closeProduct();
};
</script>

<template>
  <Transition name="fade">
    <div v-if="product" class="modal-overlay" @click.self="shop.closeProduct">
      <div class="modal-content animate-slide-up">
        <button class="close-btn" @click="shop.closeProduct">
          <X :size="24" />
        </button>

        <div class="gallery">
          <div class="main-image">
            <img :src="product.images[activeImageIndex]" :alt="product.name" />
            <button v-if="product.images.length > 1" class="nav-arrow left" @click="prevImage">
              <ChevronLeft :size="24" />
            </button>
            <button v-if="product.images.length > 1" class="nav-arrow right" @click="nextImage">
              <ChevronRight :size="24" />
            </button>
          </div>
          <div v-if="product.images.length > 1" class="thumbnails">
            <div 
              v-for="(img, index) in product.images" 
              :key="index"
              class="thumb"
              :class="{ active: index === activeImageIndex }"
              @click="activeImageIndex = index"
            >
              <img :src="img" />
            </div>
          </div>
        </div>

        <div class="details">
          <h2 class="name">{{ product.name }}</h2>
          <p class="category">{{ product.category }}</p>
          <div class="price-row">
            <span class="price">{{ formatPrice(product.price) }}</span>
          </div>

          <div class="section">
            <label>O'lcham tanlang:</label>
            <div class="size-grid">
              <button 
                v-for="size in product.sizes" 
                :key="size"
                class="size-btn"
                :class="{ active: selectedSize === size }"
                @click="selectedSize = size"
              >
                {{ size }}
              </button>
            </div>
          </div>

          <div class="section">
            <label>Mahsulot haqida:</label>
            <p class="description">{{ product.description }}</p>
          </div>

          <button class="add-btn btn-primary" @click="handleAddToCart">
            <ShoppingCart :size="20" />
            Savatchaga qo'shish
          </button>
        </div>
      </div>
    </div>
  </Transition>
</template>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  backdrop-filter: blur(4px);
  z-index: 1000;
  display: flex;
  align-items: flex-end;
}

.modal-content {
  background: white;
  width: 100%;
  max-height: 90vh;
  border-radius: 24px 24px 0 0;
  overflow-y: auto;
  position: relative;
  padding: 24px;
}

.close-btn {
  position: absolute;
  top: 16px;
  right: 16px;
  z-index: 10;
  background: #f5f5f5;
  border-radius: 50%;
  width: 36px;
  height: 36px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.gallery {
  margin-bottom: 24px;
}

.main-image {
  position: relative;
  aspect-ratio: 1;
  background: #f9f9f9;
  border-radius: 16px;
  overflow: hidden;
  margin-bottom: 12px;
}

.main-image img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.nav-arrow {
  position: absolute;
  top: 50%;
  transform: translateY(-50%);
  background: rgba(255, 255, 255, 0.8);
  border-radius: 50%;
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.nav-arrow.left { left: 8px; }
.nav-arrow.right { right: 8px; }

.thumbnails {
  display: flex;
  gap: 8px;
}

.thumb {
  width: 60px;
  height: 60px;
  border-radius: 8px;
  overflow: hidden;
  border: 2px solid transparent;
  cursor: pointer;
}

.thumb.active {
  border-color: var(--primary-color);
}

.thumb img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.details .name {
  font-size: 22px;
  font-weight: 700;
  margin-bottom: 4px;
}

.details .category {
  color: var(--text-light);
  margin-bottom: 16px;
}

.price {
  font-size: 24px;
  font-weight: 800;
  color: var(--primary-color);
  margin-bottom: 24px;
  display: block;
}

.section {
  margin-bottom: 24px;
}

.section label {
  display: block;
  font-weight: 600;
  margin-bottom: 12px;
  font-size: 16px;
}

.size-grid {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}

.size-btn {
  padding: 8px 16px;
  border: 1px solid var(--border-color);
  border-radius: 8px;
  font-weight: 600;
  transition: all 0.2s;
}

.size-btn.active {
  background: var(--secondary-color);
  border-color: var(--primary-color);
  color: var(--primary-color);
}

.description {
  color: var(--text-light);
  line-height: 1.6;
}

.add-btn {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  font-size: 18px;
  padding: 16px;
}

/* Transitions */
.fade-enter-active, .fade-leave-active { transition: opacity 0.3s; }
.fade-enter-from, .fade-leave-to { opacity: 0; }
</style>
