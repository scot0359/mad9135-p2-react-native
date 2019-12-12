import React, { Component } from 'react'
import { Container, Button, Content } from 'native-base';
import { StyleSheet, Text, View } from 'react-native';
import { FlatList } from 'react-native'
import YelpListItem from '../components/YelpListItem'
import Spinner from 'react-native-loading-spinner-overlay';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class Home extends Component {

    static navigationOptions = {
        title: 'Yelp',
    }

    state = {
        where: { lat: null, lng: null },
        yelpList: [],
        isLoading: false,
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
        this.setState({isLoading: true})
        fetch(`https://api.yelp.com/v3/businesses/search?latitude=${lat}&longitude=${lng}&sort_by=distance`, {
            method: 'GET',
            headers: {
                'Authorization': 'Bearer YDjD-LAWi6jZf1ImD7yjwqLcrDfD1c9vwJNF7tXplA7hT5BzsBlbJiTg0Y3wcCr4Y-0f76ADuroc5-RBtHxEE2i4qIyla4FHmwq3T5-OkQn95hPhVOo6w7fVnf_uXXYx'
            }
        })
            .then(response => response.json())
            .then(data => {
                this.setState({ yelpList: data.businesses, isLoading: false})
                // this.sortRestaurants()
            })
            .catch((err) => {
                console.log('ERROR:' + err)
            }) 
            
    }

    componentDidMount() {

        console.log("state:", this.state)

        let geoOptions = {
            enableHighAccuracy: true,
            timeout: 20000,
            maximum: 60 * 60 * 24

        };
        this.setState({ ready: false });
        
        navigator.geolocation.getCurrentPosition
            (this.geoSuccess, this.geoFailure, geoOptions,)
      
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
            
                {this.state.isLoading ? <Spinner visible={true} textContent={'Loading...'} textStyle={styles.spinnerTextStyle}/> :  <FlatList
                    data={this.state.yelpList}
                    keyExtractor={item => item.id}
                    renderItem={({item}) => <YelpListItem item={item}/>}
                 />}
               
                
                
                </Content>
            </Container>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#fff',
        alignItems: 'center',
    },
    big: {
        fontSize: 48
    },
    btn:{
        width: wp('90%'),
        marginTop:10,
        marginBottom:10,
        justifyContent:'center',
        backgroundColor: '#F8F9F6',
        borderRadius: 4,
        borderWidth: 0.5,
        borderColor: '#B5B6B2'
    },
    btnTxt:{
        color: '#222222',
        fontSize: 20
    },
});