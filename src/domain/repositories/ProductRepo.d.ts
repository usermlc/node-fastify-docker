declare namespace Repositories {
  // Interface for Product Repository
  interface IProductRepository {
    // Method to get a product by ID
    getById(id: string): Promise<Entities.Product | null>;

    // Method to save a new product
    save(product: Entities.Product): Promise<Entities.Product>;

    // Method to update an existing product
    update(product: Entities.Product): Promise<Entities.Product>;

    // Method to delete a product by ID
    delete(id: string): Promise<void>;

    // Method to find products based on filters
    find(filters: {
      term?: string; // Search term for filtering products
      limit?: number; // Limit the number of results
      offset?: number; // Offset for pagination
      sort?: string; // Sort order for results
    }): Promise<Entities.ProductsList>;
  }
}
