import { Template } from 'meteor/templating';
import { Toners } from '../../api/tonersCollection.js';

import './ModuleToner.html';

Template.SelectionToner.onCreated(function() {
  this.autorun(() => {
    this.subscribe('toners');
  });
});

Template.SelectionToner.helpers({
	toners: ()=> {
		return Toners.find({});
	},
	totalCount() {
  		return Toners.find({ _id: {$ne: true }}).count();
  	},
    tonersIndex: function () {
	    return ModuleTonersIndex;   
	},
	resultsCount: function () {
      return ModuleTonersIndex.getComponentDict().get('count');
    },
});


Template.SelectionToner.events({
    'click .table-donnees .row-donnees':function(evt){
        if (!$(evt.currentTarget).hasClass("highlight")) {
          $(evt.currentTarget).addClass('highlight').siblings().removeClass("highlight");
          $('#ChoixToner').val(this.modele + " / " + this.constructeur + " " + this.referenceC + " ( " + this.couleur + " )");
          $('#ChoixTonerId').val(this._id);
        }
        else {
          $(evt.currentTarget).removeClass('highlight');
          $('#ChoixToner').val("");
          $('#ChoixTonerId').val("");
        }
    },
});

import { Marques } from '../../api/marquesCollection.js';
import { Fournisseurs } from '../../api/fournisseursCollection.js';

import '../../scripts/disableEnterKey.js';
import { reporterSelect } from '../../scripts/myFunctions.js';

Template.CreationToner.events({
    'submit .new-toner'(event) {
        event.preventDefault();
        let tonerId;
        const target = event.target;
        const modele = target.modele.value;
        const constructeur = target.constructeur.value;
        const constructeurUpper = constructeur.toUpperCase();
        const referenceC = target.referenceC.value;
        const couleur = target.couleur.value;
        const verification = Marques.find({nom: constructeurUpper}, {limit: 1}).count()>0;

        Meteor.call('toners.alt-insert-simple', modele, constructeurUpper, referenceC, couleur, function(error, result){
            tonerId = result;
            $('#ChoixTonerId').val(result);

            const oTable = document.getElementById('TableFournisseur');
            const rowLength = oTable.rows.length;
            let cell1;
            let cell2;  
            let cell3;   
            for (let i = 0; i < rowLength; i++) { 
               const oCells = oTable.rows.item(i).cells;
               const cellLength = oCells.length;
               for(let  j = 0; j < cellLength; j++){
                      cell1 = oCells.item(0).innerHTML;
                      cell2 = oCells.item(1).innerHTML;
                      cell3 = oCells.item(2).textContent;
                }
              let fournisseurId = cell3;
              let referenceF = cell2;
              Meteor.call('toners.add-fournisseur', tonerId, fournisseurId, referenceF);
            }
        });
        $('#ChoixToner').val(modele + " / " + constructeur + " " + referenceC + " ( " + couleur + " )");
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
        cell1.innerHTML = $("#SelectFournisseur").find(':selected').text();
        cell2.innerHTML = $("#InputFournisseur").val();
        cell3.innerHTML = "<label hidden>"+ $("#SelectFournisseur").val() +"</label>";
    },
    'click .delete-selection-fournisseur'(event) {
        event.preventDefault();
        document.getElementById("TableFournisseur").deleteRow(0);
    }
});

Template.CreationToner.onCreated(function() {
  this.autorun(() => {
    this.subscribe('marques');
  });
  this.autorun(() => {
    this.subscribe('fournisseurs');
  });
});

Template.CreationToner.helpers({
    marques: ()=> {
        return Marques.find({}, {sort: { nom: 1 }}); 
    },
    fournisseurs: ()=> {
        return Fournisseurs.find({}, {sort: { nom: 1 }}); 
    },
});
