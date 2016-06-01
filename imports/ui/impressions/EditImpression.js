import './EditImpression.html';

import { Template } from 'meteor/templating';
import { Marques } from '../../api/marquesCollection.js';

import '../../scripts/disableEnterKey.js';
import '../../scripts/myFunctions.js';
import '../../startup/helpers.js';

Template.EditImpression.events({
    'submit .update-impression'(event) {
        event.preventDefault();
        const target = event.target;
        const updateGabarit = target.gabarit.value;
        const updateMarque = target.marque.value;
        const updateModele = target.modele.value;
    	const updateInformation = target.information.value;
        const updateNombretoner = Number(target.nombretoner.value);
        let updateActive = false;
        if (target.active.value == "true") {
            updateActive = true;
        }
        const impressionId = this._id;
        Meteor.call('impressions.update', impressionId, updateGabarit, updateMarque, updateModele, updateInformation, updateNombretoner, updateActive);
        const nom = updateMarque.toUpperCase();
        const verification = Marques.find({nom: nom}, {limit: 1}).count()>0;
        if (verification === true) {
            console.log('Marque déjà existante dans la collection et ne sera pas de nouveau insérée.');
        }
        else {
            Meteor.call('marques.add', nom);
        }
        document.getElementById('modalClose').click();
    },
});

Template.EditImpression.onCreated(function() {
  this.autorun(() => {
    this.subscribe('marques');
  });
});

Template.EditImpression.helpers({
    marques: ()=> {
        return Marques.find({});
    },
});


