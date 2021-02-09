import React, {Component} from 'react';
import { Container, Content, Item, Input, Label,Form} from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button as ButtonElement } from 'react-native-elements';
import { Alert } from 'react-native';
import FCHeader from '../FunctionalComponents/FCHeader';



export default class AddCategoryPage extends Component {
    constructor(props) {
        super(props)
    
        this.state = {
            newCategory:""
        }
    }

    btnAdd = async() => {
        if(this.state.newCategory!=""){

            let newCategory={
                name:this.state.newCategory,
                id:this.props.route.params.id,
                notes:[],
                count:0
            };

            await AsyncStorage.setItem(`@${newCategory.id}`,JSON.stringify(newCategory));

            this.props.navigation.navigate('Home Page');

        }
        else{
            Alert.alert("Error","Please insert category name");
        }
    }
    
    render() {
        return (
        <Container>
           <FCHeader pageTitle="Add Category" />
        <Content>
            <Form>
            <Item stackedLabel>
              <Label>Category Name</Label>
              <Input
              onChangeText={(e)=>(this.setState({newCategory:e}))} />
            </Item>
            <ButtonElement
                title="Add"
                type="clear"
                onPress={this.btnAdd}
            />
            </Form>
        </Content>
      </Container>
         )
    }
}
