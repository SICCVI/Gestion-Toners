import './AddFournisseur.html';

import { Template } from 'meteor/templating';
import { Fournisseurs } from '../../api/fournisseursCollection.js';

Template.AddFournisseur.events({
    'submit .add-fournisseur'(event) {
        event.preventDefault();
        const target = event.target;
        const fournisseurId = target.fournisseurId.value;
        const referenceF = target.referenceF.value;
        const tonerId = this._id;
        console.log(tonerId + " " + referenceF + " " + fournisseurId);
        if (fournisseurId !== "" || referenceF !== "") {
            Meteor.call('toners.add-fournisseur', tonerId, fournisseurId, referenceF);
            target.fournisseurId.value = "";
            target.referenceF.value = "";
        }
        
    },
});

Template.AddFournisseur.onCreated(function() {
  this.autorun(() => {
    this.subscribe('fournisseurs');
  });
});

Template.AddFournisseur.helpers({
    fournisseurs: ()=> {
        return Fournisseurs.find({}, {sort: { nom: 1 }}); 
    },
});