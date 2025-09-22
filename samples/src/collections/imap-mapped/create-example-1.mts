// Sample code extracted from src/collections/imap-mapped.mts (create)
import { IMapMapped } from 'ts-data-forge';

// Example 1: Geographic coordinates as keys
type Coordinate = { lat: number; lng: number };
type LocationInfo = { name: string; population: number };

const coordToString = (coord: Coordinate): string =>
  `${coord.lat},${coord.lng}`;
const stringToCoord = (str: string): Coordinate => {
  const [lat, lng] = str.split(',').map(Number);
  return { lat, lng };
};

const locationMap = IMapMapped.create<Coordinate, LocationInfo, string>(
  [
    [
      { lat: 40.7128, lng: -74.006 },
      { name: 'New York', population: 8000000 },
    ],
    [
      { lat: 34.0522, lng: -118.2437 },
      { name: 'Los Angeles', population: 4000000 },
    ],
  ],
  coordToString,
  stringToCoord,
);

const nyCoord = { lat: 40.7128, lng: -74.006 };
console.log(locationMap.get(nyCoord).unwrap().name); // Output: "New York"

// Example 2: Multi-part business keys
type OrderId = { customerId: string; year: number; orderNumber: number };

const orderIdToKey = (id: OrderId): string =>
  `${id.customerId}:${id.year}:${id.orderNumber}`;

const keyToOrderId = (key: string): OrderId => {
  const [customerId, yearStr, orderNumStr] = key.split(':');
  return {
    customerId,
    year: Number(yearStr),
    orderNumber: Number(orderNumStr),
  };
};

const orderMap = IMapMapped.create<OrderId, Order, string>(
  [],
  orderIdToKey,
  keyToOrderId,
);

// Example 3: Simple case with string keys (identity transformation)
const simpleMap = IMapMapped.create<string, number, string>(
  [
    ['key1', 100],
    ['key2', 200],
  ],
  (s) => s, // identity function
  (s) => s, // identity function
);

// Example 4: From existing data structures
const existingEntries = new Map([
  [
    { id: 1, type: 'user' },
    { name: 'Alice', active: true },
  ],
  [
    { id: 2, type: 'user' },
    { name: 'Bob', active: false },
  ],
]);

type EntityKey = { id: number; type: string };
const entityKeyToString = (key: EntityKey): string => `${key.type}_${key.id}`;
const stringToEntityKey = (str: string): EntityKey => {
  const [type, idStr] = str.split('_');
  return { type, id: Number(idStr) };
};

const entityMap = IMapMapped.create<EntityKey, Entity, string>(
  existingEntries,
  entityKeyToString,
  stringToEntityKey,
);

export { coordToString, entityKeyToString, entityMap, existingEntries, keyToOrderId, locationMap, nyCoord, orderIdToKey, orderMap, simpleMap, stringToCoord, stringToEntityKey };
export type { Coordinate, EntityKey, LocationInfo, OrderId };
