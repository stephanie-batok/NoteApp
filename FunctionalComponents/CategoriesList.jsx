import React from 'react';
import { Text,TouchableOpacity} from 'react-native';
import { Card, CardItem,Right,Badge,Left} from 'native-base';
import { useNavigation } from '@react-navigation/native';


export default function CategoriesList(props) {
    const navigation = useNavigation();

    const pressCategory=(data)=>{
        navigation.navigate('NoteCategoryPage',{category:data});
    }

    let categories=props.categories.map((category,key)=>
        <TouchableOpacity
            name={key}
            onPress={()=>pressCategory(category)}
        >
            <CardItem>
                <Left>
                    <Text>{category.name}</Text>
                    </Left>
                <Right>
                    <Badge primary>
                        <Text style={{ color: 'white' }}>{category.count}</Text>
                    </Badge>
                </Right>
            </CardItem>
        </TouchableOpacity>
    );

    return (
        <Card>
            {categories}
        </Card>
    )
}
