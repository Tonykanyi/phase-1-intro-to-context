// index.js  

function createEmployeeRecord(record) {  
    return {  
        firstName: record[0],  
        familyName: record[1],  
        title: record[2],  
        payPerHour: record[3],  
        timeInEvents: [],  
        timeOutEvents: []  
    };  
}  

function createEmployeeRecords(records) {  
    return records.map(createEmployeeRecord);  
}  

function createTimeInEvent(employeeRecord, dateStamp) {  
    const [date, hour] = dateStamp.split(" ");  
    employeeRecord.timeInEvents.push({  
        type: "TimeIn",  
        hour: parseInt(hour, 10),  
        date: date  
    });  
    return employeeRecord;  
}  

function createTimeOutEvent(employeeRecord, dateStamp) {  
    const [date, hour] = dateStamp.split(" ");  
    employeeRecord.timeOutEvents.push({  
        type: "TimeOut",  
        hour: parseInt(hour, 10),  
        date: date  
    });  
    return employeeRecord;  
}  

function hoursWorkedOnDate(employeeRecord, date) {  
    const timeIn = employeeRecord.timeInEvents.find(event => event.date === date);  
    const timeOut = employeeRecord.timeOutEvents.find(event => event.date === date);  
    return (timeOut.hour - timeIn.hour) / 100; // Convert to hours  
}  

function wagesEarnedOnDate(employeeRecord, date) {  
    const hours = hoursWorkedOnDate(employeeRecord, date);  
    return hours * employeeRecord.payPerHour;  
}  

function allWagesFor(employeeRecord) {  
    const datesWorked = employeeRecord.timeInEvents.map(event => event.date);  
    return datesWorked.reduce((totalWages, date) => {  
        return totalWages + wagesEarnedOnDate(employeeRecord, date);  
    }, 0);  
}  

function calculatePayroll(employeeRecords) {  
    return employeeRecords.reduce((totalPayroll, employeeRecord) => {  
        return totalPayroll + allWagesFor(employeeRecord);  
    }, 0);  
}  
