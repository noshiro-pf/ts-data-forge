// Example: src/collections/imap-mapped.mts (IMapMapped)
import { IMapMapped } from 'ts-data-forge';

// Example: Product catalog with composite keys
type ProductKey = { brand: string; model: string; year: number };
type Product = { name: string; price: number; inStock: boolean };

// Define bidirectional transformation functions
const productKeyToString = (key: ProductKey): string =>
  `${key.brand}|${key.model}|${key.year}`;

const stringToProductKey = (str: string): ProductKey => {
  const [brand, model, yearStr] = str.split('|');
  return { brand, model, year: Number(yearStr) };
};

// Create a map with complex keys
let catalog = IMapMapped.create<ProductKey, Product, string>(
  [],
  productKeyToString,
  stringToProductKey,
);

// Use complex objects as keys naturally
const toyotaCamry2023: ProductKey = {
  brand: 'Toyota',
  model: 'Camry',
  year: 2023,
};
const hondaAccord2022: ProductKey = {
  brand: 'Honda',
  model: 'Accord',
  year: 2022,
};

catalog = catalog
  .set(toyotaCamry2023, {
    name: 'Toyota Camry 2023',
    price: 28_000,
    inStock: true,
  })
  .set(hondaAccord2022, {
    name: 'Honda Accord 2022',
    price: 26_500,
    inStock: false,
  });

// All operations work with the original key type
console.log(catalog.get(toyotaCamry2023).unwrapOr(notFound).name);
// Output: "Toyota Camry 2023"

console.log(catalog.has(hondaAccord2022)); // Output: true
console.log(catalog.size); // Output: 2

// Iteration preserves original key types
for (const [productKey, product] of catalog) {
  console.log(
    `${productKey.brand} ${productKey.model} (${productKey.year}): $${product.price}`,
  );
}
// Output:
// Toyota Camry (2023): $28000
// Honda Accord (2022): $26500

// Functional transformations work seamlessly
const discountedCatalog = catalog.map((product, key) => ({
  ...product,
  price: Math.round(product.price * 0.9), // 10% discount
}));

export {
  catalog,
  discountedCatalog,
  hondaAccord2022,
  productKeyToString,
  stringToProductKey,
  toyotaCamry2023,
};
export type { Product, ProductKey };
