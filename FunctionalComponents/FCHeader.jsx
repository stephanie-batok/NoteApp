import React from 'react';
import {Header,Left, Body, Title, Button,Icon, Right } from 'native-base';
import { useNavigation } from '@react-navigation/native';


export default function FCHeader(props) {
    const navigation = useNavigation();

    const btnGoBack=()=>{
        navigation.goBack();
    }

    return (
        <Header>
            <Left>
                {(props.pageTitle==='Home Page'? null:
                    <Button transparent
                    onPress={btnGoBack}
                    >
                        <Icon name='arrow-back'/>
                    </Button>
                )}
            </Left>
            <Body>
                <Title>{props.pageTitle}</Title>
            </Body>
            <Right>

            </Right>
        </Header>
    )
}
