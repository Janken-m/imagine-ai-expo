import { FlatList, Image, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import tw from "twrnc";
import { Icon } from "@rneui/base";
import { useNavigation } from "@react-navigation/native";

const data = [
  {
    id: "123",
    title: "TEXT",
    image:
      "https://res.cloudinary.com/dylxgsias/image/upload/v1672000487/robot_qcloiq.png",
    screen: "TextScreen",
  },
  {
    id: "456",
    title: "IMAGE",
    image:
      "https://res.cloudinary.com/dylxgsias/image/upload/v1672000487/robot_qcloiq.png",
    screen: "ImageScreen",
  },
];

const NavOptions = () => {
  const navigation = useNavigation();

  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      horizontal
      renderItem={({ item }) => (
        <TouchableOpacity
          onPress={() => navigation.navigate(item.screen)}
          style={tw`p-2 pl-6 pb-5 pt-4 flex bg-gray-200 m-2 w-40 justify-center`}
        >
          <View>
            <Image
              style={{ width: 120, height: 120, resizeMode: "contain" }}
              source={{ uri: item.image }}
            />
            <Text style={tw`mt-2 text-lg font-semibold`}> {item.title} </Text>
            <Icon
              style={tw`p-2 bg-black rounded-full w-10 mt-4`}
              type="antdesign"
              color="white"
              name="arrowright"
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;
