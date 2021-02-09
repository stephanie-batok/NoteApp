import React, { Component } from 'react';
import { Text,Image,StyleSheet } from 'react-native';
import FCHeader from '../FunctionalComponents/FCHeader';
import {Container, Content } from 'native-base';


export default function ViewNotePage(props) {
    return (
        <Container>
            <FCHeader/>
            <Content>
                <Text>
                    {props.route.params.note.text}
                </Text>
                <Image
                    style={stylesCP.image}
                    source={{ uri: props.route.params.note.photoUri }}
                ></Image>
            </Content>
        </Container>
    )
}


const stylesCP = StyleSheet.create({
    image: {
      flex: 1,
      width: 300,
      height:300,
      alignSelf: 'center',
    }
  }); 




