import './NewMarque.html';

import { Template } from 'meteor/templating';
import { Marques } from '../../api/marquesCollection.js';

import '../../scripts/disableEnterKey.js';

Template.NewMarque.events({
    'submit .new-marque'(event) {
        event.preventDefault();
        const target = event.target;
        const nom = target.nom.value;
        const marque = nom.toUpperCase();
        const verification = Marques.find({nom: marque}, {limit: 1}).count()>0;
        if (verification === true) {
            throw new Meteor.Error('Cette element existe déjà dans la collection et ne sera donc pas insérée.');
        }
        else {
            Meteor.call('marques.insert', marque);
        }
        target.nom.value = "";
        target.nom.focus();
        $("#closeModalNew").click();
    },
});

Template.NewMarque.onCreated(function() {
});

Template.NewMarque.helpers({
});

