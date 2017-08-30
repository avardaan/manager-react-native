import React, { Component } from 'react';
import {
  View,
  Text,
  Modal,
} from 'react-native';
import { CardSection } from './CardSection';
import { Button } from './Button';

const Confirm = ({ children, visible, onAccept, onDecline }) => {

  const { containerStyle, textStyle, cardSectionStyle } = styles

  return (
    <Modal
      animationType={"slide"}
      onRequestClose={() => {}}
      transparent={true}
      visible={visible}
    >
      <View style={containerStyle}>
        <CardSection style={cardSectionStyle}>
          <Text style={textStyle}> {children} </Text>
        </CardSection>

        <CardSection>
          <Button onPress={onAccept}> Yes </Button>
          <Button onPress={onDecline}> No </Button>
        </CardSection>
      </View>
    </Modal>
  )
}

const styles = {
  cardSectionStyle: {
    justifyContent:'center',
  },
  containerStyle: {
    backgroundColor:'rgba(0, 0, 0, 0.75)',
    position:'relative',
    flex:1,
    justifyContent:'center',
  },
  textStyle: {
    flex:1,
    fontSize:18,
    textAlign:'center',
    lineHeight:40,
  }
}

export { Confirm }
