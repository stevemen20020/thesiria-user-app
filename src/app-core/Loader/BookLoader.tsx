import React, { useEffect, useMemo, useRef, useState } from "react";

import {
  Animated,
  Dimensions,
  Easing,
  Image,
  Modal,
  StyleSheet,
  View,
} from "react-native";

import { BlurView } from "expo-blur";

import { LOADING_TIPS } from "@/src/shared/constants/Tips";
import { useLoaderStore } from "../Store/loaderStore";

const { width } = Dimensions.get("window");

const ANIMATION_DURATION = 400;

const BookLoaderOverlay = () => {
  const { visible, message } = useLoaderStore();

  const tips = useMemo(() => {
    if (message) return [message];

    return LOADING_TIPS;
  }, [message]);

  const [tipIndex, setTipIndex] = useState(0);

  const opacity = useRef(new Animated.Value(1)).current;
  const translateY = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (!visible || tips.length <= 1) return;

    const interval = setInterval(() => {
      Animated.parallel([
        Animated.timing(opacity, {
          toValue: 0,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),

        Animated.timing(translateY, {
          toValue: -12,
          duration: ANIMATION_DURATION,
          useNativeDriver: true,
          easing: Easing.out(Easing.ease),
        }),
      ]).start(() => {
        setTipIndex((prev) => {
          let next = prev;

          while (next === prev) {
            next = Math.floor(Math.random() * tips.length);
          }

          return next;
        });

        translateY.setValue(12);

        Animated.parallel([
          Animated.timing(opacity, {
            toValue: 1,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
          }),

          Animated.timing(translateY, {
            toValue: 0,
            duration: ANIMATION_DURATION,
            useNativeDriver: true,
            easing: Easing.out(Easing.ease),
          }),
        ]).start();
      });
    }, 10000);

    return () => clearInterval(interval);
  }, [visible, tips, opacity, translateY]);

  useEffect(() => {
    if (!visible) {
      setTipIndex(0);
    }
  }, [visible]);

  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <View style={styles.overlay}>
        <BlurView intensity={30} tint="dark" style={StyleSheet.absoluteFill} />

        <View style={styles.content}>
          <View style={styles.loaderCard}>
            <Image
              source={require("../../../assets/images/book.gif")}
              style={styles.image}
              resizeMode="contain"
            />

            <Animated.Text
              style={[
                styles.tip,
                {
                  opacity,
                  transform: [{ translateY }],
                },
              ]}
            >
              {tips[tipIndex]}
            </Animated.Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};

export default BookLoaderOverlay;

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },

  content: {
    width: "100%",
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24,
  },

  loaderCard: {
    width: width * 0.75,
    borderRadius: 28,
    paddingVertical: 32,
    paddingHorizontal: 24,

    alignItems: "center",
    justifyContent: "center",

    backgroundColor: "rgba(25,25,25,0.8)",

    borderWidth: 1,
    borderColor: "rgba(255,255,255,0.08)",
  },

  image: {
    width: 180,
    height: 180,
    marginBottom: 24,
  },

  tip: {
    color: "white",
    fontSize: 16,
    textAlign: "center",
    lineHeight: 24,
    opacity: 0.9,
  },
});
