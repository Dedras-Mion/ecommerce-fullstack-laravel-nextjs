import {create} from 'zustand';

const useBasket = create(() => ({
  items: [],
  invoice: {
    totalPrice: 0,
  },

  actions: {
    addBasketItem: (item) => {},
    removeBasketItem: (item) => {},
  },
}));
