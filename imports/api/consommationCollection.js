import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { EasySearch } from 'meteor/easy:search';

export const Consommations = new Mongo.Collection('consommations');

Consommations.allow({
  insert:function(){return true;},
  remove:function(){return true;},
  update:function(){return true;},
});

Meteor.methods({
  'consommations.insert'(service, objet, date) {
    var newDoc = Consommations.insert({
      service, objet, date,
    });
    return newDoc;
  },
  'consommations.remove'(consommationId) {
    Consommations.remove(consommationId);
  }
});
