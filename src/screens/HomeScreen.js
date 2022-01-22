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
    Alert,

} from 'react-native';
import Touchable from '../components/molecules/Touchable';
import NavbarHeader from '../components/organisms/NavbarHeader';



class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textName: props.route.params.textName,
            item: {},
        }
    }

    // componentDidMount() {
    //     this.onSelect({})
    // }

    onSelect = (item) => {
        this.setState(item);
        console.log(this.state.item)
    };

    render() {
        return (
            <View style={styles.container}>

                <StatusBar barStyle={'dark-content'} backgroundColor={'rgba(255,255,255,.3)'} />
                <NavbarHeader pagetitle="Home" navigation={this.props.navigation} />

                <View style={{ flex: 1, justifyContent: 'space-between', }}>
                    <View>
                        <Text style={[styles.titleStyle, { fontFamily: fonts.type.poppinsRegular, fontSize: fonts.size.font14, paddingTop: 30 }]}>Welcome,</Text>
                        <Text style={styles.titleStyle}>{this.state.textName}</Text>
                    </View>
                    <View style={{ flex: 1, paddingTop: 80 }}>
                        {Object.keys(this.state.item).length == 0 ?
                            <View>
                                <Image source={require('../assets/avatar.png')} style={styles.imagePrevStyle} />
                                <Text style={[styles.subtitleStyle, { marginTop: 40 }]}>Select a user to show the profile</Text>
                            </View>
                            :
                            <View>
                                <Image source={{ uri: this.state.item.avatar }} style={styles.imageStyle} />
                                <Text style={[styles.titleStyle, { alignSelf: 'center', paddingLeft: 0, paddingTop: 60 }]}>{this.state.item?.first_name + ' ' + this.state.item?.last_name}</Text>
                                <Text style={styles.subtitleStyle}>{this.state.item?.email}</Text>
                                <Touchable
                                onPress={()=> this.props.navigation.navigate("WebviewScreen")}
                                    children={
                                        <Text style={styles.linkStyle} >website</Text>
                                    }
                                />

                            </View>
                        }
                    </View>




                    <Touchable
                        onPress={() => this.props.navigation.navigate("UsersScreen", { onSelect: this.onSelect })}
                        children={
                            <View
                                style={[styles.touchableStyle, { marginBottom: 40 }]}
                            >
                                <Text style={{ fontFamily: fonts.type.poppinsRegular, fontSize: fonts.size.font14, color: '#FFF' }}>
                                    Choose a User
                            </Text>
                            </View>
                        }
                    />
                </View>

            </View >
        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#FFF',
    },
    imageBackgroundStyle: {
        flex: 1,
        justifyContent: 'space-evenly',
        alignItems: 'center',
        resizeMode: 'cover',
        height: metrics.screenHeight,
        width: metrics.screenWidth,
    },
    imagePrevStyle: {
        overflow: 'hidden',
        borderRadius: 160,
        alignSelf: 'center',
        resizeMode: 'contain',
        height: 160,
        width: 160,
    },
    imageStyle: {
        overflow: 'hidden',
        borderRadius: 160,
        alignSelf: 'center',
        resizeMode: 'contain',
        height: 210,
        width: 210,
    },
    touchableStyle: {
        overflow: 'hidden',
        height: 40,
        width: metrics.screenWidth - 80,
        backgroundColor: colors.primary,
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleStyle: {
        paddingLeft: 30,
        fontFamily: fonts.type.poppinsSemiBold,
        fontSize: fonts.size.font20,
        color: colors.darkGrey,
    },
    subtitleStyle: {
        paddingTop: 10,
        alignSelf: 'center',
        fontFamily: fonts.type.poppinsRegular,
        fontSize: fonts.size.font16,
        color: colors.grey,
    },
    linkStyle: {
        paddingTop: 10,
        alignSelf: 'center',
        fontFamily: fonts.type.poppinsRegular,
        fontSize: fonts.size.font16,
        color: colors.primary,
        textDecorationLine: 'underline'
    },
    row: {
        flexDirection: 'row',
    },
    textInputStyle: {
        height: 40,
        width: metrics.screenWidth - 80,
        color: '#000',
        backgroundColor: '#FFF',
        fontFamily: fonts.type.poppinsRegular,
        paddingHorizontal: 20,
        borderRadius: 10,
    }

})




export default memo(HomeScreen);