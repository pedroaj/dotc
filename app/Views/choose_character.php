<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Defender of The Crown - choose your character</title>
	<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"></script>
	<style type="text/css">
		#container, #body
		{
			position: fixed;
	    top: 0;
	    left: 0;
	    width: 100%;
	    height: 100%;
	    background: #000000;
		}
	</style>
	<script src="<?php echo base_url(); ?>public/js/characters.js"></script>
	<script src="<?php echo base_url(); ?>public/js/locations.js"></script>
	<script src="<?php echo base_url(); ?>public/js/texts.js"></script>
	<script src="<?php echo base_url(); ?>public/js/showactiondiv.js"></script>
	<script src="<?php echo base_url(); ?>public/js/scripts.js"></script>
</head>
<body>

<div id="container">

	<div id="body">

		<div id="inner_container" style="max-width: 90%; max-height: 90%; display: block; margin: auto;">
			<svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" viewBox="0 0 1117 700" style="fill:black; float:left">
			  <image width="1117" height="700" xlink:href="<?php echo base_url(); ?>public/pics/choose_character2.png" id="choose_character_pic" style="display: block; margin-left: auto; margin-right: auto;"></image>
			  <a xlink:href="#wilfred" id="wilfred" class="characters">
			    <rect x="16" y="35" fill="#fff" opacity="0" width="491" height="301"></rect>
			  </a><a xlink:href="#cedric" id="cedric" class="characters">
			    <rect x="565" y="36" fill="#fff" opacity="0" width="490" height="297"></rect>
			  </a><a xlink:href="#geoffrey" id="geoffrey" class="characters">
			    <rect x="18" y="382" fill="#fff" opacity="0" width="482" height="295"></rect>
			  </a><a xlink:href="#wolfric" id="wolfric" class="characters">
			    <rect x="567" y="375" fill="#fff" opacity="0" width="489" height="298"></rect>
			  </a>
			</svg>
		</div>

	</div>

</div>

<script>
	$(document).ready(function()
	{
		$(".characters").click(function()
		{
			//alert("id: "+this.id);
			localStorage.character_chosen = this.id;
			location.href = '<?php echo base_url(); ?>?page=mainboard';
			showIncomePlaySound(character_chosen);
		});
	});
</script>

</body>
</html>
