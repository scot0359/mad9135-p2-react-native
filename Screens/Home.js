import React, { Component } from 'react'
import { Container } from 'native-base';

export default class Home extends Component {

    state = {
        position: "",
        yelpList: [],
        isLoading: true
    }

    getLocation = () => {
        navigator.geoLocation.getCurrentPosition( (position) => {
            this.setState ({ position })
            }
        )
    }

    loadRestaurants = () => {

    }

    componentDidMount(){
        this.getLocation()
    }
    
    render() {
        return (
            <Container></Container>
        )
    }
}
