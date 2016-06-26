import { Impressions } from '../../api/impressionsCollection.js';
import { Marques } from '../../api/marquesCollection.js';
import { Toners } from '../../api/tonersCollection.js';
import { Fournisseurs } from '../../api/fournisseursCollection.js';

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

	Meteor.publish('toners', function (){
		return Toners.find({});
	});

	Meteor.publish('fournisseurs', function (){
		return Fournisseurs.find({});
	});

	Meteor.publish('contacts', function (){
		return Contacts.find({});
	});

	Meteor.publish('sites', function (){
		return Sites.find({});
	});

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
  
});

import './demo.js';
