import React, { Component } from 'react';
import {
  View,
  Text
} from 'react-native';
import { Card, CardSection, Button, Confirm } from './common';
import EmployeeForm from './EmployeeForm';
import { employeeUpdate, employeeSave, employeeDelete } from '../actions';
import { connect } from 'react-redux';
import _ from 'lodash';
import Communications from 'react-native-communications';


class EmployeeEdit extends Component {

  state = { showModal: false }

  componentWillMount() {
    /*
    when we get to this component from EmployeeList by tapping on
    a particular employee, we pass the employee as a prop to this
    component. then before this component mounts, we use that prop
    to prefill the STATE by dispatching the employeeUpdate action
    with the tapped employee's details. SO they are already filled out
    for us
    */
    // NOTE: lodash passes in the key value pair into the callback
    // in the reverse order. i.e., first argument is value,
    // second is key
    _.each(this.props.employee, (value, prop) => {
      this.props.employeeUpdate({prop, value})
    })
  }

  onButtonPress() {
    // get name, phone, shift from STATE, because
    // props.employee is not the updated record, but the
    // record you entered the screen with.
    const { name, phone, shift } = this.props;
    // get uid form old record because uid never changes
    const { uid } = this.props.employee;
    // run action to update firebase records
    this.props.employeeSave({ name, phone, shift, uid });
  }

  onTextPress() {
    const { phone, shift } = this.props;
    Communications.text(phone, `Your upcoming shift is on ${shift}`)
  }

  onAcceptFire() {
    this.props.employeeDelete({ uid: this.props.employee.uid })
  }

  onDeclineFire() {
    this.setState({ showModal: !this.state.showModal })
  }

  render() {
    return (
      <Card>

        <EmployeeForm />

        <CardSection>
          <Button onPress={this.onButtonPress.bind(this)}>
            Save Changes
          </Button>
        </CardSection>

        <CardSection>
          <Button onPress={this.onTextPress.bind(this)}>
            Text Schedule
          </Button>
        </CardSection>

        <CardSection>
          <Button
            onPress={() => this.setState({ showModal: !this.state.showModal })}
          >
            Fire Employee
          </Button>
        </CardSection>

        <Confirm
          visible={this.state.showModal}
          onAccept={this.onAcceptFire.bind(this)}
          onDecline={this.onDeclineFire.bind(this)}
        >
          Are you sure you want to delete this?
        </Confirm>

      </Card>

    );
  }
}

const mapStateToProps = (state) => {
  return {
    name: state.employeeForm.name,
    phone: state.employeeForm.phone,
    shift: state.employeeForm.shift,
  }
}

export default connect(mapStateToProps, { employeeUpdate, employeeSave, employeeDelete })(EmployeeEdit);
