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
} from 'react-native';
import { WebView } from 'react-native-webview';
import UsersList from '../components/organisms/UsersList';
import NavbarHeader from '../components/organisms/NavbarHeader';



class WebviewScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
        }
    }


    render() {
        return (
            <View style={styles.container}>

                <StatusBar barStyle={'dark-content'} backgroundColor={'rgba(255,255,255,.3)'} />
                <NavbarHeader navigation={this.props.navigation} pagetitle="" />
                <WebView
                    source={{ uri: 'https://suitmedia.com/' }}
                    style={{ margin: 10 }}
                />

            </View >
        )
    };
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor:'#FFF'
    },
   
})




export default memo(WebviewScreen);