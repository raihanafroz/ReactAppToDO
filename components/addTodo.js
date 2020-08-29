import React, { useState } from 'react';
import { StyleSheet, View, TextInput, Button } from 'react-native';

export default function AddTodo({ addNewTodo }) {
    const [text, setText] = useState('')

    const onchangeHandler = (val) => {
        setText(val)
    }

    const onSubmitHandler = (val) => {
        addNewTodo(val)
        setText("")
    }


    return (
        <View style={styles.content}>
            <View style={styles.textAreaContainer} >
                <TextInput
                    style={styles.textArea}
                    underlineColorAndroid="transparent"
                    placeholder="New todo..."
                    placeholderTextColor="grey"
                    numberOfLines={10}
                    multiline={true}
                    value={text}
                    onChangeText={(val) => onchangeHandler(val)}
                />
            </View>

            <Button
                title="Add Todo"
                color="coral"
                style={styles.btn}
                onPress={() => onSubmitHandler(text)}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    textArea: {
        height: 150,
        justifyContent: "flex-start",
        textAlignVertical: 'top'
    },
    textAreaContainer: {
        borderColor: "#000",
        borderWidth: 1,
        padding: 5,
        marginBottom: 10
    },
    btn: {
        borderRadius: 10
    },
    content: {
        margin: 5,
        paddingBottom: 10
    }
});