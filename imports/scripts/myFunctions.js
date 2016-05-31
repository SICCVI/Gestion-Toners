/*import { $ } from 'meteor/jquery';
Meteor.myFunctions = {
...
    makeBoard : function() { ... },
...
}
$( document ).ready(function() {
	document.getElementById('insert-selectmarque').change(function() {
	    document.getElementById('new-inputmarque').value=this.value;
	    console.log('select - ' + this.value);
	    console.log(document.getElementById('new-inputmarque').value);
	});
});
*/
reporterSelect = function (select, input) {
	console.log('fonction appelée => reporterSelect');
    let selection = document.getElementById(select).value;
    document.getElementById(input).value = selection;
}
/*
supprimerModal = function (modalId) {
	console.log('fonction appelée => supprimerModal part1');
	console.log('fonction appelée sur ' + modalId);
	$(modalId).on('hidden.bs.modal', function () {
		console.log('fonction appelée => supprimerModal part2');
    	$(".modal-body").empty();
		$(this).removeData('modal');
		$(".modal-body").remove();
	});
},

test = function () {
	console.log('test - part1');
	$('body').on('hidden.bs.modal','.modal', function() {
		$(this).data('bs.modal', null);
		console.log('test - part2');
	});
}

test2 = function (myModal) {
	$("a[data-target=#myModal]").click(function(ev) {
    ev.preventDefault();
    var target = $(this).attr("href");

	    // load the url and show modal on success
	    $("#myModal .modal-body").load(target, function() { 
	         $("#myModal").modal("show"); 
	    });
	});
}*/