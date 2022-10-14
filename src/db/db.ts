import { DBSchema, IDBPDatabase, openDB } from 'idb';
import { v4 as uuidv4 } from 'uuid';

export type Block = {
  localId?: string;
  body?: string;
  content?: string;
  createdAt?: Date;
  type?: "page";
};

interface EngramDB extends DBSchema {
  blocks: {
    value: Block;
    key: string;
  };
}

let _db: Promise<IDBPDatabase<EngramDB>> | null = null;

export function getDb() {
  if (_db) {
    return _db;
  }

  _db = openDB<EngramDB>("engram-pages-db", 1, {
    upgrade(db, oldVersion, newVersion) {
      if (oldVersion < 1) {
        const blocksStore = db.createObjectStore("blocks", {
          keyPath: "localId",
        });
      }
    },
  });

  return _db;
}

export async function addBlock(value: EngramDB["blocks"]["value"]) {
  const db = await getDb();

  const localId = uuidv4();
  const date = new Date();
  const addedBlock = { ...value, localId, createdAt: date };
  await db.add("blocks", addedBlock);
  return addedBlock;
}

export async function removeBlock(id?: string) {
  if (!id) {
    return;
  }

  const db = await getDb();
  await db.delete("blocks", id);
}

export async function getAllBlocks() {
  const db = await getDb();
  return db.getAll("blocks");
}