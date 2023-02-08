class ProgressBar {
  #progressBarDiv;
  #progressBarFill;
  #percentage;

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

  getProgressBarElement() {
    return this.#progressBarDiv;
  }

  setProgress(percentage) {
    console.log('update progress bar');
    this.#percentage = percentage;
    this.#progressBarFill.style.width = `${this.#percentage}%`;
  }

  getProgress(percentage) {
    return `${this.#percentage}%`;
  }

  setDivBarColor(color) {
    this.#progressBarDiv.style.backgroundColor = color;
  }

  setFillBarColor(color) {
    this.#progressBarFill.style.backgroundColor = color;
  }
}

export { ProgressBar };
