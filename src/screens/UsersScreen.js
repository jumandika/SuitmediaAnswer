import React, { Component, memo } from 'react'

import fonts from '../theme/fonts';
import colors from '../theme/colors';
import metrics from '../theme/metrics';
import {
    Image,
    SafeAreaView,
    ScrollView,
    StatusBar,
    StyleSheet,
    Text,
    useColorScheme,
    View,
    TextInput,
    FlatList,
    ActivityIndicator,
    Platform,
    ImageBackground,
} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import UsersList from '../components/organisms/UsersList';
import NavbarHeader from '../components/organisms/NavbarHeader';
import Touchable from '../components/molecules/Touchable';



class UsersScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            listView: true,
            iconName: 'map-marker',
        }
    }

    toggleList = () => {
        console.log('toggleList')
        let iconName = 'map-marker';
        if (this.state.iconName == 'map-marker') {
            iconName = 'format-list-bulleted'
        }
        this.setState((prevState) => ({ listView: !prevState.listView, iconName: iconName }));

    }


    render() {
        return (
            <View style={styles.container}>

                <StatusBar barStyle={'dark-content'} backgroundColor={'rgba(255,255,255,.3)'} />
                <NavbarHeader
                    pagetitle="Users"
                    navigation={this.props.navigation}
                    rightIcon={this.state.iconName}
                    onPress={() => this.toggleList()} />
                <UsersList
                    route={this.props.route}
                    navigation={this.props.navigation}
                    listView={this.state.listView}
                />





            </View >
        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    titleStyle: {
        paddingLeft: 20,
        fontFamily: fonts.type.poppinsLight,
        fontSize: fonts.size.font10,
        color: 'red',
    },
    headerContainer: {
        position: 'absolute',
        top: 0,
        paddingTop: Platform.OS === 'ios' ? 2 : 32,
        borderBottomWidth: 1,
        borderColor: '#CCC',
    },
    row: {
        flexDirection: 'row',
    },
    textInputStyle: {
        height: 40,
        width: metrics.screenWidth,
        color: '#000',
        backgroundColor: 'rgba(255,255,255,0.3)',
        fontFamily: fonts.type.poppinsRegular,
        paddingHorizontal: 20,
    }

})




export default memo(UsersScreen);