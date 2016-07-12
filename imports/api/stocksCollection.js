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
  'stocks.remove'(stockId) {
    check(stockId, String);
    Stocks.remove(stockId);
  },
  'stocks.insert'(tonerId, siteId, contactId, serviceId) {
    const newElement = Stocks.insert({
      toner : tonerId,
      seuil : 0,
      nvAvertissement : 0,
      alerte : false,
      avertissement : false,
      quantite : 0,
      consommateur : [
        { consommateurId: Random.id(),
          site : siteId,
          impression : [],
          contact : contactId,
          service : serviceId,
          consommation : 0,
          historique : []},
        ]
    });
    return newElement;
  },
  'stocks.update'(stockId, siteId, contactId, serviceId) {
    Stocks.update(stockId, {
    $addToSet: {
      consommateur :
        { consommateurId: Random.id(),
          site : siteId,
          impression : [],
          contact : contactId,
          service : serviceId,
          consommation : 0,
          historique : [] },
      }
  });
  },
  'stocks.add-index'(stockId, index) {
    Stocks.update(stockId, {
      $set: {
        index : index
      }
    });
  },
  'stocks.update-index'(stockId, updateIndex) {
    Stocks.update(stockId, {
      $addToSet: {
        index : updateIndex
      }
    });
  },
  'stocks.update-contact'(stockId, parametre1, parametre2, updateContact) {
    Stocks.update( { _id: stockId,'consommateur.site' : parametre1, 'consommateur.service' : parametre2 },
      { $set: {
        'consommateur.$.contact': updateContact
        }
      }
  )
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
  'stocks.consommation' (stockId, parametre1, parametre2) {
  Stocks.update( { _id: stockId, 'consommateur.site' : parametre1, 'consommateur.service' : parametre2 },
      { $inc: { 'consommateur.$.consommation': 1 } }
  )
  },
  'stocks.annule-consommation' (stockId, parametre1, parametre2) {
  Stocks.update( { _id: stockId, 'consommateur.site' : parametre1, 'consommateur.service' : parametre2 },
      { $inc: { 'consommateur.$.consommation': -1 } }
  )
  },
  'stocks.add-historique'(stockId, parametre1, parametre2, historiqueId) {
    Stocks.update( { _id: stockId,'consommateur.site' : parametre1, 'consommateur.service' : parametre2 },
      { $addToSet: {
        'consommateur.$.historique': historiqueId
        }
      }
  )
  },
  'stocks.remove-historique'(stockId, parametre1, parametre2, historiqueId) {
    Stocks.update( { _id: stockId,'consommateur.site' : parametre1, 'consommateur.service' : parametre2 },
      { $pull: {
        'consommateur.$.historique': historiqueId
        }
      }
  )
  },
    'stocks.remove-impression'(stockId, parametre1, parametre2, impressionId) {
    Stocks.update( { _id: stockId,'consommateur.site' : parametre1, 'consommateur.service' : parametre2 },
      { $pull: {
        'consommateur.$.impression': impressionId
        }
      }
  )
  },
    'stocks.add-impression'(stockId, parametre1, parametre2, impressionId) {
    Stocks.update( { _id: stockId,'consommateur.site' : parametre1, 'consommateur.service' : parametre2 },
      { $addToSet: {
        'consommateur.$.impression': impressionId
        }
      }
  )
  },
  'stocks.remove-site'(stockId, consommateurId) {
    Stocks.update(stockId, {
      $pull: {
        consommateur : {
          consommateurId: consommateurId
        }
      }
    }, false, true );
  },
});

StocksIndex = new EasySearch.Index({
  collection: Stocks,
  fields: ['index'],
  engine: new EasySearch.Minimongo(),
  defaultSearchOptions : {limit: 100}
});
