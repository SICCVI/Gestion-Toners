import "./Modules.html";

import "./ModuleToner.js";
import "./ModuleImpression.js";
import "./ModuleSite.js";
import "./ModuleContact.js";import "./Modules.html";

import "./ModuleToner.js";
import "./ModuleImpression.js";
import "./ModuleSite.js";
import "./ModuleContact.js";
import "./ModuleService.js";

import '../../scripts/myFunctions.js';

Template.Modules.events({
    'click #ToSectionFin':function(evt){
        $('#ResultatToner').val($('#ChoixToner').val());
        $('#ResultatSite').val($('#ChoixSite').val());
        $('#ResultatContact').val($('#ChoixContact').val());
        $('#ResultatService').val($('#ChoixService').val());
        $('#ResultatTonerId').val($('#ChoixTonerId').val());
        $('#ResultatSiteId').val($('#ChoixSiteId').val());
        $('#ResultatContactId').val($('#ChoixContactId').val());
        $('#ResultatServiceId').val($('#ChoixServiceId').val());
        var source = document.getElementById('TableChoixImpression');
        var destination = document.getElementById('TableResultatImpression');
        var copy = source.cloneNode(true);
        copy.setAttribute('id', 'TableResultatImpression');
        destination.parentNode.replaceChild(copy, destination);
    },
    'click #ToValidation'(event) {
        event.preventDefault();
        if ( $('#ResultatTonerId').val() != "" || $('#ResultatImpressionId').val() != "" || $('#ResultatSiteId').val() != "" || $('#ResultatContactId').val() != "" || $('#ResultatServiceId').val() != "" ) {
            const tonerId = $('#ResultatTonerId').val();
            const siteId = $('#ResultatSiteId').val();
            const contactId = $('#ResultatContactId').val();
            const serviceId = $('#ResultatServiceId').val();
            Meteor.call('stocks.insert', tonerId, siteId, contactId, serviceId, function(error, result){
                stockId = result;
                $('#NewStockId').val(result);
                const oTable = document.getElementById('TableResultatImpression');
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
                  let impressionIndex = cell1 + " " + cell2;
                  let impressionId = cell3;
                  Meteor.call('stocks.add-impression', stockId, siteId, serviceId, impressionId);
                  const index = [ $('#ResultatToner').val(), impressionIndex, $('#ResultatSite').val(), $('#ResultatContact').val(), $('#ResultatService').val()];
                  Meteor.call('stocks.add-index', stockId, index);
                }
            });
            $('#ResultatTonerId').val("");
            $('#ResultatSiteId').val("");
            $('#ResultatContactId').val("");
            $('#ResultatServiceId').val("");
        }
    },
    'click #ToValidationAjouter'(event) {
        event.preventDefault();
        if ( $('#ResultatTonerId').val() != "" || $('#ResultatImpressionId').val() != "" || $('#ResultatSiteId').val() != "" || $('#ResultatContactId').val() != "" || $('#ResultatServiceId').val() != "" ) {
            const tonerId = $('#ResultatTonerId').val();
            const siteId = $('#ResultatSiteId').val();
            const contactId = $('#ResultatContactId').val();
            const serviceId = $('#ResultatServiceId').val();
            const stockId = $('#NewStockId').val();
            Meteor.call('stocks.update', stockId, tonerId, siteId, contactId, serviceId);
                const oTable = document.getElementById('TableResultatImpression');
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
                  let impressionIndex = cell1 + " " + cell2;
                  let impressionId = cell3;
                  Meteor.call('stocks.add-impression', stockId, siteId, serviceId, impressionId);
                  const index = [ $('#ResultatToner').val(), impressionIndex, $('#ResultatSite').val(), $('#ResultatContact').val(), $('#ResultatService').val()];
                  Meteor.call('stocks.add-index', stockId, index);
                }
        }
    },
    'click #ToAjouter'(event) {
        clearRecapitulatif();
        clearModule();
    },
    'click #ToReset'(event) {
        clearRecapitulatif();
        clearModule();
        clearToner();
        $("#NewStockId").val("");
    },
    'click .delete-selection-impression'(event) {
        event.preventDefault();
        document.getElementById("TableImpression").deleteRow(0);
    }
});

clearChamp = function (cible1, cible2, cible3, cible4) {
    $(cible1).val("");
    $(cible2).val("");
    $(cible3).val("");
    $(cible4).val("");
}

clearRecapitulatif = function () {
    clearChamp('#ResultatService', '#ResultatSite', '#ResultatContact');
    clearChamp('#ResultatServiceId', '#ResultatSiteId', '#ResultatContactId');
    clearTableImpression('TableResultatImpression');
}

clearModule = function () {
    clearChamp('#ChoixService', '#ChoixSite', '#ChoixContact');
    clearChamp('#ChoixServiceId', '#ChoixSiteId', '#ChoixContactId');
    clearTableImpression('TableChoixImpression');
}

clearToner = function () {
    clearChamp('#ChoixTonerId', '#ChoixToner', '#ResultatTonerId', '#ResultatToner');
}

clearTableImpression = function (cible) {
    const oTable = document.getElementById(cible);
    const rowLength = oTable.rows.length;  
    for (let i = 0; i < rowLength; i++) { 
       oTable.deleteRow(0);
    }
}

Template.Modules.events({
  'click .ajouter-elements': function(event, template) {
    template.ajouterElements.set(!template.ajouterElements.get());
  },
});

Template.Modules.onCreated(function(){
  this.ajouterElements = new ReactiveVar(false);
});

Template.Modules.helpers({
    ajouterElements: function() {
    return Template.instance().ajouterElements.get();
  },
});
