import './EditToner.html';

import { Template } from 'meteor/templating';
import { Marques } from '../../api/marquesCollection.js';

import '../../scripts/disableEnterKey.js';
import '../../scripts/myFunctions.js';
import '../../startup/helpers.js';

Template.EditToner.events({
    'submit .update-toner'(event) {
        event.preventDefault();
        const target = event.target;
        const updateModele = target.modele.value;
        const updateConstructeur = target.constructeur.value;
        const nom = updateConstructeur.toUpperCase();
        const updateReferenceC = target.referenceC.value;
        const updateCouleur = target.couleur.value;
        const tonerId = this._id;
        Meteor.call('toners.update', tonerId, updateModele, nom, updateReferenceC, updateCouleur);
        
        const verification = Marques.find({nom: nom}, {limit: 1}).count()>0;
        if (verification === true) {
            console.log('Marque déjà existante dans la collection et ne sera pas de nouveau insérée.');
        }
        else {
            Meteor.call('marques.add', nom);
        }
        document.getElementById('modalClose-'+this._id).click();
    },
});

Template.EditToner.onCreated(function() {
  this.autorun(() => {
    this.subscribe('marques');
  });
});

Template.EditToner.helpers({
    marques: ()=> {
        return Marques.find({}, {sort: { nom: 1 }}); 
    },
});


