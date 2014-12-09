var bitcoinRef = new Firebase("https://publicdata-cryptocurrency.firebaseio.com/bitcoin"),
    prevPrice = 0,
    bitcoinInput = document.getElementById('bitcoin-input'),
    //dollarInput = document.getElementById('dollar-input'),
    bitcoinPriceOutput = document.getElementById('current-price'),
    moniesOutput = document.getElementById('monies');


//bitcoinRef.child('last').once("value", setDollarsInput)

bitcoinRef.child("last").on("value", updatePrice);

bitcoinRef.child("_updated").on("value", updatedLast);


bitcoinInput.onkeyup = calculateMonies; // listen for keyup on bitcoinInput and run calculateMonies function 
//dollarInput.onkeyup = calculateMonies;


// show current price of bitcoin in US dollars
function updatePrice(snapshot) {


	var prevPriceText = $('#current-price').text();
	var prevPriceTextSlice = prevPriceText.slice(1);
	prevPrice = Number(prevPriceTextSlice);
	var snapPrice = snapshot.val();
	
	console.log(prevPrice);

	price = $('#current-price').text("$" + snapPrice);	

	if(snapPrice < prevPrice){
		price.effect('highlight', {color: 'tomato'});
	} else {
		price.effect('highlight', {color: 'lightgreen'});
	}

	

	//document.getElementById('current-price').innerHTML = "1&#x243; = $" + snapshot.val();
	
	console.log(snapPrice);

	calculateMonies();

}


//show last updated time
function updatedLast(snapshot) {

	var UTCDate = snapshot.val();

	console.log(UTCDate);

	// console.log(typeof UTCDate);

	// var date = convertUTCDateToLocalDate(new Date(UTCDate));

	// console.log(typeof date);

	// dateString = date.toString();

	// console.log(typeof dateString);


	document.getElementById('last-update').innerHTML = "Last updated <br/>" + UTCDate;
	//console.log(snapshot.val());

}
//convert UTC time to Locat time. currently only changes time zone
function convertUTCDateToLocalDate(date) {
    var newDate = new Date(date.getTime()+date.getTimezoneOffset()*60*1000);

    var offset = date.getTimezoneOffset() / 60;
    var hours = date.getHours();

    newDate.setHours(hours - offset);

    return newDate;   
}

// calculate value of bitcoin, return it, and add to DOM
function calculateMonies() {

	var bitcoins = Number(bitcoinInput.value);
	//var dollars = Number(dollarInput.value);
	var bitcoinPrice = Number(bitcoinPriceOutput.innerHTML.slice(1)); //remove dollar sign with slice
	var monies;
	
	console.log("bitcoins: " + bitcoins);
	//console.log("dollars: " + dollars);
	console.log("bitcoinPrice: " + bitcoinPrice);
	
	monies = (bitcoins * bitcoinPrice).toFixed(2); //keep to two decimal places with toFixed(2)

	monies = "$" + addCommasToNumber(monies);

	moniesOutput.innerHTML = monies;
	
	console.log(monies);

	return monies;

}

// function setDollarsInput(snapshot) {
// 	dollarInput.value = snapshot.val();
// 	calculateMonies();
// }

// format number with commas
function addCommasToNumber(n) {
	return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}


// slot machine number change effect
// function slotmachine(snapshot,id) {
// 	var changeto = snapshot.val();
//     var thisid = '#' + id;
//     var $obj = $(thisid);
//     $obj.css('opacity', '.5');
//     var original = $obj.text();

//     var spin = function() {
//         return Math.floor(Math.random() * 10);
//     };

//     var spinning = setInterval(function() {
//         $obj.text(function() {
//             var result = '';
//             for (var i = 0; i < original.length; i++) {
//                 result += spin().toString();
//             }
//             return result;
//         });
//     }, 50);

//     var done = setTimeout(function() {
//         clearInterval(spinning);
//         $obj.text("$" + changeto).css('opacity', '1');
//     }, 800);
// }