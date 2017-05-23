var populationArray = new Array();
	populationArray[0] = "10,10";
	populationArray[1] = "20,11";
	populationArray[2] = "30,12";
	populationArray[3] = "40,13";
	populationArray[4] = "50,14";
	populationArray[5] = "60,15";
	populationArray[6] = "70,16";
	populationArray[7] = "80,18";
	populationArray[8] = "90,20";
	populationArray[9] = "100,22";

/*********************************************************************
 * 					global variables                               
 * ******************************************************************/
 
var svg=document.getElementsByTagName('svg')[0];
var cWidth, cHeight, cMargin, cSpace;
var cMarginSpace, cMarginHeight;
var bcWidth, bcMargin, totalChartBars, maximumDataValue, bcWidthMargin;
var totalLabelOnYAxis;
var rectangles;
var myColors;

/***********************************************************************
 * 						initialization and ojj 							
 * ********************************************************************/

clearGraph();

barChartSettings();

drawAxisLableAndMarkers();

drawChartWithCalculation("Bar");

rectangles=document.getElementsByTagName("rect");
myColors=["#AE1717","#90EE90","purple","#EFEF63","#4d4d4d","#FF5454"];

for(var i=0;i<rectangles.length;i++){
	
	rectangles[i].setAttributeNS( null, 'fill', myColors[Math.floor(Math.random()*6)] );
	rectangles[i].setAttribute("style", "top:"+rectangles[i].y.baseVal.value+"px;left:"+rectangles[i].x.baseVal.value+"px;");

	}









function barChartSettings() {
	
	console.log("control in bar chart settings");
	cMargin = 0;
	cSpace = 60;

	cHeight = svg.height.baseVal.value  - cSpace;
	cWidth = svg.width.baseVal.value  - cSpace;

	cMarginSpace = cMargin + cSpace;
	cMarginHeight = cMargin + cHeight;

	//The Bar Properties
	bcMargin = 50;
	
	totalChartBars = populationArray.length;
	
	bcWidth = (cWidth / totalChartBars) - bcMargin;

	//Maximum value to plot on chart
	maximumDataValue = 0;
	
	for (var i = 0; i < totalChartBars; i++) {
		var arrVal = populationArray[i].split(",");
		var barVal = parseInt(arrVal[1]);
			if (parseInt(barVal) > parseInt(maximumDataValue))
				maximumDataValue = barVal;
	}

	totalLabelOnYAxis = 10;
}


function drawXYAxis(x1, y1, x2, y2) {
	
	console.log("control in DRAW X Y AXIS function");
    var dataAxis = document.createElementNS("http://www.w3.org/2000/svg", 'line');
    dataAxis.setAttribute("x1", x1);
    dataAxis.setAttribute("y1", y1);
    dataAxis.setAttribute("x2", x2);
    dataAxis.setAttribute("y2", y2);
    dataAxis.style.stroke = "black";
    dataAxis.style.strokeWidth = "5px";
    svg.appendChild(dataAxis);

}


function drawAxisMarkers() {
	var numMarkers = parseInt(maximumDataValue/totalLabelOnYAxis);
	
	console.log("control in axis markeres function");
	// On y Axis
	for (var i = 0; i < totalLabelOnYAxis +1; i++) {
		markerVal = i * numMarkers;
		markerValHt = i * numMarkers * cHeight;
		var xMarkers = cMarginSpace - 5;
		var yMarkers = cMarginHeight - (markerValHt / maximumDataValue);

		textelement = document.createElementNS("http://www.w3.org/2000/svg", 'text');
		textelement.setAttribute('dx', xMarkers-40);
		textelement.setAttribute('dy',yMarkers);
		txtnode = document.createTextNode(markerVal);
		textelement.appendChild(txtnode);
		svg.appendChild(textelement);
	}

	//On x Axis
	for (var i = 0; i < totalChartBars; i++) {
		arrVal = populationArray[i].split(",");
		name = arrVal[0];
		markerXPosition = cMarginSpace + bcMargin + (i * (bcWidth + bcMargin)) + (bcWidth / 2);
		markerYPosition = cMarginHeight + 20;

		textelement = document.createElementNS("http://www.w3.org/2000/svg", 'text');
		textelement.setAttribute('dx', markerXPosition);
		textelement.setAttribute('dy', markerYPosition);
		txtnode = document.createTextNode(name);
		textelement.appendChild(txtnode);
		svg.appendChild(textelement);
	}
}


function drawAxisLableAndMarkers() {
    //Y-Axis
    drawXYAxis(cMarginSpace, cMarginHeight, cMarginSpace, cMargin);
    //X-Axis
    drawXYAxis(cMarginSpace, cMarginHeight, cMarginSpace + ((bcWidth+bcMargin+10)*totalChartBars), cMarginHeight);
    drawAxisMarkers();


		bcX = cMarginSpace + (i * (bcWidth + bcMargin))+ bcMargin+10;

}



function drawRectangleForChart(x,y,wd,ht,fill) {
    var rect = document.createElementNS("http://www.w3.org/2000/svg", 'rect');
    rect.setAttributeNS(null, 'x', x);
    rect.setAttributeNS(null, 'y', y);
    rect.setAttributeNS(null, 'width', wd);
    rect.setAttributeNS(null, 'height', ht);
//  rect.setAttributeNS(null, 'fill', "red");
    svg.appendChild(rect);
	} 


function drawChartWithCalculation(chart) {

	for (var i = 0; i < totalChartBars; i++) {
		var arrchartVal = populationArray[i].split(",");
		bcVal = parseInt(arrchartVal[1]);
		bcHt = (bcVal * cHeight / maximumDataValue);
		bcX = cMarginSpace + (i * (bcWidth + bcMargin))+ bcMargin+10;
		bcY = (cMarginHeight - bcHt - 2);
		switch (chart)
		{
			case "Bar":
				drawRectangleForChart(bcX, bcY, bcWidth, bcHt, true);
				break;
			case "Point":
				drawEllipse(bcX, bcY, 5, 5);
				break;
		}
	}
}



function clearGraph() {
    while (svg.lastChild) {
        svg.removeChild(svg.lastChild);
    }
}


var TransformRequestObj
var TransList
var DragTarget=null;
var Dragging = false;
var OffsetX = 0;
var OffsetY = 0;

 
$("rect").draggable({
		grid: [ 10, 0 ]
		
		});
	
var grid = $( ".selector" ).draggable( "option", "grid" );

$('rect')
  .draggable()
  .bind('mousedown', function(event, ui){
    // bring target to front
    $(event.target.parentElement).append( event.target );
  })
  .bind('drag', function(event, ui){
    //update coordinates manually, since top/left style props don't work on SVG
    event.target.setAttribute('x', ui.position.left);
	console.log("current position is at "+ui.position.left);
    //event.target.setAttribute('y', ui.position.top);
  });
 



$("rect").bind('dragstop', handleDragStop);
$("rect").bind('dragstart', handleDragStart);




function handleDragStop(e) {
	e.target.style.opacity="1";
    Dragging = false;
	alert("you left the object at\n X:"+convertX(e.target.x.baseVal.value)+"\t Y:"+convertY(e.target.y.baseVal.value));
	}

	

function handleDragStart(e){
		
		e.target.style.opacity="0.5"; 
		console.log("you began at\n X:"+convertX(e.target.x.baseVal.value)+"\t Y:"+convertY(e.target.y.baseVal.value));
	
}

function convertX(x){
	console.log("function controld in sed convertX");
	x=x-cSpace/2;
	x=x/cWidth;
	x*=100;
	console.log(" x new vlaue i s"+x);
	return x.toFixed(0)-1;
	}

function convertY(y){
	return y.toFixed(0);
	}





/*

//---mouse down over element---
function handleDragStart(evt)
{
    if(!Dragging) //---prevents dragging conflicts on other draggable elements---
    {
		evt.target.style.opacity="0.5";
        DragTarget = evt.target;
        //---reference point to its respective viewport--
        var pnt = DragTarget.ownerSVGElement.createSVGPoint();
        pnt.x = evt.clientX;
        pnt.y = evt.clientY;
        //---elements transformed and/or in different(svg) viewports---
        var sCTM = DragTarget.getScreenCTM();
        var Pnt = pnt.matrixTransform(sCTM.inverse());

        TransformRequestObj = DragTarget.ownerSVGElement.createSVGTransform()
        //---attach new or existing transform to element, init its transform list---
        var myTransListAnim=DragTarget.transform
        TransList=myTransListAnim.baseVal

        OffsetX = Pnt.x
        OffsetY = Pnt.y

        Dragging=true;
     }
}
//---mouse move---
function drag(evt)
{
    if(Dragging)
    {
        var pnt = DragTarget.ownerSVGElement.createSVGPoint();
        pnt.x = evt.clientX;
        pnt.y = evt.clientY;
        //---elements in different(svg) viewports, and/or transformed ---
        var sCTM = DragTarget.getScreenCTM();
        var Pnt = pnt.matrixTransform(sCTM.inverse());
        Pnt.x -= OffsetX;
        Pnt.y -= OffsetY;

        TransformRequestObj.setTranslate(Pnt.x,Pnt.y)
        TransList.appendItem(TransformRequestObj)
        TransList.consolidate()
    }
}


*/
