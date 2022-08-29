import React, { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Image,
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
} from "react-native";
import { AppInput } from "../../components/shared/appInput";
import { AppText } from "../../components/shared/appText";
import { authorizationService, _Toast } from "../../services";
import { loginByPassword } from "../../store/global/global.thunks";
import { useAppDispatch } from "../../store/hooks";

export const AuthScreen: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const dispatch = useAppDispatch();

  const onSubmit = (data: any) => {
    if (isLogin) {
      return dispatch(loginByPassword(data));
    }

    return authorizationService(data)
      .then(() => {
        _Toast.success("Теперь вы можете авторизоваться");
        setIsLogin(true);
      })
      .catch((e) => _Toast.error(e));
  };

  return (
    <View style={styles.container}>
      <Image style={[styles.image, StyleSheet.absoluteFill]} source={{}} />
      {/* <Image style={{width:100, height:100, backgroundColor: 'rgba(0,255,255, 0.5)', position: 'absolute', borderRadius: 50}} blurRadius={100}></Image> */}
      <ScrollView
        contentContainerStyle={{
          flex: 1,
          width: "100%",
          height: "100%",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <View style={styles.logos}>
          <Image
            source={require("../../../assets/image/user.png")}
            style={styles.img}
          />
          {!isLogin && (
            <View>
              <AppText style={styles.text}>Имя</AppText>
              <AppInput
                control={control}
                name="name"
                style={styles.input}
                error={errors["name"]}
                placeholder="Введите ваше имя"
                placeholderTextColor="#00cfe860"
                autoComplete="off"
                autoCapitalize="none"
              />
            </View>
          )}

          <View>
            <AppText style={styles.text}>Номер телефона</AppText>
            <AppInput
              control={control}
              name="phone"
              style={styles.input}
              error={errors["phone"]}
              placeholder="Введите ваш номер"
              placeholderTextColor="#00cfe860"
              autoComplete="off"
              autoCapitalize="none"
              keyboardType="phone-pad"
            />
          </View>
          <View>
            <AppText style={styles.text}>Пароль</AppText>
            <AppInput
              control={control}
              name="password"
              style={styles.input}
              error={errors["password"]}
              placeholder="Введите пароль"
              placeholderTextColor="#00cfe860"
              secureTextEntry={true}
            />
          </View>
          {/* <Text
            style={{
              fontSize: 14,
              textDecorationLine: "underline",
              color: "#00cfe8",
            }}
          >
            Восстановить пароль
          </Text> */}
          <TouchableOpacity
            style={styles.button}
            onPress={handleSubmit(onSubmit)}
          >
            <AppText style={{ color: "#fff" }}>
              {isLogin ? "Войти" : "Создать аккаунт"}
            </AppText>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => setIsLogin(!isLogin)}
          >
            <AppText style={{ color: "#fff" }}>
              {isLogin ? "Создать аккаунт" : "Войти"}
            </AppText>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  image: {
    width: "100%",
    height: "100%",
    resizeMode: "cover",
    backgroundColor: "#00cfe8",
  },
  logos: {
    justifyContent: "center",
    alignItems: "center",
    padding: 25,
    // width: 300,//'80%',
    // height: 300, //'70%',
    backgroundColor: "rgba(255, 255, 2500, 0.7)", //
    // marginBottom: '20%',
    //marginTop: '20%',
    borderColor: "#fff",
    borderWidth: 3,
    borderRadius: 15,
  },
  img: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 2,
    borderColor: "#fff",
    marginVertical: 30,
  },
  text: {},
  input: {
    width: 250,
    height: 40,
    borderColor: "#fff",
    borderWidth: 2,
    borderRadius: 10,
    padding: 10,
    marginVertical: 10,
    backgroundColor: "#ffffff80",
    marginBottom: 20,
  },
  button: {
    width: 250,
    height: 40,
    borderRadius: 10,
    backgroundColor: "#00cfe890",
    alignItems: "center",
    justifyContent: "center",
    marginVertical: 10,
    borderColor: "#fff",
    borderWidth: 1,
  },
});
