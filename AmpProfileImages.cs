using System;
using System.IO;
using System.Collections.Generic;
using System.Net;
using System.Text;
using System.Diagnostics;
using Pageflex.Scripting;
using Pageflex.Scripting.Exceptions;

public class AMPProfileImages
{
    static public void GetImageFromAPI(string uniqueID, string imageType, string userFolder)
    {
        /* 
         * This fills in the variable with the new image from the server. 
         * 
         * !!ONLY RUN THIS ON BITMAP PREVIEW!!
         * 
         * That will load the images to the server then the other previews can grab the existing images.
         * 
         * imageType possible choices:
         *
         * advisor
         * signature
         * team
         * staff
         *
        */
         Application.Log("uniqueID: " + uniqueID + "; userFolder: " + userFolder);

         if(uniqueID == "")
         {
            Application.Log("No image ID. Terminating.");
            return;
         }

        string urlID = "";

        string baseURL = "http://amptpm.worksmartsuite.com/api/image/getcurrentimage?id=";

        var imageTypes = new Dictionary<string, string>
        {
            {"advisor", "&imagetype=Advisor%20Photo"},
            {"signature", "&imagetype=Advisor%20Signature"},
            {"team", "&imagetype=TeamPhoto"},
            {"staff", "&imagetype=StaffPhoto"}
        };

        try //allow passing either the value or a field containing the value
        {
            urlID = Application.GetVariable(uniqueID).Value;
        }
        catch (Pageflex.Scripting.Exceptions.VariableNotFoundException)
        {

            urlID = uniqueID;
        }

        string fullURL = baseURL + urlID + imageTypes[imageType];
        //Application.Log(fullURL);

        string fullUNC = userFolder + imageType + "_" + urlID + ".jpg";

        if (userFolder != "")
        {
            requestFromServer(fullURL, fullUNC);
        }

    }

    static public void GetMultipleImages(string stringArray, string userFolder)
    {
        /*
         * The string must be written in the following format:
         * "uniqueID imageType|uniqueID imageType"
         * separate each section with a | for as many images need formatted
         * NO commas as Studio will see those as parameter seperations
         */
        //Application.Log("Original string:" + stringArray + "\r\n");

        char[] delimiterChar = { '|' };

        string[] eachSet = stringArray.Split(delimiterChar);

        foreach (string x in eachSet)
        {
            //Application.Log("Substrings: " + x + "\r\n");

            char[] subChar = { ' ' };

            string[] singleImage = x.Split(subChar);

            try
            {
                string testID = Application.GetVariable(singleImage[0]).Value;

                if (testID != "")
                {
                    GetImageFromAPI(singleImage[0], singleImage[1], userFolder);
                }
            }
            catch (Pageflex.Scripting.Exceptions.VariableNotFoundException)
            {
                Application.Log("uniqueID field '" + singleImage[0] + "' does not exist. Image not replaced.\r\n");
            }


        }

    }

    static private byte[] ReadAllBytes(Stream stream)
    {
        /* This replaces this code. It allows for any size image.
         * 
         * using (BinaryReader br = new BinaryReader(responseStream ))
         *  {
         *      imageBytes = br.ReadBytes(500000); //this may need changed to allow bigger images
         *      br.Close();
         *  } 
         */

        using (var ms = new MemoryStream())
        {
            stream.CopyTo(ms);
            return ms.ToArray();
        }
    }

    static private void requestFromServer(string fullURL, string fullImageUNC)
    {
        byte[] imageBytes;
        try //the new image may not exist
        {
            HttpWebRequest imageRequest = (HttpWebRequest)WebRequest.Create(fullURL);
            WebResponse imageResponse = imageRequest.GetResponse();

            Stream responseStream = imageResponse.GetResponseStream();

            imageBytes = ReadAllBytes(responseStream);

            responseStream.Close();
            imageResponse.Close();

            FileStream fs = new FileStream(fullImageUNC, FileMode.Create);
            BinaryWriter bw = new BinaryWriter(fs);
            try
            {
                bw.Write(imageBytes);
            }
            finally
            {
                fs.Close();
                bw.Close();
            }

        }
        catch (WebException)
        {
            Application.Log("Target image " + fullURL + " does not exist. Upload a new one.\r\n");
        }
    }
}