import React from "react";
import { View, Image } from "react-native";
import { styles } from "./styles";

export default function Loading() {
  return (
    <View style={styles.container}>
      <Image
        source={{
          uri: "https://e-disciple.com/img/loadingapp1.png",
        }}
        style={styles.image}
        resizeMode="cover"
      />
    </View>
  );
}
