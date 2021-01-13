import { StatusBar } from 'expo-status-bar';
import React, { useState, Component, PureComponent } from 'react';
import { StyleSheet, Text, View, Button } from 'react-native';

function Comp({ body }) {
  // props.body
  // const [counter, setCounter] = useState(0)
  // const [counter, setCounter] = useState('yellow')
  // setCounter((prevCounter) => prevCounter+1)
}

class ClassComponentExample extends Component {
  state = {
    counter: this.props.initialCounter,
    backgroundColor: 'yellow',
  };

  constructor(props) {
    super(props);
    this.state = {
      counter: props.initialCounter,
      backgroundColor: 'yellow',
    };
    this.handlePress = this.handlePress.bind(this);
  }

  // only has access to 'this' (and in turn state and props if bind in constructor)
  handlePress() {
    console.log('button was pressed');
    console.log('this: ', this);
    console.log('counter: ', this.state.counter);
    this.setState({ backgroundColor: 'orange' });
  }

  // has access to 'this' if arrow function so don't need to do any binding in constructor
  handleArrowPress = () => {
    //change background color
    this.setState({ backgroundColor: 'orange' });
  };

  render() {
    const { body } = this.props;
    const { counter, backgroundColor } = this.state;

    return (
      <View
        style={{
          ...styles.container,
          backgroundColor: backgroundColor,
        }}
      >
        <Text>Hello World</Text>
        <Text>The body says: {body}</Text>
        <Text>The body says: {this.props.body}</Text>
        <Text>The counter value is {counter}</Text>
        <Button
          title="Increment Counter"
          onPress={() => {
            //increment counter here
            // this.setState({ counter: counter + 1 });
            this.setState(
              (prevState) => ({ counter: prevState.counter + 1 }),
              () => {
                console.log('counter was updated to: ', counter);
              }
            );
          }}
        />
        <Button
          title="Change background"
          onPress={this.handleArrowPress}
          // onPress={this.handlePress}
        />
      </View>
    );
  }
}

class LifecycleExample extends Component {
  constructor(props) {
    super(props);

    this.state = {
      counter: 0,
      shouldDisplay: true,
    };
    console.log('constructor was called');
  }

  componentDidMount() {
    // fetchFeed();
    // this.setState()
    // console.log('component did mount');
  }

  static getDerivedStateFromProps(props, state) {
    // console.log('get derived state from props');
    // return { textInput: props.textInput }
    return null;
  }

  shouldComponentUpdate(nextProps, nextState) {
    // console.log('state: ', nextState);
    return true;
    // return nextState.counter !== this.state.counter;
  }

  getSnapshotBeforeUpdate(props, state) {
    console.log('get snapshot');
    return 'Hello from snapshot';
  }

  componentDidUpdate(props, state) {
    // console.log('component did update');
    // console.log('snapshot: ', snapshot);
    // if (specificCondition) {
    //   this.setState({ counter: this.counter + 1 });
    // }
  }

  render() {
    console.log('render was called');
    return (
      <View style={styles.container}>
        <Text>Counter: {this.state.counter}</Text>
        <Button
          title="Increment Counter"
          onPress={() => {
            //increment counter here
            // this.setState({ counter: counter + 1 });
            this.setState((prevState) => ({ counter: 1 }));
          }}
        />
        {this.state.shouldDisplay && <ChildComponent />}
        <Button
          title="Toggle child"
          onPress={() =>
            this.setState({ shouldDisplay: !this.state.shouldDisplay })
          }
        />
        <PureComponentExample counter={this.state.counter} />
      </View>
    );
  }
}

class ChildComponent extends Component {
  componentDidMount() {
    console.log('component did mount');
  }

  componentWillUnmount() {
    console.log('component will unmount. goodbye world');
  }

  render() {
    return <Text>Hello</Text>;
  }
}

class PureComponentExample extends PureComponent {
  render() {
    console.log('rendering pure component');
    return <Text>The counter is: {this.props.counter}</Text>;
  }
}

export default function App() {
  // return <ClassComponentExample body="I am the body" initialCounter={10} />;
  return <LifecycleExample />;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
