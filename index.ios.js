import React, { Component } from 'react'
import {
  AppRegistry,
  StyleSheet,
  Text,
  View
} from 'react-native'
import {Scene, Router} from 'react-native-router-flux'
import CookieManager from 'react-native-cookies'
import Login from './components/Login'
import MainPage from './components/MainPage'

export default class Halo extends Component {
  state={
    isLogin:false
  }
  render() {
    // CookieManager.getAll((err, res) => {
    //   if(!err){
    //     if(typeof(res.userid)!="undefined") this.setState({isLogin:"true"})
    //   }
    // })
    return (
      <Router>
        <Scene key="root" navigationBarStyle={styles.container}>
          <Scene key="login" component={Login} title="登录"/>
            {
              this.state.isLogin?<Scene key="screen2" component={MainPage}/>:<Scene key="screen2" initial passProps={true} component={MainPage} />
            }
        </Scene>
      </Router>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    height:0,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
    zIndex:-1
  },
  welcome: {
    fontSize: 20,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
});

AppRegistry.registerComponent('Halo', () => Halo);
