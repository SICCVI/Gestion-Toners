import { Impressions } from '../../api/impressionsCollection.js';
import { Marques } from '../../api/marquesCollection.js';
import { Toners } from '../../api/tonersCollection.js';

import { Contacts } from '../../api/contactsCollection.js';
import { Sites } from '../../api/sitesCollection.js';
import { Services } from '../../api/servicesCollection.js';

import { Stocks } from '../../api/stocksCollection.js';
import { Historiques } from '../../api/historiquesCollection.js';

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
//
//PUBLICATIONS
//
Meteor.startup(() => {
	Meteor.publish('impressions', function (){
		return Impressions.find({});
	});
/*
	Meteor.publish('detailImpression', function (id){
	check(id, String);
		return Impressions.find({_id: id});
	});*/

	Meteor.publish('marques', function (){
		return Marques.find({});
	});

/*	Meteor.publish('detailMarque', function (id){
	check(id, String);
		return Marques.find({_id: id});
	});*/

	Meteor.publish('toners', function (){
		return Toners.find({});
	});
/*
	Meteor.publish('detailToner', function (id){
	check(id, String);
		return Toners.find({_id: id});
	});
*/
	Meteor.publish('contacts', function (){
		return Contacts.find({});
	});
/*
	Meteor.publish('detailContact', function (id){
	check(id, String);
		return Contacts.find({_id: id});
	});*/

	Meteor.publish('sites', function (){
		return Sites.find({});
	});

/*	Meteor.publish('detailSite', function (id){
	check(id, String);
		return Sites.find({_id: id});
	});*/
  Meteor.publish('items', function (){
    return Items.find({});
  });

  Meteor.publish('stocks', function (){
    return Stocks.find({});
  });

  Meteor.publish('services', function (){
    return Services.find({});
  });

  Meteor.publish('historiques', function (){
    return Historiques.find({});
  });

  Meteor.publish('aperçu-historiques', function (){
    return Historiques.find({}, {sort: {date: -1}, limit: 5 });
  });

  
});

import './demo.js';
