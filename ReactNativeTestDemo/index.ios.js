/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import React, { Component ,PropTypes} from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  Image,
  View,
  TextInput,
  ScrollView,
  ListView,
  Navigator,
  TouchableHighlight,
  TouchableOpacity
} from 'react-native';

 /**
   * 为了避免骚扰，我们用了一个样例数据来替代Rotten Tomatoes的API
   * 请求，这个样例数据放在React Native的Github库中。
   */
var REQUEST_URL = 'https://raw.githubusercontent.com/facebook/react-native/master/docs/MoviesExample.json';

class ReactNativeTestDemo extends Component {
 
///////////////////////////////////4
  //   constructor(props) {
  //   super(props);
  //   const ds = new ListView.DataSource({rowHasChanged: (r1, r2) => r1 !== r2});
  //   this.state = {
  //     dataSource: ds.cloneWithRows([
  //       'John', 'Joel', 'James', 'Jimmy', 'Jackson', 'Jillian', 'Julie', 'Devin'
  //     ])
  //   };
  // }

 
  constructor(props) {
    super(props);   //这一句不能省略，照抄即可
    // this.state = {
    //   movies: null,  //这里放你自己定义的state变量及初始值
    // };
    this.state = {
      dataSource: new ListView.DataSource({
        rowHasChanged: (row1, row2) => row1 !== row2,
      }),
      loaded: false,
    };
    // 在ES6中，如果在自定义的函数里使用了this关键字，则需要对其进行“绑定”操作，否则this的指向不对
    // 像下面这行代码一样，在constructor中使用bind是其中一种做法（还有一些其他做法，如使用箭头函数等）
    this.fetchData = this.fetchData.bind(this); 
  }
 
 // 现在我们来为组件添加fetchData函数。
 // 你所需要做的就是在Promise调用链结束后执行this.setState({movies:data})。
 // 在React的工作机制下，setState实际上会触发一次重新渲染的流程，此时render函数被触发，
 // 发现this.state.movies不再是null。注意我们在Promise调用链的最后调用了done()
 //  —— 这样可以抛出异常而不是简单忽略。
  fetchData() {
    fetch(REQUEST_URL)
      .then((response) => response.json())
      .then((responseData) => {
        // 注意，这里使用了this关键字，为了保证this在调用时仍然指向当前组件，我们需要对其进行“绑定”操作
        this.setState({
          // movies: responseData.movies,
          dataSource: this.state.dataSource.cloneWithRows(responseData.movies),
          loaded: true,
        });
      })
      .done();
  }
  
  // 相当于viewDidLoad
  componentDidMount() {
    this.fetchData();
  }

  /*  
  不理解：
  －－－－－－－－－－－－－－－－－－－－－－－－－－－－－－－
  这里getInitialState()没有任何地方调用，却可以使用里面的属性
  貌似这是用来储存变量值
  */
  getInitialState() {
    return { myButtonOpacity: 1, }
  }

 render() {

    if (!this.state.loaded) {
      return this.renderLoadingView();
    }

    // var movie = this.state.movies[0];
    // // console.log('-----' + movie);
    // return this.renderMovie(movie);
    // console.log(this.state.dataSource);
    return (
      /*
      无障碍功能
      */
      <TouchableOpacity accessible={true} 
                        accessibilityLabel={'Tap me!'} 
                        onPress={ () => this.setState({myButtonOpacity : 0.5})}
                        onPressOut={ () => this.setState({myButtonOpacity : 1})}>
        <View style={[styles.button,{opacity : this.state.myButtonOpacity}]}>
           <Text style={styles.buttonText}>Press me!</Text>
           <Text style={styles.buttonText}>done me!</Text>
        </View>
      </TouchableOpacity>

      /* 
      表格
      <ListView 
           dataSource = {this.state.dataSource}
           renderRow = {this.renderMovie}
           style = {styles.listView}
      />   */
    );
  }


  renderLoadingView() {
    return (
      <View style={styles.container}>
        <Text>
          正在加载电影数据…
        </Text>
      </View>
    );
  }

  renderMovie(movie) {
    return (
      <View style={styles.container}>

        <Image
          source={{uri: movie.posters.thumbnail}}
          // 引用Xcode中asset类目中的图片
          // source={{uri: 'ios58'}}
          // 引用文件夹中的静态图片
          // source={require('./img/favicon.png')} 
          style={styles.thumbnail}>
          <Text>Inside</Text>
        </Image>
       
     
        <View style={styles.rightContainer}>
          <Text style={styles.title}>{movie.title}</Text>
          <Text style={styles.year}>{movie.year}</Text>
        </View>
      </View>
    );
  }

  // render() {


  // 定义数组
  // var MOCKED_MOVIES_DATA = [
  //    {title: '标题1', year: '2015', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
  //    {title: '标题2', year: '2016', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}},
  //    {title: '标题3', year: '2017', posters: {thumbnail: 'http://i.imgur.com/UePbdph.jpg'}}
  // ];

  // var movie = MOCKED_MOVIES_DATA[1];

  // return(

      // <View style={styles.container}>
      //   <View style = {styles.rightContainer}>
      //     <Text style = {styles.title } >{movie.title}</Text>
      //     <Text style = {styles.year }>{movie.year}</Text>
      //   </View>
      // </View>

      // <Navigator
      //   initialRoute={{ title: 'My Initial Scene', index: 0 }}
      //   renderScene={(route, navigator) =>
      //     <MyScene
      //       title={route.title}

      //       // Function to call when a new scene should be displayed           
      //       onForward={ () => {    
      //         const nextIndex = route.index + 1;
      //         navigator.push({
      //           title: 'Scene ' + nextIndex,
      //           index: nextIndex,
      //         });
      //       }}

      //       // Function to call to go back to the previous scene
      //       onBack={() => {
      //         if (route.index > 0) {
      //           navigator.pop();
      //         }
      //       }}
      //     />
      //   }
      // />

///////////////////////////////////////4
 // <View style={{paddingTop: 22}}>
 //        <ListView
 //          dataSource={this.state.dataSource}
 //          renderRow={(rowData) => <Text>{rowData}</Text>}
 //        />
 //      </View>

    /////////////////////////////////3
        // <ScrollView>
        //   <Text style={{fontSize:96}}>Scroll me plz</Text>
        //   <Image source={require('./img/favicon.png')} />
        //   <Text style={{fontSize:96}}>If you like</Text>
        //   <Image source={require('./img/favicon.png')} />
        //   <Text style={{fontSize:96}}>Scrolling down</Text>
        //   <Image source={require('./img/favicon.png')} />
        //   <Text style={{fontSize:96}}>What's the best</Text>
        //   <Image source={require('./img/favicon.png')} />
        //   <Text style={{fontSize:96}}>Framework around?</Text>
        //   <Image source={require('./img/favicon.png')} />
        //   <Text style={{fontSize:80}}>React Native</Text>
        // </ScrollView>
 

///////////////////////////////////////2
   // return (
   //    <View style={{padding: 10}}>

   //      <TextInput
   //        style={{height: 40}}
   //        placeholder="Type here to translate!"
   //        onChangeText={(text) => this.setState({text})}
   //      />

   //      <Text style={{padding: 10, fontSize: 42}}>
   //        {this.state.text.split(' ').map((word) => word && '🍕').join(' ')}
   //      </Text>
   //    </View>
   //  );



   /////////////////////////////////////////////////////////1

    // // 设置图片链接
    // let pic = {
    //   uri: 'https://upload.wikimedia.org/wikipedia/commons/d/de/Bananavarieties.jpg'
    // };

    // // 主体开发内容
    // return (
    //   <View style={styles.container}>
    //     <Image source={pic} style={styles.image}/>

    //     <Greeting name = 'lyon' age = '23'/>

    //     <Blink text='I love to blink' />
    //     <Blink text='Yes blinking is so great' />
    //     <Blink text='Why did they ever take this out of HTML' />
    //     <Blink text='Look at me look at me look at me' />

    //   </View>

     // );
  // }
}


class MyScene extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    onForward: PropTypes.func.isRequired,
    onBack: PropTypes.func.isRequired,
  }
  render() {
    return (
      <View>
        <Text>Current Scene: { this.props.title }</Text>
        <TouchableHighlight onPress={this.props.onForward}>
          <Text>Tap me to load the next scene</Text>
        </TouchableHighlight>
        <TouchableHighlight onPress={this.props.onBack}>
          <Text>Tap me to go back</Text>
        </TouchableHighlight>
      </View>
    )
  }
}



// 文字闪烁
class Blink extends Component {
  constructor(props) {
    super(props);
    this.state = {showText: true};

    // Toggle the state every second
    setInterval(() => {
      this.setState({ showText: !this.state.showText });
    }, 3000);
  }

  render() {
    let display = this.state.showText ? this.props.text : ' ';
    return (
      <Text>{display}</Text>
    );
  }
}





// 道具props
class Greeting extends Component {
  render() {
    return (
      <Text>Hello {this.props.name} I am{this.props.age}!</Text>
    );
  }
}

// css样式
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection : 'row',// Try setting `flexDirection` to `row`.
    justifyContent: 'center',// Try setting `flexDirection` to `space-between`.
    alignItems: 'center',
    backgroundColor: 'white',
  },
  rightContainer: {
    flex: 1,
  },
  title: {
    fontSize: 20,
    marginBottom: 8,
    textAlign: 'center',
  },
  year: {
    textAlign: 'center',
  },
  welcome: {
    fontSize: 0,
    textAlign: 'center',
    margin: 10,
  },
  instructions: {
    textAlign: 'center',
    color: '#333333',
    marginBottom: 5,
  },
  thumbnail:{
    width: 53, 
    height: 81,
    margin: 10,
  },
  listView : {
    paddingTop : 20,
    backgroundColor : '#f5fcff',
  },
  button :{
    backgroundColor : 'red',
  },
  buttonText : {
    flex : 1,
    paddingTop : 50,
    textAlign : 'center',
  }
});

AppRegistry.registerComponent('ReactNativeTestDemo', () => ReactNativeTestDemo);
