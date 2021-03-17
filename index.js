// Your code here
function createEmployeeRecord(arr){
    return {
        firstName: arr[0],
        familyName: arr[1],
        title: arr[2],
        payPerHour: arr[3],
        timeInEvents: [],
        timeOutEvents: []
    }
}

function createEmployeeRecords(arr){
    return arr.map(function(i){
        return createEmployeeRecord(i)
    })
}

function createTimeInEvent(employee, timeStamp){
    let [date, hour] = timeStamp.split(' ')
    employee.timeInEvents.push({
        type: "TimeIn",
        hour: parseInt(hour,10),
        date
    })
    return employee
}

function createTimeOutEvent(employee, timeStamp){
    let [date, hour] = timeStamp.split(' ')
    employee.timeOutEvents.push({
        type: "TimeOut",
        hour: parseInt(hour,10),
        date
    })
    return employee
}

function hoursWorkedOnDate(employee, timeStamp){
    let punchedIn = employee.timeInEvents.find((e) => {return e.date === timeStamp})
    let punchedOut = employee.timeOutEvents.find((e) => {return e.date === timeStamp})
    return (punchedOut.hour - punchedIn.hour) / 100
}

function wagesEarnedOnDate(employee, timeStamp){
    let wage = hoursWorkedOnDate(employee, timeStamp) * employee.payPerHour
    return wage
}

function allWagesFor(employee){
    let dates = employee.timeInEvents.map((e)=>{return e.date})
    let payable = dates.reduce((memo, e)=>{return memo + wagesEarnedOnDate(employee, e)}, 0)
    return payable
}

function calculatePayroll(employeeRecords){
    return employeeRecords.reduce((memo, rec)=>{return memo + allWagesFor(rec)}, 0)
}

function findEmployeeByFirstName(arr, name){
    return arr.find((e)=>{return e.firstName === name})
}