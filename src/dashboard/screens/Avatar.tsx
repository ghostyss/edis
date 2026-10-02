import React, { useEffect, useState } from "react";

import {
  Image,
  ImageSourcePropType,
  ImageStyle,
  StyleProp,
} from "react-native";

import { useLanguageContext } from "../../context/LanguageContext";

import { useNetworkContext } from "../../context/NetworkContext";

import { AssetRepository } from "../../assets-module/repository/AssetRepository";

import { AssetType } from "../../assets-module/types/Asset";

const DEFAULT_DISCIPLE = require("../../assets/images/disciple.png");
const DEFAULT_TEACHER = require("../../assets/images/dmaker.png");
const DEFAULT_COMMUNITY = require("../../assets/images/community.png");

interface Props {
  Id?: number;
  Type?: string;
  imageStyle?: StyleProp<ImageStyle>;
}
function getDefaultImage(type?: string): ImageSourcePropType {
  switch (type) {
    case "Admin":
      return DEFAULT_TEACHER;
    case "Teacher":
      return DEFAULT_TEACHER;
    case "Student":
      return DEFAULT_DISCIPLE;
    case "Church":
      return DEFAULT_COMMUNITY;
    default:
      return DEFAULT_DISCIPLE;
  }
}
export default function Avatar({ Id, Type, imageStyle }: Props) {
  const { currentLanguage } = useLanguageContext();
  const { isOnline } = useNetworkContext();
  const defaultLogo = getDefaultImage(Type);
  const [logo, setLogo] = useState<ImageSourcePropType>(defaultLogo);

  useEffect(() => {
    let isMounted = true;

    setLogo(defaultLogo);

    if (Id == null) {
      return () => {
        isMounted = false;
      };
    }

    async function loadLogo() {
      try {
        const asset = await AssetRepository.getImage(
          {
            type: AssetType.AVATAR,
            id: Id,
          },
          isOnline,
        );
        //console.log(asset);
        if (isMounted && asset.uri && !asset.defaultAsset) {
          setLogo({ uri: asset.uri });
        }
      } catch (error) {
        console.error("Avatar:", error);
      }
    }

    void loadLogo();

    return () => {
      isMounted = false;
    };
  }, [Id, currentLanguage, defaultLogo, isOnline]);

  return <Image source={logo} style={imageStyle} resizeMode="contain" />;
}
