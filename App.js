import React from 'react';
import {StyleSheet, Text, View, Button, Slider} from 'react-native';
import {VictoryBar} from 'victory-native';
import BubbleSort from './src/algorithms/BubbleSort';
import QuickSort from './src/algorithms/QuickSort';
import MergeSort from './src/algorithms/MergeSort';
import ShellSort from './src/algorithms/ShellSort';

// 0: slowest, 500: fastest
const DEFAULT_SORT_SPEED = 24.7;
const MAX_SPEED = 50;
const MIN_SPEED = 1;
const NUMBERS_AMOUNT = 100;

export default class App extends React.Component {
  sortAlgorithm;
  intervalId;

  state = {
    data: [10, 15, 230, 50],
    speed: DEFAULT_SORT_SPEED,
  };

  componentDidMount() {
    this.resetTimer();
    this.setBubbleSort();
  }

  resetTimer() {
    if (this.intervalId)
      clearInterval(this.intervalId);
    this.intervalId = setInterval(() => {
      if (!this.sortAlgorithm)
        return;
      while (!this.sortAlgorithm.isCompleted() && !this.sortAlgorithm.next()) {

      }
      this.setState(() => {
        return {
          data: this.sortAlgorithm.getData(),
        };
      });
    }, MAX_SPEED - this.state.speed);
  }

  generateRandomValues(amount) {
    values = [];
    for (var i = 0; i < amount; i++)
      values[i] = parseInt(Math.random() * 100);
    return values;
  }

  setBubbleSort() {
    this.sortAlgorithm = new BubbleSort(this.generateRandomValues(NUMBERS_AMOUNT));
    this.setState(() => {
      return {
        data: this.sortAlgorithm.getData(),
      };
    });
  }

  setQuickSort() {
    this.sortAlgorithm = new QuickSort(this.generateRandomValues(NUMBERS_AMOUNT));
    this.setState(() => {
      return {
        data: this.sortAlgorithm.getData(),
      };
    });
  }

  setMergeSort() {
    this.sortAlgorithm = new MergeSort(this.generateRandomValues(NUMBERS_AMOUNT));
    this.setState(() => {
      return {
        data: this.sortAlgorithm.getData(),
      };
    });
  }

  setShellSort() {
    this.sortAlgorithm = new ShellSort(this.generateRandomValues(NUMBERS_AMOUNT));
    this.setState(() => {
      return {
        data: this.sortAlgorithm.getData(),
      };
    });
  }

  render() {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Algoritmos de Ordenação</Text>
        <VictoryBar data={this.state.data} style={{data: {fill: '#1976D2'}}} />
        <Text style={styles.text}>
          Speed:{' '}
          {Math.floor((this.state.speed * 100) / (MAX_SPEED - MIN_SPEED))}%
        </Text>
        <Slider
          maximumTrackTintColor='white'
          minimumTrackTintColor='#1976D2'
          style={{width: 300}}
          step={2}
          minimumValue={0}
          value={this.state.speed}
          maximumValue={MAX_SPEED - MIN_SPEED}
          onValueChange={val => {
            this.setState({speed: val});
            this.resetTimer();
          }}
        />
        <Button
          color="#BBDEFB"
          title="bubble sort"
          onPress={this.setBubbleSort.bind(this)}
        />
        <Button
          color="#BBDEFB"
          title="merge sort"
          onPress={this.setMergeSort.bind(this)}
        />
        <Button
          color="#536DFE"
          title="quick sort"
          onPress={this.setQuickSort.bind(this)}
        />
        <Button
          color="#536DFE"
          title="shell sort"
          onPress={this.setShellSort.bind(this)}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    backgroundColor: '#212121',
    paddingTop: 50,
  },
  title: {
    color: 'white',
    fontSize: 20,
    fontWeight: '900',
  },
  text: {
    color: 'white',
  }
});