import React, { Component } from 'react'
import { Container } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';

export default class Home extends Component {

    state = {
        where: { lat: null, lng: null },
        yelpList: [],
        isLoading: true,
        ready: false,
        error: null
    }

    // getLocation() {
    //     navigator.geolocation.getCurrentPosition((position) => {
    //         this.setState({ position })
    //     }
    //     )
    // }

    geoSuccess = (position) => {
        this.setState({ ready: true,
            where: {lat: position.coords.latitude,lng:position.coords.longitude } })
        console.log("pos:",position)
    }

    geoFailure = (err) => {
        this.setState({ error: err.message })
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