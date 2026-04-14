import { defineStore } from 'pinia';

export const useShopStore = defineStore('shop', {
  state: () => ({
    products: [
      {
        id: 1,
        name: 'Tibbiy Forma (Och ko\'k)',
        price: 250000,
        description: 'Yuqori sifatli matodan tayyorlangan, namlikni yaxshi o\'tkazuvchi va qulay tibbiy forma. Hamshira va shifokorlar uchun ideal tanlov.',
        images: [
          '/assets/medical_scrubs_blue.png',
          '/assets/medical_scrubs_blue_2.png' // Placeholder for second image
        ],
        sizes: ['S', 'M', 'L', 'XL', '2XL'],
        category: 'Forma'
      },
      {
        id: 2,
        name: 'Tibbiy Xalat (Oq)',
        price: 300000,
        description: 'Klassik oq rangli, professional dizayndagi tibbiy xalat. Kirga chidamli va dazmollash oson.',
        images: [
          '/assets/lab_coat_modern.png'
        ],
        sizes: ['S', 'M', 'L', 'XL', '2XL'],
        category: 'Xalat'
      },
      {
        id: 3,
        name: 'Tibbiy Forma (Premium Oq)',
        price: 350000,
        description: 'Eksklyuziv matodan tikilgan, zamonaviy bichimli premium tibbiy forma. Maksimal qulaylik va professional ko\'rinishni ta\'minlaydi.',
        images: [
          '/assets/medical_scrubs_white_premium.png'
        ],
        sizes: ['S', 'M', 'L', 'XL'],
        category: 'Forma'
      }
    ],
    cart: [],
    selectedProduct: null,
    isCartOpen: false,
    userDetails: {
      name: '',
      phone: ''
    }
  }),
  actions: {
    addToCart(product, size) {
      const existingItem = this.cart.find(item => item.id === product.id && item.size === size);
      if (existingItem) {
        existingItem.quantity++;
      } else {
        this.cart.push({ ...product, size, quantity: 1 });
      }
    },
    removeFromCart(id, size) {
      this.cart = this.cart.filter(item => !(item.id === id && item.size === size));
    },
    updateQuantity(id, size, delta) {
      const item = this.cart.find(item => item.id === id && item.size === size);
      if (item) {
        item.quantity += delta;
        if (item.quantity <= 0) this.removeFromCart(id, size);
      }
    },
    clearCart() {
      this.cart = [];
    },
    openProduct(product) {
      this.selectedProduct = product;
    },
    closeProduct() {
      this.selectedProduct = null;
    },
    toggleCart() {
      this.isCartOpen = !this.isCartOpen;
    }
  },
  getters: {
    totalPrice: (state) => state.cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
    cartCount: (state) => state.cart.reduce((sum, item) => sum + item.quantity, 0)
  }
});
