// ==UserScript==
// @name         Thread Nominal Dimensions
// @license      GNU
// @namespace    https://github.com/MythicWebsite
// @homepageURL  https://github.com/MythicWebsite/NominalThreadJS
// @version      1.0
// @description  The website for whatever reason doesn't tell you the nominal dimensions. This fixes that.
// @author       Mythic
// @match        http://theoreticalmachinist.com/Threads_UnifiedImperial.aspx
// @icon         https://www.google.com/s2/favicons?sz=64&domain=theoreticalmachinist.com
// @downloadURL  https://raw.githubusercontent.com/MythicWebsite/NominalThreadJS/master/code.user.js
// @updateURL    https://raw.githubusercontent.com/MythicWebsite/NominalThreadJS/master/code.user.js
// @grant        none
// ==/UserScript==

(function() {
    'use strict';

    // Your code here...
    const elementList = ["lbl_Unified_Dias_Pitch", "lbl_Unified_Dias_Major", "lbl_Unified_Dias_Minor", "lbl_Unified_Dias_OverWire", "lbl_Unified_VShape_CrestFlat", "lbl_Unified_VShape_RootFlat", "lbl_Unified_VShape_RootRadius", "lbl_Unified_VShape_ThreadDepth", "lbl_Unified_VShape_ThreadFlank" ];
    const element2 = document.getElementById("lbl_Unified_Dias_Pitch");
    //alert('Hello World');

    const targetNode = document.body;
    const config = { childList: true, subtree: true };

    const callback = function(mutationsList, observer) {
        for(let mutation of mutationsList) {
            if (mutation.type === 'childList') {
                // Elements have changed
                //alert(document.getElementById(elementList[2]).innerHTML);
                for (let i = 0; i < elementList.length; i++) {
                    const theElement = document.getElementById(elementList[i]);
                    const changes = theElement.innerHTML.split("/");
                    if (changes.length == 2 && !theElement.innerHTML.includes('~')) {
                        const middleMath = (parseFloat(changes[0]) - parseFloat(changes[1]))/2 + parseFloat(changes[1]);
                        theElement.innerHTML = theElement.innerHTML + " ~ " + middleMath.toFixed(4).toString();
                    }
                    console.log(document.getElementById(elementList[i]).innerHTML);
                }
                // const changes = element2.innerHTML.split("/");
                // if (changes.length == 2 && !element2.innerHTML.includes('~')) {
                //     const middleMath = (parseFloat(changes[0]) - parseFloat(changes[1]))/2 + parseFloat(changes[1]);
                //     element2.innerHTML = element2.innerHTML + " ~ " + middleMath.toFixed(4).toString();
                // }
                //alert(changes[0] + changes[1] + changes.length.toString());
            }
        }
    };

    const observer = new MutationObserver(callback);
    observer.observe(targetNode, config);
    //html body form#form1 div#MainContentWindow div#AreaContent div.TableCalc table tbody tr td.left span#lbl_Unified_Dias_Pitch.resultColor
})();
