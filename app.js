(function () {
    "use strict";

    // hardcoded json data, need to be called from api to make it dynamic
    const jsonData = {
        "glossary1": {
            "title": "example glossary",
            "GlossDiv": {
                "title": "S",
                "GlossList": {
                    "GlossEntry": {
                        "ID": "SGML",
                        "SortAs": "SGML",
                        "GlossTerm": "Standard Generalized Markup Language",
                        "Acronym": "SGML",
                        "Abbrev": "ISO 8879:1986",
                        "GlossDef": {
                            "para": "A meta-markup language, used to create markup languages such as DocBook.",
                            "GlossSeeAlso": ["GML", "XML"]
                        },
                        "GlossSee": "markup"
                    }
                }
            }
        },
        "glossary3": "glossary3Value",
        "glossary2": {
            "title": "example glossary",
            "GlossDiv": {
                "title": "S",
                "GlossList": {
                    "GlossEntry": {
                        "ID": "SGML",
                        "SortAs": "SGML",
                        "GlossTerm": "Standard Generalized Markup Language",
                        "Acronym": "SGML",
                        "Abbrev": "ISO 8879:1986",
                        /* "GlossDef": {
                            "para": "A meta-markup language, used to create markup languages such as DocBook.",
                            "GlossSeeAlso": ["GML", "XML"]
                        }, */
                        "GlossSee": "markup"
                    }
                }
            }
        },
        "glossary4": "glossary4Value"
    };

    // traversing json data to create ul/li element
    function traverseJson(data, elementRef) {
        // first validata data object
        if (typeof data !== "undefined" && typeof data === "object" && Object.keys(data).length) {
            for (const key in data) {
                if (typeof data[key] !== "object") {
                    elementRef.appendChild(getDomElement("LI", key));                   // when value found, make li element
                } else if (typeof data[key] === "object") {
                    const ref = elementRef.appendChild(getDomElement("UL", key));       
                    traverseJson(data[key], ref);
                }
            }
        } else {
            console.log("No folders and files found for explorer");
        }
    };

    // generating dom element based on its type and appending it to html
    function getDomElement(elementType, elementText){
        const node = document.createElement(elementType);                 // Create a <li> / <ul> node
        const textNode = document.createTextNode(elementText);            // Create a text node
        node.appendChild(textNode);                                     // append textNode to div
        return node;    
    }

    // initiative point of application
    function init() {
        // first step to find element
        const divElementRef = document.getElementById("dirExplorer");

        // adding root node, since explorer always have root not
        const rootNodeRef = divElementRef.appendChild(getDomElement("UL", "EXPLORER"));

        // traversing json and appending element to div
        traverseJson(jsonData, rootNodeRef);
    }

    return init();
})();