import { create } from "zustand";

//create the hook
//return obj
//if the field its not provides
export const useProductStore = create((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, meessage: "Please fill in all the fields !" };
    }

    //create the product
    const resp = await fetch("/api/products", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newProduct),
    });
    const data = await resp.json();
    //update the state, return an object products just keep al the prev products
    //add new product that i just got back from the backend
    set((state) => ({ products: [...state.products, data.data] }));
    return { success: true, message: "Product created successfully !" };
  },
  //send a request to the endpoint and grab it
  fetchProducts: async () => {
    const res = await fetch("/api/products");
    const data = await res.json();
    set({ products: data.data });
  },

  deleteTheProduct: async (pid) => {
    const resp = await fetch(`/api/products/${pid}`, { method: "DELETE" });
    const data = await resp.json();
    console.log("Delete response:", data);
    if (!data.success) return { success: false, message: data.message };
    //update my state (product) the one that i just deleted to filter out.
    //use the filter method to delete the current product from the state and success message from bk after delete the product.
    set((state) => ({
      products: state.products.filter((product) => product._id !== pid),
    }));
    return {
      success: true,
      data: data.message,
    };
  },

  updateTheProduct: async (pid, updatedProduct) => {
    const resp = await fetch(`/api/products/${pid}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedProduct),
    });

    const data = await resp.json();

    //the prev products
    if (!data.success) return { success: false, message: data.message };
    set((state) => ({
      products: state.products.map((product) =>
        product._id === pid ? data.data : product
      ),
    }));

    return {
      success: true,
      data: data.message,
    };
  },
}));

//create function to create a product
