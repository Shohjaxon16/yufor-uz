import { defineStore } from 'pinia';

export const useShopStore = defineStore('shop', {
  state: () => ({
    products: [
      {
        id: 1,
        name: 'Tibbiy Forma (Med 1)',
        price: 250000,
        description: 'Tibbiyot xodimlari uchun qulay va sifatli forma.',
        images: ['/assets/med_1.jpg'],
        sizes: ['S', 'M', 'L', 'XL', '2XL'],
        category: 'Med'
      },
      {
        id: 2,
        name: 'Hamshira Formasi (1)',
        price: 260000,
        description: 'Hamshiralar uchun maxsus dizayndagi qulay forma.',
        images: ['/assets/hamshira_1.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        category: 'Hamshira'
      },
      {
        id: 3,
        name: 'Tibbiy Forma (Med 2)',
        price: 270000,
        description: 'Ergonomik dizayn va nafas oluvchi mato.',
        images: ['/assets/med_2.jpg'],
        sizes: ['S', 'M', 'L', 'XL', '2XL'],
        category: 'Med'
      },
      {
        id: 4,
        name: 'Hamshira Formasi (2)',
        price: 280000,
        description: 'Premium sifatli hamshira formasi.',
        images: ['/assets/hamshira_2.jpg'],
        sizes: ['S', 'M', 'L', 'XL'],
        category: 'Hamshira'
      },
      {
        id: 5,
        name: 'Shifokor Formasi (Doctor 1)',
        price: 350000,
        description: 'Shifokorlar uchun professional ko\'rinishdagi forma.',
        images: ['/assets/doctor_1.jpg'],
        sizes: ['S', 'M', 'L', 'XL', '2XL'],
        category: 'Doctor'
      },
      {
        id: 6,
        name: 'Shifokor Formasi (Doctor 2)',
        price: 360000,
        description: 'Premium shifokor formasi.',
        images: ['/assets/doctor_2.jpg'],
        sizes: ['S', 'M', 'L', 'XL', '2XL'],
        category: 'Doctor'
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
