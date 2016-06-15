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
  'historiques.insert'(objet, auteur, date, sortie) {
    var newElement = Historiques.insert({
      objet, auteur, date, sortie,
    });
    return newElement;
  },
  'historiques.remove'(historiqueId) {
    Historiques.remove(historiqueId);
  }
});

HistoriquesIndex = new EasySearch.Index({
  collection: Historiques,
  fields: ['objet', 'auteur', 'date'],
  engine: new EasySearch.Minimongo(),
  defaultSearchOptions : {limit: 25}
});