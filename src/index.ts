const workload = require('./data/workload.js');
const employees = require('./data/employees.js');
const { getAssignments } = require('./helpers.ts');

console.log('Assignments:');
console.log(JSON.stringify(getAssignments(workload, employees)));