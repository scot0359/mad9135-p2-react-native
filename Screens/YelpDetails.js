import React, { Component } from 'react'
import { Container, Content, Text, View } from 'native-base'
import { Image, StyleSheet } from 'react-native'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export class YelpDetails extends Component {
    static navigationOptions = ({navigation}) => {

        const { name } = navigation.getParam('restaurant')

        return {
            title: name
            // title: navigation.state.params.movie.title
        }
    }

    render() {
        const restaurant = this.props.navigation.getParam('restaurant')
        let km = restaurant.distance / 1000
        let kmRounded = Math.round( km * 100) / 100
   
        return (
            <Container>
                <Content style={{padding: 24}}>
                    <Image style={ styles.image } source={{ uri: restaurant.image_url }}/>
                    <Text style={ styles.nameText }>{restaurant.name}</Text>
                    <Text><Text style={styles.bold}>Phone:</Text> {restaurant.phone}</Text>
                    <Text><Text style={styles.bold}>Pricing: </Text>{restaurant.price}</Text>
                    <Text><Text style={styles.bold}>Distance: </Text>{kmRounded + ' km'}</Text>
                    <View style={styles.rating}>
                    {restaurant.rating == 0 ? <Image source={require('../assets/ratings/regular_0.png')}/> : null }
                    {restaurant.rating == 1 ? <Image source={require('../assets/ratings/regular_1.png')}/> : null }
                    {restaurant.rating == 1.5 ? <Image source={require('../assets/ratings/regular_1_half.png')}/> : null }
                    {restaurant.rating == 2 ? <Image source={require('../assets/ratings/regular_2.png')}/> : null }
                    {restaurant.rating == 2.5 ? <Image source={require('../assets/ratings/regular_2_half.png')}/> : null }
                    {restaurant.rating == 3 ? <Image source={require('../assets/ratings/regular_3.png')}/> : null }
                    {restaurant.rating == 3.5 ? <Image source={require('../assets/ratings/regular_3_half.png')}/> : null }
                    {restaurant.rating == 4 ? <Image source={require('../assets/ratings/regular_4.png')}/> : null }
                    {restaurant.rating == 4.5 ? <Image source={require('../assets/ratings/regular_4_half.png')}/> : null }
                    {restaurant.rating == 5 ? <Image source={require('../assets/ratings/regular_5.png')}/> : null }
                    </View>
                </Content>
            </Container>
        )
    }
}

export default YelpDetails

const styles = StyleSheet.create({
    image: {
        height: hp('20%'),
        marginBottom: 10,
    },
    rating: {
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 20
    },
    nameText: {
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20
    },
    bold: {
        fontWeight: 'bold'
    }
});

