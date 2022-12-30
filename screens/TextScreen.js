import {
  SafeAreaView,
  Text,
  Button,
  ScrollView,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { View } from "react-native";
import tw from "twrnc";
import { Formik, ErrorMessage } from "formik";
import { Input, Avatar, Icon } from "@rneui/themed";
import axios from "axios";

const TextScreen = () => {
  const [text, setText] = useState("");
  const [data, setData] = useState("");

  async function onSubmit(value, resetForm) {
    const body = {
      prompt: value.prompt,
    };
    const config = {
      headers: { "Content-Type": "application/json" },
    };
    try {
      const { data } = await axios.post(
        "http://192.168.1.5:5000/api/text",
        {
          prompt: body.prompt,
        },
        config
      );
      setText(body.prompt);
      setData(data.bot);
      resetForm({ values: initialValues });
    } catch (error) {
      console.log("something went worng", error);
    }
  }

  return (
    <SafeAreaView>
      <ScrollView>
        <View style={tw`h-[540px] flex-col`}>
          <View style={tw`absolute left-2 top-5 flex-row`}>
            <Avatar
              size={32}
              rounded
              source={{
                uri: "https://res.cloudinary.com/dylxgsias/image/upload/v1672000487/robot_qcloiq.png",
              }}
            />
            <Text style={tw`px-3 flex flex-col items-center justify-center `}>
              {data}
            </Text>
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
            onSubmit={(values, { resetForm }) => onSubmit(values)}
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
                      style={{ justifyContent: "center" }}
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
