import React from "react";
import { View } from "react-native";
import { Ionicons } from "@expo/vector-icons";

const Stars = ({ rating }) => {
  const createStars = () => {
    let tab = [];
    // generates as many yellow stars as rating note and generates remaining stars in grey
    for (let i = 1; i <= 5; i++) {
      if (i <= rating) {
        tab.push(
          <Ionicons
            key={i}
            name="ios-star"
            size={18}
            color="#F5B000"
            style={{ marginRight: 7 }}
          />
        );
      } else {
        tab.push(
          <Ionicons
            key={i}
            name="ios-star"
            size={18}
            color="#BBBBBB"
            style={{ marginRight: 7 }}
          />
        );
      }
    }
    return tab;
  };
  return <View style={{ flexDirection: "row" }}>{createStars()}</View>;
};

export default Stars;
