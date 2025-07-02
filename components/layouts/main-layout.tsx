import tw from "@/styles/tailwind";
import { SafeAreaView } from "react-native";

interface Props {
  children: React.ReactNode;
}

const MainLayout = (props: Props) => {
  const { children } = props;

  return <SafeAreaView style={tw`flex-1 bg-white`}>{children}</SafeAreaView>;
};

export default MainLayout;
