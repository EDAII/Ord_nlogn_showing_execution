// Implementation of shell sort
export default class ShellSort {
  values;
  completed = false;
  increment;
  step;

  // Build the list
  constructor(values) {
    this.values = values;
    //Define the gap
    this.increment = parseInt(values.length/2)
    this.step = this.increment;
  }

  next() {
    if (this.increment > 0) {
      let j = this.step;
      let temp = this.values[this.step];

      while (j >= this.increment && this.values[j - this.increment] > temp) {
        this.values[j] = this.values[j - this.increment];
        j = j - this.increment;
      }
      this.values[j] = temp;
      this.step++;
      if (this.step === this.values.length) {
        this.increment = parseInt(this.increment / 2);
        this.step = this.increment;
      }
      return true;
    } else {
      this.completed = true;
      return false;
    }
  }
  isCompleted() {
    return this.completed;
  }

  getData() {
    return [...this.values];
  }
}