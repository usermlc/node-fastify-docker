declare namespace EntityFields {
  // Define the structure of the Product fields
  export type Product = {
    id?: string; // Optional product ID
    name: string; // Product name
    description: string; // Product description
    price: number; // Product price
    releaseDate: Date; // Product release date
  };
}

declare namespace Entities {
  export class Product {
    public id?: string; // Optional product ID
    public name: string; // Product name
    public description: string; // Product description
    public price: number; // Product price
    public releaseDate: Date; // Product release date

    // Constructor to initialize a Product object
    constructor(fields: EntityFields.Product) {
      this.id = fields.id;
      this.name = fields.name;
      this.price = fields.price;
      this.description = fields.description;
      this.releaseDate = fields.releaseDate;
    }
  }

  // Define the structure of the ProductsList type
  export type ProductsList = {
    items: Product[]; // Array of Product objects
    total: number; // Total number of products
    page: number; // Current page number
  };
}
