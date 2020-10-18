import React from 'react';
import {
  StyleSheet,
  View,
  Button,
  FlatList,
  Alert,
  TouchableWithoutFeedback,
  Keyboard,
  Modal,
  Text
} from 'react-native';
import * as Font from 'expo-font'

import { openDatabase } from 'react-native-sqlite-storage';
var db = openDatabase({ name: 'SQLite.db' });

import Header from './components/header';
import TodoItem from './components/todoItem';
import AddTodo from './components/addTodo';
import { insertData, createToDoTable, dropTable, getData, deleteData, updateData } from './helper/dbHelper';
import ViewModal from './components/viewModal';
import EditModal from './components/editModal';



export default class App extends React.Component {
  constructor() {
    super();
    // dropTable()
    createToDoTable()
  }



  state = {
    data: [
    ],
    view: false,
    viewData: '',
    edit: false,
    editData: {}
  }

  componentDidMount() {
    // this.loadFont()
    this.populateDataToState()
  }

  loadFont = () => {
    Font.loadAsync({
      'Anton-Regular': require('./assets/fonts/Anton-Regular.ttf'),
      'FredokaOne-Regular': require('./assets/fonts/FredokaOne-Regular.ttf'),
      'Righteous-Regular': require('./assets/fonts/Righteous-Regular.ttf'),
      'Grandstander-VariableFont_wght': require('./assets/fonts/Grandstander-VariableFont_wght.ttf'),
      'Grandstander-Italic-VariableFont_wght': require('./assets/fonts/Grandstander-Italic-VariableFont_wght.ttf'),
    })
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

  
  updateItem = (id, text) => {
    updateData(id, text)
      .then(res => {
        if (res) {
          const { data } = this.state
          this.setState({
            edit: false,
            editData: {}
          })
          this.populateDataToState()
        }
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

  viewDetails = (data) =>{
    this.setState({
      view: true,
      viewData: data
    })
  }

  editDetails = (data) =>{
    this.setState({
      edit: true,
      editData: data
    })
  }

  closeEditDetails = () =>{
    this.setState({
      edit: false,
      editData: ''
    })
  }

  closeViewDetails = () =>{
    this.setState({
      view: false,
      viewData: ''
    })
  }

  render() {
    console.log(this.state)
    return (
      <TouchableWithoutFeedback
        onPress={() => { Keyboard.dismiss() }}
      >
        <View style={styles.container}>
          <Header />
          <View style={styles.content}>
            <ViewModal
              data={this.state.viewData}
              visible={this.state.view}
              onClose={this.closeViewDetails}
            />
            {/* edit item */}
            {
            (this.state.edit) ? 
              <EditModal
                data={this.state.editData}
                onClose={this.closeEditDetails}
                onUpdate={this.updateItem}
              />
            : null
            }

            <AddTodo addNewTodo={this.addItem} />
            <FlatList
              keyExtractor={(item, index) => "list" + item.id}
              style={styles.flatList}
              data={this.state.data}
              renderItem={({ item }) => (
                <TodoItem item={item} pressHandler={this.removeItem} onView={this.viewDetails} onEdit={this.editDetails}/>
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