import React, { useEffect, useState } from "react";

import { Image, ImageSourcePropType } from "react-native";

import { useAppTheme } from "../../../hooks/useAppTheme";

import { useLanguageContext } from "../../../context/LanguageContext";

import { useNetworkContext } from "../../../context/NetworkContext";

import { AssetRepository } from "../../../assets-module/repository/AssetRepository";

import { AssetType } from "../../../assets-module/types/Asset";

const DEFAULT_LOGO = require("../../../assets/logos/Logo_Default.png");

export default function HeaderLogo() {
  const { styles: appStyles } = useAppTheme();

  const { currentLanguage } = useLanguageContext();

  const { isOnline } = useNetworkContext();

  const [logo, setLogo] = useState<ImageSourcePropType>(DEFAULT_LOGO);

  useEffect(() => {
    loadLogo();
  }, [currentLanguage, isOnline]);
  //console.log(currentLanguage, isOnline);
  async function loadLogo() {
    try {
      const asset = await AssetRepository.getImage(
        {
          type: AssetType.LOGO,
          id: currentLanguage,
        },
        isOnline,
      );

      //console.log("ASSET LOGO:", asset);

      if (asset.uri && !asset.defaultAsset) {
        setLogo({
          uri: asset.uri,
        });
      } else {
        setLogo(DEFAULT_LOGO);
      }
    } catch (error) {
      console.error("HEADER LOGO:", error);

      setLogo(DEFAULT_LOGO);
    }
  }

  return (
    <Image source={logo} resizeMode="contain" style={appStyles.headerLogoImg} />
  );
}
