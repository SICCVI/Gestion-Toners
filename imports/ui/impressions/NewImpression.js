import './NewImpression.html';

import { Template } from 'meteor/templating';
import { Marques } from '../../api/marquesCollection.js';

import '../../scripts/disableEnterKey.js';
import { reporterSelect } from '../../scripts/myFunctions.js';

Template.NewImpression.events({
    'submit .new-impression'(event) {
        event.preventDefault();
        const target = event.target;
        const gabarit = target.gabarit.value;
        const marque = target.marque.value;
        const modele = target.modele.value;
    	const type = target.type.value;
        const nombretoner = Number(target.nombretoner.value);
        let active = false;
        if (target.active.value == "true") {
            active = true;
        }
        Meteor.call('impressions.insert', gabarit, marque, modele, type, nombretoner, active);
        target.marque.value='';
        target.modele.value='';
        target.type.value='';
        target.nombretoner.value='1';
        target.active.value='true';
        const nom = marque.toUpperCase();
        console.log(nom + ' -- Nom de la marque à insérer en Uppercase.');
        const verification = Marques.find({nom: nom}, {limit: 1}).count()>0;
        console.log(verification + ' -- Doublon détecté?');
        if (verification === true) {
            throw new Meteor.Error('Cette marque existe déjà et ne sera donc pas inséré.');
        }
        else {
            Meteor.call('marques.add', nom);
        }
    },
});

Template.NewImpression.onCreated(function() {
  this.autorun(() => {
    this.subscribe('marques');
  });
});

Template.NewImpression.helpers({
    marques: ()=> {
        return Marques.find({});
    },
});

