import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { EasySearch } from 'meteor/easy:search';

export const Stocks = new Mongo.Collection('stocks');

Stocks.allow({
  insert:function(){return true;},
  remove:function(){return true;},
  update:function(){return true;},
});

Meteor.methods({
  'stocks.insert'(stock) {
    Stocks.insert({
      stock,
    });
  },
  'stocks.augmente-quantite' (stockId) {
 	Stocks.update(stockId,
   		{ $inc: { quantite: 1 } }
	)
  },
  'stocks.diminue-quantite' (stockId) {
 	Stocks.update(stockId,
   		{ $inc: { quantite: -1 } }
	)
  },
  'stocks.augmente-seuil' (stockId) {
 	Stocks.update(stockId,
   		{ $inc: { seuil: 1 } }
	)
  },
  'stocks.diminue-seuil' (stockId) {
 	Stocks.update(stockId,
   		{ $inc: { seuil: -1 } }
	)
  },
    'stocks.augmente-avertissement' (stockId) {
 	Stocks.update(stockId,
   		{ $inc: { nvAvertissement: 1 } }
	)
  },
  'stocks.diminue-avertissement' (stockId) {
 	Stocks.update(stockId,
   		{ $inc: { nvAvertissement: -1 } }
	)
  },
  'stocks.alerte' (stockId) {
	Stocks.update(stockId,
		{ $set: { alerte: true }}
	)
  },
  'stocks.no-alerte' (stockId) {
	Stocks.update(stockId,
		{ $set: { alerte: false }}
	)
  },
    'stocks.avertissement' (stockId) {
	Stocks.update(stockId,
		{ $set: { avertissement: true }}
	)
  },
  'stocks.no-avertissement' (stockId) {
	Stocks.update(stockId,
		{ $set: { avertissement: false }}
	)
  },
  'stocks.consommation' (stockId, parametre) {
 	Stocks.update( { _id: stockId, 'service.nom' : parametre },
   		{ $inc: { 'service.$.consommation': 1 } }
	)
  },
  'stocks.annule-consommation' (stockId, parametre) {
  Stocks.update( { _id: stockId, 'service.nom' : parametre },
      { $inc: { 'service.$.consommation': -1 } }
  )
  },
  'stocks.historique'(stockId, parametre, historiqueId) {
    Stocks.update( { _id: stockId, 'service.nom' : parametre },
      { $addToSet: {
        'service.$.historique': historiqueId
        }
      }
  )
  },
  'stocks.remove-historique'(stockId, parametre, historiqueId) {
    Stocks.update( { _id: stockId, 'service.nom' : parametre },
      { $pull: {
        'service.$.historique': historiqueId
        }
      }
  )
  }
});

//db.stocks.aggregate( [ {$match: { _id: stockId } }, { $unwind: '$lieu' }, { $group: { _id: 'null', "total": { $sum: "$lieu.quantite" } } } ] );
