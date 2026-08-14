import { AssetStorage } from "../storage/AssetStorage";

import { AssetService } from "../services/AssetService";

import { AssetDownloadService } from "../services/AssetDownloadService";

import { AssetRequest, AssetResponse } from "../types/Asset";

async function getImage(
  request: AssetRequest,
  isOnline: boolean,
): Promise<AssetResponse> {
  const cache = await AssetStorage.get(request.type, request.id);

  // Existe metadata local
  if (cache) {
    return {
      uri: cache.localUri,
      fromCache: true,
      downloaded: true,
      defaultAsset: false,
    };
  }

  // Sin internet
  if (!isOnline) {
    return {
      uri: "",
      fromCache: false,
      downloaded: false,
      defaultAsset: true,
    };
  }

  // Solicitar recurso al servidor

  const server = await AssetService.requestAsset(request);

  //console.log("ASSET SERVER:", server);

  // Descargar archivo físico
  if (server.url) {
    const file = await AssetDownloadService.download({
      type: request.type,
      id: request.id,
      url: server.url,
      version: server.version,
    });

    // Guardar metadata local
    await AssetStorage.save({
      type: request.type,

      id: request.id,

      url: server.url,

      hash: server.hash,

      version: server.version,

      lastUpdate: server.lastUpdate,

      localUri: file.uri,
    });
    return {
      uri: file.uri,

      fromCache: false,

      downloaded: true,

      defaultAsset: false,
    };
  } else {
    return {
      uri: "",

      fromCache: false,

      downloaded: false,

      defaultAsset: true,
    };
  }
}

export const AssetRepository = {
  getImage,
};
