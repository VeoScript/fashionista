import tw from "@/styles/tailwind";

import MainLayout from "@/components/layouts/main-layout";
import { useOutfitStore } from "@/helpers/store/outfit-store";
import { useRouter } from "expo-router";
import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";

export default function SavedOutfitsScreen() {
  const router = useRouter();

  const { savedOutfits } = useOutfitStore();

  return (
    <MainLayout>
      <View style={tw`flex-1 p-3`}>
        <FlatList
          data={savedOutfits}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={tw`mb-3 p-3 bg-neutral-100 rounded-lg`}
              onPress={() =>
                router.push({
                  pathname: "/outfit-details",
                  params: {
                    id: item.id,
                  },
                })
              }
            >
              <Text style={tw`font-bold mb-8`}>{item.title}</Text>
              <Image
                source={{ uri: item.thumbnail }}
                style={tw`w-full h-[50] bg-cover rounded-sm`}
              />
              <Text style={tw`mt-8 text-neutral-800`}>
                Items: {item.items.length}
              </Text>
            </TouchableOpacity>
          )}
          ListEmptyComponent={<Text>No outfits saved yet.</Text>}
        />
      </View>
    </MainLayout>
  );
}
