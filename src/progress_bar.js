class ProgressBar {
  #progressBarDiv;
  #progressBarFill;

  constructor() {
    this.#createElement();
  }

  #createElement() {
    this.#progressBarDiv = document.createElement('div');
    this.#progressBarDiv.className = 'progress-bar';
    this.#progressBarFill = document.createElement('div');
    this.#progressBarFill.className = 'progress-bar__fill';
    this.#progressBarDiv.appendChild(this.#progressBarFill);
  }

  getElement() {
    return this.#progressBarDiv;
  }

  getPercentage() {
    return +this.#progressBarFill.style.width.slice(0, -1);
  }

  setProgress(percentage) {
    if (percentage < 0 || percentage > 100) {
      throw new Error(
        `Invalid parameter. Percentage must be a number between 0 and 100`
      );
    }
    this.#progressBarFill.style.width = `${percentage}%`;
  }

  setBackgroundColor(color) {
    this.#progressBarDiv.style.backgroundColor = color;
  }

  setFillBarColor(color) {
    this.#progressBarFill.style.backgroundColor = color;
  }
}

export { ProgressBar };
