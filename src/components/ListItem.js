import React, { Component } from 'react';
import {
  View,
  Text,
  TouchableWithoutFeedback,
} from 'react-native';
import { CardSection } from './common'
import { Actions } from 'react-native-router-flux'

class ListItem extends Component {

  onRowPress() {
    // need to pass selected employee as prop otherwise
    // just shows blank employee create screen
    // the employee object is passes down from EmployeeList
    Actions.employeeEdit({ employee: this.props.employee })
  }


  render() {
    const { name } = this.props.employee
    return (
      <TouchableWithoutFeedback onPress={this.onRowPress.bind(this)}>
        <View>
        <CardSection>
          <Text style={{fontSize: 18, paddingLeft: 15}}>
            {name}
          </Text>
        </CardSection>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

export default ListItem;
