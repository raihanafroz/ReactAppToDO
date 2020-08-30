import React from 'react';
import { StyleSheet,  Modal, Text, View, ScrollView } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function ViewModal({ data, visible, onClose }) {

  return (
    <Modal
      transparent={true}
      visible={visible}
    >
      <View style={styles.content}>
        <View style={styles.modal}>
          <View style={styles.close}>
            <Icon
              name='times-circle'
              size={40}
              color="#900"
              style={styles.icon}
              onPress={()=> onClose()}
            />
          </View>
          <ScrollView>
            <Text style={styles.text}>{data}</Text>
          </ScrollView>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  close:{
    alignItems: 'flex-end',
    marginTop: -28,
    marginRight: -25,
  },  text: {
    fontSize: 20,
    fontWeight: '500'
  }, modal: {
    backgroundColor: '#fff',
    flex: 1,
    margin: 35,
    padding: 20,
    borderRadius: 10
  }, content: {
    flex: 1,
    backgroundColor: '#000000aa',
  }
});