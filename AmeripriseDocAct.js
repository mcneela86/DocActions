import System;
import Pageflex.Scripting;
import Pageflex.Scripting.Exceptions;
import System.Diagnostics;

class AmeripriseBusinessCards
{
	static function checkForOverflow(verticalGroup, maxHeightPPT, errorMessage, xPositionPPT, yPositionPPT){
		
		var parentVerticalGroup = Application.CurrentDocument.FindElement(verticalGroup);
		var firstChild = parentVerticalGroup.FirstChildElement;
		var errorMessageBox = Application.CurrentDocument.FindElement(errorMessage);
		
		if(firstChild != null){
		
			var totalHeight = firstChild.Height;
			var siblings = firstChild.NextSiblingElement;
		
			while(siblings != null){
				totalHeight += siblings.Height;
				siblings = siblings.NextSiblingElement;
				var currentHeight = totalHeight + "";
				var currentLength = currentHeight.length;
				if(currentHeight.substring(0, currentLength - 2) > maxHeightPPT){
					//Application.Log("X:" + errorMessageBox.X + " Y:" + errorMessageBox.Y);
					parentVerticalGroup.Delete();
					siblings = null;
					errorMessageBox.X = xPositionPPT;
					errorMessageBox.Y = yPositionPPT;
				}
			}
			
		}
	}

	static function SetLeftTemplate(verticalGroup, nameContainer, variableX){
		
		var parentVerticalGroup = Application.CurrentDocument.FindElement(verticalGroup);
		var firstChild = parentVerticalGroup.FirstChildElement;
		var nameTextContainer = Application.CurrentDocument.FindElement(nameContainer).Height + "";
		var maxHeightPPT = 72; //this is 10 lines due to a container size error

		var xatVariable = Application.GetVariable("Template_Select"); // This is the area template variable that the high or low position templates will populate
		var errorVariable = Application.GetVariable("ErrorMessage"); // A plain text variable that will take whatever value we give it below
		var highAT = "highPosition.xat";
		var lowAT = "lowPosition.xat";
		var errorAT = "errorMessage.xat"; // The area template that contains the ErrorMessage variable.  From my understanding this takes the place of the high/low templates if triggered.  
		var twoLineHeight = 15;
		var threeLineHeight = 22;
		var fiveLineHeight = 37;
		
		if(firstChild != null){ //check total height of vertical group
		
			var totalHeight = firstChild.Height;
			var siblings = firstChild.NextSiblingElement;
		
			while(siblings){
				totalHeight += siblings.Height;
				siblings = siblings.NextSiblingElement;
			}

			var currentHeight = totalHeight + "";
			var numberHeight = currentHeight.substring(0, currentHeight.length - 2);
			var nameHeight = nameTextContainer.substring(0, nameTextContainer.length - 2);
			Application.Log("vertical group:" + numberHeight + ", name container:" + nameHeight);

			if(numberHeight > maxHeightPPT){
				errorVariable.Value = "You have exceeded the line limit.  Please remove some information."
				xatVariable.Value = errorAT;
			}
			else if(nameHeight > twoLineHeight){
				errorVariable.Value = "Julian to fill in"
				xatVariable.Value = errorAT;
			}
			else if(numberHeight > fiveLineHeight){
				xatVariable.Value = highAT;
			}
			else if(numberHeight > threeLineHeight && variableX !== ""){ // Originally there was nothing after variableX, I added the "!==".  Not sure if you left it that way in error or not.     
				xatVariable.Value = highAT;
			}
			else{
				xatVariable.Value = lowAT;
			} 
		}
	}

	static function ComplexLeftTemplate(verticalGroup, nameContainer, variableX, variableY){
		
		var parentVerticalGroup = Application.CurrentDocument.FindElement(verticalGroup);
		var firstChild = parentVerticalGroup.FirstChildElement;
		var nameTextContainer = Application.CurrentDocument.FindElement(nameContainer).Height + "";
		var maxHeightPPT = 72; //this needs updated as it counts for 10 lines right now

		var xatVariable = Application.GetVariable("Template_Select"); // This is the area template variable that the high or low position templates will populate
		var errorVariable = Application.GetVariable("ErrorMessage"); // A plain text variable that will take whatever value we give it below
		var highAT = "highPosition.xat";
		var lowAT = "lowPosition.xat";
		var errorAT = "errorMessage.xat"; // The area template that contains the ErrorMessage variable.  From my understanding this takes the place of the high/low templates if triggered.  
		var twoLineHeight = 15;
		var threeLineHeight = 22;
		var fiveLineHeight = 37;
		var sevenLineHeight = 52;
		var eightLineHeight = 59;
		
		if(firstChild != null){ //check total height of vertical group
		
			var totalHeight = firstChild.Height;
			var siblings = firstChild.NextSiblingElement;
		
			while(siblings){
				totalHeight += siblings.Height;
				siblings = siblings.NextSiblingElement;
			}

			var currentHeight = totalHeight + "";
			var numberHeight = currentHeight.substring(0, currentHeight.length - 2);
			var nameHeight = nameTextContainer.substring(0, nameTextContainer.length - 2);
			Application.Log("vertical group:" + numberHeight + ", name container:" + nameHeight);

			if(numberHeight > eightLineHeight ){
				errorVariable.Value = "You have exceeded the line limit.  Please remove some information."
				xatVariable.Value = errorAT;
			}
			else if(numberHeight > sevenLineHeight ){
				if(variableX || variableY){
					errorVariable.Value = "You have exceeded the line limit.  Please remove some information."
					xatVariable.Value = errorAT;
				} else {
					xatVariable.Value = highAT;
				}	
			}
			else if(nameHeight > twoLineHeight){
				errorVariable.Value = "Julian to fill in"
				xatVariable.Value = errorAT;
			}
			else if(numberHeight > fiveLineHeight && (variableX || variableY) ){
				xatVariable.Value = highAT;
			}
			else if(numberHeight > threeLineHeight && variableX && variableY ){ 
				xatVariable.Value = highAT;
			}
			else{
				xatVariable.Value = lowAT;
			} 
		}
	}

	static function returnHeightError( nameContainer, maxHeight, errorText ){
		/*
			This version works when there is no max height on a text container
			
			nameContainer: the name of the container that needs a max height
			maxHeight: the max height in PF point system, try 15 to start
			errorText: the actual text to show the user when error occurs
		*/
		var nameTextContainer = Application.CurrentDocument.FindElement(nameContainer),
			nameTextContainerHeight = nameTextContainer.Height + "",
			nameHeight = nameTextContainerHeight.substring(0, nameTextContainerHeight.length - 2);

			Application.Log("name container: " + nameHeight);

		if(+nameHeight > +maxHeight){
			var contents = nameTextContainer.Contents;
			//contents.DeleteContents();
			contents.TextColor = 'Red';
			contents.Text = errorText.toString();
		}
	}

	static function returnOverflowError( nameContainer, errorText ){
		/*
			This version works with a max height on the text container
			
			nameContainer: the name of the container that needs a max height
			errorText: the actual text to show the user when error occurs
		*/
		var nameTextContainer = Application.CurrentDocument.FindElement(nameContainer),
			containerOverflow = nameTextContainer.HasOverflow;

			Application.Log("name container: " + containerOverflow);

		if(containerOverflow){
			var contents = nameTextContainer.Contents;
			contents.RemoveVariables(false);
			contents.DeleteContents();
			contents = nameTextContainer.Contents; //this grabs what was overflow since it wasn't here before
			contents.Text = errorText.toString();
			contents.TextColor = 'Red';
		}
	}
}	