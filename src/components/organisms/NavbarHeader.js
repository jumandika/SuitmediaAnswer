import React, { memo, useEffect, useState, useRef } from 'react';
import PropTypes from 'prop-types';
import ApiService from '../../config/ApiService';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    Dimensions,
    Animated,
    Easing,
    Pressable,
    Platform,
    FlatList,
    ActivityIndicator,

} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import Touchable from '../molecules/Touchable';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import metrics from '../../theme/metrics';

import { NativeModules } from 'react-native';
const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? 0 : StatusBarManager.HEIGHT;


const NavbarHeader = ({
    pagetitle,
    navigation,
    rightIcon,
    onPress,
}) => {

    return (
        <View style={styles.container}>
            <Touchable
                onPress={() => navigation.goBack()}
                children={
                    <View style={styles.iconContainer}>
                        <MaterialCommunityIcons name="chevron-left" style={{ fontSize: fonts.size.font24, color: colors.primary }} />
                    </View>
                }
            />
            <View >
                <Text style={styles.nameStyle} >{pagetitle}</Text>
            </View>
            {rightIcon ?
                <Touchable
                    onPress={onPress}
                    children={
                        <View style={styles.iconContainer}>
                            <MaterialCommunityIcons name={rightIcon} style={{ fontSize: fonts.size.font20, color: colors.primary }} />
                        </View>
                    }
                /> :
                <View style={styles.iconContainer}>
                </View>
            }


        </View>
    );

}



NavbarHeader.propTypes = {
    pagetitle: PropTypes.string,
    navigation: PropTypes.any.isRequired,
    onPress: PropTypes.func,
};

const styles = StyleSheet.create({
    container: {
        // flex: 1,
        flexDirection: 'row',
        paddingTop: STATUSBAR_HEIGHT,
        height: 50 + STATUSBAR_HEIGHT,
        width: metrics.screenWidth,
        backgroundColor: colors.white,
        justifyContent: 'space-between',
        alignItems: 'center',
        borderBottomWidth: 1,
        borderColor: '#E2E3E4'
    },
    touchableStyle: {
        overflow: 'hidden',
    },

    nameStyle: {
        fontFamily: fonts.type.poppinsSemiBold,
        fontSize: fonts.size.font16,
        color: colors.primary,
    },
    iconContainer: {
        height: 40,
        width: 40,
        justifyContent: 'center',
        alignItems: 'center',
    }


});



export default memo(NavbarHeader);