import React from "react";
import { View, Image } from "react-native";
import { styles } from "./styles";
const DEFAULT_Loding = require("../../assets/images/loadingapp1.png");
export default function Loading() {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "../../assets/images/loadingapp1.png",
        }}
        style={styles.image}
        //resizeMode="cover"
      />
    </View>
  );
}
