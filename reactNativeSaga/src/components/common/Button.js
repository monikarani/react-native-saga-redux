import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View ,TouchableOpacity} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
const Button=(props)=>{
  return(
  <TouchableOpacity style={styles.buttonStyle} onPress={()=>props.add()}>
     <Text style={styles.buttonText}>{props.title}</Text>
  </TouchableOpacity>
  )
}
  

const styles = StyleSheet.create({
    buttonStyle:{borderWidth:1,width:wp('24%'),
    height:hp('5%'),justifyContent:'center',
    borderColor:'green',
    backgroundColor:'green',
    // marginTop:hp('1%'),
    alignItems:'center'},
    buttonText:{
        fontSize:hp('2%'),
        color:'white',
        fontWeight:"500"
    }
});
export default Button;