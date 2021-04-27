import React, { Component } from 'react';

import { Navigation } from "react-native-navigation"; 

import {
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  ActivityIndicator,
  Pressable,
  Alert, 
  ScrollView
} from 'react-native';

import AsyncStorage from '@react-native-async-storage/async-storage';

import { config } from '../../../config';
import TeyaApi from '../../util/teya_api';

import LocalizedStrings from 'localized-strings';

let lang = new LocalizedStrings({
  en:{
    loginDescription: "For your privacy Teya doesn't require phone "
        + "number or email address to sign up to login.",
    loginButton: 'Login',
    createAccount: '+ Create new account',
    register: 'Register',
    dahsboard: 'Dashboard',
  },
  ar: {
    loginDescription: "For your privacy Teya doesn't require phone "
        + "number or email address to sign up to login.",
    loginButton: 'Login',
    createAccount: '+ Create new account',
    register: 'Register',
    dashboard: 'Dashboard',
  }
});

class Login extends Component {
  static get options() {
    return {
      statusBar: {
          backgroundColor: 'white',
          style: 'dark'
      }
    };
  }
  
  constructor() {
    super();

    this.state = {
      loggingIn: false,
    }
  }

  componentDidMount() {}

  _handleLogin = async () => {
    this.setState({ loggingIn: true });

    var error = false;
    var username = this.state.username || '';
    var password = this.state.password || '';

    // attempt login
    if(
      username.length < 5 ||
      username.length > 20
    ) {
      this.setState({ usernameError: true });
      error = true;
    }

    if(
      password.length < 8 ||
      password.length > 16
    ) {
      this.setState({ passwordError: true })
      error = true;
    }

    if(error) {
      this.setState({ loggingIn: false });
      return null;
    }

    var teyaApi = new TeyaApi;
    teyaApi.baseAPI = config.API;

    var res = await teyaApi.login(
      this.state.username,
      this.state.password
    );
    
    this.setState({ loggingIn: false });

    if(!res) { 
      Alert.alert('Oops!', 'Could not complete the request'); 
      return null;
    }

    if(res.status == 'success') {
      // store auth token
      // store the device uuid

      AsyncStorage.setItem('auth_token', res.data.user.auth_token);
      AsyncStorage.setItem('device_uuid', res.data.user.device_uuid);

      this.setState({
        authToken: res.data.user.auth_token,
        deviceUuid: res.data.user.device_uuid,
      }, () => {
        this._getProfile();
      });      
    }
    else {
      Alert.alert('Oops!', teyaApi.getErrorsString());
    }

    return;
  }

  // get and store user profile
  _getProfile = async () => {
    var teyaApi = new TeyaApi;
    teyaApi.baseAPI = config.API;
    teyaApi.authToken = this.state.authToken

    var res = await teyaApi.getProfile();

    this.setState({ loggingIn: false });

    if(!res) { 
      Alert.alert('Oops!', 'Could not complete the request'); 
      return null;
    }

    if(res.status == 'success') {
      await AsyncStorage.setItem('profile', JSON.stringify(res.data[0]));
      
      Navigation.push(this.props.componentId, {
        component: {
          name: 'Dashboard', options: {
            topBar: {
              title: { text: lang.dahsboard, fontWeight: 'bold' },
              elevation: 0
            }
          }
        }
      })
    }
    else {
      Alert.alert('Oops!', 'Something went wrong try again please');
    }
  }

  render() {
    return (
      <SafeAreaView style={ScreenStyle.mainContainer}>
        <ScrollView>
          <Text style={ScreenStyle.screenDescription}>{lang.loginDescription}</Text>
          {this.state.loginError && this.state.loginErrorMessage
          ? <Text style={{color: 'red'}}>{this.state.loginErrorMessage}</Text>
          : null}
          <TextInput
            style={ScreenStyle.inputbox}
            placeholder='Username'
            onChangeText={(text) => this.setState({
              username: text,
              usernameError: false
            })}
            value={this.state.username}
          />
          {this.state.usernameError 
          ? <Text style={{color: 'red'}}>Username is required</Text>
          : null}
          <TextInput
            style={ScreenStyle.inputbox}
            placeholder='Password'
            onChangeText={(text) => this.setState({
              password: text,
              passwordError: false
            })}
            value={null}
            secureTextEntry
          />
          {this.state.passwordError
          ? <Text style={{color: 'red'}}>Password must be (8-16)</Text>
          : null}
          <Pressable
            style={ScreenStyle.registerButton}
            onPress={() => Navigation.push(this.props.componentId, {
              component: {
                name: 'Register', options: {
                  topBar: {
                    title: { text: lang.register },
                    elevation: 0
                  }
                }
              }
            })}
          >
            <Text style={ScreenStyle.registerButtonText}>{lang.createAccount}</Text>
          </Pressable>
        </ScrollView>
        <Pressable
          style={({ pressed }) =>
            pressed ? ScreenStyle.loginButtonPressed : ScreenStyle.loginButton
          }
          onPress={this._handleLogin}
        >
          {this.state.loggingIn
            ? <ActivityIndicator color='white' size={20} />
            : <Text style={ScreenStyle.loginButtonText}>{lang.loginButton}</Text>
          }
        </Pressable>
      </SafeAreaView>
    );
  }
}

const ScreenStyle = StyleSheet.create({
  mainContainer: {
    flex: 1,
    padding: 15,
    backgroundColor: config.appBackgroundColor
  },
  screenDescription: {
    paddingBottom: 10
  },
  inputbox: {
    padding: 10,
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: config.inputboxBackground
  },
  registerButton: {
    paddingVertical: 10,
  },
  registerButtonText: {
    color: config.primaryColor,
    fontWeight: 'bold'
  },
  loginButton: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: config.actionButtonsColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginButtonPressed: {
    padding: 20,
    borderRadius: 15,
    backgroundColor: config.actionButtonsHighlightColor,
    justifyContent: 'center',
    alignItems: 'center'
  },
  loginButtonText: {
    color: '#fff',
    fontWeight: 'bold',
    textTransform: 'uppercase'
  }
})

export default Login;

// // The purpose of this screen is to run app checks and initiations

// import React, { Component } from 'react';

// import { Navigation } from "react-native-navigation"; 

// import {
//  SafeAreaView,
//  StyleSheet,
//  Text,
//  TextInput,
//  ActivityIndicator,
//  Pressable,
//  Alert, 
//  ScrollView
// } from 'react-native';

// import AsyncStorage from '@react-native-async-storage/async-storage';

// import { config } from '../../../config';
// import TeyaApi from '../../util/teya_api';

// import LocalizedStrings from 'localized-strings';

// let lang = new LocalizedStrings({
//  en:{
//    loginDescription: "For your privacy Teya doesn't require phone "
//        + "number or email address to sign up to login.",
//    loginButton: 'Login',
//    createAccount: '+ Create new account',
//    register: 'Register',
//    dahsboard: 'Dashboard',
//  },
//  ar: {
//    loginDescription: "For your privacy Teya doesn't require phone "
//        + "number or email address to sign up to login.",
//    loginButton: 'Login',
//    createAccount: '+ Create new account',
//    register: 'Register',
//    dashboard: 'Dashboard',
//  }
// });

// class Login extends Component {
//  static get options() {
//    return {
//      statusBar: {
//          backgroundColor: 'white',
//          style: 'dark'
//      }
//    };
//  }
 
//  constructor() {
//    super();

//    this.state = {
//      loggingIn: false,
//    }
//  }

//  componentDidMount() {}

//  _handleLogin = async () => {
//    this.setState({ loggingIn: true });

//    var error = false;
//    var username = this.state.username || '';
//    var password = this.state.password || '';

//    // attempt login
//    if(
//      username.length < 5 ||
//      username.length > 20
//    ) {
//      this.setState({ usernameError: true });
//      error = true;
//    }

//    if(
//      password.length < 8 ||
//      password.length > 16
//    ) {
//      this.setState({ passwordError: true })
//      error = true;
//    }
 
//    if(error) {
//      this.setState({ loggingIn: false });
//      return null;
//    }

//    var teyaApi = new TeyaApi;
//    teyaApi.url = `${config.API}users/login`;
//    teyaApi.method = 'POST';
//    teyaApi.body = {
//      username: this.state.username,
//      password: this.state.password
//    }

//    var res = await teyaApi.request();

//    this.setState({ loggingIn: false });

//    if(res.status == 'success') {
//      // store auth token
//      // store the device uuid

//      AsyncStorage.setItem('auth_token', res.data.user.auth_token);
//      AsyncStorage.setItem('device_uuid', res.data.user.device_uuid);

//      this.setState({
//        authToken: res.data.user.auth_token,
//        deviceUuid: res.data.user.device_uuid,
//      }, () => {
//        this._getProfile();
//      });      
//    }
//    else {
//      Alert.alert('Oops!', teyaApi.getErrorsString());
//    }

//    return;
//  }

//  // get and store user profile
//  _getProfile = async () => {
//    var teyaApi = new TeyaApi;
//    teyaApi.url = `${config.API}users/show/profile`;
//    teyaApi.method = 'GET';
//    teyaApi.authToken = this.state.authToken

//    var res = await teyaApi.request();

//    this.setState({ loggingIn: false });

//    if(res.status == 'success') {
//      console.log(res);

//      await AsyncStorage.setItem('profile', JSON.stringify(res.data[0]));
     
//      Navigation.push(this.props.componentId, {
//        component: {
//          name: 'Dashboard', options: {
//            topBar: {
//              title: { text: lang.dahsboard, fontWeight: 'bold' },
//              elevation: 0
//            }
//          }
//        }
//      })
//    }
//    else {
//      Alert.alert('Oops!', 'Something went wrong try again please');
//    }
//  }

//  render() {
//    return (
//      <SafeAreaView style={ScreenStyle.mainContainer}>
//        <ScrollView>
//          <Text style={ScreenStyle.screenDescription}>{lang.loginDescription}</Text>
//          {this.state.loginError && this.state.loginErrorMessage
//          ? <Text style={{color: 'red'}}>{this.state.loginErrorMessage}</Text>
//          : null}
//          <TextInput
//            style={ScreenStyle.inputbox}
//            placeholder='Username'
//            onChangeText={(text) => this.setState({
//              username: text,
//              usernameError: false
//            })}
//            value={this.state.username}
//          />
//          {this.state.usernameError 
//          ? <Text style={{color: 'red'}}>Username is required</Text>
//          : null}
//          <TextInput
//            style={ScreenStyle.inputbox}
//            placeholder='Password'
//            onChangeText={(text) => this.setState({
//              password: text,
//              passwordError: false
//            })}
//            value={null}
//            secureTextEntry
//          />
//          {this.state.passwordError
//          ? <Text style={{color: 'red'}}>Password must be (8-16)</Text>
//          : null}
//          <Pressable
//            style={ScreenStyle.registerButton}
//            onPress={() => Navigation.push(this.props.componentId, {
//              component: {
//                name: 'Register', options: {
//                  topBar: {
//                    title: { text: lang.register },
//                    elevation: 0
//                  }
//                }
//              }
//            })}
//          >
//            <Text style={ScreenStyle.registerButtonText}>{lang.createAccount}</Text>
//          </Pressable>
//        </ScrollView>
//        <Pressable
//          style={({ pressed }) =>
//            pressed ? ScreenStyle.loginButtonPressed : ScreenStyle.loginButton
//          }
//          onPress={this._handleLogin}
//        >
//          {this.state.loggingIn
//            ? <ActivityIndicator color='white' size={20} />
//            : <Text style={ScreenStyle.loginButtonText}>{lang.loginButton}</Text>
//          }
//        </Pressable>
//      </SafeAreaView>
//    );
//  }
// }

// const ScreenStyle = StyleSheet.create({
//  mainContainer: {
//    flex: 1,
//    padding: 15,
//    backgroundColor: config.appBackgroundColor
//  },
//  screenDescription: {
//    paddingBottom: 10
//  },
//  inputbox: {
//    padding: 10,
//    marginVertical: 10,
//    borderRadius: 10,
//    backgroundColor: config.inputboxBackground
//  },
//  registerButton: {
//    paddingVertical: 10,
//  },
//  registerButtonText: {
//    color: config.primaryColor,
//    fontWeight: 'bold'
//  },
//  loginButton: {
//    padding: 20,
//    borderRadius: 15,
//    backgroundColor: config.actionButtonsColor,
//    justifyContent: 'center',
//    alignItems: 'center'
//  },
//  loginButtonPressed: {
//    padding: 20,
//    borderRadius: 15,
//    backgroundColor: config.actionButtonsHighlightColor,
//    justifyContent: 'center',
//    alignItems: 'center'
//  },
//  loginButtonText: {
//    color: '#fff',
//    fontWeight: 'bold',
//    textTransform: 'uppercase'
//  }
// })

// export default Login;
