import React, { Component } from 'react';
import { Button as ButtonElement } from 'react-native-elements';
import {Footer, FooterTab,Container,Content, Right,Icon } from 'native-base';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FCHeader from '../FunctionalComponents/FCHeader';
import NoteList from '../FunctionalComponents/NoteList';


export default class NoteCategoryPage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            category:null,
            name:null,
            notes:[]
        }
    }

    componentDidMount=()=>{
        this.onPageFocus();
    }

    componentWillUnmount=()=>{
        this.onPageFocus();
    }

    onPageFocus=()=>{
        this.props.navigation.addListener('focus',()=>{

            if(this.props.route.params!=undefined){

                if(this.props.route.params.category!==""){

                    let {category}=this.props.route.params;

                    this.setState({category:category,name:category.name,notes:category.notes},()=>{
                        this.props.navigation.setParams({category:""});
                    });
                }
            }
        });
    }

    btnAddNote=()=>{
        this.props.navigation.navigate('NotePage',{category:this.state.category});
    }

    removeNote=async(id)=>{

        let tempNotes = this.state.notes.filter(note=>note.id!==id);

        let tempCategory = {
        id:this.state.category.id,
        name:this.state.category.name,
        notes:tempNotes,
        count:tempNotes.length,
        }

        this.setState({notes:tempNotes,category:tempCategory},()=>{

            AsyncStorage.setItem(`@${tempCategory.id}`, JSON.stringify(this.state.category));   
        });
    }
    
    render() {
        return (
            <Container>
                <FCHeader pageTitle={this.state.name} />
                <Content>
                    <NoteList notes={this.state.notes} removeNote={this.removeNote}/>                  
                </Content>
                <Footer style={{height:70,backgroundColor:'transparent'}}>
                    <FooterTab>
                        <Right>
                            <ButtonElement 
                                onPress={this.btnAddNote}
                                type="clear"
                                icon={
                                    <Icon
                                    name='create-outline'
                                    style={{fontSize: 52,color:'blue'}}                                
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
