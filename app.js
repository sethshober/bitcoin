var bitcoin = new Firebase("https://publicdata-cryptocurrency.firebaseio.com/bitcoin");

bitcoin.child("last").on("value", updatePrice);

bitcoin.child("_updated").on("value", updatedLast);

var prevPrice = '';


// show current price of bitcoin in US dollars
function updatePrice(snapshot) {


	var prevPriceText = $('#current-price').text();
	var prevPriceTextSlice = prevPriceText.slice(1);
	prevPrice = Number(prevPriceTextSlice);
	var snapPrice = snapshot.val();
	
	console.log(prevPrice);

	price = $('#current-price').text("$" + snapPrice);

	if(price > prevPrice || prevPrice == 0){
		price.effect('highlight', {color: 'lightgreen'});
	} else {
		price.effect('highlight', {color: 'tomato'});
	}


	//document.getElementById('current-price').innerHTML = "1&#x243; = $" + snapshot.val();
	
	console.log(snapPrice);


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