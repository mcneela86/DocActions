import System;
import Pageflex.Scripting;
import Pageflex.Scripting.Exceptions;
import System.Diagnostics;

class Actions
{
static function setMainBodyHeight(){ 
		var bodyCopy = Application.CurrentDocument.FindElement('BodyCopy');
		var buffers = 17;
		var mainHeightPt = Application.CurrentDocument.FindElement('Page1VerticalGroup').Height + "";
		var footnotesHeightPt = Application.CurrentDocument.FindElement('FootnotesVerticalGroup').Height + "";
		var mLen = mainHeightPt.length;
		var fLen = footnotesHeightPt.length;
		
		var mainHeight = mainHeightPt.substring(0, mLen - 2);
		var footnotesHeight = footnotesHeightPt.substring(0, fLen - 2);
		
		//Application.Log("Height is:"+mainHeight+". Footnote is:"+footnotesHeight);
		
		bodyCopy.FlexMaxHeight = (mainHeight - footnotesHeight - buffers) + 'pt';
		
		//Application.Log("Body Height is:"+ bodyCopy.FlexMaxHeight);
		}
}