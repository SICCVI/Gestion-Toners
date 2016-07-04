import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { EasySearch } from 'meteor/easy:search';

export const Services = new Mongo.Collection('services');

Services.allow({
  insert:function(){return true;},
  remove:function(){return true;},
  update:function(){return true;},
});

ServiceSchema = new SimpleSchema({
  nom: {
    type: String,
    label: "Nom",
  },
  note: {
    type: String,
    label: "Note",
    optional: true,
  },
  editMode: {
    type: Boolean,
    defaultValue: false,
    optional: true,
  },
});

Services.attachSchema( ServiceSchema );

Meteor.methods({
  'services.remove'(serviceId) {
    check(serviceId, String);
    Services.remove(serviceId);
  },
  'services.insert'(nom) {
    check(nom, String);
    Services.insert({
      nom,
    });
  },
  'services.alt-insert'(nom) {
    check(nom, String);
    const newElement = Services.insert({
      nom,
    });
    return newElement;
  },
  'services.update'(serviceId, updateNom) {
    check(serviceId, String);
    check(updateNom, String);
    Services.update(serviceId, {
    $set: {
      nom: updateNom,
    }});
  },
  'services.note'(serviceId, updateNote) {
    check(serviceId, String);
    check(updateNote, String);
    Services.update(serviceId, {
    $set: {
      note: updateNote,
    }});
  },
  'toggleEditService'(serviceId, currentState) {
    check(serviceId, String);
    check(currentState, Boolean);
    Services.update(serviceId, {
      $set: {
        editMode: !currentState
      }});
  },
});

ServicesIndex = new EasySearch.Index({
  collection: Services,
  fields: ['nom', 'note'],
  engine: new EasySearch.Minimongo(),
  defaultSearchOptions : {limit: 25}
});

ModuleServicesIndex = new EasySearch.Index({
  collection: Services,
  fields: ['nom', 'note'],
  engine: new EasySearch.Minimongo(),
  defaultSearchOptions : {limit: 5}
});