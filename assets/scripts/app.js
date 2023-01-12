/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./src/app.js":
/*!********************!*\
  !*** ./src/app.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony import */ var _timer_ui_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer_ui.js */ \"./src/timer_ui.js\");\n\n\nconst main = document.getElementById('main');\n\nlet pomodoro = new _timer_ui_js__WEBPACK_IMPORTED_MODULE_0__.uiTimer(main, 'red');\npomodoro.render();\n\n\n//# sourceURL=webpack://timer-productivity/./src/app.js?");

/***/ }),

/***/ "./src/timer.js":
/*!**********************!*\
  !*** ./src/timer.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"TIMER_COUNTDOWN\": () => (/* binding */ TIMER_COUNTDOWN),\n/* harmony export */   \"TIMER_COUNTUP\": () => (/* binding */ TIMER_COUNTUP),\n/* harmony export */   \"Timer\": () => (/* binding */ Timer)\n/* harmony export */ });\nconst TIMER_COUNTDOWN = 0;\nconst TIMER_COUNTUP = 1;\n\nclass Timer {\n  constructor(min, sec, type = TIMER_COUNTDOWN) {\n    this.minutes = Number(min);\n    this.seconds = Number(sec);\n    this.timerTotal = this.minutes * 60 + this.seconds;\n    this.timerId;\n    this.type = type;\n    this.setUiTime();\n  }\n\n  start() {\n    this.timerId = setInterval(() => {\n      this.type == TIMER_COUNTDOWN ? this.countDown() : this.countUp();\n      console.log('callback', this.uiTime);\n    }, 1000);\n    console.log('start');\n  }\n\n  pause() {\n    console.log('pause');\n    clearInterval(this.timerId);\n  }\n\n  countUp() {\n    console.log('not implemented');\n  }\n\n  countDown() {\n    this.timerTotal--;\n    if (this.timerTotal <= 0) {\n      this.pause();\n    }\n\n    this.minutes = parseInt(this.timerTotal / 60);\n    this.seconds = parseInt(this.timerTotal % 60);\n\n    this.setUiTime();\n  }\n\n  getUiTime() {\n    return this.uiTime;\n  }\n\n  setUiTime() {\n    this.minutes = this.minutes < 10 ? '0' + this.minutes : this.minutes;\n    this.seconds = this.seconds < 10 ? '0' + this.seconds : this.seconds;\n\n    this.uiTime = `${this.minutes}:${this.seconds}`;\n  }\n}\n\n\n\n\n//# sourceURL=webpack://timer-productivity/./src/timer.js?");

/***/ }),

/***/ "./src/timer_ui.js":
/*!*************************!*\
  !*** ./src/timer_ui.js ***!
  \*************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"uiTimer\": () => (/* binding */ uiTimer)\n/* harmony export */ });\n/* harmony import */ var _timer_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./timer.js */ \"./src/timer.js\");\n\n\nclass uiTimer {\n  constructor(main, color) {\n    this.main = main;\n    this.color = color;\n    this.sectionTimerEl;\n    this.timerTypesEl;\n    this.timerTextEl;\n    this.btnFocusTimer;\n    this.btnShortBreak;\n    this.btnLongBreak;\n    this.start_pauseBtn;\n    this.timeFocus = new _timer_js__WEBPACK_IMPORTED_MODULE_0__.Timer(25, 0, _timer_js__WEBPACK_IMPORTED_MODULE_0__.TIMER_COUNTDOWN);\n    this.timeShortBreak = new _timer_js__WEBPACK_IMPORTED_MODULE_0__.Timer(5, 0, _timer_js__WEBPACK_IMPORTED_MODULE_0__.TIMER_COUNTDOWN);\n    this.timeLongBreak = new _timer_js__WEBPACK_IMPORTED_MODULE_0__.Timer(10, 0, _timer_js__WEBPACK_IMPORTED_MODULE_0__.TIMER_COUNTDOWN);\n    this.currentTime = this.timeFocus;\n    this.createTimerElements();\n  }\n\n  render() {\n    this.timerTypesEl.appendChild(this.btnFocusTimer);\n    this.timerTypesEl.appendChild(this.btnShortBreak);\n    this.timerTypesEl.appendChild(this.btnLongBreak);\n\n    this.main.append(this.sectionTimerEl);\n    this.sectionTimerEl.append(this.timerTypesEl);\n    this.sectionTimerEl.append(this.timerTextEl);\n    this.sectionTimerEl.append(this.start_pauseBtn);\n\n    this.btnFocusTimer.addEventListener(\n      'click',\n      this.changeTargetColor.bind(this, 'red')\n    );\n    this.btnFocusTimer.addEventListener(\n      'mouseover',\n      this.mouseHoverColor.bind(this)\n    );\n    this.btnFocusTimer.addEventListener(\n      'mouseleave',\n      this.mouseLeaveColor.bind(this)\n    );\n    this.btnFocusTimer.addEventListener(\n      'click',\n      this.changeTargetTimer.bind(this)\n    );\n\n    this.btnShortBreak.addEventListener(\n      'click',\n      this.changeTargetColor.bind(this, 'teal')\n    );\n    this.btnShortBreak.addEventListener(\n      'mouseover',\n      this.mouseHoverColor.bind(this)\n    );\n    this.btnShortBreak.addEventListener(\n      'mouseleave',\n      this.mouseLeaveColor.bind(this)\n    );\n    this.btnShortBreak.addEventListener(\n      'click',\n      this.changeTargetTimer.bind(this)\n    );\n\n    this.btnLongBreak.addEventListener(\n      'click',\n      this.changeTargetColor.bind(this, 'indigo')\n    );\n    this.btnLongBreak.addEventListener(\n      'mouseover',\n      this.mouseHoverColor.bind(this)\n    );\n    this.btnLongBreak.addEventListener(\n      'mouseleave',\n      this.mouseLeaveColor.bind(this)\n    );\n    this.btnLongBreak.addEventListener(\n      'click',\n      this.changeTargetTimer.bind(this)\n    );\n\n    this.boundFnToStartTimer = this.btnStartTimer.bind(this);\n    this.start_pauseBtn.addEventListener('click', this.boundFnToStartTimer);\n\n    this.changeUiColor();\n    this.renderTimer();\n  }\n\n  createTimerElements() {\n    this.sectionTimerEl = document.createElement('section');\n\n    this.timerTypesEl = document.createElement('div');\n    this.timerTypesEl.className = 'timer-type';\n\n    this.btnFocusTimer = document.createElement('h2');\n    this.btnFocusTimer.id = 'focus-timer';\n    this.btnFocusTimer.textContent = 'Focus Time';\n\n    this.btnShortBreak = document.createElement('h2');\n    this.btnShortBreak.id = 'short-break';\n    this.btnShortBreak.textContent = 'Short Break';\n\n    this.btnLongBreak = document.createElement('h2');\n    this.btnLongBreak.id = 'long-break';\n    this.btnLongBreak.textContent = 'Long Break';\n\n    this.timerTextEl = document.createElement('p');\n    this.timerTextEl.className = 'countdown';\n\n    this.start_pauseBtn = document.createElement('button');\n    this.start_pauseBtn.className = 'btn';\n    this.start_pauseBtn.id = 'btn-start';\n    this.start_pauseBtn.textContent = 'Start';\n  }\n\n  renderTimer() {\n    console.log(this.currentTime);\n    this.timerTextEl.textContent = this.currentTime.getUiTime();\n  }\n\n  changeUiColor() {\n    this.main.style.backgroundColor = `var(--${this.color}-light)`;\n    this.sectionTimerEl.style.backgroundColor = `var(--${this.color}-accent-light)`;\n    this.start_pauseBtn.style.backgroundColor = `var(--${this.color}-accent)`;\n  }\n\n  changeTargetColor(color, event) {\n    this.color = color;\n    event.target.style.backgroundColor = `var(--${color}-accent)`;\n    console.log(event);\n    this.changeUiColor();\n  }\n\n  mouseHoverColor(event) {\n    console.log(event);\n    console.log('hi');\n    event.target.style.backgroundColor = `var(--${this.color}-accent)`;\n  }\n\n  mouseLeaveColor(event) {\n    event.target.style.backgroundColor = 'transparent';\n  }\n\n  changeTargetTimer(event) {\n    console.log('in');\n    this.start_pauseBtn.removeEventListener('click', this.boundFnToStartTimer);\n\n    if (event.target.id === 'focus-timer') {\n      this.currentTime = this.timeFocus;\n    } else if (event.target.id === 'short-break') {\n      this.currentTime = this.timeShortBreak;\n    } else if (event.target.id === 'long-break') {\n      this.currentTime = this.timeLongBreak;\n    }\n    this.boundFnToStartTimer = this.btnStartTimer.bind(this);\n    this.start_pauseBtn.addEventListener('click', this.boundFnToStartTimer);\n    this.renderTimer();\n  }\n\n  btnStartTimer() {\n    console.log('start ui');\n    this.start_pauseBtn.removeEventListener('click', this.boundFnToStartTimer);\n    this.currentTime.start();\n\n    this.start_pauseBtn.textContent = 'Pause';\n\n    let timerId = setInterval(() => {\n      if (this.currentTime.getUiTime() === '00:00') {\n        clearInterval(timerId);\n      }\n      this.timerTextEl.textContent = this.currentTime.getUiTime();\n    }, 1000);\n\n    this.boundFnToPauseTimer = this.btnPauseTimer.bind(this, timerId);\n    this.start_pauseBtn.addEventListener('click', this.boundFnToPauseTimer);\n  }\n\n  btnPauseTimer(timerId) {\n    console.log('pause ui');\n    clearInterval(timerId);\n    this.currentTime.pause();\n    this.start_pauseBtn.textContent = 'Start';\n    this.start_pauseBtn.removeEventListener('click', this.boundFnToPauseTimer);\n    this.start_pauseBtn.addEventListener('click', this.boundFnToStartTimer);\n  }\n}\n\n\n\n\n//# sourceURL=webpack://timer-productivity/./src/timer_ui.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = __webpack_require__("./src/app.js");
/******/ 	
/******/ })()
;