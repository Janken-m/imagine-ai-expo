import {
  SafeAreaView,
  Text,
  Button,
  ScrollView,
  StyleSheet,
  FlatList,
  Image,
} from "react-native";
import React, { useState } from "react";
import { View } from "react-native";
import tw from "twrnc";
import { Formik, ErrorMessage } from "formik";
import { Input, Avatar, Icon } from "@rneui/themed";
import axios from "axios";

const TextScreen = () => {
  const [text, setText] = useState("");
  const [images, setImages] = useState([]);

  async function onSubmit(value) {
    const body = {
      prompt: value.prompt,
    };
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    try {
      const { data } = await axios.post(
        "http://192.168.1.5:5000/api/image",
        {
          prompt: body.prompt,
        },
        config
      );
      setText(body.prompt);
      setImages(data.bot.data);
    } catch (error) {
      console.log("something went worng", error);
    }
  }
  console.log(images);
  return (
    <SafeAreaView>
      <ScrollView>
        <View style={tw`h-[540px] flex-col`}>
          <View
            style={tw`flex-shrink justify-flex-start items-start left-2 top-5`}
          >
            <Avatar
              size={32}
              rounded
              source={{
                uri: "https://res.cloudinary.com/dylxgsias/image/upload/v1672000487/robot_qcloiq.png",
              }}
            />
            {images?.map((image, i) => (
              <View key={i} style={tw`flex-row justify-center items-center`}>
                <Image
                  source={{ uri: image.url }}
                  style={{
                    width: 100,
                    height: 100,
                    resizeMode: "contain",
                  }}
                />
              </View>
            ))}
          </View>
          <View style={tw`absolute right-2 top-5 flex-row`}>
            <Text style={tw`px-3`}>{text}</Text>
            <Avatar
              size={32}
              rounded
              source={{
                uri: "https://res.cloudinary.com/dylxgsias/image/upload/v1670425271/avatar/isbq0moljt8fk9jupfgr.png",
              }}
            />
          </View>
        </View>
        <View
          style={[
            tw`items-center justify-center flex-row`,
            { position: "absolute", bottom: 0, left: 50, right: 50 },
          ]}
        >
          <Formik
            initialValues={{
              prompt: "",
            }}
            onSubmit={(values) => onSubmit(values)}
          >
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              resetForm,
              values,
            }) => (
              <View style={tw`flex flex-row items-center justify-center`}>
                <Input
                  style={styles.input}
                  placeholder="Ask something..."
                  onChangeText={handleChange("prompt")}
                  onBlur={handleBlur("prompt")}
                  value={values.prompt}
                  leftIcon={{ type: "antdesign", name: "login" }}
                  rightIcon={
                    <Icon
                      name="closecircle"
                      type="antdesign"
                      onPress={resetForm}
                    />
                  }
                />
                <ErrorMessage name="prompt">
                  {(msg) => (
                    <Text style={[tw`text-red-500 p-2 ms-2`]}>{msg}</Text>
                  )}
                </ErrorMessage>
                <Button
                  onPress={handleSubmit}
                  style={tw` items-center flex justify-center `}
                  title={"Send"}
                  containerStyle={{ padding: 10 }}
                />
              </View>
            )}
          </Formik>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default TextScreen;

const styles = StyleSheet.create({
  input: {
    padding: 5,
    alignItems: "center",
    borderRadius: 10,
  },
});
