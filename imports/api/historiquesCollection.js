import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { EasySearch } from 'meteor/easy:search';

export const Historiques = new Mongo.Collection('historiques');

Historiques.allow({
  insert:function(){return true;},
  remove:function(){return true;},
  update:function(){return true;},
});

Meteor.methods({
  'historiques.insert-retrait'(date, siteId, siteNom, serviceId, serviceNom, tonerId, tonerNom, categorie) {
    const newElement = Historiques.insert({
      date, siteId, siteNom, serviceId, serviceNom, tonerId, tonerNom, categorie
    });
    return newElement;
  },
  'historiques.insert-entree'(date, tonerId, tonerNom, categorie) {
    Historiques.insert({
      date, tonerId, tonerNom, categorie
    });
  },
  'historiques.insert-commande'(date, tonerId, tonerNom, categorie) {
    Historiques.insert({
      date, tonerId, tonerNom, categorie
    });
  },
  'historiques.remove'(historiqueId) {
    Historiques.remove(historiqueId);
  },
  'historiques.fin-commande'(tonerId) {
    console.log("method call FC");
    const removeLigne = Historiques.findOne({tonerId: tonerId, categorie: "Commande"});
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
      note: updateNote,
    }});
  }
});

HistoriquesIndex = new EasySearch.Index({
  collection: Historiques,
  fields: ['objet', 'auteur', 'date', 'note'],
  engine: new EasySearch.Minimongo({
    sort: function () {
      return { date: -1 };
    }
  }),
  defaultSearchOptions : {limit: 25}
});