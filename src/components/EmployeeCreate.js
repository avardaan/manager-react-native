import React, { Component } from 'react';
import {
  View,
  Text,
  Picker
} from 'react-native';
import { Card, CardSection, Input, Button } from './common';
import {connect} from 'react-redux';
import { employeeUpdate, employeeCreate } from '../actions';
import EmployeeForm from './EmployeeForm';
import _ from 'lodash';


class EmployeeCreate extends Component {

  componentWillMount() {
    // make an object with empty fields, and set state form reducer
    // to empty using it
    clearFields = {
      name: '',
      phone: '',
      shift: 'Monday',
    }

    _.each(clearFields, (value, prop) => {
      this.props.employeeUpdate({prop, value})
    })
  }

  onButtonPress() {
    const { name, phone, shift } = this.props
    // execute action creator with params from user inputs
    this.props.employeeCreate({ name: name, phone: phone, shift: shift || 'Monday' }) // if no shift is selected, shift is empty string which is FALSE hence javascript chooses Monday as default #loophole
  }


  render() {
    return (
      <Card>

        <EmployeeForm {...this.props} />
        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Create
          </Button>
        </CardSection>

      </Card>
    );
  }
}


const mapStateToProps = (state) => {
  const { name, phone, shift } = state.employeeForm
  return { name, phone, shift }
}

export default connect(
  mapStateToProps,
  { employeeUpdate, employeeCreate }
)(EmployeeCreate);
