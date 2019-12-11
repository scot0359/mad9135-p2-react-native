import React, { Component } from 'react'
import { Text, ListItem, Right, Body, Icon, Button } from 'native-base'
import { withNavigation } from 'react-navigation'
import { AppLoading } from 'expo'

class YelpListItem extends Component {
    render() {
        const { item, navigation: { navigate }} = this.props

        let km = item.distance / 1000
        let kmRounded = Math.round( km * 10) / 10

        return (
            <ListItem>
                <Body>
                    <Text style={{fontSize: 20}}>{item.name}</Text>
                    <Text style={{fontSize: 14, color: '#777'}}>{kmRounded}km</Text>
                </Body>
                <Right>
                    <Button transparent onPress={
                        () => navigate('YelpDetail', { restaurant: item })
                    }>
                        <Icon name="arrow-forward"/>
                    </Button>
                </Right>
            </ListItem>
        )
    }
}
export default withNavigation(YelpListItem)
