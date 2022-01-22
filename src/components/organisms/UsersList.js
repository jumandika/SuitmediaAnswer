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
import Ionicons from 'react-native-vector-icons/Ionicons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import LinearGradient from 'react-native-linear-gradient';
import Touchable from '../molecules/Touchable';
import colors from '../../theme/colors';
import fonts from '../../theme/fonts';
import metrics from '../../theme/metrics';

import { NativeModules } from 'react-native';
const { StatusBarManager } = NativeModules;
const STATUSBAR_HEIGHT = Platform.OS === 'ios' ? StatusBarManager.HEIGHT + 30 : StatusBarManager.HEIGHT;


const UsersList = ({
    route,
    navigation,
    listView,
}) => {


    const [pages, setPages] = useState(1)
    const [limit, setLimit] = useState(10)
    const [userList, setUserList] = useState([])
    const [isLoading, setIsLoading] = useState(true)
    const [isLoadMore, setIsLoadMore] = useState(true)
    const [isRefreshing, setIsRefreshing] = useState(false)

    const [indexSelected, setIndexSelected] = useState(null)
    const [itemSelected, setItemSelected] = useState(null)
    const [isModal, setIsModal] = useState(false)




    useEffect(() => {
        getUsersList(pages, limit)

    }, [])


    const getUsersList = async (pages, limit, isRefresh) => {
        try {
            const request = await fetch(ApiService.Endpoint.urlApi + '?page=' + pages + '&per_page=' + limit,
                {
                    method: 'GET',
                    headers: {
                    }
                });
            const response = await request.json();
            // console.log('response ', response)
            // console.log('userList ', userList)
            if (isRefresh) {
                console.log('response REFRESH', response)
                setUserList(response.data)

                setIsLoading(false)
                setIsRefreshing(false)

            }
            else if (response.data.length > 0) {
                setUserList([...userList, ...response.data])
                setIsLoading(false)
                setIsRefreshing(false)

            }
            else {
                setIsRefreshing(false)
                setIsLoadMore(false)
                setIsLoading(false)


            }
        } catch (err) {
            console.error(err)
        }
    }


    const renderItem = ({ item, index }) => {
        return (
            <Touchable
                onPress={() => goBack(item)}
                style={styles.touchableStyle}
                children={
                    <View key={item.id} style={styles.childrenStyle}>
                        <Image source={{ uri: item.avatar }} style={styles.avatarStyle} />
                        <View style={{ justifyContent: 'center', }}>
                            <Text style={[styles.subNameStyle, { fontFamily: fonts.type.poppinsMedium, fontSize: fonts.size.font16 }]}>{item.first_name + ' ' + item.last_name}</Text>
                            <Text style={[styles.subNameStyle, { color: '#686777' }]}>{item.email}</Text>

                        </View>


                    </View>

                }
            />

        );

    }


    const ListFooterComponent = () => {
        return (
            isLoadMore ?
                <ActivityIndicator style={{ flex: 0.5, marginTop: 20, }} size={'large'} color={colors.darkGrey} />
                :
                <Text style={[styles.subNameStyle, { alignSelf: 'center', paddingVertical: 20, color: '#000000' }]}>{"You're in the end of the list"}</Text>

        );
    }

    const handleLoadMore = () => {
        if (isLoading && isRefreshing && !isLoadMore) {
            console.log('DONT LOAD')
            return;
        }

        console.log('handleLoadMore')
        setPages(pages + 1)
        getUsersList(pages + 1, limit);


    }

    const onRefresh = () => {
        setUserList([])
        setIsRefreshing(true);
        setIsLoading(true);
        setIsLoadMore(true);
        setPages(1);
        setTimeout(() => {

            getUsersList(1, limit, true);
        }, 700)

    }

    const goBack = (item) => {
        // console.log(route)
        route.params.onSelect(
            { item: item }
        );
        navigation.goBack();
    }


    return (
        <View style={styles.container}>

            {  isLoading ?
                <ActivityIndicator style={{ flex: 1 }} size={'large'} color={colors.darkGrey} />
                :
                listView ?
                    <FlatList
                        onRefresh={onRefresh}
                        refreshing={isRefreshing}
                        // bounces={false}
                        decelerationRate='normal'
                        keyExtractor={(item, index) => { return item.id }}
                        data={userList}
                        renderItem={(item, index) => renderItem(item, index)}
                        onEndReached={handleLoadMore}
                        onEndThreshold={0}
                        // contentContainerStyle={{ paddingTop:20 }}
                        removeClippedSubviews={true}
                        scrollEventThrottle={16}
                        windowSize={10}
                        initialNumToRender={10}
                        maxToRenderPerBatch={10}
                        ListFooterComponent={ListFooterComponent}
                    />
                    :
                    <View>

                        <ImageBackground
                            source={require('../../assets/Map.png')}
                            style={{ height: '100%', width: '100%' }}
                        >
                            <Touchable
                                onPress={() => {
                                    setIndexSelected(0)
                                    setIsModal(true)
                                }}
                                children={
                                    <MaterialCommunityIcons name={'map-marker'} style={{ color: "red", fontSize: 45, marginLeft: 100, marginTop: 100 }} />
                                }
                            />
                            <Touchable
                                onPress={() => {
                                    setIndexSelected(1)
                                    setIsModal(true)
                                }}
                                children={
                                    <MaterialCommunityIcons name={'map-marker'} style={{ color: "red", fontSize: 45, marginLeft: metrics.screenWidth - 80, marginTop: 150 }} />
                                }
                            />
                            <Touchable
                                onPress={() => {
                                    setIndexSelected(2)
                                    setIsModal(true)
                                }}
                                children={
                                    <MaterialCommunityIcons name={'map-marker'} style={{ color: "red", fontSize: 45, marginLeft: metrics.screenWidth - 200, marginTop: 150 }} />
                                }
                            />
                        </ImageBackground>
                        {isModal &&
                            <View style={styles.panelContainer}>
                                <Image source={{ uri: userList[indexSelected]?.avatar }} style={[styles.avatarPanelStyle, { marginBottom: 15 }]} />
                                <Text style={[styles.subNameStyle, { fontFamily: fonts.type.poppinsMedium, fontSize: fonts.size.font16 }]}>{userList[indexSelected]?.first_name + ' ' + userList[indexSelected]?.last_name}</Text>
                                <Touchable
                                    onPress={() => goBack(userList[indexSelected])}
                                    children={
                                        <View
                                            style={[styles.buttonStyle, { marginVertical: 30 }]}
                                        >
                                            <Text style={{ fontFamily: fonts.type.poppinsRegular, fontSize: fonts.size.font14, color: '#FFF' }}>
                                                Select
                            </Text>
                                        </View>
                                    }
                                />
                            </View>
                        }
                    </View>
            }

        </View>
    );

}


PropTypes.string,
    UsersList.propTypes = {
        navigation: PropTypes.any,
        listView: PropTypes.bool,
    };

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#EEE'
    },
    touchableStyle: {
        overflow: 'hidden',
        backgroundColor: colors.white,

    },
    panelContainer: {
        flex: 1,
        position: 'absolute',
        alignItems: 'center',
        bottom: 0,
        width: '100%',
        backgroundColor: colors.white,
        elevation: 10,
        borderTopLeftRadius: 12,
        borderTopRightRadius: 12,
    },
    buttonStyle: {
        overflow: 'hidden',
        height: 40,
        width: metrics.screenWidth - 80,
        backgroundColor: colors.primary,
        borderRadius: 10,
        alignSelf: 'center',
        justifyContent: 'center',
        alignItems: 'center',

    },
    avatarStyle: {
        height: 60,
        width: 60,
        borderRadius: 60,
        marginHorizontal: 20,
        overflow: 'hidden',
    },
    avatarPanelStyle: {
        height: 100,
        width: 100,
        borderRadius: 100,
        margin: 30,
        overflow: 'hidden',
    },
    childrenStyle: {
        flex: 1,
        flexDirection: 'row',
        marginHorizontal: 30,
        paddingVertical: 20,
        borderBottomWidth: 1,
        borderColor: '#E2E3E4',
    },

    subNameStyle: {
        fontFamily: fonts.type.poppinsRegular,
        fontSize: fonts.size.font12,
        color: colors.darkGrey,
    },
    linearGradientStyle: {
        position: 'absolute',
        bottom: 0,
        width: metrics.screenWidth,
        height: '70%',
    },
    imageBackgroundStyle: {
        flex: Platform.OS === "ios" ? 0 : 1,
        width: metrics.screenWidth,
        height: Platform.OS === "ios" ? metrics.screenHeight - STATUSBAR_HEIGHT : 'auto',
        // height: 'auto',
        // height: '100%',
        justifyContent: 'flex-end',
    },
    descContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
        borderBottomWidth: 1,
        borderColor: '#EEE',
    },
    preLoadImage: {
        marginTop: 50,
        fontSize: 120,
        position: 'absolute',
        alignSelf: 'center',
        color: 'rgba(0,0,0,0.25)',
    },
    inner: {
        width: "100%",
        height: 20,
        borderRadius: 15,
        backgroundColor: colors.green,
    },

});



export default memo(UsersList);