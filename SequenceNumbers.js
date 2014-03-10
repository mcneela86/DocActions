import System;
import Pageflex.Scripting;
import Pageflex.Scripting.Exceptions;
import System.Diagnostics;

class Actions
{
<<<<<<< HEAD

=======
>>>>>>> 7a5382389d92235ecc1cce18e57f7fe2a2742a09
	static function sequenceNumb(path) {
		//get the current record and place it on each page	
		var currentRecord = Application.CurrentRecordNumber();
		currentRecord = ' 00' + currentRecord.toString();
		//Application.Log("Current Record is:"+ currentRecord);
		var numb = Application.CurrentDocument.FindText(path,true,true);
		for(var i = 0; i < numb.length; i++){
		numb[i].Text = currentRecord;
		}
	}	
}