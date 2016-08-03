//IMPORT
import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { EasySearch } from 'meteor/easy:search';

//EXPORT
export const SitesCollection = new Mongo.Collection('sites');

//PERMISSIONS
SitesCollection.allow({
  insert:function(){return true;},
  remove:function(){return true;},
  update:function(){return true;},
});

//SCHEMA
SiteSchema = new SimpleSchema({
  site_nom: {
    type: String,
    label: "Nom",
  },
  site_adresse: {
    type: String,
    label: "Adresse",
    optional: true,
  },
  site_codepostal: {
    type: String,
    label: "Code Postal",
    optional: true,
  },
  site_ville: {
    type: String,
    label: "Ville",
    optional: true,
  },
  site_telephone: {
    type: String,
    label: "Téléphone",
    optional: true,
  },
  site_note: {
    type: String,
    label: "Note",
    optional: true,
  },
  site_editMode: {
    type: Boolean,
    defaultValue: false,
    optional: true,
  },
  site_createdAt: {
    type: Date,
    label: "Créé le",
    autoValue: function() {
      return new Date()
    },
    autoform: {
      type: "hidden",
    }
  },
  site_modifiedAt: {
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
SitesCollection.attachSchema( SiteSchema );

//INDEX EASY SEARCH
//INDEX POUR LA BIBLIOTHEQUE DE DONNEES
SitesIndex = new EasySearch.Index({
  collection: SitesCollection,
  fields: ['site_nom', 'site_adresse', 'site_codepostal', 'site_ville', 'site_telephone', 'site_note'],
  engine: new EasySearch.Minimongo(),
  defaultSearchOptions : {limit: 7}
});
//INDEX POUR LE MODULE D'ASSOCIATION
ModuleSitesIndex = new EasySearch.Index({
  collection: SitesCollection,
  fields: ['site_nom', 'site_adresse', 'site_codepostal', 'site_ville', 'site_telephone', 'site_note'],
  engine: new EasySearch.Minimongo(),
  defaultSearchOptions : {limit: 5}
});

//METHODES
Meteor.methods({
  //SUPPRESSION
  'sites.remove'(siteId) {
    check(siteId, String);
    SitesCollection.remove(siteId);
  },
  //INSERTION
  'sites.insert'(nom, adresse, codepostal, ville, telephone) {
    check(nom, String);
    check(adresse, String);
    check(codepostal, String);
    check(ville, String);
    check(telephone, String);
    const newID = SitesCollection.insert({
      nom, adresse, codepostal, ville, telephone,
    });
    return newID;
  },
  //UPDATE
  'sites.update'(siteId, updateNom, updateAdresse, updateCodepostal, updateVille, updateTelephone) {
    check(siteId, String);
    check(updateNom, String);
    check(updateAdresse, String);
    check(updateCodepostal, String);
    check(updateVille, String);
    check(updateTelephone, String);
    const updateDate = new Date();
    SitesCollection.update(siteId, {
      $set: {
        site_nom: updateNom,
        site_adresse: updateAdresse,
        site_codepostal: updateCodepostal,
        site_ville: updateVille,
        site_telephone: updateTelephone,
        site_modifiedAt: updateDate,
      }
    });
  },
  //AJOUT DE NOTE
  'sites.add-note'(siteId, updateNote) {
    check(siteId, String);
    check(updateNote, String);
    SitesCollection.update(siteId, {
      $set: {
        site_note: updateNote,
      }
    });
  },
  //MODE EDITION
  'sites.toggle-editMode'(siteId, currentState) {
    check(siteId, String);
    check(currentState, Boolean);
    SitesCollection.update(siteId, {
      $set: {
        site_editMode: !currentState
      }
    });
  },
});
