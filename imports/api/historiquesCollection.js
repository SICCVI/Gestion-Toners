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
  'historiques.insert'(objet, auteur, date, sortie, entree, commande, note, objetId) {
    const newElement = Historiques.insert({
      objet, auteur, date, sortie, entree, commande, note, objetId,
    });
    return newElement;
  },
  'historiques.remove'(historiqueId) {
    Historiques.remove(historiqueId);
  },
  'historiques.remove-ligne'(objetId) {
    const removeLigne = Historiques.findOne({objetId: objetId});
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