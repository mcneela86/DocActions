import System;
import Pageflex.Scripting;
import Pageflex.Scripting.Exceptions;
import System.Diagnostics;

class Actions
{
	static function sequenceNumb(phrase) { //phrase is a string of text to be replaced, make it unique so it doesn't grab unwanted text
		//get the current record and place it on each page	
		var currentRecord = Application.CurrentRecordNumber();
		currentRecord = ' 00' + currentRecord.toString();
		//Application.Log("Current Record is:"+ currentRecord);
		var numb = Application.CurrentDocument.FindText(phrase,true,true);
		for(var i = 0; i < numb.length; i++){
		numb[i].Text = currentRecord;
		}
	}	
}