import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Button, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function TodoItem({ item, pressHandler }) {
    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.item}>{item.data}</Text>
                <View style={styles.btnArea}>
                    <Icon 
                    name="edit" 
                    size={30} 
                    color="#900" 
                    style={styles.icon} 
                    onPress={()=> Alert.alert("Comming Soon")}
                    />

                    <Icon 
                    name="trash-o" 
                    size={30} 
                    color="#900" 
                    style={styles.icon}
                    onPress={() => pressHandler(item.id)} />
                </View>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    icon:{
        marginRight: 10,
    },
    btnArea: {
        flexDirection: 'row',
        margin: 4
    },
    item: {
        paddingTop: 4,
        paddingBottom: 4,
        paddingLeft: 10,
        paddingRight: 10,
        margin: 5,
    },
    content: {
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    container: {
        margin: 5,
        borderRadius: 5,
        backgroundColor: '#e4edb9'
    }
});