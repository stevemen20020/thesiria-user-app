import { usePlayableCharacterStore } from "@/src/shared/hooks/usePlayableCharacterStore";
import { router } from "expo-router";
import { useEffect, useRef, useState } from "react";
import { Animated, Easing } from "react-native";

const ANIMATION_DURATION = 800;
const WAIT_DURATION = 4200;

const ViewModel = () => {
  const { character } = usePlayableCharacterStore();

  const messages = [
    "Bienvenido",
    character.name !== "" ? character.name : "Aventurero",
    "A Thesiria",
    "Has estado soñando",
    "Dioses, monstruos, el dragón",
    "Y esa serpiente que te susurra en tu muñeca",
    "Sí... Eres uno de ellos",
    "Y aguardas antes de despertar",
    "¿Qué clase de vida traerás a esta isla?",
    "Los cielos no estarán felices",
    "Pues tú harás temblar la tierra",
    "¿En verdad estás dispuesto a desafiar al más allá?",
    "¿A quebrantar el orden natural de las cosas?",
    "Thesiria se alzará sobre el mar",
    "Lejos",
    "Bienvenido",
    character.name !== "" ? character.name : "Aventurero",
  ];

  const [messageIndex, setMessageIndex] = useState(0);

  const opacity = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (messageIndex >= messages.length) {
      router.replace("/map");
      return;
    }

    const animation = Animated.sequence([
      Animated.delay(WAIT_DURATION),

      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: ANIMATION_DURATION,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.timing(translateY, {
          toValue: -10,
          duration: ANIMATION_DURATION,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]),
    ]);

    animation.start(() => {
      const nextIndex = messageIndex + 1;

      if (nextIndex >= messages.length) {
        router.replace("/map");
        return;
      }

      opacity.setValue(0);
      translateY.setValue(10);

      setMessageIndex(nextIndex);

      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 1,
          duration: ANIMATION_DURATION,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),

        Animated.timing(translateY, {
          toValue: 0,
          duration: ANIMATION_DURATION,
          easing: Easing.out(Easing.ease),
          useNativeDriver: true,
        }),
      ]).start();
    });

    return () => {
      animation.stop();
    };
  }, [messageIndex]);

  return {
    opacity,
    translateY,
    messageIndex,
    messages,
  };
};

export default ViewModel;
