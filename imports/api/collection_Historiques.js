//IMPORT
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { EasySearch } from 'meteor/easy:search';

//EXPORT
export const HistoriquesCollection = new Mongo.Collection('historiques');

//PERMISSIONS
HistoriquesCollection.allow({
  insert:function(){return true;},
  remove:function(){return true;},
  update:function(){return true;},
});

//SCHEMA
HistoriqueSchema = new SimpleSchema({
  historique_date: {
  type: String,
    label: "Date",
  },
  historique_categorie: {
    type: String,
    label: "Catégorie",
  },
  historique_siteNom: {
    type: String,
    label: "Nom du site concerné",
  },
  historique_siteId: {
    type: String,
    label: "Id du site concerné",
  },
  historique_serviceNom: {
    type: String,
    label: "Nom du service concerné",
  },
  historique_serviceId: {
    type: String,
    label: "Id du service concerné",
  },
  historique_tonerNom: {
    type: String,
    label: "Nom du toner concerné",
  },
  historique_tonerModele: {
    type: String,
    label: "Modèle du toner concerné",
  },
  historique_tonerConstructeur: {
    type: String,
    label: "Constructeur du toner concerné",
  },
  historique_tonerReferenceC: {
    type: String,
    label: "Référence du toner concerné",
  },
  historique_note: {
    type: String,
    label: "Note",
  },
  historique_createdAt: {
    type: Date,
    label: "Créé le",
    autoValue: function() {
      return new Date()
    },
    autoform: {
      type: "hidden",
    }
  },
  historique_modifiedAt: {
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
HistoriquesCollection.attachSchema( HistoriqueSchema );

//INDEX EASY SEARCH
HistoriquesIndex = new EasySearch.Index({
  engine: new EasySearch.MongoDB({
    sort: function () {
      return { historique_date: -1 };
    },
    selector: function (searchObject, options, aggregation) {
      let selector = this.defaultConfiguration().selector(searchObject, options, aggregation),
      
      categoryFilter = options.search.props.categoryFilter;
      if (_.isString(categoryFilter) && !_.isEmpty(categoryFilter)) {
        selector.historique_categorie = categoryFilter;
      }
      tonerFilter = options.search.props.tonerFilter;
      if (_.isString(tonerFilter) && !_.isEmpty(tonerFilter)) {
        selector.historique_tonerId = tonerFilter;
      }
      siteFilter = options.search.props.siteFilter;
      if (_.isString(siteFilter) && !_.isEmpty(siteFilter)) {
        selector.historique_siteId = siteFilter;
      }
      serviceFilter = options.search.props.serviceFilter;
      if (_.isString(serviceFilter) && !_.isEmpty(serviceFilter)) {
        selector.historique_serviceId = serviceFilter;
      }
      return selector;
    }
  }),
  collection: HistoriquesCollection,
  fields: ['historique_date', 'historique_siteNom', 'historique_serviceNom', 'historique_tonerNom', 'historique_tonerModele', 'historique_tonerConstructeur', 'historique_tonerReference', 'historique_categorie', 'historique_tonerId', 'historique_siteId', 'historique_serviceId', 'historique_note'],
  defaultSearchOptions: {
    limit: 30
  },
  permission: () => {
    return true;
  }
});

//METHODES
Meteor.methods({
  'historiques.insert'(date, siteId, siteNom, serviceId, serviceNom, tonerId, tonerModele, tonerConstructeur, tonerReference, tonerNom, categorie) {
    const newElement = Historiques.insert({
      date, siteId, siteNom, serviceId, serviceNom, tonerId, tonerModele, tonerConstructeur, tonerReference, tonerNom, categorie
    });
    return newElement;
  },
  'historiques.remove'(historiqueId) {
    Historiques.remove(historiqueId);
  },
  'historiques.fin-commande'(tonerId) {
    const removeLigne = Historiques.findOne({historique_tonerId: tonerId, historique_categorie: "Commande"});
    if (typeof removeLigne === "undefined") {
    }
    else {
      Historiques.remove(removeLigne._id);
    }
  },
    'historiques.note'(historiqueId, updateNote) {
    check(historiqueId, String);
    check(updateNote, String);
    Historiques.update(historiqueId, {
    $set: {
      historique_note: updateNote,
    }});
  }
});
