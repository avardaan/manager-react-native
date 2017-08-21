import React, { Component } from 'react';
import { Text, View, FlatList } from 'react-native';
import {connect} from 'react-redux';
import { employeesFetch } from '../actions';
import _ from 'lodash';
import ListItem from './ListItem'

class EmployeeList extends Component {

  componentWillMount() {
    // run the action creator,
    // it fetches data from firebase
    // and updates app state with the data
    this.props.employeesFetch();
  }

  /*
  // this is run when the component receives new props
  componentWillReceiveProps(nextProps) {
    // nextProps is the next set of props that component rerenders with
    // this.props is still old props
  }
  */

  renderRow({item}) {
    return <ListItem employee={item} />
  }

  // FINALLY UNDERSTOOD HOW FLATLISTS WORK OMG
  render() {
    return (
      <FlatList
        data={this.props.employees}
        renderItem={this.renderRow}
        keyExtractor={item => item.uid}
      />
    );
  }

}

const mapStateToProps = (state) => {
  // state.employees is an object of objects
  // map runs through each object in state.employees
  // and runs the anon function with parameters extracted
  // from each object it iterates through
  // each iteration returns an object with vals and uid
  // in the end, all these objects are thrown into an array called
  // employees and
  // that is what map finally returns
  const employees = _.map(state.employees, (val, uid) => {
    return { ...val, uid }
  })
  console.log('list of employees is ', employees)

  // return an object that has the list of emplyoees
  // { [ {employee1}, {employee2}, {etc} ] }
  return { employees }
}

export default connect(mapStateToProps, { employeesFetch })(EmployeeList);
