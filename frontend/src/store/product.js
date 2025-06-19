import { create } from "zustand";

export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      return { success: false, message: "All fields are required." };
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newProduct),
      });

      if (!res.ok) {
        // Handle empty response body
        let errorMessage = "Failed to create product";
        try {
          const errorData = await res.json();
          errorMessage = errorData.message || errorMessage;
        } catch (jsonError) {
          // Response body is empty or not JSON
          errorMessage = `Server error (${res.status}): ${res.statusText}`;
        }
        return { success: false, message: errorMessage };
      }

      const data = await res.json();
      set((state) => ({
        products: [...state.products, data.data],
      }));
      return { success: true, message: "Product created successfully." };
    } catch (error) {
      return {
        success: false,
        message: error.message || "Network error occurred",
      };
    }
  },
  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({
      products: data.data,
    });
  },
  deleteProduct: async (pid) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "DELETE",
    });
    const data = await res.json();
    if (!data.success) {
      return {
        success: false,
        message: data.message || "Failed to delete product",
      };
    }
    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));
    return { success: true, message: data.message };
  },
  updateProduct: async (pid, updatedProduct) => {
    const res = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(updatedProduct),
    });
    const data = await res.json();
    if (!data.success) {
      return {
        success: false,
        message: data.message || "Failed to update product",
      };
    }
    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? data.data : product
      ),
    }));
    return { success: true, message: data.message };
  },
}));
