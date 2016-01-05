<?php

	error_reporting(0);
	ini_set('max_execution_time', 120);

	$img_dir = "wanted/";
	$images = scandir($img_dir);
	 	
	$html = '';	 
	$html .= '<div class="main-gallery gallery js-flickity">';

	foreach($images as $img) { 
			
		if($img === '.' || $img === '..') { continue; } 		
	 
		if ((preg_match('/.jpg/', $img)) || (preg_match('/.png/', $img))) {				
	 
			$info 		= pathinfo($img);
			$photoName 	= basename($img,'.'.$info['extension']);

			if(!empty($_GET['search'])) {

				$search = str_replace('"', '', $_GET['search']);
                $search = strtoupper($search);
                
				if($search == strtoupper($photoName) || in_array($search, record($photoName))) {

					$html .= '<div class="gallery-cell" style="border: 1px solid #444;">';
                    $html .= '<a class="fancybox" rel="group" href="'.$img_dir.$img.'">';
					$html .= '<img src="'.$img_dir.$img.'" class="img" title="'.$photoName.'" width="512" />';
                    $html .= '</a>';
					$html .= '</div>'; 
				}
			
			} if(empty($_GET['search'])) {

				$html .= '<div class="gallery-cell" style="border: 1px solid #444;">';
                $html .= '<a class="fancybox" rel="group" href="'.$img_dir.$img.'">';
				$html .= '<img src="'.$img_dir.$img.'" class="img" title="'.$photoName.'" width="512" />';
                $html .= '</a>';
				$html .= '</div>'; 
			}
		
		} else { continue; }	
	
	} 	
	
	$html .= '</div>'; 

	echo $html ;


    function record($value) 
    {
        $aux = explode("-", $value);

        for($i = 0; $i <= count($aux); $i++) {

            $record[] = strtoupper($aux[$i]);
        }

        $aux = null;

        return $record;
    }

/*
    // input word
    getClosestWord('carrrot');

    function getClosestWord($input)
    {
        // array of words to check against
        // this can be an array from a database of words
        $words  = array('apple','pineapple','carrot','pea','bean');

        // no shortest distance found, yet
        $shortest = -1;

        // loop through words to find the closest
        foreach($words as $word)
        {
            $lev = levenshtein($input, $word);

            // check for an exact match
            if ($lev == 0) {

                // closest word is this one (exact match)
                $closest = $word;
                $shortest = 0;

                // break out of the loop; we've found an exact match
                break;
            }

            // if this distance is less than the next found shortest
            // distance, OR if a next shortest word has not yet been found
            if($lev <= $shortest || $shortest < 0) {
                // set the closest match, and shortest distance
                $closest  = $word;
                $shortest = $lev;
            }
        }

        if($shortest == 0) {
            return $closest;
        } else {
            return $closest;
        }
    }
*/
/*

    $matches = array();
    $array = array();
    
    preg_match_all("/(a href\=\")([^\?\"]*)(\")/i", get_text('http://devfest.gdg.mx/images/sponsor/'), $matches);
    
    foreach($matches[2] as $key => $match) {

        if($key > 0) { $array[] = $match; }
    }

	$html = '';	 
	$html .= '<div class="main-gallery gallery js-flickity">';

    for ($i = 0; $i < count($array); $i++) { 

    	$html .= '<div class="gallery-cell"><img src="http://devfest.gdg.mx/images/sponsor/' .$array[$i] . '" class="img" width="512" /></div>';
    }
	
	$html .= '</div>'; 

	echo $html ;

    function get_text($filename) {

    	$content = "";
        $fp_load = fopen("$filename", "rb");
        
        if($fp_load) {
            
            while(!feof($fp_load)) {
                $content .= fgets($fp_load, 8192);
            }

            fclose($fp_load);
        
        	return $content;
        }
    }
*/
?>