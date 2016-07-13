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
        const nom = marque.toUpperCase();
        const modele = target.modele.value;
        const nombretoner = Number(target.nombretoner.value);
        Meteor.call('impressions.insert', gabarit, nom, modele, nombretoner);
        target.marque.value='';
        $("#insert-selectmarque").val("");
        target.modele.value='';
        target.nombretoner.value='1';
        $("#closeModalNew").click();
        const verification = Marques.find({nom: nom}, {limit: 1}).count()>0;
        if (verification === true) {
            throw new Meteor.Error('Cette marque existe déjà dans la collection et ne sera donc pas insérée.');
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
        return Marques.find({}, {sort: { nom: 1 }}); 
    },
});

