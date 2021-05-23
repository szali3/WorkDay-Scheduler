function createCallback( i ){
    return function(){
      setItm(i);
    }
  }
  
  $(document).ready(function(){
    SelectionCSS();
    for(var i = 1; i < 10; i++) {
      $('#btn' + i).click( createCallback( i ));
    }
  });

// get current date to display on top a d Display it
var mDIsplay = moment().format("dddd MMMM Do")
$("#currentDay").text(mDIsplay);

// moment time objects converted to strings
var mNowA = moment().format("YYYY-MM-DD hh a")   // Get current date with Hour
var mNowB = moment().format("YYYY-MM-DD a")   // Get current date without Hour

// Convert string to moment time objects
var m = moment(mNowB + " 9am", "YYYY-MM-DD hh a") // current date with hour set at 9am
var mNow = moment(mNowA,"YYYY-MM-DD hh a"); // current date with current hour
var mDiff = mNow.diff(m, "hours");

//string by format function
mString = m.format("YYYY-MM-DD hh:mm a")
mNowString = mNow.format("YYYY-MM-DD hh:mm a")

//Get local storage when page loads
var hrTextArray = [];
var day 
var localStorageIni = localStorage.getItem("text");
var localStorageIniDay = localStorage.getItem("date")

// check if local storage exist, if not intialize it
if (localStorageIni === null || localStorageIniDay === null ){
  hrTextArray = ["","","","","","","","","",""]
  day = 0
} else {
  // get local storage if it exists and convert to JSON
  hrTextArray = JSON.parse(localStorageIni)
  day= localStorageIniDay
  if (day ===  moment().format("DDD")){
    console.log("if "+day)
    // Loop throut to set data from localstorage to textArea field 
    for(var i = 1; i < 10; i++) {
      hrtxt = hrTextArray[i-1]
      $('#txt' +i).text(hrtxt)
      }
    } else {
      // if different day then reset the storage
      console.log("else "+day)
      localStorage.setItem("date",moment().format("DDD"));
      localStorage.removeItem("text");
      location.reload();
    }
  }

// CSS present, future and past backgound color selector 
function SelectionCSS () {
  // current hour less than set hour all highlighted future
  if(mDiff<0){
    for(var i = 0; i < 10; i++) {
      $('#txt' + i).addClass("future").removeClass("present").removeClass("past");
    }
  }
  // current hour equal to set hour. first cell highlighted present rest is future
  if (mDiff === 0) {
    $('#txt1').addClass("present");
    for(var i = 2; i < 10; i++) {
      $('#txt' + i).addClass("future").removeClass("present").removeClass("past");
    }
  }
  // current hour more than set hour
  if (mDiff > 0) {
    cDiff = mDiff+1 //This is done due to textarea id starts with 1 and not 0
    $('#txt' + cDiff).addClass("present").removeClass("future").removeClass("past");
    for(var i = mDiff+2; i < 10; i++) {
      $('#txt' + i).addClass("future").removeClass("present").removeClass("past");
      }
    for(var i = 1; i < cDiff; i++) {
      $('#txt' + i).addClass("past").removeClass("present").removeClass("future")
      }
    }
}

//get values from textArea and set to local storage
function setItm (parI){
  hrTextArray[parI-1] = $('#txt' +parI).val()
  localStorage.setItem("text",JSON.stringify(hrTextArray));
  localStorage.setItem("date",moment().format("DDD"));
  location.reload(); //refresh page. Allows to udpate SelectionCSS
}

