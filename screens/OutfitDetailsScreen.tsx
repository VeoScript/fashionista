import tw from "@/styles/tailwind";

import MainLayout from "@/components/layouts/main-layout";
import { useOutfitStore } from "@/helpers/store/outfit-store";
import { useLocalSearchParams } from "expo-router";
import { FlatList, Image, Text, View } from "react-native";

export default function OutfitDetailsScreen() {
  const { id } = useLocalSearchParams();
  const { savedOutfits } = useOutfitStore();

  const outfit = savedOutfits.find((o) => o.id === id);

  if (!outfit) {
    return (
      <MainLayout>
        <Text>Outfit not found.</Text>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <View style={tw`flex-1`}>
        <View style={tw`p-3`}>
          <Text style={tw`font-bold text-xl mb-3`}>{outfit.title}</Text>
          <Image
            source={{ uri: outfit.thumbnail }}
            style={tw`w-full h-[50] bg-cover mb-3 rounded-sm`}
          />
          <Text style={tw`font-bold`}>Items:</Text>
        </View>
        <FlatList
          data={outfit.items}
          keyExtractor={(uri, index) => uri + index}
          renderItem={({ item }) => (
            <Image source={{ uri: item }} style={tw`w-100 h-100 bg-contain`} />
          )}
        />
      </View>
    </MainLayout>
  );
}
