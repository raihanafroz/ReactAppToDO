import React from 'react';
import { StyleSheet,  Modal, TextInput, View, ScrollView, Button } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default class ViewModal extends React.Component {

  state = {
    text: '',
    id: null,
  }

  componentDidMount(){
    this.setState({
      text: this.props.data.data,
      id: this.props.data.id
    })
  }

  onchangeHandler = (val) => {
    this.setState({
      text: val
    })
  }

  onSubmitHandler = () => {
    this.props.onUpdate(this.state.id, this.state.text)
  }

  render(){
    return (
      <Modal
        transparent={true}
        visible={true}
      >
        <View style={styles.content}>
          <View style={styles.modal}>
            <View style={styles.close}>
              <Icon
                name='times-circle'
                size={40}
                color="#900"
                style={styles.icon}
                onPress={()=> this.props.onClose()}
              />
            </View>
            <ScrollView>
              <View style={styles.textAreaContainer} >
                <TextInput
                    style={styles.textArea}
                    underlineColorAndroid="transparent"
                    placeholder="New todo..."
                    placeholderTextColor="grey"
                    numberOfLines={10}
                    multiline={true}
                    value={this.state.text}
                    onChangeText={(val) => this.onchangeHandler(val)}
                />
              </View>
            </ScrollView>
            <Button
                title="Add Todo"
                color="coral"
                style={styles.btn}
                onPress={() => this.onSubmitHandler()}
            />
          </View>
        </View>
      </Modal>
    );
  }
}

const styles = StyleSheet.create({
  textArea: {
    height: 250,
    justifyContent: "flex-start",
    textAlignVertical: 'top'
  },
  textAreaContainer: {
      borderColor: "#000",
      borderWidth: 1,
      padding: 5,
      marginBottom: 10
  },btn: {
    borderRadius: 10
  },
  close:{
    alignItems: 'flex-end',
    marginTop: -28,
    marginRight: -25,
  },  text: {
    fontSize: 20,
    fontWeight: '500'
  }, modal: {
    backgroundColor: '#fff',
    margin: 35,
    padding: 20,
    borderRadius: 10
  }, content: {
    flex: 1,
    backgroundColor: '#000000aa',
  }
});