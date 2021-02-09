import React, { Component } from 'react';
import { View,Image,Alert,TouchableOpacity,StyleSheet } from 'react-native';
import { Camera } from 'expo-camera';
import * as ImagePicker from 'expo-image-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Footer, FooterTab,Container,Content, Right,Icon, Textarea,Left,ActionSheet, Root } from 'native-base';
import { Button as ButtonElement } from 'react-native-elements';
import FCHeader from '../FunctionalComponents/FCHeader';


export default class NotePage extends Component {
    constructor(props) {
        super(props);

        this.state = {
            startCamera:false,
            text:"",
            photoUri:null
        }
    }

    btnSaveNote = async() => {

        let {category}=this.props.route.params;

        let newNote={
            id:category.notes.length,
            text:this.state.text,
            photoUri:this.state.photoUri
        }

        let temp=[...category.notes,newNote];

        let updateCategory={
            id:category.id,
            name:category.name,
            notes:temp,
            count:temp.length
        }

        await AsyncStorage.setItem(`@${updateCategory.id}`, JSON.stringify(updateCategory));

        this.props.navigation.navigate('Home Page');  
    }
    
    btnTakePhoto = async() => {
        const { status } = await Camera.requestPermissionsAsync();
        if (status==='granted') {
            // start the camera
            this.setState({startCamera:true});
        } else {
            Alert.alert('Access denied');
        }
    }

    btnSnap = async () => {
        if (this.camera) {
          let photo = await this.camera.takePictureAsync({ quality: 0.5 });
          this.setState({ photoUri: photo.uri,startCamera:false });
        }
    };

    btnUploadPhoto = async() => {
        let result = await ImagePicker.launchImageLibraryAsync();
        if (!result.cancelled) {
        this.setState({ photoUri:result.uri });
        }
    }

    btnCamera=()=>{
        let picOptions=[
            {text:"Take Photo"},
            {text:"Upload From Gallery"},
            {text:"Cancel", icon: "close"}
        ];
        ActionSheet.show(
            {
                options:picOptions,
                cancelButtonIndex:2
            },btnIndex=>{
                if(btnIndex==0){
                    this.btnTakePhoto();
                                        
                }else if(btnIndex==1){
                    this. btnUploadPhoto();
                }
            }
        )
    }
    render() {                                //Camera Open
        if(this.state.startCamera){
            return(
                <Camera
                ref={ref => { this.camera = ref; }}
                style={{ flex: 1 }}
                type={this.state.type}>
                    <View
                        style={{
                        position: 'absolute',
                        bottom: 0,
                        flexDirection: 'row',
                        flex: 1,
                        width: '100%',
                        padding: 20,
                        justifyContent: 'space-between'
                        }}
                    >
                        <View
                            style={{
                            alignSelf: 'center',
                            flex: 1,
                            alignItems: 'center'
                            }}> 
                            <TouchableOpacity
                            onPress={this.btnSnap}
                            style={{
                            width: 70,
                            height: 70,
                            bottom: 0,
                            borderRadius: 50,
                            backgroundColor: '#fff'
                            }}
                            />
                        </View>
                    </View>
              </Camera>
            )
        }
        else{
            return(                               //Camera Closed
                <Root>
                    <Container>
                        <FCHeader/>
                        <Content>
                            <Textarea 
                                rowSpan={10}
                                placeholder="type your note..."
                                onChangeText={(e)=>(this.setState({text:e}))}/>
                            <View style={stylesCP.placeHolder}>
                                <Image
                                style={stylesCP.image}
                                source={{ uri: this.state.photoUri }}
                                ></Image>
                            </View>
                        </Content>
                        <Footer style={{height:70,backgroundColor:'transparent'}}>
                            <FooterTab>
                                <Left>
                                <ButtonElement 
                                        onPress={this.btnCamera}
                                        type="clear"
                                        icon={
                                            <Icon
                                            name='ios-camera-outline'
                                            style={{fontSize: 55,color:'blue'}}                                
                                            />
                                            }
                                    />
                                </Left>
                                <Right>
                                    <ButtonElement 
                                        onPress={this.btnSaveNote}
                                        type="clear"
                                        icon={
                                            <Icon
                                            name='checkmark-circle-outline'
                                            style={{fontSize: 55,color:'blue'}}                                
                                            />
                                            }
                                    />
                                </Right>
                            </FooterTab>
                        </Footer>
                    </Container>
                </Root>
             )
        }        
    }
}

const stylesCP = StyleSheet.create({
    placeHolder: {
      flex: 1,
      width: 300,
      margin: 10,
      alignSelf: 'center',
    },
    image: {
      flex: 1,
      width: 300,
      height:300,
      alignSelf: 'center',
    }
  }); 
