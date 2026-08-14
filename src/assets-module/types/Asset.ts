export enum AssetType {
  LOGO = "logo",
  BOOK = "book",
  COURSE = "course",
  BANNER = "banner",
  AVATAR = "avatar",
}

export interface AssetRequest {
  type: AssetType;
  id: number;
}

export interface AssetFile {
  type: AssetType;
  id: number;
  url: string;
  localUri: string;

  version: string;
  hash: string;
  lastUpdate: string;
}

export interface AssetServerResponse {
  url: string;

  version: string;
  hash: string;
  lastUpdate: string;
}

export interface AssetResponse {
  uri: string;

  fromCache: boolean;
  downloaded: boolean;
  defaultAsset: boolean;
}
