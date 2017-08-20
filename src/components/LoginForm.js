import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { emailChanged } from '../actions';
import { Card, CardSection, Input, Button } from './common';

class LoginForm extends Component {

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  render() {
    return (
      <Card>

        <CardSection>
          <Input
            label='Email'
            placeholder='Enter Email'
            onChangeText={this.onEmailChange.bind(this)}
            value={this.props.email}
          />
        </CardSection>

        <CardSection>
          <Input
            label='Password'
            placeholder='Enter Password'
            secureTextEntry={true}
          />
        </CardSection>

        <CardSection>
          <Button>
            Log In
          </Button>
        </CardSection>

      </Card>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    email: state.auth.email
  }
}

export default connect(mapStateToProps, { emailChanged })(LoginForm);
