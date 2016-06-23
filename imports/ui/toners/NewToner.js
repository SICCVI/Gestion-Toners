import './NewToner.html';

import { Template } from 'meteor/templating';
import { Marques } from '../../api/marquesCollection.js';
import { Fournisseurs } from '../../api/fournisseursCollection.js';

import '../../scripts/disableEnterKey.js';
import { reporterSelect } from '../../scripts/myFunctions.js';

Template.NewToner.events({
    'submit .new-toner'(event) {
        event.preventDefault();
        const target = event.target;
        const constructeur = target.constructeur.value;
        const constructeurUpper = constructeur.toUpperCase();
        const referenceC = target.referenceC.value;
        const couleur = target.couleur.value;

        if (typeof fournisseurId !== "undefined") {
            Meteor.call('toners.insert', constructeurUpper, referenceC, couleur, fournisseurId, referenceF);
            console.log('test2');
        }
        else {
            Meteor.call('toners.insert-simple', constructeurUpper, referenceC, couleur);
            console.log('test1');
        }
        const verification = Marques.find({nom: constructeurUpper}, {limit: 1}).count()>0;
        if (verification === true) {
            throw new Meteor.Error('Cette élément existe déjà dans la collection et ne sera donc pas insérée.');
        }
        else {
            Meteor.call('marques.add', constructeurUpper);
        }
    },
    'click .selection-fournisseur'(event) {
        event.preventDefault();
        const target = event.target;
        const table = document.getElementById("TableFournisseur");
        const row = table.insertRow(0);
        const cell1 = row.insertCell(0);
        const cell2 = row.insertCell(1);
        const cell3 = row.insertCell(2);
        cell1.innerHTML = $("#SelectFournisseur").val();
        cell2.innerHTML = $("#InputFournisseur").val();
        //cell3.innerHTML = $("#SelectFournisseur").getAttribute('data-id');
        //console.log($("#SelectFournisseur").getAttribute('data-id'));
        console.log($("#SelectFournisseur").data('id'));
        console.log($("#SelectFournisseur").attr("data-id"));
    },
    'click .delete-selection-fournisseur'(event) {
        event.preventDefault();
        document.getElementById("TableFournisseur").deleteRow(0);
    }
});

Template.NewToner.onCreated(function() {
  this.autorun(() => {
    this.subscribe('marques');
  });
  this.autorun(() => {
    this.subscribe('fournisseurs');
  });
});

Template.NewToner.helpers({
    marques: ()=> {
        return Marques.find({}, {sort: { nom: 1 }}); 
    },
    fournisseurs: ()=> {
        return Fournisseurs.find({}, {sort: { nom: 1 }}); 
    },
});

