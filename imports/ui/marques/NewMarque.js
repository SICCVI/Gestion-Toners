import './NewMarque.html';

import { Template } from 'meteor/templating';

import '../../scripts/disableEnterKey.js';

Template.NewMarque.events({
    'submit .new-site'(event) {
        event.preventDefault();
        const target = event.target;
        const nom = target.nom.value;

        const verification = Marques.find({nom: nom}, {limit: 1}).count()>0;
        if (verification === true) {
            throw new Meteor.Error('Cette element existe déjà dans la collection et ne sera donc pas insérée.');
        }
        else {
            Meteor.call('marques.insert', nom);
        }
        target.nom.value = "";
        target.nom.focus(); 
    },
});

Template.NewMarque.onCreated(function() {
});

Template.NewMarque.helpers({
});

