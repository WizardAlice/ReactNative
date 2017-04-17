import React, { Component } from 'react'
import { View ,Image } from 'react-native'
import { createForm } from 'rc-form'
import Form from './form/LoginForm'


const LoginForm = createForm()(Form)
export default class Login extends Component{
  render(){
    return  <View style={{marginTop:160}}>
              <Image source={require('../asset/img/timg.jpeg')} style={{height:130,width:400,marginBottom:30,right:20}}/>
              <LoginForm/>
            </View>
  }
}