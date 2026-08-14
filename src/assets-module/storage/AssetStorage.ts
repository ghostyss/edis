import AsyncStorage from "@react-native-async-storage/async-storage";

import { AssetFile, AssetType } from "../types/Asset";

const STORAGE_KEY = "APP_ASSETS_METADATA";

async function getAll(): Promise<AssetFile[]> {
  const data = await AsyncStorage.getItem(STORAGE_KEY);

  if (!data) {
    return [];
  }

  return JSON.parse(data);
}

async function saveAll(assets: AssetFile[]): Promise<void> {
  await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(assets));
}

async function get(type: AssetType, id: number): Promise<AssetFile | null> {
  const assets = await getAll();

  const asset = assets.find(
    (item) => item.type === type && String(item.id) === String(id),
  );

  return asset ?? null;
}

async function save(asset: AssetFile): Promise<void> {
  const assets = await getAll();

  const index = assets.findIndex(
    (item) => item.type === asset.type && String(item.id) === String(asset.id),
  );

  if (index >= 0) {
    assets[index] = asset;
  } else {
    assets.push(asset);
  }

  await saveAll(assets);
}

async function remove(type: AssetType, id: number | string): Promise<void> {
  const assets = await getAll();

  const filtered = assets.filter(
    (item) => !(item.type === type && String(item.id) === String(id)),
  );

  await saveAll(filtered);
}

async function clear(): Promise<void> {
  await AsyncStorage.removeItem(STORAGE_KEY);
}

export const AssetStorage = {
  get,
  save,
  remove,
  clear,
};
