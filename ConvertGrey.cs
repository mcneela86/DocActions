using System;
using System.IO;
using System.Collections.Generic;
using System.Text;
using System.Diagnostics;
using Pageflex.Scripting;

public class DocActions{
    static public void ConvertToGrey(string changeColor, string imageName){
        if (changeColor == "BW"){
            Application.Log("Convert To Grey");
            try{
				Application.Log("line 13");
                Document doc = Application.CurrentDocument;
                Image img = (Image)doc.FindElement(imageName);//this is the variable name of the 
                string strImgPath = img.SourceResolved;
				Application.Log("line 17");

                // no image in box
                if (strImgPath.Length == 0) { return; }
                string strFileExt = Path.GetExtension(strImgPath);
                Application.Log("file Ext: " + strFileExt);
                string strNewPath = strImgPath.Replace(strFileExt, "_grey.pdf");			
				Application.Log("line 23");


                bool NoVector = img.IsRaster;
                if (NoVector == false){
					Application.Log("line 27");
                    // VECTOR IMAGE (PDF/EPS)
                    string fileArgs = @" -q -dNOPAUSE -dNOPROMPT -dBATCH -sDEVICE=tiffgray -r350 " + " -sOutputFile=\u0022" + strNewPath + "\u0022" + " \u0022" + strImgPath + "\u0022";
                    string result = CallGhostScript(fileArgs);
                    if (result == "True"){
                        // Application.Log("image name       : " + strImgName);
                        // Application.Log("image name       : " + strImgNewName);
                        // Application.Log("old image source : " + strImgPath);
                        Application.Log("File Arguments   : " + fileArgs);
                        // Application.Log("new image source : " + strNewPath);
                        img.Source = strNewPath;
                    }else{
                        Application.Log("GhostScript Error!");
                    }
                }

                if (NoVector == true){
					Application.Log("line 44");
                    // BITMAP IMAGE
                    string fileArgs = @" " + "\u0022" + strImgPath + "\u0022" + " -colorspace Gray -normalize " + "\u0022" + strNewPath + "\u0022";
                    string result = CallImageMagick(fileArgs);
                    if (result == "True"){
						Application.Log("line 65");
                        // Application.Log("image name       : " + strImgName);
                        // Application.Log("image name       : " + strImgNewName);
                        // Application.Log("old image source : " + strImgPath);
                        // Application.Log("File Arguments   : " + fileArgs);
                        // Application.Log("new image source : " + strNewPath);
                        img.Source = strNewPath;
                    }else{
                        Application.Log("ImageMagic Error!");
                    }
                }


            }catch (Pageflex.Scripting.Exceptions.ElementNotVisibleException Image){
                Application.Log("Image Not found");
            }

            catch (Pageflex.Scripting.Exceptions.ElementNotFoundException Image){
                Application.Log("Image Not found");
            }
        }/* 
		if (Application.GetVariable("AD_Style").Value == "Grayscale"){

            Application.Log("Convert To Grey");
            try{
                Document doc = Application.CurrentDocument;

                Image img = (Image)doc.FindElement("backgroundArt");//this is the variable name of the 
                string strImgPath = img.SourceResolved;

                // no image in box
                if (strImgPath.Length == 0) { return; }
                string strFileExt = Path.GetExtension(strImgPath);
                string strNewPath = strImgPath.Replace(strFileExt, "_grey.tif");

                bool NoVector = img.IsRaster;
                if (NoVector == false){
                    // VECTOR IMAGE (PDF/EPS)
                    string fileArgs = @" -q -dNOPAUSE -dNOPROMPT -dBATCH -sDEVICE=tiffgray -r350 " + " -sOutputFile=\u0022" + strNewPath + "\u0022" + " \u0022" + strImgPath + "\u0022";
                    string result = CallGhostScript(fileArgs);
                    if (result == "True"){
                        // Application.Log("image name       : " + strImgName);
                        // Application.Log("image name       : " + strImgNewName);
                        // Application.Log("old image source : " + strImgPath);
                        Application.Log("File Arguments   : " + fileArgs);
                        // Application.Log("new image source : " + strNewPath);
                        img.Source = strNewPath;
                    }else{
                        Application.Log("GhostScript Error!");
                    }
                }

                if (NoVector == true){
                    // BITMAP IMAGE
                    string fileArgs = @" " + "\u0022" + strImgPath + "\u0022" + " -colorspace Gray -normalize " + "\u0022" + strNewPath + "\u0022";
                    string result = CallImageMagick(fileArgs);
                    if (result == "True"){
                        // Application.Log("image name       : " + strImgName);
                        // Application.Log("image name       : " + strImgNewName);
                        // Application.Log("old image source : " + strImgPath);
                        // Application.Log("File Arguments   : " + fileArgs);
                        // Application.Log("new image source : " + strNewPath);
                        img.Source = strNewPath;
                    }else{
                        Application.Log("ImageMagic Error!");
                    }
                }

            }catch (Pageflex.Scripting.Exceptions.ElementNotVisibleException Image){
                Application.Log("Image Not found");
            }

            catch (Pageflex.Scripting.Exceptions.ElementNotFoundException Image){
                Application.Log("Image Not found");
            }
        } */
		
    }
   
	
    // routine to call ImageMagic
    private static string CallImageMagick(string fileArgs){
        Application.Log("CallImageMagick");
        string pathImageMagick = Application.GetVariable("_IMPath").Value;
		Application.Log(pathImageMagick);
        ProcessStartInfo startInfo = new ProcessStartInfo(pathImageMagick);
        startInfo.Arguments = fileArgs;
        startInfo.UseShellExecute = false;
        startInfo.CreateNoWindow = true;
        startInfo.RedirectStandardOutput = true;
        Process exeProcess = Process.Start(startInfo);
        string IMResponse = exeProcess.StandardOutput.ReadToEnd();
        exeProcess.WaitForExit();
        exeProcess.Close();
        if (!string.IsNullOrEmpty(IMResponse)){  
			Application.Log("response is null");
			return IMResponse;
        }else{
            return "True";
        }
     }

    // routine to call GhostScript
    private static string CallGhostScript(string fileArgs){
        Application.Log("CallGhostScript");
        string pathGhostScript = Application.GetVariable("_GSPath").Value;
        ProcessStartInfo startInfo = new ProcessStartInfo(pathGhostScript);
        startInfo.Arguments = fileArgs;
        startInfo.UseShellExecute = false;
        startInfo.CreateNoWindow = true;
        startInfo.RedirectStandardOutput = true;
        Process exeProcess = Process.Start(startInfo);
        string GSResponse = exeProcess.StandardOutput.ReadToEnd();
        exeProcess.WaitForExit();
        exeProcess.Close();
        if (!string.IsNullOrEmpty(GSResponse)){
            return GSResponse;
        }else{
            return "True";
        }
    }
}