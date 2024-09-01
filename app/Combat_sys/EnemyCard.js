import { View, Text, Image, Dimensions} from "react-native";
import React from "react";

const EnemyCard = (props) => {
  const scale = 0.9;
  const ITEM_WIDTH = Dimensions.get('window').width * scale;
  const ITEM_HEIGHT = 120;

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <View
        style={{
          alignItems: "flex-start",
          flex: 1,
          justifyContent: "space-between",
          flexDirection: "row",
          borderRadius: 20,
        }}
      >
        <View
          style={{
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Image
            style={{
              width: 20,
              height: 20,
              borderRadius: 10,
              marginRight: 5,
            }}
            source={{
              uri: `${props.enemy.weapon !== null ? props.enemy.weapon.image : null}`,
            }}
          />
          <Text
            //numberOfLines={1}
            style={{
              width: 100,
              color: "white",
            }}
          >
            {props.enemy.name} {props.enemy.weapon !== null ? " - " + props.enemy.weapon.name : ""}
          </Text>
        </View>
        <View
          style={{
            width: ITEM_WIDTH * 0.6,
            height: ITEM_HEIGHT - 20,
            borderRadius: 10,
            overflow: "hidden",
          }}
        >
          <Image
            style={{
              width: ITEM_WIDTH * 0.6,
              height: ITEM_HEIGHT - 20,
              borderRadius: 10,
              marginRight: 5,
              resizeMode: "contain",
            }}
            source={{
              uri: `${props.enemy.image_reference}`,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default EnemyCard;
