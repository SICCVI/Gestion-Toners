import { ImpressionsCollection } from '../../api/collection_Impressions.js';
import { MarquesCollection } from '../../api/collection_Marques.js';
import { TonersCollection } from '../../api/collection_Toners.js';
import { FournisseursCollection } from '../../api/collection_Fournisseurs.js';

import { ContactsCollection } from '../../api/collection_Contacts.js';
import { SitesCollection } from '../../api/collection_Sites.js';
import { ServicesCollection } from '../../api/collection_Services.js';

import { StocksCollection } from '../../api/collection_Stocks.js';
import { HistoriquesCollection } from '../../api/collection_Historiques.js';

import { Meteor } from 'meteor/meteor';
import { check } from 'meteor/check';
//
//PUBLICATIONS
//
Meteor.startup(() => {
	Meteor.publish('impressions', function (){
		return ImpressionsCollection.find({});
	});
/*
	Meteor.publish('detailImpression', function (id){
	check(id, String);
		return Impressions.find({_id: id});
	});*/

	Meteor.publish('marques', function (){
		return MarquesCollection.find({});
	});

	Meteor.publish('toners', function (){
		return TonersCollection.find({});
	});

	Meteor.publish('fournisseurs', function (){
		return FournisseursCollection.find({});
	});

	Meteor.publish('contacts', function (){
		return ContactsCollection.find({});
	});

	Meteor.publish('sites', function (){
		return SitesCollection.find({});
	});

	Meteor.publish('stocks', function (){
	return StocksCollection.find({});
	});

	Meteor.publish('stocks-critique', function (){
	return StocksCollection.find({stock_critique: true});
	});

	Meteor.publish('stocks-avertissement', function (){
	return StocksCollection.find({stock_critique: false, stock_avertissement: true});
	});

	Meteor.publish('services', function (){
	return ServicesCollection.find({});
	});

	Meteor.publish('historiques', function (){
	return HistoriquesCollection.find({});
	});
  
});

//import './demo.js';
