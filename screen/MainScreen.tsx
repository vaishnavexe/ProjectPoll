import {View, Text, StyleSheet } from 'react-native';

export const MainScreen = ({route}:any)=>{
    const { item } = route.params
    const details = JSON.stringify(item, null, 2);

    return(
        <View style={styles.jsonStyleContainer}> 
            <View style={styles.jsonContent}>
                <Text style={styles.jsonContentText}>
                    {details}
                </Text>
            </View>
        </View> 
    )
}
const styles = StyleSheet.create({
    jsonStyleContainer:{
        paddingVertical: 10,
        paddingHorizontal: 10
    },
    AuthorTitle:{
        fontSize: 20,
        fontWeight: 'bold',
        paddingBottom: 15,
    },
    jsonContent:{
        backgroundColor: 'white',
        borderColor: 'white',
        borderWidth: 2,
        paddingHorizontal: 10,
        paddingVertical: 10,
        borderRadius: 10
    },
    jsonContentText:{
        fontSize: 13,
    }
})