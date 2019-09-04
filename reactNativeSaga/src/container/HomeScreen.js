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
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
const homePlace = { description: 'Home', geometry: { location: { lat: 48.8152937, lng: 2.4597668 } }};
const workPlace = { description: 'Work', geometry: { location: { lat: 48.8496818, lng: 2.2940881 } }};
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
            <View style={{ alignItems:'center'}}>
            <GooglePlacesAutocomplete
                placeholder='Search'
                minLength={2} // minimum length of text to search
                autoFocus={false}
                returnKeyType={'search'} // Can be left out for default return key https://facebook.github.io/react-native/docs/textinput.html#returnkeytype
                listViewDisplayed='auto'    // true/false/undefined
                fetchDetails={true}
                renderDescription={row =>{ return(<Text style={{backgroundColor:'red'}}>{row.description}</Text>)}} // custom description render
                onPress={(data, details = null) => { // 'details' is provided when fetchDetails = true
                  console.log(data, details);
                }}
                
                getDefaultValue={() => ''}
                
                query={{
                  // available options: https://developers.google.com/places/web-service/autocomplete
                  key: 'AIzaSyARBZ1MzNjPsqNYm6sbBnXVE4g5bTOqK6Q',
                  language: 'en', // language of the results
                  types: '(cities)' // default: 'geocode'
                }}
                
                styles={{
                  textInputContainer: {
                    width: wp('90%'),
                    alignItems:'center',
                    justifyContent:'center'
                  
                  }, 
                  description: {
                    fontWeight: 'bold',
                  },
                 
                  predefinedPlacesDescription: {
                    color: '#1faadb',
                    alignItems:'center'
                  },
                  
                }}
                
                currentLocation={true} // Will add a 'Current location' button at the top of the predefined places list
                currentLocationLabel="Current location"
                nearbyPlacesAPI='GooglePlacesSearch' // Which API to use: GoogleReverseGeocoding or GooglePlacesSearch
                GoogleReverseGeocodingQuery={{
                  // available options for GoogleReverseGeocoding API : https://developers.google.com/maps/documentation/geocoding/intro
                }}
                GooglePlacesSearchQuery={{
                  // available options for GooglePlacesSearch API : https://developers.google.com/places/web-service/search
                  rankby: 'distance',
                  types: 'food'
                }}
          
                filterReverseGeocodingByTypes={['locality', 'administrative_area_level_3']} // filter the reverse geocoding results by types - ['locality', 'administrative_area_level_3'] if you want to display only cities
                predefinedPlaces={[homePlace, workPlace]}
          
                debounce={200} // debounce the requests in ms. Set to 0 to remove debounce. By default 0ms.
                // renderLeftButton={()  => <Image source={require('path/custom/left-icon')} />}
                // renderRightButton={() => <Text>Custom text after the input</Text>}
              />
            </View>
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
