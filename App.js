import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard
} from 'react-native';

import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'SQLite.db' });

import Header from './components/header';
import TodoItem from './components/todoItem';
import AddTodo from './components/addTodo';
import { insertData, createToDoTable, dropTable, getData, deleteData } from './helper/dbHelper';



export default class App extends React.Component {
  constructor() {
    super();
    // dropTable()
    createToDoTable()
  }



  state = {
    data: [

    ]
  }

  componentDidMount() {
    this.populateDataToState()
  }

  populateDataToState = () => {
    getData()
      .then(data => {
        // console.log(data.data)
        this.setState({
          data: data.data
        })
      })
      .catch(error => {
        console.error(error);
      })
  }

  removeItem = (id) => {
    deleteData(id)
      .then(data => {
        if (data) {
          const { data } = this.state
          this.setState({
            data: data.filter(item => item.id != id)
          })
        }
      })
      .catch(error => {
        console.error(error);
      })
  }

  addItem = (text) => {
    insertData(text)
      .then(data => {
        if (data) {
          // Alert.alert("success");
          this.populateDataToState()
        }
      })
      .catch(error => {
        console.error(error);
      })
  }

  render() {
    return (
      <TouchableWithoutFeedback
        onPress={() => { Keyboard.dismiss() }}
      >
        <View style={styles.container}>
          <Header />
          <View style={styles.content}>
            <AddTodo addNewTodo={this.addItem} />
            <FlatList
              keyExtractor={(item, index) => "list" + item.id}
              style={styles.flatList}
              data={this.state.data}
              renderItem={({ item }) => (
                <TodoItem item={item} pressHandler={this.removeItem} />
              )}
            />
          </View>
        </View>
      </TouchableWithoutFeedback>
    );
  }
}

const styles = StyleSheet.create({
  flatList: {
    flex: 1
  },
  content: {
    flex: 1,
    padding: 4,
    backgroundColor: '#93c2a1',
    height: '100%',
    width: '100%'
  },
  container: {
    flex: 1,
    margin: 1,
    backgroundColor: '#ffffff'
  }
});