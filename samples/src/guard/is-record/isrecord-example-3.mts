// Sample code extracted from src/guard/is-record.mts (isRecord)
// Filtering mixed arrays to find plain objects:

const mixedData: unknown[] = [
  { type: 'user', name: 'Alice' },
  [1, 2, 3],
  'string',
  { type: 'admin', permissions: ['read', 'write'] },
  new Date(),
  null,
  { id: 123 },
];

const records = mixedData.filter(isRecord);
// records contains only the plain objects:
// [{ type: 'user', name: 'Alice' }, { type: 'admin', permissions: [...] }, { id: 123 }]

records.forEach((record) => {
  // Each record is guaranteed to be UnknownRecord
  const keys = Object.keys(record);
  console.log('Object keys:', keys);
});
