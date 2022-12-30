import React from "react";
import { StyleSheet, Text, SafeAreaView, View, Image } from "react-native";
import tw from "twrnc";
import NavOptions from "../components/NavOptions";
import { Avatar } from "@rneui/themed";
const HomeScreen = () => {
  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5 flex-row justify-between items-center`}>
        <Image
          style={{
            width: 100,
            height: 100,
            resizeMode: "contain",
          }}
          source={{
            uri: "https://res.cloudinary.com/dylxgsias/image/upload/v1672070999/Imagine_ahhdg2.png",
          }}
        />
        <Avatar
          size={32}
          rounded
          source={{
            uri: "https://res.cloudinary.com/dylxgsias/image/upload/v1670425271/avatar/isbq0moljt8fk9jupfgr.png",
          }}
        />
      </View>
      <View style={tw`p-2 mb-6`}>
        <NavOptions />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  text: {
    fontWeight: "bold",
    fontSize: 30,
  },
});
