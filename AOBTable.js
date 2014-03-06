import System;
import Pageflex.Scripting;
import Pageflex.Scripting.Exceptions;
import System.Diagnostics;

class Actions
{
	static var PledgeAmt = {

          "GiftRequest" :["1800", "3000", "5000", "6000", "7500", "9000", "10000", "12000", "15000", "18000", "20000", "25000", "30000", "35000", "40000", "50000", "75000", "100000", "125000", "150000", "175000", "200000", "250000", "500000"],

         "MiddleRequest" :["3600", "6000", "7500", "7500", "9000", "12000", "12000", "15000", "18000", "21000", "25000", "30000", "35000", "50000", "50000", "60000", "100000", "125000", "150000", "175000", "200000", "250000", "300000", "600000"],

         "HighestRequest" :["6000", "7500", "9000", "9000", "12000", "15000", "15000", "18000", "21000", "24000", "30000", "35000", "40000", "75000", "75000", "75000", "125000", "150000", "175000", "200000", "225000", "300000", "350000", "700000"]

} 

	static function currencyFormat(n) {
		//this is a subformula only. Other functions must clean the number first
		return '$' + n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
	}
		
	static function setAmounts() {
		//clean the user data	
		var n = Application.GetVariable('StartingNumber').Value;
		var parts=n.toString().split(".");
		var numb = parts[0].replace(/[^0-9]/g,""); // Only grabbing the numbers //
		var numb = numb*1;
		//collect the variables that need set
		var highValue = Application.GetVariable('HighValue');
		var midValue = Application.GetVariable('MidValue');
		var hInitial = Application.GetVariable('HInitial');
		var mInitial = Application.GetVariable('MInitial');
		var uInitial = Application.GetVariable('UInitial');
		var h5 = Application.GetVariable('H5');
		var m5 = Application.GetVariable('M5');
		var u5 = Application.GetVariable('U5');
		var h10 = Application.GetVariable('H10');
		var m10 = Application.GetVariable('M10');
		var u10 = Application.GetVariable('U10');
		var h20 = Application.GetVariable('H20');
		var m20 = Application.GetVariable('M20');
		var u20 = Application.GetVariable('U20');
		var h60 = Application.GetVariable('H60');
		var m60 = Application.GetVariable('M60');
		var u60 = Application.GetVariable('U60');
		var midHolder, highHolder, u10Holder, m10Holder, h10Holder;
		var loc = -1;
		
		for(var i=0; i <PledgeAmt.GiftRequest.length; i++ ) {
			if (PledgeAmt.GiftRequest[i] == numb) {
				loc = i;
				break;
			}
		}
		
		if(loc > -1){
			midHolder = PledgeAmt.MiddleRequest[loc];
			highHolder = PledgeAmt.HighestRequest[loc];
		} else {
			if(numb < 5000) {
				midHolder = 2*numb;
				highHolder = 3*numb;
			} else if(numb < 10000 ) {
				midHolder = 1.3*numb;
				highHolder = 1.5*numb;
			} else {
				midHolder = 1.2*numb;
				highHolder = 1.5*numb;
			}
		} 
		midValue.Value = currencyFormat(midHolder);
		highValue.Value = currencyFormat(highHolder); 
		
		h10Holder = setPayments(highHolder,10);	
		m10Holder = setPayments(midHolder,10);
		u10Holder = setPayments(numb,10);
		
		hInitial.Value = h10Holder;
		mInitial.Value = m10Holder;
		uInitial.Value = u10Holder;
		h5.Value = setPayments(highHolder,5);
		m5.Value = setPayments(midHolder,5);
		u5.Value = setPayments(numb,5);
		h10.Value = h10Holder;	
		m10.Value = m10Holder;
		u10.Value = u10Holder;
		h20.Value = setPayments(highHolder,20);
		m20.Value = setPayments(midHolder,20);
		u20.Value = setPayments(numb,20);
		h60.Value = setPayments(highHolder,60);
		m60.Value = setPayments(midHolder,60);
		u60.Value = setPayments(numb,60);
	}

	static function setPayments(n,t) {
		//n = dollar amount, t = term for payments
		var tempN = n/t;
		var numb = tempN*1;
		//I couldn't get Math.ceil to work so this is the convoluted workaround
		tempN = numb + .5;
		var parts = tempN.toString().split(".");
		var x = parts[0]*1;
		//Application.Log("Result for n/t: " + x);
				
		while(x%5 != 0){
			x++;
		}
		return currencyFormat(x); 
	}	
}