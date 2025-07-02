import tw from "@/styles/tailwind";

import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { useEffect } from "react";
import { Dimensions, Image, TouchableOpacity } from "react-native";
import { Gesture, GestureDetector } from "react-native-gesture-handler";
import Animated, {
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";

interface DraggableItemProps {
  id: string;
  uri: string;
  onDelete: (id: string) => void;
}

export default function DraggableItem({
  id,
  uri,
  onDelete,
}: DraggableItemProps) {
  const { width: screenWidth, height: screenHeight } = Dimensions.get("window");
  const imageSize = 100;

  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);
  const offsetX = useSharedValue(0);
  const offsetY = useSharedValue(0);

  useEffect(() => {
    const centerX = (screenWidth - imageSize) / 2;
    const centerY = (screenHeight - imageSize) / 2;
    translateX.value = centerX;
    translateY.value = centerY;
    offsetX.value = centerX;
    offsetY.value = centerY;
  }, [offsetX, offsetY, screenHeight, screenWidth, translateX, translateY]);

  const pan = Gesture.Pan()
    .onUpdate((e) => {
      translateX.value = offsetX.value + e.translationX;
      translateY.value = offsetY.value + e.translationY;
    })
    .onEnd(() => {
      offsetX.value = translateX.value;
      offsetY.value = translateY.value;
    });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <GestureDetector gesture={pan}>
      <Animated.View style={[{ position: "absolute" }, animatedStyle]}>
        <Image
          source={{ uri }}
          style={{ width: imageSize, height: imageSize, resizeMode: "contain" }}
        />

        <TouchableOpacity
          onPress={() => onDelete(id)}
          style={tw`absolute top-0 -right-2 bg-red-500 rounded-full p-1 z-10`}
        >
          <MaterialIcons name="clear" size={12} color="white" />
        </TouchableOpacity>
      </Animated.View>
    </GestureDetector>
  );
}
