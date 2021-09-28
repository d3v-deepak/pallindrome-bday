function reversStr(str) {
  return str.split("").reverse().join("");
}

function checkPallindrome(str) {
  return str === reversStr(str);
}

date = { day: 22, month: 11, year: 2020 };

function convertDatetoStr(date) {
  dateStr = { day: "", month: "", year: "" };

  // if (date.day < 10) {
  //   dateStr.day = "0" + date.day;
  // } else {
  //   dateStr.day = date.day.toString();
  // }
  // if (date.month < 10) {
  //   dateStr.month = "0" + date.month;
  // } else {
  //   dateStr.month = date.month.toString();
  // }
  dateStr.day = date.day.toString();
  dateStr.month = date.month.toString();
  dateStr.year = date.year.toString();

  return dateStr;
}
function getAllDateFormat(date) {
  strDate = convertDatetoStr(date);
  var ddmmyyyy = strDate.day + strDate.month + strDate.year;
  var mmddyyyy = strDate.month + strDate.day + strDate.year;
  var yyyymmdd = strDate.year + strDate.month + strDate.day;
  var ddmmyy = strDate.day + strDate.month + strDate.year.slice(-2);
  var mmddyy = strDate.month + strDate.day + strDate.year.slice(-2);
  var yymmdd = strDate.year.slice(-2) + strDate.month + strDate.day;
  return [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yymmdd];
}
function checkPallindromeforAllDateFormats(date) {
  var pallindromDateList = getAllDateFormat(date);
  var flag = false;
  for (var i = 0; i < pallindromDateList.length; i++) {
    if (checkPallindrome(pallindromDateList[i])) {
      flag = true;
      break;
    }
  }
  return flag;
}

function isLeapYear(year) {
  if (year % 400 == 0) return true;

  if (year % 100 == 0) return false;

  if (year % 4 == 0) return true;
  return false;
}

function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month; //1-1
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    //chef if a leap isLeapYear
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month++;
      }
    } else {
      if (day > 28) {
        day = 1;
        month++;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }
  if (month > 12) {
    day = 1;
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function checkNextPallindrome(date) {
  var nextDate = getNextDate(date);
  var ctrl = 0;

  while (1) {
    ctrl = ctrl + 1;
    var isPalindrome = checkPallindromeforAllDateFormats(nextDate);
    if (isPalindrome) {
      break;
    }
    nextDate = getNextDate(nextDate);
  }

  return [ctrl, nextDate];
}

var dateInput = document.querySelector("#input-date");
var showBtn = document.querySelector("#show-btn");
var output = document.querySelector(".output");
function clickhandler() {
  var bdayStr = dateInput.value;
  if (bdayStr !== "") {
    var listOfDates = bdayStr.split("-");

    var date = {
      day: listOfDates[2],
      month: listOfDates[1],
      year: listOfDates[0],
    };

    var isPalindrome = checkPallindromeforAllDateFormats(date);
    if (isPalindrome) {
      output.innerHTML = "Yay ..!! Your birthday is a palindrome";
    } else {
      var [ctrl, nextDate] = checkNextPallindrome(date);
      output.innerHTML = `The Next Pallindrome date  is ${nextDate.day}-${nextDate.month}-${nextDate.year} 
      you missed by ${ctrl}days`;
    }
  }
}

showBtn.addEventListener("click", clickhandler);

// function getPreviousDate(date){//21/5/21
// //1/3/20

// var day=date.day-1;//20//0
// var month=date.month;//5/3
// var year=date.year//2021/21

// var daysInMonth=[31,28,31,30,31,30,31,31,30,31,30,31]
// //check if leapyear ..if leappyr goes to 29 else 28
// // if(isLeapYear(year)){}
// // else{}
// if(month===3){
//   if(isLeapYear(year)){
//       if(day<1){
//         day=29;//29
//         monnth--;//2
//       }
//   }
//   else{
//   if(day<0)
//     {
//       day=28;//28
//       month--;//2
//     }

//   }

// }
// else{
//   if(day<1){
//     day=daysInMonth[month-2];
//     month=month--
//   }
// }

// if(month < 1){

//   date=31;
//   month=12;
//   year=year-1

// }

// return{
//   day:day,//20
//   month:month,//5
//   year:year//21
// }

// }

// function checkPreviousPallindrom(date){

// }

// console.log(getPreviousDate({ day:1, month: 2, year: 2020 }))
