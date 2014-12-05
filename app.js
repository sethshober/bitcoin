var bitcoin = new Firebase("https://publicdata-cryptocurrency.firebaseio.com/bitcoin");

bitcoin.child("last").on("value", updatePrice);

bitcoin.child("_updated").on("value", updatedLast);

function updatePrice(snapshot) {

	document.getElementById('current-price').innerHTML = "1&#x243; = $" + snapshot.val();
	console.log(snapshot.val());

}

function updatedLast(snapshot) {

	document.getElementById('last-update').innerHTML = "Last updated <br/>" + snapshot.val();
	console.log(snapshot.val());

}