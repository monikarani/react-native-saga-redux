import React, {Component} from 'react';
import {Platform, StyleSheet, Text, View ,TextInput} from 'react-native';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from "react-native-responsive-screen";
import { tsPropertySignature } from '@babel/types';
const FormTextInpute=(props)=>{
  return(
    <TextInput
      onChangeText={props.onChangeText}
      value={props.value}
      style={styles.formInpute}
      />
  )
}
  

const styles = StyleSheet.create({
  formInpute:{borderWidth:1,width:wp('70%'),height:hp('5%'),margin:hp('1%')}
});
export default FormTextInpute;