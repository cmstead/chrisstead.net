const ArrayIndex = require('./ArrayIndex');

const five = new ArrayIndex(5);
const six = new ArrayIndex(6);

console.log('Sum: ' + (five + six));
console.log(`String value: ${five}`);

try{
  new ArrayIndex('5.5');
} catch (error) {
  console.log('Error: ' + error.message);
}

