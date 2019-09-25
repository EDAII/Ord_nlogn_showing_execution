import React from 'react';
import {StyleSheet, Text, View, Button, Slider} from 'react-native';
import {VictoryBar} from 'victory-native';
import BubbleSort from './src/algorithms/BubbleSort';
import QuickSort from './src/algorithms/QuickSort';
import MergeSort from './src/algorithms/MergeSort';
import ShellSort from './src/algorithms/ShellSort';

// 0: slowest, 500: fastest
const DEFAULT_SORT_SPEED = 5;
const MAX_SPEED = 100;
const MIN_SPEED = 0.000000001;

export default class App extends React.Component {
  sortAlgorithm;
  intervalId;

  state = {
    data: [10, 15, 230, 50],
    speed: DEFAULT_SORT_SPEED,
    color: '#FFA000',
    qtd: 50,
  };

  componentDidMount() {
    this.resetTimer();
    this.setBubbleSort();
  }

  resetTimer() {
    if (this.intervalId) {
      clearInterval(this.intervalId);
    }
    this.intervalId = setInterval(() => {
      if (!this.sortAlgorithm) {
        return;
      }
      while (!this.sortAlgorithm.isCompleted() && !this.sortAlgorithm.next()) {}
      this.setState(() => {
        return {
          data: this.sortAlgorithm.getData(),
        };
      });
    }, MAX_SPEED - this.state.speed);
  }

  generateRandomValues(amount) {
    let values = [];
    for (var i = 0; i < amount; i++) {
      values[i] = parseInt(Math.random() * this.state.qtd + 1);
    }
    return values;
  }

  setBubbleSort() {
    this.sortAlgorithm = new BubbleSort(
      this.generateRandomValues(this.state.qtd),
    );
    this.setState(() => {
      return {
        data: this.sortAlgorithm.getData(),
        color: '#FFA000',
      };
    });
  }

  setQuickSort() {
    this.sortAlgorithm = new QuickSort(
      this.generateRandomValues(this.state.qtd),
    );
    this.setState(() => {
      return {
        data: this.sortAlgorithm.getData(),
        color: '#FF5722',
      };
    });
  }

  setMergeSort() {
    this.sortAlgorithm = new MergeSort(
      this.generateRandomValues(this.state.qtd),
    );
    this.setState(() => {
      return {
        data: this.sortAlgorithm.getData(),
        color: '#FF5722',
      };
    });
  }

  setShellSort() {
    this.sortAlgorithm = new ShellSort(
      this.generateRandomValues(this.state.qtd),
    );
    this.setState(() => {
      return {
        data: this.sortAlgorithm.getData(),
        color: '#FF5722',
      };
    });
  }

  render() {
    const {data, color, speed, qtd} = this.state;
    return (
      <View style={styles.container}>
        <Text style={styles.title}>Algoritmos de Ordenação</Text>
        <VictoryBar data={data} style={{data: {fill: color}}} />
        <Text style={styles.text}>Quantidade: {qtd}</Text>
        <Slider
          maximumTrackTintColor="white"
          minimumTrackTintColor="#FFA000"
          style={{width: 300}}
          step={1}
          minimumValue={10}
          value={qtd}
          maximumValue={300}
          onValueChange={val => {
            this.setState({qtd: val});
          }}
        />
        <Text style={styles.text}>
          Velocidade: {Math.floor((speed * 100) / (MAX_SPEED - MIN_SPEED))}%
        </Text>
        <Slider
          maximumTrackTintColor="white"
          minimumTrackTintColor="#FFA000"
          style={{width: 300}}
          step={0.00000001}
          minimumValue={0}
          value={speed}
          maximumValue={MAX_SPEED - MIN_SPEED}
          onValueChange={val => {
            this.setState({speed: val});
            this.resetTimer();
          }}
        />
        <Button
          color="#FFA000"
          title="bubble sort"
          onPress={this.setBubbleSort.bind(this)}
        />
        <Button
          color="#FF5722"
          title="merge sort"
          onPress={this.setMergeSort.bind(this)}
        />
        <Button
          color="#FF5722"
          title="quick sort"
          onPress={this.setQuickSort.bind(this)}
        />
        <Button
          color="#FF5722"
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
  },
});
