import React, { Component } from 'react'
import { View, Text } from 'react-native'
import { Actions } from 'react-native-router-flux'
import { List, InputItem, WhiteSpace ,Button,Toast} from 'antd-mobile';
import { createForm } from 'rc-form'
import CookieManager from 'react-native-cookies'
import moment from 'moment'

export default class Form extends Component {
  submit = () => {
    this.props.form.validateFields((error, value) => {
      if(error){
        Toast.fail("发生了一个错误",1)
      }
      else{
        let data = {
          userName:value.userid,
          pwd:value.pwd
        }
        fetch("http://10.128.32.83:3000/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(data)
        }).then((res)=>{
          return res.json()
        }).then((data)=>{
          console.log(data)
          if(data.id){
            Toast.success("登录成功",1)
            CookieManager.set({
              name:"userid",
              value: data.id.toString(),
              domain: 'some domain',
              origin: 'some origin',
              path: '/',
              version: '1',
              expiration: '2018-05-30T12:30:00.00-05:00'
            },(err,res)=>{
              console.log(err,res)
            })
            Actions.screen2()
          }
          else{
            Toast.fail('密码错误或者用户不存在！',1)
          }
        }).catch((err)=>{
          console.log(err)
        })
      }
    })
  }

  render() {
    let errors;
    const { getFieldProps, getFieldError } = this.props.form;
    return (<View>
      <InputItem
        {...getFieldProps('userid')}
        clear
        placeholder="321"
        autoFocus
      >用户名</InputItem>
      <InputItem
        {...getFieldProps('pwd')}
        clear
        placeholder="321"
        autoFocus
      >密码</InputItem>
      {(errors = getFieldError('required')) ? errors.join(',') : null}
      <Button onClick={this.submit}>submit</Button>
    </View>)
  }
}