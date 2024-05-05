<?php

/**
* show - Shows the input var with print_r, using echo and die
*
* @param $var
* @param $die (optional, default is true)
* @param $varname (optional, default is blank)
* @return var (with print_r)
*/
if ( ! function_exists('show'))
{
    function show($var, $varname = '', $die = false)
    {
    	echo '<pre>'.$varname.': '.print_r($var,1).'</pre>';
    	if($die) die;
    }
}

/**
* shorten - Limits a string of text and optionally adds '...' to its end
*
* @param $text
* @param $limit (maximum size of text, default is 50 characters)
* @param $dots (optional, default is true)
* @return $text (shortened)
*/
if(!function_exists('shorten'))
{
    function shorten($text, $limit = 50, $dots = true)
    {
      if(strlen($text) > $limit)
      {
        $temp = substr($text,0,$limit);
        $temp = reverse_strrchr($temp, " ");
      }
      else $temp = $text;

      // replace "'" with "\'"
      //$temp = str_replace("'", "\'", $temp);

      if($dots) $temp = $temp . "...";
      return $temp;
    }
}

// used in function "shorten"
function reverse_strrchr($haystack, $needle)
{
    $pos = strrpos($haystack, $needle);
    if($pos === false) {
        return $haystack;
    }
    return substr($haystack, 0, $pos);
}

/**
* getimgsize - Retrieve an image's width and height without using php's getimagesize
*
* @param $url
* @param $referer (optional, default is blank)
* @return array
*/
if ( ! function_exists('getimgsize'))
{
    function getimgsize($url, $referer = '')
    {
      $headers = array('Range: bytes=0-32768');

      /* Hint: you could extract the referer from the url */
      if (!empty($referer)) array_push($headers, 'Referer: '.$referer);

      $curl = curl_init($url);
      curl_setopt($curl, CURLOPT_HTTPHEADER, $headers);
      curl_setopt($curl, CURLOPT_RETURNTRANSFER, 1);
      $data = curl_exec($curl);
      curl_close($curl);

      $image = @imagecreatefromstring($data);

      $return = array(imagesx($image), imagesy($image));

      imagedestroy($image);

      return $return;
    }
}

/**
* generateRandomString - returns a random string
*
* @param $length - optional, default is 20
* @return string $url
*/
if ( ! function_exists('generateRandomString'))
{
  function generateRandomString($length = 20)
  {
    $characters = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
    $charactersLength = strlen($characters);
    $randomString = '';
    for($i = 0; $i < $length; $i++)
    {
      $randomString .= $characters[rand(0, $charactersLength - 1)];
    }
    return $randomString;
  }
}

?>
