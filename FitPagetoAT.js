import System;
import Pageflex.Scripting;
import Pageflex.Scripting.Exceptions;
import System.Diagnostics;

class Resize
{
	static function setPageDimensionsInch(){ //Sets the page to the size of the Width and Height Variables in Inches
		var vWidth = Application.GetVariable('Width').Value*72;
		vWidth += "pt";
		var vHeight = Application.GetVariable('Height').Value*72;
		vHeight += "pt";
		var MainATv = Application.CurrentDocument.FindElement('MainAT');
		var pageH =  Application.CurrentDocument.PageHeight;
		var pageW = Application.CurrentDocument.PageWidth;
		Application.Log("AT Height is:"+vHeight+". AT Width is:"+vWidth+". \nPage is:"+pageH+" x "+pageW);
		
		MainATv.Height = vHeight;
		MainATv.Width = vWidth;
		Application.CurrentDocument.PageHeight = vHeight;
		Application.CurrentDocument.PageWidth =  vWidth;
		}

static function setPageDimensionsPoints(){ //Sets the page and Area Template to the size of the Width and Height Variables in Points with suffix
		var vWidth = Application.GetVariable('Width').Value;
		var vHeight = Application.GetVariable('Height').Value;
		
		var MainATv = Application.CurrentDocument.FindElement('MainAT');
		var pageH =  Application.CurrentDocument.PageHeight;
		var pageW = Application.CurrentDocument.PageWidth;
		Application.Log("Height var is:"+vHeight+". Width var is:"+vWidth+". \nPage is:"+pageH+" x "+pageW);
		
		MainATv.Height = vHeight;
		MainATv.Width = vWidth;
		Application.CurrentDocument.PageHeight = vHeight;
		Application.CurrentDocument.PageWidth =  vWidth;
		}
}