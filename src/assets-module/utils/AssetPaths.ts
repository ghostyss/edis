import { Directory, File, Paths } from "expo-file-system";

import { AssetType } from "../types/Asset";

function getFolder(type: AssetType): Directory {
  let folderName = "others";

  switch (type) {
    case AssetType.LOGO:
      folderName = "logos";
      break;

    case AssetType.BOOK:
      folderName = "books";
      break;

    case AssetType.COURSE:
      folderName = "courses";
      break;

    case AssetType.BANNER:
      folderName = "banners";
      break;

    case AssetType.AVATAR:
      folderName = "avatars";
      break;
  }

  const base = Paths.document;

  return new Directory(base, "assets", folderName);
}

function ensureFolder(type: AssetType): Directory {
  const folder = getFolder(type);

  if (!folder.exists) {
    folder.create({
      intermediates: true,
      idempotent: true,
    });
  }

  return folder;
}

function getExtensionFromUrl(url: string): string {
  const clean = url.split("?")[0];

  const parts = clean.split(".");

  return parts.length > 1 ? parts[parts.length - 1] : "png";
}

function getFileName(
  type: AssetType,
  id: number | string,
  version: number,
  extension: string,
) {
  return `${type}_${id}_v${version}.${extension}`;
}

function getFile(
  type: AssetType,
  id: number | string,
  version: number,
  extension: string,
): File {
  const folder = ensureFolder(type);

  return new File(folder, getFileName(type, id, version, extension));
}

export const AssetPaths = {
  getFolder,
  ensureFolder,
  getExtensionFromUrl,
  getFileName,
  getFile,
};
