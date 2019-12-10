import React, { Component } from 'react'
import { Container, Content, Text, Image } from 'native-base'

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

        return (
            <Container>
                <Content style={{padding: 24}}>
                    <Text>{restaurant.name}</Text>
                    <Text>{restaurant.phone}</Text>
                    {/* <Image source={{ uri: `${restaurant.image_url}` }}/> */}
                </Content>
            </Container>
        )
    }
}

export default YelpDetails