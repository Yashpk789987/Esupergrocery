import React from 'react';
import {ActivityIndicator, BackHandler, Alert} from 'react-native';
import WebView from 'react-native-webview';

function ActivityIndicatorLoadingView() {
  return (
    <ActivityIndicator
      color="#87CEEB"
      size={70}
      style={{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '50%',
      }}
    />
  );
}

class App extends React.Component {
  state = {
    url: `http://esupergrocery.com/`,
    ref: null,
    isTimerRunning: false,
  };

  componentDidMount() {
    BackHandler.addEventListener('hardwareBackPress', this.backHandler);
  }

  timer = {
    ref: null,
  };

  componentWillUnmount() {
    clearTimeout(this.timer);
    BackHandler.removeEventListener('hardwareBackPress', this.backHandler);
  }

  backHandler = () => {
    if (this.state.isTimerRunning) {
      Alert.alert(
        'Exit App',
        'Do You Want To Exit App ??',
        [
          {
            text: 'No',
            onPress: () => console.log('No Pressed'),
            style: 'cancel',
          },
          {text: 'Yes', onPress: () => BackHandler.exitApp()},
        ],
        {cancelable: false},
      );
    }
    if (!this.state.isTimerRunning) {
      this.setState({isTimerRunning: true});
      this.timer.ref = setTimeout(() => {
        this.setState({isTimerRunning: false});
      }, 1000);
    }

    this.WEBVIEW_REF.goBack();
    return true;
  };

  render() {
    return (
      <WebView
        ref={ref => (this.WEBVIEW_REF = ref)}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        onShouldStartLoadWithRequest={this.handleLinks}
        renderLoading={() => ActivityIndicatorLoadingView()}
        startInLoadingState={true}
        sharedCookiesEnabled={true}
        thirdPartyCookiesEnabled={true}
        source={{uri: this.state.url}}
      />
    );
  }
}

export default App;
