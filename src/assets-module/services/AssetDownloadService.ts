import { File as ExpoFile } from "expo-file-system";

import { AssetPaths } from "../utils/AssetPaths";
import { AssetType } from "../types/Asset";

interface DownloadRequest {
  type: AssetType;
  id: number;
  url: string;
  version: string;
}

async function download({
  type,
  id,
  url,
  version,
}: DownloadRequest): Promise<ExpoFile> {
  const extension = AssetPaths.getExtensionFromUrl(url);

  const localFile = AssetPaths.getFile(type, id, version, extension);

  if (localFile.exists) {
    return localFile;
  }

  await ExpoFile.downloadFileAsync(url, localFile, {
    idempotent: true,
  });

  return localFile;
}

function exists(
  type: AssetType,
  id: number,
  version: string,
  extension: string,
): boolean {
  const file = AssetPaths.getFile(type, id, version, extension);

  return file.exists;
}

function remove(
  type: AssetType,
  id: number,
  version: string,
  extension: string,
): void {
  const file = AssetPaths.getFile(type, id, version, extension);

  if (file.exists) {
    file.delete();
  }
}

function getFile(
  type: AssetType,
  id: number,
  version: string,
  extension: string,
): ExpoFile {
  return AssetPaths.getFile(type, id, version, extension);
}

export const AssetDownloadService = {
  download,
  exists,
  remove,
  getFile,
};
