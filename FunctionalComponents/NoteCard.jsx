import React from 'react';
import { Text, Image,TouchableOpacity } from 'react-native';
import {Card, CardItem, Right,Left } from 'native-base';
import { useNavigation } from '@react-navigation/native';


export default function NoteCard(props) {
    const navigation = useNavigation();

    const btnViewNote=()=>{
        navigation.navigate('ViewNotePage',{note:props.note});
    }

    const btnRemoveNote=()=>{
        props.removeNote(props.note.id);
    }

    return (
        <TouchableOpacity
            onPress={btnViewNote}>
        <Card>
            <CardItem>
                 <Text numberOfLines={1}>{props.note.text}...</Text> 
            </CardItem>
            <CardItem>
              <Image source={{uri:props.note.photoUri}} style={{height: 100, width: 100, flex: 1}}/>
            </CardItem>
            <CardItem>
                <Right>
                   <TouchableOpacity 
                        onPress={btnRemoveNote}>
                            <Text style={{color:'red'}}>
                                Remove Note
                            </Text>
                   </TouchableOpacity>
               </Right>
            </CardItem>
        </Card>
        </TouchableOpacity>
    )
}
