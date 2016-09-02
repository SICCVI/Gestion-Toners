//IMPORT
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { EasySearch } from 'meteor/easy:search';

//EXPORT
export const StocksCollection = new Mongo.Collection('stocks');

//PERMISSIONS
StocksCollection.allow({
  insert:function(){return true;},
  remove:function(){return true;},
  update:function(){return true;},
});

//SCHEMA
HistoriqueConsommateur = new SimpleSchema({
});
ImpressionConsommateur = new SimpleSchema({
});
Consommateur = new SimpleSchema({
  consommateur_id: {
    type: String,
    label: "Identifiant",
    autoValue: function() {
      return new Random.id()
    },
    autoform: {
      type: "hidden",
    }
  },
  consommateur_site: {
    type: String,
    label: "ID du Site",
  },
  consommateur_contact: {
    type: String,
    label: "ID du Contact",
  },
  consommateur_service: {
    type: String,
    label: "ID du Service",
  },
  consommateur_impression : {
    type: [ImpressionConsommateur],
    label: "ID des Impressions",
  },
  consommateur_consommation: {
    type: Number,
    label: "Nombre de consommation",
    defaultValue: 0,
  },
  consommateur_historique : {
    type: [HistoriqueConsommateur],
    label: "ID des historiques",
  },
});
StockSchema = new SimpleSchema({
  stock_toner: {
    type: String,
    label: "ID du Toner",
  },
  stock_niveauCritique: {
    type: Number,
    label: "Niveau du seuil Critique",
    defaultValue: 0,
  },
  stock_niveauAvertissement: {
    type: Number,
    label: "Niveau de l'Avertissment",
    defaultValue: 0,
  },
  stock_critique: {
    type: Boolean,
    label: "Alerte Critique",
    defaultValue: false,
  },
  stock_avertissement: {
    type: Boolean,
    label: "Alerte Avertissement",
    defaultValue: false,
  },
  stock_quantite: {
    type: Number,
    label: "ID du Toner",
    defaultValue: 0,
  },
  stock_consommateur: {
    type: [Consommateur],
    label: "Consommateur",
  },
  stock_createdAt: {
    type: Date,
    label: "Créé le",
    autoValue: function() {
      return new Date()
    },
    autoform: {
      type: "hidden",
    }
  },
  stock_modifiedAt: {
    type: Date,
    label: "Dernière modification le",
    autoValue: function() {
      return new Date()
    },
    autoform: {
      type: "hidden",
    }
  },
});
StocksCollection.attachSchema( StockSchema );

//INDEX EASY SEARCH
//StocksIndex = new EasySearch.Index({
//  collection: StocksCollection,
//  fields: ['index'],
//  engine: new EasySearch.Minimongo(),
//  defaultSearchOptions : {limit: 100}
//});

//METHODES
Meteor.methods({
  //SUPPRESSION
  'stocks.remove'(stockId) {
    check(stockId, String);
    StocksCollection.remove(stockId);
  },
  //INSERTION
  'stocks.insert'(tonerId, siteId, contactId, serviceId) {
    const newID = StocksCollection.insert({
      stock_toner : tonerId,
      stock_consommateur : [
      { consommateur_site : siteId,
        consommateur_impression : [],
        consommateur_contact : contactId,
        consommateur_service : serviceId,
        consommateur_historique : [] },
        ]
      });
    return newID;
  },
  //PARAMETRAGE QUANTITE
  'stocks.augmente-quantite' (stockId) {
    StocksCollection.update(stockId,
      { $inc: { stock_quantite: 1 } }
      )
  },
  'stocks.diminue-quantite' (stockId) {
    StocksCollection.update(stockId,
      { $inc: { stock_quantite: -1 } }
      )
  },
  //PARAMETRAGE ALERTE
  'stocks.augmente-seuil' (stockId) {
    StocksCollection.update(stockId,
      { $inc: { stock_niveauCritique: 1 } }
      )
  },
  'stocks.diminue-seuil' (stockId) {
    StocksCollection.update(stockId,
      { $inc: { stock_niveauCritique: -1 } }
      )
  },
  'stocks.alerte-critique-oui' (stockId) {
    StocksCollection.update(stockId,
      { $set: { stock_alerteCritique: true }}
      )
  },
  'stocks.alerte-critique-non' (stockId) {
    StocksCollection.update(stockId,
      { $set: { stock_alerteCritique: false }}
      )
  },
  //PARAMETRAGE AVERTISSEMENT
  'stocks.augmente-avertissement' (stockId) {
    StocksCollection.update(stockId,
      { $inc: { stock_niveauAvertissement: 1 } }
      )
  },
  'stocks.diminue-avertissement' (stockId) {
    StocksCollection.update(stockId,
      { $inc: { stock_niveauAvertissement: -1 } }
      )
  },
  'stocks.alerte-avertissement-oui' (stockId) {
    StocksCollection.update(stockId,
      { $set: { stock_alerteAvertissement: true }}
      )
  },
  'stocks.alerte-avertissement-non' (stockId) {
    StocksCollection.update(stockId,
      { $set: { stock_alerteAvertissement: false }}
      )
  },
  //AJOUT D'UN CONSOMMATEUR
  'stocks.add-consommateur'(stockId, siteId, contactId, serviceId) {
    StocksCollection.update(stockId, {
      $addToSet: {
        stock_consommateur :
        { consommateur_site : siteId,
          consommateur_impression : [],
          consommateur_contact : contactId,
          consommateur_service : serviceId,
          consommateur_consommation : 0,
          consommateur_historique : [] },
        }
      });
  },
  //SUPPRESSION D'UN CONSOMMATEUR
  'stocks.remove-consommateur'(stockId, consommateurId) {
    StocksCollection.update(stockId, {
      $pull: {
        consommateur : {
          consommateurId: consommateurId
        }
      }
    }, false, true );
  },
/*  'stocks.add-index'(stockId, index) {
    StocksCollection.update(stockId, {
      $set: {
        index : index
      }
    });
  },
  'stocks.update-index'(stockId, updateIndex) {
    StocksCollection.update(stockId, {
      $addToSet: {
        index : updateIndex
      }
    });
  },*/
  //AJOUT D'UNE CONSOMMATION POUR UN CONSOMMATEUR
  'stocks.add-consommation' (stockId, consommateurId) {
    StocksCollection.update( { _id: stockId, 'stock_consommateur.consommateur_id' : consommateurId },
      { $inc: { 'stock_consommateur.$.consommateur_consommation': 1 } }
      )
  },
  //SUPPRESSION D'UNE CONSOMMATION POUR UN CONSOMMATEUR
  'stocks.remove-consommation' (stockId, consommateurId) {
    StocksCollection.update( { _id: stockId, 'stock_consommateur.consommateur_id' : consommateurId },
      { $inc: { 'stock_consommateur.$.consommateur_consommation': -1 } }
      )
  },
  //AJOUT D'UN HISTORIQUE POUR UN CONSOMMATEUR
  'stocks.add-historique'(stockId, consommateurId, historiqueId) {
    StocksCollection.update( { _id: stockId, 'stock_consommateur.consommateur_id' : consommateurId },
      { $addToSet: {
        'stock_consommateur.$.consommateur_historique': historiqueId
      }
    })
  },
  //SUPPRESSION D'UN HISTORIQUE POUR UN CONSOMMATEUR
  'stocks.remove-historique'(stockId, consommateurId, historiqueId) {
    StocksCollection.update( { _id: stockId, 'stock_consommateur.consommateur_id' : consommateurId },
      { $pull: {
        'stock_consommateur.$.consommateur_historique': historiqueId
      }
    })
  },
  //AJOUT D'UNE IMPRESSION POUR UN CONSOMMATEUR
  'stocks.add-impression'(stockId, consommateurId, impressionId) {
    StocksCollection.update( { _id: stockId, 'stock_consommateur.consommateur_id' : consommateurId },
      { $addToSet: {
        'consommateur.$.impression': impressionId
      }
    })
  },
  //SUPPRESSION D'UNE IMPRESSION POUR UN CONSOMMATEUR
  'stocks.remove-impression'(stockId, consommateurId, impressionId) {
    StocksCollection.update( { _id: stockId, 'stock_consommateur.consommateur_id' : consommateurId },
      { $pull: {
        'consommateur.$.impression': impressionId
      }
    })
  },
  //UPDATE D'UN CONTACT POUR UN CONSOMMATEUR
  'stocks.update-contact'(stockId, consommateurId, updateContact) {
    StocksCollection.update( { _id: stockId, 'stock_consommateur.consommateur_id' : consommateurId },
      { $set: {
        'consommateur.$.contact': updateContact
      }
    })
  },
});
