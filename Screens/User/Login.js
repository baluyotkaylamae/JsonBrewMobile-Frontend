import InputUser from "../../Shared/Form/InputUser";
import React, { useState, useContext, useEffect } from "react";
import { View, Text, StyleSheet, Image, TouchableOpacity, ImageBackground } from 'react-native';
import FormContainer from "../../Shared/Form/FormContainer";
import { Button } from "native-base";
import { useNavigation } from '@react-navigation/native';
import Error from '../../Shared/Error';
import AuthGlobal from '../../Context/Store/AuthGlobal';
import { loginUser } from '../../Context/Actions/Auth.actions';
import AsyncStorage from '@react-native-async-storage/async-storage';
import EasyButton from "../../Shared/StyledComponents/EasyButton";
import * as WebBrowser from "expo-web-browser";
import * as Google from "expo-auth-session/providers/google";
import Header from "../../Shared/Header";
import WelcomeLogin from "../../Shared/WelcomeLogin";
import FontAwesomeIcon from "react-native-vector-icons/FontAwesome";
// import bglog from "../../assets/bglog.png";

const Login = (props) => {
  const context = useContext(AuthGlobal);
  const navigation = useNavigation();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [token, setToken] = useState("");
  const [userInfo, setUserInfo] = useState(null);

  WebBrowser.maybeCompleteAuthSession();

  const [request, response, promptAsync] = Google.useAuthRequest({
    androidClientId: "271452028008-e7h9gm30q42bemt4umn54jhmb222ksq5.apps.googleusercontent.com",
    iosClientId: "",
    webClientId: "271452028008-44pgshqf63a08nq4l8okqo5pk2oho2mp.apps.googleusercontent.com",
  });

  useEffect(() => {
    handleEffect();
  }, [response, token]);

  async function handleEffect() {
    const user = await getLocalUser();
    console.log("user", user);
    if (!user) {
      if (response?.type === "success") {
        // setToken(response.authentication.accessToken);
        getUserInfo(response.authentication.accessToken);
      }
    } else {
      setUserInfo(user);
      console.log("loaded locally");
    }
  }

  const getLocalUser = async () => {
    const data = await AsyncStorage.getItem("@user");
    if (!data) return null;
    return JSON.parse(data);
  };

  const getUserInfo = async (token) => {
    if (!token) return;
    try {
      const response = await fetch(
        "https://www.googleapis.com/userinfo/v2/me",
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      const user = await response.json();
      await AsyncStorage.setItem("@user", JSON.stringify(user));
      setUserInfo(user);
    } catch (error) {
    }
  };

  useEffect(() => {
    if (context.stateUser.isAuthenticated === true) {
      navigation.navigate("User", { screen: "User Profile" });
    }
  }, [context.stateUser.isAuthenticated]);

  const handleSubmit = () => {
    const user = {
      email,
      password,
    };

    if (email === "" || password === "") {
      setError("Please fill in your credentials");
    } else {
      loginUser(user, context.dispatch);
      // console.log("error")
    }
  };

  const handleGoogleSignIn = () => {
    if (request) {
      promptAsync();
    }
  };

  const handleRemoveLocalStore = async () => {
    await AsyncStorage.removeItem("@user");
  };

  const handleForgetPassword = () => {
    // Navigate to forget password screen
    navigation.navigate("ForgetPassword");
  };

  const handleCreateAccount = () => {
    navigation.navigate("Register");
  };

  return (
    <FormContainer>
      <Header />
      <WelcomeLogin />
      <InputUser
        placeholder={"Email"}
        name={"email"}
        id={"email"}
        value={email}
        onChangeText={(text) => setEmail(text.toLowerCase())}
      />
      <InputUser
        placeholder={"Password"}
        name={"password"}
        id={"password"}
        secureTextEntry={true}
        value={password}
        onChangeText={(text) => setPassword(text)}
      />
      <TouchableOpacity onPress={handleForgetPassword}>
        <Text style={styles.forgetPassword}>Forget Your Password?</Text>
      </TouchableOpacity>
      <View style={styles.buttonGroup}>
        {error ? <Error message={error} /> : null}

        <EasyButton
          login
          primary
          onPress={handleSubmit}
          style={styles.loginButton}
        ><Text style={{ color: "white", fontWeight: "bold", letterSpacing: 1 }}>Sign in</Text>
        </EasyButton>
      </View>
      <View style={[{ marginTop: 40 }, styles.buttonGroup]}>
        <Text
          onPress={handleCreateAccount}
          style={[
            styles.registerButton,
            { color: "black", fontWeight: "bold", letterSpacing: 0, marginTop: -15 }
          ]}
        >
          Create new account
        </Text>
      </View>

      <Text style={[styles.middleText, { color: "#664229", fontWeight: "bold" }]}>Or continue with</Text>
      <View style={styles.container}>
        {!userInfo ? (
          <TouchableOpacity onPress={handleGoogleSignIn} style={styles.googleButtonContainer}>
            <FontAwesomeIcon name="google" size={20} color="white" />
          </TouchableOpacity>
        ) : (
          <View style={styles.container}>
            {userInfo ? (
              <View style={styles.card}>
                {userInfo?.picture && (
                  <Image source={{ uri: userInfo?.picture }} style={styles.image} />
                )}
                <Text style={styles.text}>Email: {userInfo.email || ''}</Text>
                <Text style={styles.text}>
                  Verified: {userInfo.verified_email ? "yes" : "no"}
                </Text>
                <Text style={styles.text}>Name: {userInfo.name || ''}</Text>
              </View>
            ) : (
              <TouchableOpacity onPress={handleGoogleSignIn} style={styles.googleButtonContainer}>
                <FontAwesomeIcon name="google" size={20} color="white" />
              </TouchableOpacity>
            )}
          </View>
        )}
        {/* <TouchableOpacity onPress={handleRemoveLocalStore} style={styles.removeLocalStoreButtonContainer}>
          <Text style={styles.removeLocalStoreButtonText}>Remove Local Store</Text>
        </TouchableOpacity> */}

      </View>
      <View style={styles.rectangle3}></View>
      <View style={styles.rectangle4}></View>
      <View style={styles.ellipse2}></View>
      <View style={styles.ellipse1}></View>
    </FormContainer>
  )
}

const styles = StyleSheet.create({
  buttonGroup: {
    width: "80%",
    alignItems: "center",
  },
  middleText: {
    marginTop: 35,
    marginBottom: 20,
    alignSelf: "center",
  },
  loginButton: {
    backgroundColor: "#664229",
  },
  registerButton: {
    backgroundColor: "#FFFFFF",
  },
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  card: {
    borderWidth: 1,
    borderRadius: 10,
    padding: 20,
    width: '80%',
    marginBottom: 20,
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    marginBottom: 10,
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 10,
  },
  googleButtonContainer: {
    width: "20%",
    backgroundColor: "red",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 10,
    alignItems: "center",
    marginTop: -30,
    justifyContent: "center",
    marginBottom: 30,
  },
  googleButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    marginLeft: 8,
    textAlign: 'center',
  },
  removeLocalStoreButtonContainer: {
    width: "50%",
    backgroundColor: "#B99960",
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 4,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 20,
  },
  removeLocalStoreButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
    textAlign: 'center',
  },
  forgetPassword: {
    color: "#664229",
    marginTop: 5,
    marginLeft: 170,
  },
  rectangle3: {
    width: 372,
    height: 372,
    left: 169.40,
    top: 930.70,
    position: "absolute",
    transform: "rotate(27.09deg)",
    transformOrigin: "0 0",
    border: "2px #F1F4FF solid",
  },
  rectangle4: {
    width: 372,
    height: 372,
    left: 58.30,
    top: 990,
    position: "absolute",
    border: "2px #F1F4FF solid",
  },
  ellipse2: {
    width: 496,
    height: 496,
    left: 387.30,
    top: 185,
    position: "absolute",
    borderRadius: "9999px",
    border: "3px #F8F9FF solid",
  },
  ellipse1: {
    width: 635,
    height: 635,
    left: 30,
    top: 10,
    position: "absolute",
    background: "black",
    borderRadius: "9999px",
  },
});

export default Login;
