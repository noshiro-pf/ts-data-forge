// Sample code extracted from src/collections/iset-mapped.mts (intersection)
import { ISetMapped } from 'ts-data-forge';

type Permission = { id: string };
const permToKey = (p: Permission): string => p.id;
const keyToPerm = (id: string): Permission => ({ id });

const userPermissions = ISetMapped.create<Permission, string>(
  [{ id: 'read' }, { id: 'write' }, { id: 'delete' }],
  permToKey,
  keyToPerm,
);
const rolePermissions = ISetMapped.create<Permission, string>(
  [{ id: 'read' }, { id: 'comment' }, { id: 'write' }],
  permToKey,
  keyToPerm,
);

const commonPermissions = ISetMapped.intersection(
  userPermissions,
  rolePermissions,
);
console.log(commonPermissions.toArray().map((p) => p.id)); // Output: ["read", "write"]
