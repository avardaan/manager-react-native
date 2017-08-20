import React, { Component } from 'react';
import {
  View,
  Text,
  StyleSheet,
} from 'react-native';
import { connect } from 'react-redux';
import { emailChanged, passwordChanged, loginUser } from '../actions';
import { Card, CardSection, Input, Button, Spinner } from './common';

class LoginForm extends Component {

  onEmailChange(text) {
    this.props.emailChanged(text);
  }

  onPasswordChange(text) {
    this.props.passwordChanged(text);
  }

  onButtonPress() {
    this.props.loginUser({ email: this.props.email, password: this.props.password })
  }

  renderButton() {
    if (this.props.loading) {
      return <Spinner size='large'/>
    }

    return (
      <Button
        onPress={this.onButtonPress.bind(this)}
      >
        Log In
      </Button>
    );
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
            onChangeText={this.onPasswordChange.bind(this)}
            value={this.props.password}
          />
        </CardSection>

        <Text style={styles.errorTextStyle}>
        {this.props.error}
        </Text>

        <CardSection>
          {this.renderButton()}
        </CardSection>

      </Card>
    );
  }
}

const styles = {
  errorTextStyle: {
    fontSize: 20,
    alignSelf:'center',
    color:'red',
  }
}

// gets state from the redux store, and passes what we want to component
// as props
const mapStateToProps = (state) => {
  const { email, password, error, loading } = state.auth
  return {
    email: email, // state.auth.email destructured
    password: password,
    error: error,
    loading: loading,
  }
}

export default connect(mapStateToProps, { emailChanged, passwordChanged, loginUser })(LoginForm);
