function setCSS(attr,value)
{
	console.log("ddsdsdds");
}

browser.composeAction.onClicked.addListener( tab => {
	setCSS();
	vat $div = $('<div />').appendTo('body');
	console.log($div);
	console.log('ok');
});
