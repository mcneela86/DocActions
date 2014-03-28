import System;
import Pageflex.Scripting;
import Pageflex.Scripting.Exceptions;
import System.Diagnostics;

class Align
{
	//setup for Philips BC to align address1 with title1 no matter which fields are entered
	//both text containers must be anchored the same and have the lines in proper alignment for this to work
	//it is best to have the containers set to minimize height but can work without that
	static function alignRows(requiredFieldCount){ //the user must pass the base amount of fields required on the form so they don't need calculated
		//these are the address fields where none are required, they should be ordered so the last field is the first to be filled for alignment
		var addressFields = ['AddressLine1','AddressLine2','AddressLine3','AddressLine4','AddressLine5','AddressLine6','AddressLine7'],
		emptyAddress = [],
		//these are the fields on the left that are not required, last field is first filled for alignment
		leftFields = ['TitleLine2','Phone2','Phone3'],
		emptyLeft = [],
		addressCount = 0,
		leftFieldsCount = +requiredFieldCount,
		diff = 0,
		x = 0,
		i = 0;

		for(i = 0; i < addressFields.length; ++i){
			if(Application.GetVariable(addressFields[i]).Value !== ''){
				addressCount++;
			} else {
				emptyAddress.push(addressFields[i]);
			}
		}

		for(i = 0; i < leftFields.length; ++i){
			if(Application.GetVariable(leftFields[i]).Value !== ''){
				leftFieldsCount++;
			} else {
				emptyLeft.push(leftFields[i]);
			}
		}

		//Application.Log('addressFields: ' + addressCount + ', leftFields: ' + leftFieldsCount);

		if(addressCount > leftFieldsCount){
			diff = addressCount - leftFieldsCount;
			x = 1;
			while(diff > 0){
				Application.GetVariable(emptyLeft[emptyLeft.length - x]).Value = ' ';

				--diff;
				++x;
			}
		} else if(addressCount < leftFieldsCount){
			diff = leftFieldsCount - addressCount;
			x = 1;
			while(diff > 0){	
				Application.GetVariable(emptyAddress[emptyAddress.length - x]).Value = ' ';
				
				--diff;
				++x;
			}
		}
	} //alignRows

}