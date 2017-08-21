import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import { CardSection } from './common'

class ListItem extends Component {
  render() {
    const { name } = this.props.employee
    return (
      <CardSection>
        <Text style={{fontSize: 18, paddingLeft: 15}}>
          {name}
        </Text>
      </CardSection>
    );
  }
}

export default ListItem;
