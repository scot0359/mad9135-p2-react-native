import React, { Component } from 'react'
import { Container } from 'native-base';

export default class Home extends Component {

    state = {
        position: "",
        yelpList: [],
        isLoading: true
    }

    getLocation () {
        navigator.geolocation.getCurrentPosition( (position) => {
            this.setState ({ position })
            }
        )
    }

    loadRestaurants = () => {

    }

    componentDidMount(){
        this.getLocation()
        console.log(this.state.position)
    }
    
    render() {
        return (
            <Container></Container>
        )
    }
}
