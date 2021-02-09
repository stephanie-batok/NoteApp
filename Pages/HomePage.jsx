import React, { Component} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Button as ButtonElement } from 'react-native-elements';
import {Footer, FooterTab,Container,Content, Right,Icon } from 'native-base';
import CategoriesList from '../FunctionalComponents/CategoriesList';
import FCHeader from '../FunctionalComponents/FCHeader';


export default class HomePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            categories:[]
        }
    }

    onPageFocus=()=> {
        this.props.navigation.addListener('focus',()=>{
            this.importData();
        });
    }

    importData= async() =>{

        try {
            let keys = await AsyncStorage.getAllKeys();
            let results = await AsyncStorage.multiGet(keys);
            let temp = [];

            results.forEach(category => {
                temp.push(JSON.parse(category[1]))
            });

            this.setState({categories:temp});
            
        } catch (error) {
            console.error(error)
        }
    }

    componentDidMount=()=>{
        this.onPageFocus();
    }

    componentWillUnmount=()=>{
        this.onPageFocus();
    }

    btnAddCategory=()=>{
        this.props.navigation.navigate('Add Category',{id:this.state.categories.length});
    }

    render() {

        return (
            <Container>
                <FCHeader pageTitle="Home Page" />
                <Content>
                    <CategoriesList categories={this.state.categories}/>
                </Content>
                <Footer style={{height:70,backgroundColor:'transparent'}}>
                    <FooterTab>
                        <Right>
                            <ButtonElement 
                                onPress={this.btnAddCategory}
                                type="clear"
                                icon={
                                    <Icon
                                    name='add-circle'
                                    style={{fontSize: 55,color:'blue'}}                                
                                    />
                                     }
                            />
                        </Right>
                    </FooterTab>
                </Footer>
            </Container>
        )
    }
}
