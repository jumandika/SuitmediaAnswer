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
    View,
    TextInput,
    Platform,
    ImageBackground,
    Alert,
    NativeModules,

} from 'react-native';
import Touchable from '../components/molecules/Touchable';

const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 0 : StatusBarManager.HEIGHT + 2;



class LoginScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            textName: '',
            textPalindrome: '',
        }
    }


    isPalindrome = (str) => {
        let label;
        if (str !== '') {
            let x = str === str.split('').reverse().join('');
            if (x) {
                label = 'Yeah, isPalindrome'
            } else {

                label = 'No, not Palindrome'
            }
        } else {
            label = 'Fill field to check is Palindrome'

        }
        Alert.alert(label)
        // console.log('x', x)
    }

    // componentDidUpdate(prevProps, prevState) {
    //     if (prevState.textPalindrome !== this.state.textPalindrome) {
    //         this.isPalindrome(this.state.textPalindrome)
    //     }
    // }


    render() {
        return (
            <ImageBackground source={require('../assets/background.png')} resizeMode='cover' style={styles.imageBackgroundStyle}>
                <StatusBar barStyle={'dark-content'} backgroundColor={'rgba(255,255,255,.0)'} />

                <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                    <Image source={require('../assets/ic_photo.png')} style={styles.imageStyle} />

                    <TextInput
                        style={[styles.textInputStyle, { marginTop: 80 }]}
                        blurOnSubmit={true}
                        onChangeText={text => this.setState({ textName: text })}
                        value={this.state.textName}
                        placeholder="Name"
                        placeholderTextColor={"rgba(104, 103, 119, 0.36)"}
                    />
                    <TextInput
                        style={[styles.textInputStyle, { marginTop: 20 }]}
                        blurOnSubmit={true}
                        onChangeText={text => this.setState({ textPalindrome: text })}
                        autoCapitalize="none"
                        value={this.state.textPalindrome}
                        placeholder="Palindrome"
                        placeholderTextColor={"rgba(104, 103, 119, 0.36)"}
                    />

                    <Touchable
                        onPress={() => this.isPalindrome(this.state.textPalindrome)}
                        children={
                            <View
                                style={[styles.touchableStyle, { marginTop: 60 }]}
                            >
                                <Text style={{ fontFamily: fonts.type.poppinsRegular, fontSize: fonts.size.font14, color: '#FFF' }}>
                                    CHECK
                            </Text>
                            </View>
                        }
                    />
                    <Touchable
                        onPress={() => this.props.navigation.navigate('HomeScreen', { textName: this.state.textName })}
                        children={
                            <View
                                style={[styles.touchableStyle, { marginTop: 20 }]}
                            >
                                <Text style={{ fontFamily: fonts.type.poppinsRegular, fontSize: fonts.size.font14, color: '#FFF' }}>
                                    NEXT
                            </Text>
                            </View>
                        }
                    />
                </View>

            </ImageBackground >
        )
    };
}

const styles = StyleSheet.create({

    imageBackgroundStyle: {
        flex: 1,
        position: 'absolute',
        justifyContent: 'space-evenly',
        alignItems: 'center',
        height: metrics.screenHeight + STATUSBAR_HEIGHT,
        width: metrics.screenWidth,
    },
    imageStyle: {
        resizeMode: 'contain',
        height: 120,
        width: 120,
    },
    touchableStyle: {
        overflow: 'hidden',
        height: 40,
        width: metrics.screenWidth - 80,
        backgroundColor: colors.primary,
        borderRadius: 10,
        justifyContent: 'center',
        alignItems: 'center',
    },
    titleStyle: {
        alignSelf: 'flex-start',
        paddingLeft: 20,
        fontFamily: fonts.type.poppinsLight,
        fontSize: fonts.size.font10,
        color: colors.white,
    },
    row: {
        flexDirection: 'row',
    },
    textInputStyle: {
        height: 45,
        width: metrics.screenWidth - 80,
        color: '#000',
        backgroundColor: '#FFF',
        fontFamily: fonts.type.poppinsRegular,
        fontSize: fonts.size.font14,
        paddingHorizontal: 20,
        borderRadius: 10,
    }

})




export default memo(LoginScreen);