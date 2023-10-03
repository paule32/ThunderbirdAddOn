var UILanguage = "en";  // user interface language, default: en

function setCSS(attr,value) {
  console.log("ddsdsx xxx");
}
browser.composeAction.onClicked.addListener( async (tab) => {
    const promiseA = new Promise((resolve, reject) => {
        resolve(browser.i18n.getUILanguage());
    });

    promiseA.then((val) => {
        UILanguage = val;
    });
    browser.tabs.create({ url: "browser/mathenachricht.html" });
return;

    console.log(tab.id);
 
    let details = await browser.compose.getComposeDetails(tab.id);
    
    console.log("pass");

    if (details.isPlainText) {
        let body = details.plainTextBody;
        
        console.log("texter");
        console.log(body);
        
        body += "\n\nSent from my Thunderbird";
        console.log(body);
        browser.compose.setComposeDetails(tab.id, { "body": body });
        console.log("after composed");
        
        
        let document = new DOMParser().parseFromString(details.body, "text/html");
        console.log(document);
        let para = document.createElement("p");
        para.textContent = "Sent from my Thunderbird333";
        document.body.appendChild(para);
        
        
        let html = new XMLSerializer().serializeToString(document);
        browser.compose.setComposeDetails(tab.id, { "body": html });
        
        //let plainText = "detailsplainTextBody";
        //let htmlContent = "<html><body>${plainText}</body></html>";
        //await browser.compose.setComposeDetails(tab.id, { "body": htmlContent });
    }
    else {
        let document = new DOMParser().parseFromString(details.body, "text/html");
        let para = document.createElement("p");
        para.textContent = "Sent from my Thunderbird as HTML";
        document.body.appendChild(para);
        
        let html = new XMLSerializer().serializeToString(document);
        browser.compose.setComposeDetails(tab.id, { body: html });
    }
    
    console.log('done.');
});
