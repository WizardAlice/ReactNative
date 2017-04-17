import React, { Component } from 'react'
import { View , Text ,Image , ScrollView } from 'react-native'
import { Carousel ,SearchBar ,Card ,SwipeAction ,Icon} from 'antd-mobile'
import MenuExample from './main/Menu'

export default class MainPage extends Component{
  state={
    dataNews:[],
    dataHot:[],
    shuaxin:false,
    now:"热门借阅"
  }
  componentDidMount(){
    fetch("http://10.128.32.83:3000/getNews5", {
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((data)=>{
      return data.json()
    }).then((result)=>{
      this.setState({dataNews:result})
    })
    fetch("http://10.128.32.83:3000/getBookHot",{
      method: "GET",
      headers: {
        "Content-Type": "application/json"
      }
    }).then((data)=>{
      return data.json()
    }).then((result)=>{
      this.setState({dataHot:result})
    })
  }
  delete(a){
    let data = this.state.dataHot.splice(a,1)
    this.setState({dataHot:data})
  }

  render(){
    return(
      <ScrollView style={{marginTop:30}}>
        <SearchBar placeholder="搜索" onSubmit={()=>{}} cancelText=""/>
        {this.state.dataNews.length==0?null:(
          <Carousel autoplay dots={false} infinite={true}>
            {
              this.state.dataNews.filter((a)=>a.img).map((res,index)=>{
                return res.img?(
                  <View key={index}><Image source={{uri: "http://ofdukoorb.bkt.clouddn.com/"+res.img}} style={{width:380,height:200,resizeMode: Image.resizeMode.cover}}><Text style={{textAlign:"center",top:160,backgroundColor:"transparent"}}>{res.title}</Text></Image></View>
                ):null
              })
            }
          </Carousel>
        )}
        <MenuExample />
        {
          this.state.dataHot.length==0?null:(
            <View>
              <Text style={{fontSize:20,fontWeight:"600"}}>{this.state.now}</Text>
              {this.state.dataHot.map((data,index)=>{
                return  (
                  <SwipeAction style={{ backgroundColor: 'gray' }}
                    key={index}   
                    autoClose
                    right={[
                      {
                        text: '取消',
                        onPress: () => console.log('取消'),
                        style: { backgroundColor: '#ddd', color: 'white' },
                      },
                      {
                        text: '删除',
                        onPress: () => {this.state.dataHot.splice(index,1);this.setState({shuaxin:!this.state.shuaxin})},
                        style: { backgroundColor: '#F4333C', color: 'white' },
                      },
                    ]}
                    left={[
                      {
                        text: '收藏',
                        onPress: () => console.log('收藏'),
                        style: { backgroundColor: '#108ee9', color: 'white' },
                      },
                      {
                        text: '取消',
                        onPress: () => console.log('取消'),
                        style: { backgroundColor: '#ddd', color: 'white' },
                      },
                    ]}
                    onOpen={() => console.log('global open')}
                    onClose={() => console.log('global close')}
                  >
                    <Card full>
                      <Card.Header title={data.bookName} thumb={"http://ofdukoorb.bkt.clouddn.com/"+data.img} thumbStyle={{resizeMode: Image.resizeMode.cover,width:60,height:80}}/>
                      <Card.Body>
                        <View>
                          <Text>{data.abstract}</Text>
                        </View>
                      </Card.Body>
                    </Card>
                </SwipeAction>
                )
              })}
            </View>
          )
        }
      </ScrollView>
    )
  }
}