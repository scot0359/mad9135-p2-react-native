import React, { Component } from 'react'
import { Container, Button, Content } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native'
import { AppLoading } from 'expo'
import YelpListItem from '../components/YelpListItem'

export default class Home extends Component {

    static navigationOptions = {
        title: 'Yelp',
    }

    state = {
        where: { lat: null, lng: null },
        yelpList: [],
        isLoading: true,
        ready: false,
        error: null
    }

    geoSuccess = (position) => {
        this.setState({
            ready: true,
            where: { lat: position.coords.latitude, lng: position.coords.longitude }
        })
        console.log("pos:", position)
 
    }

    geoFailure = (err) => {
        this.setState({ error: err.message })
    }

    loadRestaurants = () => {
        let lat = this.state.where.lat
        let lng = this.state.where.lng

        // https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lng}
        // https://api.yelp.com/v3/businesses/search?latitude=37.785834&longitude=-122.406417

        fetch(`https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lng}`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer YDjD-LAWi6jZf1ImD7yjwqLcrDfD1c9vwJNF7tXplA7hT5BzsBlbJiTg0Y3wcCr4Y-0f76ADuroc5-RBtHxEE2i4qIyla4FHmwq3T5-OkQn95hPhVOo6w7fVnf_uXXYx'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ yelpList: data.businesses })
            })
    }


    componentDidMount() {
        // this.getLocation()  

        console.log("state:", this.state)

        let geoOptions = {
            enableHighAccuracy: true,
            timeout: 20000,
            maximum: 60 * 60 * 24

        };
        this.setState({ ready: false });
        navigator.geolocation.getCurrentPosition
            (this.geoSuccess, this.geoFailure, geoOptions)

        // this.loadRestaurants()

      
    }

    render() {

        return (
            <Container style={styles.container}>
                <Content>
                <Button onPress={this.loadRestaurants} style={styles.btn}><Text style={styles.btnTxt}>Find restaurants nearby...</Text></Button>
                <View style={styles.container}>
                    {this.state.error && (
                        <Text >{this.state.error}</Text>
                    )}
                </View>
                <FlatList
                    data={this.state.yelpList}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => <YelpListItem item={item}/>}
                 />
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center'
    },
    big: {
        fontSize: 48
    },
    btn:{
        width:400,
        marginTop:10,
        marginBottom:30,
        justifyContent:'center'
    },
    btnTxt:{
        color:'white',
        fontSize: 20
    },
});