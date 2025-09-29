// Example: src/collections/iset-mapped.mts (create)
import { ISetMapped } from 'ts-data-forge';

// Example 1: Product catalog with SKU-based identity
type Product = { sku: string; name: string; price: number; category: string };

const productToKey = (product: Product): string => product.sku;
const keyToProduct = (sku: string): Product => 
  // In practice, this might fetch from a product service or cache
   ({
    sku,
    name: `Product ${sku}`,
    price: 0,
    category: 'unknown',
  })
;

const productSet = ISetMapped.create<Product, string>(
  [
    {
      sku: 'LAPTOP-001',
      name: 'Gaming Laptop',
      price: 1299,
      category: 'electronics',
    },
    {
      sku: 'MOUSE-002',
      name: 'Wireless Mouse',
      price: 49,
      category: 'accessories',
    },
    {
      sku: 'LAPTOP-001',
      name: 'Gaming Laptop',
      price: 1299,
      category: 'electronics',
    }, // Duplicate SKU
  ],
  productToKey,
  keyToProduct,
);

console.log(productSet.size); // Output: 2 (duplicate removed)
console.log(
  productSet.has({
    sku: 'LAPTOP-001',
    name: 'Gaming Laptop',
    price: 1299,
    category: 'electronics',
  }),
); // true

// Example 2: Geographic locations with coordinate-based identity
type Location = { name: string; lat: number; lng: number; type: string };

const locationToKey = (loc: Location): string =>
  `${loc.lat.toFixed(6)},${loc.lng.toFixed(6)}`;
const keyToLocation = (key: string): Location => {
  const [latStr, lngStr] = key.split(',');
  return {
    name: 'Unknown Location',
    lat: Number.parseFloat(latStr),
    lng: Number.parseFloat(lngStr),
    type: 'point',
  };
};

const locationSet = ISetMapped.create<Location, string>(
  [
    {
      name: 'Statue of Liberty',
      lat: 40.689_247,
      lng: -74.044_502,
      type: 'monument',
    },
    {
      name: 'Empire State Building',
      lat: 40.748_817,
      lng: -73.985_428,
      type: 'building',
    },
  ],
  locationToKey,
  keyToLocation,
);

// Example 3: User entities with multi-part identity
type User = { id: number; tenant: string; email: string; active: boolean };

const userToKey = (user: User): string => `${user.tenant}:${user.id}`;
const keyToUser = (key: string): User => {
  const [tenant, idStr] = key.split(':');
  return {
    id: Number(idStr),
    tenant,
    email: `user${idStr}@${tenant}.com`,
    active: true,
  };
};

const userSet = ISetMapped.create<User, string>([], userToKey, keyToUser)
  .add({ id: 1, tenant: 'acme', email: 'alice@acme.com', active: true })
  .add({ id: 2, tenant: 'acme', email: 'bob@acme.com', active: false });

console.log(userSet.size); // Output: 2

// Example 4: Empty set with type specification
const emptyProductSet = ISetMapped.create<Product, string>(
  [],
  productToKey,
  keyToProduct,
);
console.log(emptyProductSet.isEmpty); // Output: true

export {
  emptyProductSet,
  keyToLocation,
  keyToProduct,
  keyToUser,
  locationSet,
  locationToKey,
  productSet,
  productToKey,
  userSet,
  userToKey,
};
export type { Location, Product, User };
