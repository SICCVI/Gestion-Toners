import { Impressions } from '../../api/impressionsCollection.js';
import { Marques } from '../../api/marquesCollection.js';
/*import { Toners } from '../../api/tonersCollection.js';*/

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';

Meteor.startup(() => {
	Meteor.publish('impressions', function (){
		return Impressions.find({});
	});

	Meteor.publish('detailImpression', function (id){
	check(id, String);
		return Impressions.find({_id: id});
	});

	Meteor.publish('marques', function (){
		return Marques.find({});
	});

/*	Meteor.publish('detailMarque', function (id){
	check(id, String);
		return Marques.find({_id: id});
	});

	Meteor.publish('toners', function (){
		return Toners.find({});
	});

	Meteor.publish('detailToner', function (id){
	check(id, String);
		return Toners.find({_id: id});
	});*/
});