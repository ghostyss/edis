import React from "react";
import { View, Image } from "react-native";
import { styles } from "./styles";
const loadingImage = require("./loadingapp1.png");
export default function Loading() {
  return (
    <View style={styles.container}>
      <Image source={loadingImage} style={styles.image} resizeMode="cover" />
    </View>
  );
}
