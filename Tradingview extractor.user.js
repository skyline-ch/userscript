// ==UserScript==
// @name         Tradingview extractor
// @namespace    http://tampermonkey.net/
// @version      0.2
// @description  Script qui permet d'extraire des donnée de trading
// @author       skyline-ch
// @match        https://fr.tradingview.com/*
// @grant 		all
// @require 	https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js
// @downloadURL    	https://github.com/skyline-ch/userscript/raw/master/Tradingview%20extractor.user.js
// ==/UserScript==

(function() {
    var JQ = jQuery.noConflict(true); //Ont place le framwerk JQuery dans une vas pour éviter les conflis avec d\'autre framwork avec le "1"
    console.log('Début chargement : Tradingview extractor');

JQ('html > head').append(JQ('<style>.exporte { color: green; }</style>'));

    var aExport = [];
    JQ('body').on('click', '#skyExport', function(){
        console.log("click Export", this);
        var objet = JQ(this).parent().parent();
        console.log("objet", objet);

        JQ('svg',this).css({'fill' : '#33b3e4'});
        JQ('.report-content.trades').on('scroll.skyExport', function(e) {
                //console.log('Je scroll report-content trades', this);
            saveTradeToArray(objet);
        });

        console.log("aExport : ", aExport);
    });

    JQ('body').on('click', '#skyExportSave', function(){
        console.log("click Save", this);
        var objet = JQ(this).parent().parent();
        console.log("objet", objet);

        JQ('#skyExport svg').css({'fill' : '#8797a5'});
        JQ('svg',this).css({'fill' : '#33b3e4'});

        var convert = "";
        JQ(aExport).each(function(i){
            console.log("JQ(aExport).each(function(i){}); -> i = ", i);
            if(i != 0 &&  aExport[i] != undefined){
                if(i > 1){
                    convert += "" + aExport[i][1] + "\n";
                }else{
                    convert += aExport[i][1] + "\n";
                }
            }
            console.log("convert = ", convert);
        });
        JQ(objet).append('<div style="visibility: hidden;" id="toCopy">' + convert + '</div>');
        copyToClipboard(JQ("#toCopy").text());
        JQ("#toCopy").remove();
        aExport = [];
        JQ('.report-content.trades').off('.skyExport');
        JQ('.exporte').removeClass('exporte');
        var timeOut = setTimeout("alert('Données copié dans le presse papier'); $('#skyExportSave svg').css({'fill' : '#8797a5'});", 500);

        //clearInterval(timeOut);
       // JQ('svg',this).css({'fill' : '#8797a5'});
    });



    JQ("body .layout__area--bottom").on('click', function(){
       // console.log('Mon click', this);
        if(JQ('#skyExport', this).length == 0){
           JQ('div.group:eq(1)', this).after('<div id="skyExport" class="group"><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 488.3 488.3" style="enable-background:new 0 0 488.3 488.3; margin-top:5px; fill:#8797a5; cursor: pointer;" xml:space="preserve" width="20"><g><g>	<path d="M314.25,85.4h-227c-21.3,0-38.6,17.3-38.6,38.6v325.7c0,21.3,17.3,38.6,38.6,38.6h227c21.3,0,38.6-17.3,38.6-38.6V124C352.75,102.7,335.45,85.4,314.25,85.4z M325.75,449.6c0,6.4-5.2,11.6-11.6,11.6h-227c-6.4,0-11.6-5.2-11.6-11.6V124c0-6.4,5.2-11.6,11.6-11.6h227c6.4,0,11.6,5.2,11.6,11.6V449.6z"/><path d="M401.05,0h-227c-21.3,0-38.6,17.3-38.6,38.6c0,7.5,6,13.5,13.5,13.5s13.5-6,13.5-13.5c0-6.4,5.2-11.6,11.6-11.6h227			c6.4,0,11.6,5.2,11.6,11.6v325.7c0,6.4-5.2,11.6-11.6,11.6c-7.5,0-13.5,6-13.5,13.5s6,13.5,13.5,13.5c21.3,0,38.6-17.3,38.6-38.6V38.6C439.65,17.3,422.35,0,401.05,0z"/></g></g></svg></div>');
           JQ('div.group:eq(2)', this).after('<div id="skyExportSave" class="group"><svg version="1.1" id="Capa_1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="20px" height="20px" viewBox="0 0 438.533 438.533" style="enable-background:new 0 0 438.533 438.533;margin-top:5px; fill:#8797a5; cursor: pointer;" xml:space="preserve"><g><path d="M432.823,121.049c-3.806-9.132-8.377-16.367-13.709-21.695l-79.941-79.942c-5.325-5.325-12.56-9.895-21.696-13.704C308.346,1.903,299.969,0,292.357,0H27.409C19.798,0,13.325,2.663,7.995,7.993c-5.33,5.327-7.992,11.799-7.992,19.414v383.719c0,7.617,2.662,14.089,7.992,19.417c5.33,5.325,11.803,7.991,19.414,7.991h383.718c7.618,0,14.089-2.666,19.417-7.991c5.325-5.328,7.987-11.8,7.987-19.417V146.178C438.531,138.562,436.629,130.188,432.823,121.049zM182.725,45.677c0-2.474,0.905-4.611,2.714-6.423c1.807-1.804,3.949-2.708,6.423-2.708h54.819c2.468,0,4.609,0.902,6.417,2.708c1.813,1.812,2.717,3.949,2.717,6.423v91.362c0,2.478-0.91,4.618-2.717,6.427c-1.808,1.803-3.949,2.708-6.417,2.708h-54.819c-2.474,0-4.617-0.902-6.423-2.708c-1.809-1.812-2.714-3.949-2.714-6.427V45.677zM328.906,401.991H109.633V292.355h219.273V401.991zM402,401.991h-36.552h-0.007V283.218c0-7.617-2.663-14.085-7.991-19.417c-5.328-5.328-11.8-7.994-19.41-7.994H100.498c-7.614,0-14.087,2.666-19.417,7.994c-5.327,5.328-7.992,11.8-7.992,19.417v118.773H36.544V36.542h36.544v118.771c0,7.615,2.662,14.084,7.992,19.414c5.33,5.327,11.803,7.993,19.417,7.993h164.456c7.61,0,14.089-2.666,19.41-7.993c5.325-5.327,7.994-11.799,7.994-19.414V36.542c2.854,0,6.563,0.95,11.136,2.853c4.572,1.902,7.806,3.805,9.709,5.708l80.232,80.23c1.902,1.903,3.806,5.19,5.708,9.851c1.909,4.665,2.857,8.33,2.857,10.994V401.991z"/></g></svg></div>');

        }


    });

    function copyToClipboard(element) {
        var $temp = JQ("<textarea>");
        JQ("body").append($temp);
        $temp.val(element).select();
        document.execCommand("copy");
        $temp.remove();
    }
    /*
    * @object : objet Jquery de la ligne du trade a sauver
    */
    function saveTradeToArray(object){
        var arrayTmp = [];
        JQ('div.backtesting-content-wrapper table tbody', object).each(function( index ) {
            console.log("Element : ", this);
           // console.log( index + ": " + JQ( "tr td:eq(0)", this ).text() );
             console.log("Verif : ",JQ( "tr:eq(0) td:eq(0)", this ).text());
            var trade = JQ( "tr:eq(0) td:eq(0)", this );
            var idTrade = trade.text();
           // console.log("Verif 2 : ", aExport.hasOwnProperty(idTrade) );
            if(!aExport.hasOwnProperty(idTrade)){
               JQ(trade).addClass('exporte');
               aExport[idTrade] = [];
               aExport[idTrade][0] = idTrade;
               aExport[idTrade][1] = parseInt(JQ( "tr:eq(0) td:eq(4)", this ).text());
            }

        });
        console.log("aExport : ", aExport);
    }



        console.log('Fin chargement : Tradingview extractor');

})();