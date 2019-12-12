import React, { Component } from 'react'
import { Text, ListItem, Right, Body, Icon, Button } from 'native-base'
import { StyleSheet} from 'react-native';
import { withNavigation } from 'react-navigation'
import { AppLoading } from 'expo'

class YelpListItem extends Component {
    render() {
        const { item, navigation: { navigate }} = this.props

        let km = item.distance / 1000
        let kmRounded = Math.round( km * 100) / 100

        return (
            <ListItem style={{marginLeft: 0}}>
                <Body>
                    <Text style={{fontSize: 20}}>{item.name}</Text>
                    <Text style={{fontSize: 14, color: '#777'}}>{kmRounded}km</Text>
                </Body>
                <Right>
                    <Button transparent onPress={
                        () => navigate('YelpDetail', { restaurant: item })
                    }>
                        <Icon style={styles.arrowBtn} name="arrow-forward"/>
                    </Button>
                </Right>
            </ListItem>
        )
    }
}
export default withNavigation(YelpListItem)

const styles = StyleSheet.create({
    arrowBtn: {
        color: '#C41200',
    }
});
