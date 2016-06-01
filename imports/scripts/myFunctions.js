reporterSelect = function (select, input) {
	console.log('fonction appelée => reporterSelect');
    let selection = document.getElementById(select).value;
    document.getElementById(input).value = selection;
},

editCheck = function (field, original, edit) {
	if (original == edit) {
	    $(field).css({'background-color' : 'white'});
	}
	else if (original !== edit) {
	    $(field).css({'background-color' : 'orange'});
	}
}