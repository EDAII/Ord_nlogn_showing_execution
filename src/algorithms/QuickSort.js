/*
  Quick Sort
  sort(values, 0, values.length - 1);
  sort(values, min, max) {
    var mid = Math.floor(min + ((max - min) / 2));
    var pivot = values[mid];
    var i = min;
    var j = max;
    while (i <= j) {
      while (values[i] < pivot)
        i++;
      while (values[j] < pivot)
        j++;
      if (i <= j) {
        var temp = values[i];
        values[i] = values[j];
        values[j] = temp;
        i++;
        j--;
      }
    }
    if (min < i - 1)
      sort(values, min, i - 1)
    if (max > i)
      sort(values, i, max);
  }
*/

class StepQuickSort {
  min = 0;
  max;
  i;
  j;
  pivot;
  values;
  completed = false;
  subSorting = [];

  constructor(values, min, max) {
    this.values = values;
    this.min = min;
    this.max = max;
    var mid = Math.floor(this.min + ((this.max - this.min) / 2));
    this.pivot = this.values[mid];
    this.i = this.min;
    this.j = this.max;
    //this.print();
  }

  print() {
    console.log('min: ' + this.min);
    console.log('max: ' + this.max);
    console.log('mid: ' + this.mid);
    var str = '';
    for (var i = 0; i < this.values.length; i++)
      str += this.values[i] + ', ';
    console.log(str);
    console.log('pivot is: ' + this.pivot);
  }

  next() {
    if (this.completed)
      return;
    if (this.i <= this.j) {
      while (this.values[this.i] < this.pivot)
        this.i++;
      while (this.values[this.j] > this.pivot)
        this.j--;
      if (this.i <= this.j) {
        //console.log('switch ' + this.values[this.i] + ' by ' + this.values[this.j]);
        var temp = this.values[this.i];
        this.values[this.i] = this.values[this.j];
        this.values[this.j] = temp;
        this.i++;
        this.j--;
      }
    }
    else {
      if (this.min < this.i - 1)
        this.subSorting.push(new StepQuickSort(this.values, this.min, this.i - 1));
      if (this.i < this.max)
        this.subSorting.push(new StepQuickSort(this.values, this.i, this.max));
      this.completed = true;
    }
  }

  isCompleted() {
    return this.completed;
  }

  getSubSorting() {
    return [...this.subSorting];
  }
}

export default class QuickSort {
  values;
  steps = [];
  completed = false;

  constructor(values) {
    this.values = values;
    this.steps.push(new StepQuickSort(values, 0, values.length - 1));
  }

  next() {
    if (this.steps.length > 0) {
      var sort = this.steps[0];
      sort.next();
      if (sort.isCompleted()) {
        this.steps.splice(0, 1);
        this.steps = [...this.steps, ...sort.getSubSorting()];
      }
    }
    else {
      completed = true;
    }
    return true;
  }

  isCompleted() {
    return this.completed;
  }

  getData() {
    return [...this.values];
  }
}