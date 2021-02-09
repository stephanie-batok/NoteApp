import React from 'react';
import 'react-native-gesture-handler';
import { StyleSheet} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';


import HomePage from './Pages/HomePage';
import NoteCategoryPage from './Pages/NoteCategoryPage';
import NotePage from './Pages/NotePage';
import AddCategoryPage from './Pages/AddCategoryPage';
import ViewNotePage from './Pages/ViewNotePage';


const Stack = createStackNavigator();
export default function App() {
  return (
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown:false}} initialRouteName='Home Page'>
            <Stack.Screen name='Home Page' component={HomePage}/>
            <Stack.Screen name='Add Category' component={AddCategoryPage}/>
            <Stack.Screen name='NoteCategoryPage' component={NoteCategoryPage}/>
            <Stack.Screen name='NotePage' component={NotePage}/>
            <Stack.Screen name='ViewNotePage' component={ViewNotePage}/>
          </Stack.Navigator>
      </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor:'#fff'
  },
});
