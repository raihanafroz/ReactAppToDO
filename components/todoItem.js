import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function TodoItem({ item, pressHandler, onView, onEdit }) {

    const deleteItem = (id) => {
        Alert.alert(
            "Warning",
            "Are you sure to delete?",
            [
                {
                    text: "No",
                    style: "cancel"
                },
                { text: "Yes", onPress: () => pressHandler(id) }
            ],
            { cancelable: false }
        );
    }
    return (
        <TouchableOpacity onPress={()=> onView(item.data)}>
            <View style={styles.container}>
                <View style={styles.content}>
                    <Text style={styles.item}>{(item.data.length > 45) ? item.data.substring(0,45)+'...' : item.data}</Text>
                    <View style={styles.btnArea}>
                        <Icon
                            name="edit"
                            size={30}
                            color="#900"
                            style={styles.icon}
                            onPress={() => onEdit(item)}
                        />
                        <Icon
                            name="trash-o"
                            size={30}
                            color="#900"
                            style={styles.icon}
                            onPress={() => deleteItem(item.id)} />
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    );
}

const styles = StyleSheet.create({
    icon: {
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