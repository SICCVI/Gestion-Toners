import { Mongo } from 'meteor/mongo';
import { SimpleSchema } from 'meteor/aldeed:simple-schema';
import { check } from 'meteor/check';
import { Meteor } from 'meteor/meteor';
import { EasySearch } from 'meteor/easy:search';

export const Toners = new Mongo.Collection('toners');

Toners.allow({
  insert:function(){return true;},
  remove:function(){return true;},
  update:function(){return true;},
});


ReferenceFournisseur = new SimpleSchema({
  fournisseurId: {
    type: String
  },
  referenceF: {
    type: String
  },

});

TonerSchema = new SimpleSchema({
  modele: {
    type: String,
    label: "Modèle",
  },
  constructeur: {
    type: String,
    label: "Constructeur",
  },
  referenceC: {
    type: String,
    label: "Référence constructeur",
  },
  fournisseur: {
    type: [ReferenceFournisseur],
    label: "Référence fournisseur",
    optional: true,
  },
  couleur: {
    type: String,
    label: "Couleur",
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

Toners.attachSchema( TonerSchema );

Meteor.methods({
  'toners.remove'(tonerId) {
    check(tonerId, String);
    Toners.remove(tonerId);
  },
 'toners.insert-simple'(modele, constructeur, referenceC, couleur) {
    check(modele, String);
    check(constructeur, String);
    check(referenceC, String);
    check(couleur, String);
    Toners.insert({
      modele: modele,
      constructeur : constructeur,
      referenceC : referenceC,
      couleur : couleur,
    });
  },
 'toners.insert'(modele, constructeur, referenceC, couleur, fournisseurId, referenceF) {
    check(modele, String);
    check(constructeur, String);
    check(referenceC, String);
    check(fournisseur, []);
    check(couleur, String);
    Toners.insert({
      modele: modele,
      constructeur : constructeur,
      referenceC : referenceC,
      couleur : couleur,
      fournisseur : [
        { fournisseurId : fournisseurId,
          referenceF :  referenceF} ]
    });
  },
  'toners.alt-insert-simple'(modele, constructeur, referenceC, couleur) {
    check(modele, String);
    check(constructeur, String);
    check(referenceC, String);
    check(couleur, String);
    const newElement = Toners.insert({
      modele: modele,
      constructeur : constructeur,
      referenceC : referenceC,
      couleur : couleur,
    });
    return newElement;
  },
  'toners.update'(tonerId, updateModele, updateConstructeur, updateReferenceC, updateCouleur) {
    check(tonerId, String);
    check(updateModele, String);
    check(updateConstructeur, String);
    check(updateReferenceC, String);
    check(updateCouleur, String);
    Toners.update(tonerId, {
    $set: {
      modele: updateModele,
      constructeur: updateConstructeur,
      referenceC: updateReferenceC,
      couleur: updateCouleur,
    }});
  },
  'toners.note'(tonerId, updateNote) {
    check(tonerId, String);
    check(updateNote, String);
    Toners.update(tonerId, {
    $set: {
      note: updateNote,
    }});
  },
  'toners.add-fournisseur'(tonerId, fournisseurId, referenceF) {
    check(tonerId, String);
    check(fournisseurId, String);
    check(referenceF, String);
    Toners.update(tonerId, {
      $addToSet: {
        fournisseur : {
          fournisseurId: fournisseurId,
          referenceF: referenceF,
        }
      }
    });
  },
  'toners.remove-fournisseur'(tonerId, fournisseurId, referenceF) {
    check(tonerId, String);
    check(fournisseurId, String);
    check(referenceF, String);
    Toners.update(tonerId, {
      $pull: {
        fournisseur : {
          fournisseurId: fournisseurId,
          referenceF: referenceF,
        }
      }
    });
  },
  'toggleEditToner'(tonerId, currentState) {
    check(tonerId, String);
    check(currentState, Boolean);
    Toners.update(tonerId, {
      $set: {
        editMode: !currentState
      }});
  }
});

TonersIndex = new EasySearch.Index({
  collection: Toners,
  fields: ['modele', 'constructeur', 'referenceC', 'couleur', 'referenceF', 'note'],
  engine: new EasySearch.Minimongo(),
  defaultSearchOptions : {limit: 25}
});


ModuleTonersIndex = new EasySearch.Index({
  collection: Toners,
  fields: ['modele', 'constructeur', 'referenceC', 'couleur', 'referenceF', 'note'],
  engine: new EasySearch.Minimongo(),
  defaultSearchOptions : {limit: 5}
});