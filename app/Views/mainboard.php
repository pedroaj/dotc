<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Defender of The Crown - main board</title>
	<link rel="icon" type="image/x-icon" href="<?php echo base_url(); ?>public/pics/favicon.ico">
	<script src="https://code.jquery.com/jquery-3.4.1.min.js"></script>
	<link href="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-1BmE4kWBq78iYhFldvKuhfTAU6auU8tT94WrHftjDbrCEXSU1oBoqyl2QvZ6jIW3" crossorigin="anonymous">
	<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.1.3/dist/js/bootstrap.bundle.min.js" integrity="sha384-ka7Sk0Gln4gmtz2MlQnikT1wXgYsOg+OMhuP+IlRH9sENBO0LRn5q+8nbTov4+1p" crossorigin="anonymous"></script>
	<?php require_once APPPATH."views/styles.php"; ?>
	<script>
		var base_url = "<?php echo base_url(); ?>";
	</script>
	<script src="<?php echo base_url(); ?>public/js/characters.js"></script>
	<script src="<?php echo base_url(); ?>public/js/locations.js"></script>
	<script src="<?php echo base_url(); ?>public/js/texts.js"></script>
	<script src="<?php echo base_url(); ?>public/js/showactiondiv.js"></script>
	<script src="<?php echo base_url(); ?>public/js/scripts.js"></script>
</head>
<body>

<div id="container">

	<div id="body">

		<div id="menu_container">
			<div id="player_div">
				<div id="leadership"></div>
				<div id="jousting"></div>
				<div id="swordplay"></div>
			</div>
			<div id="army_div" class="dotc_font_submenu">
				Army is at <span id="army_location"></span><br/>
				Men: <span id="number_of_men" class="dotc_font_submenu"></span> / Knights: <span id="number_of_knights" class="dotc_font_submenu"></span><br />Catapults: <span id="number_of_catapults" class="dotc_font_submenu"></span>
			</div>
			<div id="date_div" class="dotc_font_submenu"></div>
			<div id="menu_options" class="dotc_font_menu">
				<ul class="top">
				    <li id="menu_ht"><a href="#" id="hold_tournament" class="dotc_font_menu">Hold Tournament</a></li>
				    <li id="menu_sc"><a href="#" id="seek_conquest" class="dotc_font_menu">Seek Conquest</a>
				    	<ul class="sub">
				    		<li id="menu_sfca"><a href="#" id="send_army" class="dotc_font_submenu">Send forth campaign army</a></li>
				        <li id="menu_tf"><a href="#" id="transfer_forces" class="dotc_font_submenu">Transfer forces</a>
				        	<!-- sub sub menu example
				        	<ul class="sub">
				        		<li><a href="#">SubSubMenu1</a></li>
				            <li><a href="#">SubSubMenu2</a></li>
				          </ul>
				        -->
				        </li>
				      </ul>
				    </li>
				    <li id="menu_gr"><a href="#" id="go_raiding" class="dotc_font_menu">Go Raiding</a></li>
				    <li id="menu_bha"><a href="#" id="buy_home_army" class="dotc_font_menu">Buy Home Army</a></li>
				    <li id="menu_p"><a href="#" id="pass" class="dotc_font_menu">Pass</a></li>
				    <li id="menu_o"><a href="#" id="options" class="dotc_font_menu">Options</a></li>
				    <li id="menu_l"><a href="#" id="logout" class="dotc_font_menu">Logout</a></li>
				</ul>

			</div>
		</div>

		<div id="map_container">

			<div id="info"></div> <!-- show short text, Ex: land name -->

			<div id="game_text"></div> <!-- show game text, Ex: "Select territory" -->

			<div id="character_div">
				<div class="leadership"></div>
				<div class="jousting"></div>
				<div class="swordplay"></div>
			</div>

			<?php require_once APPPATH."libraries/castles_lands.php"; ?>

		</div>

		<div id="action_div" class="actionDiv"></div>

		<div id="modal"></div>

	</div>

</div>

</body>
</html>
