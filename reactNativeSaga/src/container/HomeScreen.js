/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component,Fragment} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Image,TouchableWithoutFeedback,FlatList,Keyboard
} from 'react-native';
import { Container, Header, Left, Body, Right, Icon, Title, Content } from 'native-base'
import {
  // Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import FormTextInpute from '../components/common/FormTextInpute';
import Button from '../components/common/Button';
import {fetch,del,api,edit} from '../redux/actions';
import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';

export  class HomeScreen extends Component {
  constructor(props) { 
    super(props)
    this.state = {
      text:'',
      index:null
    }
}
renderItem=(item,index)=>{
  return(
    <View style={{margin:hp('1%'),flexDirection:'row'}}>
      <View style={{width:wp('75%'),marginLeft:hp('1%')}}><Text style={{fontSize:hp('2%')}}>{item.text}</Text></View>
      <Entypo name={'edit'} size={20} style={{marginLeft:hp('1%')}} color={'red'} onPress={()=>this.setState({text:item.text,index:index})}/>
      <AntDesign name={'delete'} size={20} style={{marginLeft:hp('2%')}}  color={'red'} onPress={()=>this.del(index)}/>
    </View>
  )
}
renderApiItem=()=>{
  return(
    <View style={{margin:hp('1%'),flexDirection:'row'}}>
      <View style={{width:wp('75%'),marginLeft:hp('1%')}}><Text style={{fontSize:hp('2%')}}>{item.text}</Text></View>
      <Entypo name={'edit'} size={20} style={{marginLeft:hp('1%')}} color={'red'} onPress={()=>this.setState({text:item.text,index:index})}/>
      <AntDesign name={'delete'} size={20} style={{marginLeft:hp('2%')}}  color={'red'} onPress={()=>this.del(index)}/>
    </View>
  )
}
add=()=>{
  if(this.state.text==''){
    alert('Please fill require field.')
  }else{
    if(this.state.index === null){
    this.props.fetch(this.state.text);
    this.setState({text:''});
  }else{
    this.props.edit(this.state.text,this.state.index);
    this.setState({text:'',index:null});
  }
  }
}
/**************** Delete todo ************/
del(index){
  this.props.del(index);
}
  /*************** api calling ***************/
	callAPI(){
		this.props.api();
	}
render(){
  let pic = {
    uri: 'http://a10.gaanacdn.com/images/albums/34/277034/crop_80x80_277034.jpg'
  };
  console.log(this.props,'props===')
  return (
      <Container>
        
          <TouchableWithoutFeedback style={{alignItems:'center',}} onPress={()=>Keyboard.dismiss()}>
          <Content>
            <View style={styles.contentStyle}>
              <FormTextInpute
                onChangeText={(text) => this.setState({text})}
                value={this.state.text}
                {...this.state}
              />
              <Button title={this.state.index===null ?'ADD':'UPDATE'} add={()=>this.add()}/>
            </View>
            <View style={{margin:hp('1.5%')}}>
               <Button title={'CALL API'} add={()=>this.callAPI()}/>
            </View>
            <View>
                <FlatList 
                  data={this.props.todos}
                  renderItem={({ item,index }) => this.renderItem(item,index)}
                />
            </View>
            {this.props.ipInfo.ip ? 
              <View style={{margin:hp('2%')}}>
                  <Text style={{fontSize:hp('2%')}}>{'API data here...'}</Text>
                  <Text style={{fontSize:hp('2%')}}>{this.props.ipInfo.country}</Text>
                  <Text style={{fontSize:hp('2%')}}>{this.props.ipInfo.region}</Text>
                  <Text style={{fontSize:hp('2%')}}>{this.props.ipInfo.city}</Text>
              </View>:<Text>{''}</Text>
            }
            </Content>
          </TouchableWithoutFeedback>
      </Container>
  );
}
  
}

const styles = StyleSheet.create({
  contentStyle:{
    alignItems:'center',
    flexDirection:'row',
    marginTop:hp('4%')
  }
});
const mapStateToProps = state => ({
  todos:state.todos,
  ipInfo:state.ipInfo
});
const mapDispatchToProps = dispatch => {
  return {
    fetch:bindActionCreators(fetch, dispatch),
	del:bindActionCreators(del, dispatch),
	api:bindActionCreators(api,dispatch),
	edit:bindActionCreators(edit,dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen);
