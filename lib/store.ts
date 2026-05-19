import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Product } from "./data";
interface CartItem {
    product: Product;
    quantity: number;
    selectedColor?: string;
}
interface StoreState {
    cart: CartItem[];
    isCartOpen: boolean;
    setCartOpen: (open: boolean) => void;
    addToCart: (product: Product, color?: string) => void;
    removeFromCart: (productId: string, color?: string) => void;
    updateQuantity: (productId: string, quantity: number, color?: string) => void;
    clearCart: () => void;
}
export const useStore = create<StoreState>()(persist((set) => ({
    cart: [],
    isCartOpen: false,
    setCartOpen: (open) => set({ isCartOpen: open }),
    addToCart: (product, color) => set((state) => {
        const existingIndex = state.cart.findIndex((item) => item.product.id === product.id && item.selectedColor === color);
        if (existingIndex > -1) {
            const newCart = [...state.cart];
            newCart[existingIndex].quantity += 1;
            return { cart: newCart, isCartOpen: true };
        }
        return {
            cart: [
                ...state.cart,
                { product, quantity: 1, selectedColor: color },
            ],
            isCartOpen: true,
        };
    }),
    removeFromCart: (productId, color) => set((state) => ({
        cart: state.cart.filter((item) => !(item.product.id === productId && item.selectedColor === color)),
    })),
    updateQuantity: (productId, quantity, color) => set((state) => {
        if (quantity <= 0) {
            return {
                cart: state.cart.filter((item) => !(item.product.id === productId &&
                    item.selectedColor === color)),
            };
        }
        return {
            cart: state.cart.map((item) => item.product.id === productId && item.selectedColor === color
                ? { ...item, quantity }
                : item),
        };
    }),
    clearCart: () => set({ cart: [] }),
}), {
    name: "aura-shopping-cart",
    partialize: (state) => ({ cart: state.cart }),
}));
