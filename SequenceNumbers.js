import System;
import Pageflex.Scripting;
import Pageflex.Scripting.Exceptions;
import System.Diagnostics;

class Actions
{
<<<<<<< HEAD
	static function sequenceNumb(phrase) { //phrase is a string of text to be replaced, make it unique so it doesn't grab unwanted text
=======
	static function sequenceNumb(path) {
>>>>>>> 7a5382389d92235ecc1cce18e57f7fe2a2742a09
		//get the current record and place it on each page	
		var currentRecord = Application.CurrentRecordNumber();
		currentRecord = ' 00' + currentRecord.toString();
		//Application.Log("Current Record is:"+ currentRecord);
<<<<<<< HEAD
		var numb = Application.CurrentDocument.FindText(phrase,true,true);
=======
		var numb = Application.CurrentDocument.FindText(path,true,true);
>>>>>>> 7a5382389d92235ecc1cce18e57f7fe2a2742a09
		for(var i = 0; i < numb.length; i++){
		numb[i].Text = currentRecord;
		}
	}	
}