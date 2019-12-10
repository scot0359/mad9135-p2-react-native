import React, { Component } from 'react'
import { Container, Button } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import { AppLoading } from 'expo'

export default class Home extends Component {

    state = {
        where: { lat: null, lng: null },
        yelpList: [],
        isLoading: true,
        ready: false,
        error: null
    }

    geoSuccess = (position) => {
        this.setState({ ready: true,
            where: {lat: position.coords.latitude,lng:position.coords.longitude } })
        console.log("pos:",position)
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
            this.setState({ yelpList: JSON.stringify(data.businesses)})
        })    
        
        // let url = `https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lng}`
        // let h = new Headers();
        // h.append('Authorization', 'Bearer YDjD-LAWi6jZf1ImD7yjwqLcrDfD1c9vwJNF7tXplA7hT5BzsBlbJiTg0Y3wcCr4Y-0f76ADuroc5-RBtHxEE2i4qIyla4FHmwq3T5-OkQn95hPhVOo6w7fVnf_uXXYx')

        // let req = new Request(url, {
        //     headers: h,
        //     method: 'GET'
        // })

        // fetch(req)
        // .then(response => response.json())
        // .then(data => {
        //     this.setState({yelpList: JSON.stringify(data)})
        //     console.log('LIST', this.state.yelpList)
        // })

    
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

            console.log("list:", this.state.yelpList)
    }

    render() {

        return (
            <Container>
                <View style={styles.container}>
                    {!this.state.ready && (
                        <Text style={styles.big}>Using Geolocation in React Native.</Text>
                    )}
                    {this.state.error && (
                        <Text style={styles.big}>{this.state.error}</Text>
                    )}
                    {this.state.ready && (
                        <Text style={styles.big}>{
                            `Latitude: ${this.state.where.lat}
                            Longitude: ${this.state.where.lng}`
                        }</Text>
                    )}

                    <Button onPress={this.loadRestaurants}><Text>PRESSME</Text></Button>

                    <Text>{`Restaurants: ${this.state.yelpList}`}</Text>
                </View>
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
    }
});