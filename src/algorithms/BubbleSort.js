/*
  Bubble Sort
  for (var i = 1; i < values.length; i++) {
    for (var j = 0; j < values.length - i; j++) {
      if (values[j] > values[j+1]) {
        var temp = values[j];
        values[j] = values[j+1];
        values[j+1] = temp;
      }
    }
  }
*/

export default class BubbleSort {
  values;
  lastI = 1;
  lastJ = 0;
  completed = false;

  constructor(values) {
    this.values = values;
  }

  next() {
    this.lastJ++;
    if (this.lastJ > this.values.length - this.lastI) {
      this.lastI++;
      this.lastJ = 0;
    }
    if (this.lastI >= this.values.length) {
      this.completed = true;
      return false;
    }

    if (this.values[this.lastJ] > this.values[this.lastJ + 1]) {
      var temp = this.values[this.lastJ];
      this.values[this.lastJ] = this.values[this.lastJ + 1];
      this.values[this.lastJ + 1] = temp;
      return true;
    }
    return false;
  }

  isCompleted() {
    return this.completed;
  }

  getData() {
    return [...this.values];
  }
}