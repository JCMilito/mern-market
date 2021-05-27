import axios from "axios";
import Product from "../model/Product";

const api = axios.create({
  baseURL: "http://localhost:3001/product/",
});

class ProductDAO {

  async findProducts(): Promise<Product[]> {
    try {
      let response = await api.get("find");
      return response.data.sort((a: Product, b: Product) => a.name.toLowerCase() < b.name.toLowerCase() ? -1 : 1);
    } catch (error) {
      throw error;
    }  
  }

  async createProduct(product: Product): Promise<Product> {
    try {
      let response = await api.post("save", { product });
      return response.data;
    } catch (error) {
      throw error;
    }  
  }

  async updateProduct(product: Product): Promise<Product> {
    try {
      let response = await api.post("update", { product });
      return response.data;
    } catch (error) {
      throw error;
    }  
  }

  async deleteProduct(_id: string): Promise<void> {
    try {
      let response = await api.post("remove", { _id });
      return response.data;
    } catch (error) {
      throw error;
    }  
  }
}

export default new ProductDAO();




