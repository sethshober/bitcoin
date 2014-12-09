var bitcoinRef = new Firebase("https://publicdata-cryptocurrency.firebaseio.com/bitcoin"),
    prevPrice = 0,
    bitcoinInput = document.getElementById('bitcoin-input'),
    dollarInput = document.getElementById('dollar-input'),
    bitcoinPriceOutput = document.getElementById('current-price'),
    moniesOutput = document.getElementById('monies');



bitcoinRef.child("last").on("value", updatePrice);

bitcoinRef.child("_updated").on("value", updatedLast);



bitcoinInput.onkeyup = calculateBitcoinRiches; // listen for keyup on bitcoinInput and run calculateBitcoinRiches function 
dollarInput.onkeyup = calculateDollarRiches; // listen for keyup on dollarInput and run calculateDollarRiches function




(function setInputs(){
	bitcoinInput.value = 0;
	dollarInput.value = 0;
})();


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

	
	console.log(snapPrice);

    var checkText = moniesOutput.innerHTML;
    var check = checkText.slice(0,1);

    if(check == "$" || check == ""){

    	calculateBitcoinRiches();

    } else {

    	calculateDollarRiches();

    }
	

} // end updatePrice function




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
function calculateBitcoinRiches() {

	var bitcoins = Number(bitcoinInput.value);
	var bitcoinPrice = Number(bitcoinPriceOutput.innerHTML.slice(1)); //remove dollar sign with slice
	var bitcoinMonies;
	
	console.log("bitcoins: " + bitcoins);
	console.log("bitcoinPrice: " + bitcoinPrice);
	
	bitcoinMonies = (bitcoins * bitcoinPrice).toFixed(2); //keep to two decimal places with toFixed(2)

	dollarInput.value = bitcoinMonies;

	bitcoinMonies = "$" + addCommasToNumber(bitcoinMonies);

	moniesOutput.innerHTML = bitcoinMonies;
	
	console.log("bits: " + bitcoinMonies);

	return bitcoinMonies;

}






// calculate value of dollar, return it, and add to DOM
function calculateDollarRiches() {
	var dollars = Number(dollarInput.value);
	var bitcoins = Number(bitcoinPriceOutput.innerHTML.slice(1));
	var dollarMonies;

	console.log("dollars: " + dollars);

	dollarMonies = (dollars / bitcoins).toFixed(2);

	bitcoinInput.value = dollarMonies;

	dollarMonies = "&#x243;" + addCommasToNumber(dollarMonies);

	moniesOutput.innerHTML = dollarMonies;

	console.log("dollas: " + dollarMonies);

	return dollarMonies;

}






// format number with commas
function addCommasToNumber(n) {
	return n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}










