import MainText from "@/src/shared/ui/Text/MainText/MainText";
import { Animated, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import styles from "./Styles";
import useViewModel from "./ViewModel";

const WelcomeScreen = () => {
  const { opacity, translateY, messageIndex, messages } = useViewModel();

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View style={styles.mainContainer}>
        <Animated.View
          style={{
            opacity,
            transform: [{ translateY }],
          }}
        >
          <MainText>{messages[messageIndex]}</MainText>
        </Animated.View>
      </View>
    </SafeAreaView>
  );
};

export default WelcomeScreen;
