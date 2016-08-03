/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
'use strict';

import React, { Component ,PropTypes} from 'react';
import {
    StyleSheet,
    Text,
    View,
    TouchableOpacity
} from 'react-native';


export default class Button extends Component {
    constructor(props){
        super(props);
        // 初始状态
        this.state = {
            disabled: false
        };
    }

    enable = () =>{
        this.setState({
           disabled:false
        });
    }
    disable = () =>{
        this.setState({
            disabled:true
        });
    }

    customButtonOnPress = () => {
        // 自定义方法,大家请使用属性来定义
        const { onPress } = this.props;
        this.disable();
        onPress(this.enable);
    };
    render() {
        // 解构
        const { text , bgColor } = this.props;
        return (
            <View style={styles.container}>
                <TouchableOpacity
                    disabled = {this.setState.disabled}
                    style = {[styles.button,{backgroundColor : bgColor},this.state.disabled && styles.disable]}
                    onPress = {this.customButtonOnPress}>
                    <Text style={styles.buttonText}>{text}</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection : 'row',// Try setting `flexDirection` to `row`.
        justifyContent: 'center',// Try setting `flexDirection` to `space-between`.
        alignItems: 'center',
        backgroundColor: 'white'
    },
    button :{
        backgroundColor : 'red',
        width : 120,
        height : 40,
        borderRadius : 20,
        justifyContent: 'center',
        overflow : 'hidden'
    },
    buttonText : {
        justifyContent: 'center',// Try setting `flexDirection` to `space-between`.
        textAlign : 'center',
        color : 'white'
    },
    disable:{
        backgroundColor : 'gray'
    }
});
