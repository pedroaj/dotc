<?php

if(empty($title)) $title = "";
if(empty($text)) $text = "";
if(empty($img)) $img = "";
if(empty($options)) $options = "";
if(empty($result)) $result = "";

echo "
	<span id='result' style='display:none'>$result</span>
	<div class='action_div_title'>$title</div>
	<div class='action_div_text' style='margin-top: 8px;'>$text</div>
	<div class='action_div_image' style='margin-top: 5px;'>$img</div>
	<div class='action_div_subtext'>$options</div>
	<div style='margin-top: 5px;'>
		<button type='button' onclick='closeActionDiv();'>Close</button>
	</div>";
