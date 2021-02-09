import React from 'react';
import { View } from 'react-native';
import NoteCard from './NoteCard';


export default function NoteList(props) {

    let notes=props.notes.map((note)=>
        <NoteCard note={note} removeNote={props.removeNote}/>
    );

    return (
        <View>
            {props.notes.length===0?null:notes}
        </View>
    )
}
