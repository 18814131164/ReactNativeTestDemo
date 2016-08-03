/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';

import React, { Component ,PropTypes} from 'react';
import {
    AppRegistry,
    Platform,
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';

import {
    isFirstTime,
    isRolledBack,
    packageVersion,
    currentVersion,
    checkUpdate,
    downloadUpdate,
    switchVersion,
    switchVersionLater,
    markSuccess,
} from 'react-native-update';

import _updateConfig from './update.json';
const {appKey} = _updateConfig[Platform.OS];

import Button from './src/component/Button';
import Toast from 'react-native-root-toast';
import Icon from 'react-native-vector-icons/FontAwesome';

let toast = Toast.show('This is a message', {
    duration: Toast.durations.LONG,
    position: Toast.positions.BOTTOM,
    shadow: true,
    animation: true,
    hideOnPress: true,
    delay: 0,
    onShow: () => {
        // calls on toast\`s appear animation start
    },
    onShown: () => {
        // calls on toast\`s appear animation end.
    },
    onHide: () => {
        // calls on toast\`s hide animation start.
    },
    onHidden: () => {
        // calls on toast\`s hide animation end.
    }
});

class ReactNativeTestDemo extends Component {

    constructor(props){
        super(props);
        // 初始状态
        this.state = {status : 1,title : 'iOSlyon'};
    }

    componentWillMount(){
        if (isFirstTime) {
            Alert.alert('提示', '这是当前版本第一次启动,是否要模拟启动失败?失败将回滚到上一版本', [
                {text: '是', onPress: ()=>{throw new Error('模拟启动失败,请重启应用')}},
                {text: '否', onPress: ()=>{markSuccess()}},
            ]);
        } else if (isRolledBack) {
            Alert.alert('提示', '刚刚更新失败了,版本被回滚.');
        }
    }

    doUpdate = info => {
        downloadUpdate(info).then(hash => {
            Alert.alert('提示', '下载完毕,是否重启应用?', [
                {text: '是', onPress: ()=>{switchVersion(hash);}},
                {text: '否',},
                {text: '下次启动时', onPress: ()=>{switchVersionLater(hash);}},
            ]);
        }).catch(err => {
            Alert.alert('提示', '更新失败.');
        });
    };
    checkUpdate = () => {
        checkUpdate(appKey).then(info => {
            if (info.expired) {
                Alert.alert('提示', '您的应用版本已更新,请前往应用商店下载新的版本', [
                    {text: '确定', onPress: ()=>{info.downloadUrl && Linking.openURL(info.downloadUrl)}},
                ]);
            } else if (info.upToDate) {
                Alert.alert('提示', '您的应用版本已是最新.');
            } else {
                Alert.alert('提示', '检查到新的版本'+info.name+',是否下载?\n'+ info.description, [
                    {text: '是', onPress: ()=>{this.doUpdate(info)}},
                    {text: '否',},
                ]);
            }
        }).catch(err => {
            Alert.alert('提示', '更新失败.');
        });
    };

    fetchData = (enableCallBack) => {

        fetch('http://bbs.reactnative.cn/api/category/3')
        .then((response)=>response.json())
        .then((jsondata)=> {
            console.log(jsondata);
            if (jsondata.topics) {
                this.setState ({
                    title : jsondata.topics[0].title
                })
            } else {
                Toast.show('error');
            }
            enableCallBack();
        })
        .catch ((error)=>{
            console.warn(error);
            enableCallBack();
        });


        // 禁用按钮
        //this.refs.button.disable();
        // 自定义方法,大家请使用属性来定义
        //this.timer = setTimeout(()=>{
        //    // 开启按钮
        //    //this.refs.button.enable();

        //},3000);
    };

    componentWillUnmount(){

        this.timer && clearTimeout(this.timer);
    }

    render() {
        return (
            <View style={styles.container}>

                <Text style={styles.text}><Icon name="rocket" size={30} color="#900"/>{this.state.title}</Text>

                <Text style={styles.instructions}>
                    这是版本一 {'\n'}
                    当前包版本号: {packageVersion}{'\n'}
                    当前版本Hash: {currentVersion||'(空)'}{'\n'}
                </Text>
                { /* Props 属性*/ }
                { /* ref 就相当于html中的id,标记和引用组件*/}
                <Button ref = 'button' text = '点击这里检查更新' bgColor = 'red' onPress = {this.checkUpdate}/>
                <Button text = '取消' bgColor = 'green' onPress = { () => {alert(1)}}/>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        //flexDirection : 'row',// Try setting `flexDirection` to `row`.
        justifyContent: 'center',// Try setting `flexDirection` to `space-between`.
        alignItems: 'center',
        backgroundColor: 'white'
    },
    title: {
        fontSize: 20,
        marginBottom: 8,
        textAlign: 'center'
    },
    text:{
        paddingTop : 20,
    },
    instructions: {
        textAlign: 'center',
        color: '#333333',
        marginBottom: 5,
    },
});

AppRegistry.registerComponent('ReactNativeTestDemo', () => ReactNativeTestDemo);