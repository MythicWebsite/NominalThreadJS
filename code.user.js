// ==UserScript==
// @name         Thread Nominal Dimensions
// @license      GNU
// @namespace    https://github.com/MythicWebsite
// @homepageURL  https://github.com/MythicWebsite/NominalThreadJS
// @version      1.03
// @description  The website for whatever reason doesn't tell you the nominal dimensions. This fixes that.
// @author       Mythic
// @match        http://theoreticalmachinist.com/Threads_UnifiedImperial.aspx
// @icon         https://www.google.com/s2/favicons?sz=64&domain=theoreticalmachinist.com
// @downloadURL  https://raw.githubusercontent.com/MythicWebsite/NominalThreadJS/master/code.user.js
// @updateURL    https://raw.githubusercontent.com/MythicWebsite/NominalThreadJS/master/code.user.js
// @grant        none
// ==/UserScript==

document.body.style.backgroundImage = 'URL("https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1974&q=80")'
document.getElementsByClassName("ContentPageHeader")[0].remove()
document.getElementsByClassName("ContentMinorHeader")[0].remove()
document.getElementsByClassName("ContentMinorHeader")[0].remove()
document.getElementsByClassName("GlossaryBox")[0].remove()
document.querySelector('#cssmenu > ul').style.backgroundColor="#0d0d0d";
Object.assign(document.getElementById('tb_Tol_Unified_3Wire').style, {backgroundColor:'#1b1f20',borderStyle:"solid",borderColor:"#4a4a4a",color:"#e9e9ed"})
Object.assign(document.getElementById('AreaContent').style, {width:'fit-content'})

const removeList = ['AreaSidebarRight','AreaFooter','SocialBar','ExternalThreadImage','ImageTmLogo']

function removeElement(element) {
        document.getElementById(element).remove()
}

function editElement(element, styleEdit) {
    for ( let i = 0; i < document.querySelectorAll('.' + element).length; i++) {
        Object.assign(document.querySelectorAll('.' + element)[i].style, styleEdit)
    };
}

for (let i = 0; i < removeList.length; i++) {
    removeElement(removeList[i])
}

editElement('TableCalc', {backgroundColor:'#1b1f20',color:"#e9e9ed",width:'420px'});
editElement('CenterBoldText', {backgroundColor:'#1b1f20',borderStyle:"solid",borderColor:"#4a4a4a",color:"#e9e9ed"});
editElement('tb_Tol_Unified_3Wire', {backgroundColor:'#1b1f20',color:"#e9e9ed"});
editElement('versionText', {color:"#e9e9ed"});
editElement('resultColor', {color:"#ff6f6f",fontSize:'15px'});
editElement('TableCalc th', {color:"#e9e9ed",backgroundColor:"#0d0d0d"});

(function() {
    'use strict';

    const elementList = ["lbl_Unified_Dias_Pitch", "lbl_Unified_Dias_Major", "lbl_Unified_Dias_Minor", "lbl_Unified_Dias_OverWire", "lbl_Unified_VShape_CrestFlat", "lbl_Unified_VShape_RootFlat", "lbl_Unified_VShape_RootRadius", "lbl_Unified_VShape_ThreadDepth", "lbl_Unified_VShape_ThreadFlank" ];

    const targetNode = document.body;
    const config = { childList: true, subtree: true };

    const callback = function(mutationsList, observer) {
        for(let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                // Elements have changed
                for (let i = 0; i < elementList.length; i++) {
                    const theElement = document.getElementById(elementList[i]);
                    const changes = theElement.innerHTML.split("/");
                    if (changes.length == 2 && !theElement.innerHTML.includes('~')) {
                        const middleMath = (parseFloat(changes[0]) - parseFloat(changes[1]))/2 + parseFloat(changes[1]);
                        theElement.innerHTML = theElement.innerHTML + " ~ " + middleMath.toFixed(4).toString();
                    }
                    console.log(document.getElementById(elementList[i]).innerHTML);
                }
            }
        }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
})();
