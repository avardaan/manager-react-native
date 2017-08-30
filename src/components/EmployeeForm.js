import React, { Component } from 'react';
import {
  View,
  Text,
  Picker,
} from 'react-native';
import { Card, CardSection, Input, Button } from './common';
import {connect} from 'react-redux'
import { employeeUpdate } from '../actions'

class EmployeeForm extends Component {
  render() {
    return (
      <View>
        <CardSection>
          <Input
            label="Name"
            placeholder="Jane"
            value={this.props.name}
            onChangeText={ (text) => this.props.employeeUpdate({ prop: 'name', value: text }) }
          />
        </CardSection>

        <CardSection>
        <Input
          label="Phone"
          placeholder="555-555-5555"
          value={this.props.phone}
          onChangeText={ (text) => this.props.employeeUpdate({ prop: 'phone', value: text }) }
        />
        </CardSection>

        <CardSection>
          <Text style={styles.pickerTextStyle}> Shift </Text>
          <Picker
            style={{flex:1}}
            selectedValue={this.props.shift}
            onValueChange={ (value) => this.props.employeeUpdate({ prop:'shift', value: value }) }
          >
            <Picker.Item label="Monday" value="Monday" />
            <Picker.Item label="Tuesday" value="Tuesday" />
            <Picker.Item label="Wednesday" value="Wednesday" />
            <Picker.Item label="Thursday" value="Thursday" />
            <Picker.Item label="Friday" value="Friday" />
            <Picker.Item label="Saturday" value="Saturday" />
            <Picker.Item label="Sunday" value="Sunday" />
          </Picker>
        </CardSection>
      </View>
    );
  }
}

const styles = {
  pickerTextStyle: {
    fontSize: 18,
    paddingLeft: 15,
  }
}

const mapStateToProps = (state) => {
  // when user types something in name, it dispatches an action
  // to update that particular item in state.employeeForm
  // (which is what employeeUpdate action does!)
  // and then the value for that particular text field is
  // is pulled from the state
  // so it makes a full circle
  // from the keyboard -> action -> state -> field value
  return {
    name: state.employeeForm.name,
    phone: state.employeeForm.phone,
    shift: state.employeeForm.shift,
  }
}

export default connect(mapStateToProps, { employeeUpdate })(EmployeeForm);
