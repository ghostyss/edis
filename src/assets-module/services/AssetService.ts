import { ApiClient } from "../../services/ApiClient";

import { AssetRequest, AssetServerResponse } from "../types/Asset";

async function requestAsset(
  request: AssetRequest,
): Promise<AssetServerResponse> {
  const json = await ApiClient.post<any>({
    action: "asset",

    data: {
      type: request.type,

      id: request.id,
    },
  });

  if (json.Code !== 200) {
    //throw new Error(json.Msj ?? "No fue posible obtener el recurso.");
    return {
      url: "",

      version: json.version,

      hash: json.hash,

      lastUpdate: json.lastupdate,
    };
  } else {
    return {
      url: json.url,

      version: json.version,

      hash: json.hash,

      lastUpdate: json.lastupdate,
    };
  }
}

export const AssetService = {
  requestAsset,
};
