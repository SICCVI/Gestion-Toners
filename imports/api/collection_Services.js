//IMPORT
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { EasySearch } from 'meteor/easy:search';

//EXPORT
export const ServicesCollection = new Mongo.Collection('services');

//PERMISSION
ServicesCollection.allow({
  insert:function(){return true;},
  remove:function(){return true;},
  update:function(){return true;},
});

//SCHEMA
ServiceSchema = new SimpleSchema({
  service_nom: {
    type: String,
    label: "Nom",
  },
  service_note: {
    type: String,
    label: "Note",
    optional: true,
  },
  service_editMode: {
    type: Boolean,
    defaultValue: false,
    optional: true,
  },
  service_createdAt: {
    type: Date,
    label: "Créé le",
    autoValue: function() {
      return new Date()
    },
    autoform: {
      type: "hidden",
    }
  },
  service_modifiedAt: {
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
ServicesCollection.attachSchema( ServiceSchema );

//INDEX EASY SEARCH
//INDEX POUR LA BIBLIOTHEQUE DE DONNEES
ServicesCollectionIndex = new EasySearch.Index({
  collection: ServicesCollection,
  fields: ['service_nom', 'service_note'],
  engine: new EasySearch.Minimongo(),
  defaultSearchOptions : {limit: 7}
});
//INDEX POUR LE MODULE D'ASSOCIATION
ModuleServicesCollectionIndex = new EasySearch.Index({
  collection: ServicesCollection,
  fields: ['service_nom', 'service_note'],
  engine: new EasySearch.Minimongo(),
  defaultSearchOptions : {limit: 5}
});

//METHODES
Meteor.methods({
  //SUPPRESSION
  'services.remove'(serviceId) {
    check(serviceId, String);
    ServicesCollection.remove(serviceId);
  },
  //INSERTION
  'services.insert'(nom) {
    check(nom, String);
    const newID = ServicesCollection.insert({
      nom,
    });
    return newID;
  },
  //UPDATE
  'services.update'(serviceId, updateNom) {
    check(serviceId, String);
    check(updateNom, String);
    const updateDate = new Date();
    ServicesCollection.update(serviceId, {
      $set: {
        service_nom: updateNom,
        service_modifiedAt: updateDate,
      }
    });
  },
  //AJOUT DE NOTE
  'services.note'(serviceId, updateNote) {
    check(serviceId, String);
    check(updateNote, String);
    ServicesCollection.update(serviceId, {
      $set: {
        service_note: updateNote,
      }
    });
  },
  //MODE EDITION
  'services.toggle_editMode'(serviceId, currentState) {
    check(serviceId, String);
    check(currentState, Boolean);
    ServicesCollection.update(serviceId, {
      $set: {
        service_editMode: !currentState
      }
    });
  },
});
