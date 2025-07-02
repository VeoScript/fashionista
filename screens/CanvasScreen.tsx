import tw from "@/styles/tailwind";

import MainLayout from "@/components/layouts/main-layout";
import StyleCanvas from "@/components/style-canvas";
import { useOutfitStore } from "@/helpers/store/outfit-store";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import * as ImagePicker from "expo-image-picker";
import * as MediaLibrary from "expo-media-library";
import { useRouter } from "expo-router";
import { useRef, useState } from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";
import uuid from "react-native-uuid";
import ViewShot, { captureRef } from "react-native-view-shot";

export default function CanvasScreen() {
  const router = useRouter();
  const [addTrigger, setAddTrigger] = useState<string | null>(null);
  const [clearTrigger, setClearTrigger] = useState(false);
  const [currentItems, setCurrentItems] = useState<string[]>([]);
  const viewShotRef = useRef<ViewShot>(null);
  const saveOutfit = useOutfitStore((state) => state.saveOutfit);

  const isNoOutfits = currentItems.length === 0;

  const pickImage = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: "images",
      allowsEditing: true,
      quality: 1,
    });

    if (!result.canceled) {
      setAddTrigger(result.assets[0].uri);
    }
  };

  const handleSaveToGallery = async () => {
    try {
      const uri = await captureRef(viewShotRef, {
        format: "png",
        quality: 1,
      });

      const { status } = await MediaLibrary.requestPermissionsAsync();
      if (status !== "granted") {
        Alert.alert(
          "Permission required",
          "Please allow access to your photos."
        );
        return;
      }

      await MediaLibrary.saveToLibraryAsync(uri);

      // Save metadata to Saved Outfits
      const newOutfit = {
        id: uuid.v4(),
        title: `Outfit ${Date.now()}`,
        thumbnail: uri,
        items: currentItems,
      };
      saveOutfit(newOutfit);

      Alert.alert("Success", "Canvas saved to gallery and Saved Outfits!");
      setClearTrigger(true); // Clear canvas after saving
    } catch (error) {
      console.error(error);
      Alert.alert("Error", "Failed to save canvas.");
    }
  };

  return (
    <MainLayout>
      <View style={tw`flex-1`}>
        <ViewShot ref={viewShotRef} style={tw`flex-1 bg-neutral-100`}>
          <StyleCanvas
            addTrigger={addTrigger}
            clearTrigger={clearTrigger}
            onClearHandled={() => setClearTrigger(false)}
            onItemsChange={setCurrentItems}
          />
        </ViewShot>

        {isNoOutfits && (
          <Text
            style={tw`absolute top-1/2 self-center text-base text-center mx-[3rem] text-gray-500`}
          >
            No outfits added yet! Click the plus icon to add items.
          </Text>
        )}

        <TouchableOpacity
          disabled={isNoOutfits}
          style={tw.style(
            "absolute top-5 right-5",
            isNoOutfits && "opacity-30"
          )}
          onPress={() => setClearTrigger(true)}
        >
          <MaterialCommunityIcons name="eraser" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`absolute bottom-5 left-10`}
          onPress={() => router.push("/saved-outfits")}
        >
          <Ionicons name="shirt" size={30} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`absolute bottom-10 self-center`}
          onPress={pickImage}
        >
          <AntDesign name="pluscircle" size={50} color="#449ddf" />
        </TouchableOpacity>
        <TouchableOpacity
          disabled={isNoOutfits}
          style={tw.style(
            "absolute bottom-5 right-10",
            isNoOutfits && "opacity-30"
          )}
          onPress={handleSaveToGallery}
        >
          <Entypo name="save" size={30} color="black" />
        </TouchableOpacity>
      </View>
    </MainLayout>
  );
}
