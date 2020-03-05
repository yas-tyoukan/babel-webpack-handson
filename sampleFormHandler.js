import calcFactorial from './calcFactorial';

const buttonEl = document.getElementById('sample-button');
const inputEl = document.querySelector('[name=number]');
buttonEl.addEventListener('click', () => {
  const inputStr = inputEl.value;
  const num = parseInt(inputStr, 10);
  if (isNaN(num) || num < 1) {
    // 1以上の数値じゃなければエラー
    alert('1以上の数値を入れて');
    return;
  }
  alert(`${num}! = ${calcFactorial(num)}`);
});
