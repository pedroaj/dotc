<style type="text/css">

#container, #body
{
	position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  /*background: slategray;*/
  background: #000000;
}

#menu_container{width: 315px; height: 800px; display: block; margin: auto; float: left; border: 0px solid blue;}
#map_container{position: relative; width: 70%; height: 99%; display: block; margin: auto; float: left; overflow:hidden; border: 0px solid red;}

svg {fill:black; float:left; border: 0px solid yellow;}

.land{fill: #FFFF55; fill-opacity: 1; stroke:black; stroke-opacity: 1; stroke-width:1.5;}
/*a:hover .land {fill: #C4C442;}*/

#player_div
{
	/*background-image: url('<?php //echo base_url(); ?>public/pics/<?php //echo $_SESSION['character']; ?>.png');*/
	background-repeat:no-repeat;
	background-size:contain;
	height:197px;width:310px;
}
#leadership{position: relative; top: 106px; left: 263px; font: bold 18px "Times New Roman", Arial;}
#jousting{position: relative; top: 107px; left: 263px; font: bold 18px "Times New Roman", Arial;}
#swordplay{position: relative; top: 108px; left: 263px; font: bold 18px "Times New Roman", Arial;}

.leadership{position: relative; top: 106px; left: 263px; font: bold 18px "Times New Roman", Arial;}
.jousting{position: relative; top: 107px; left: 263px; font: bold 18px "Times New Roman", Arial;}
.swordplay{position: relative; top: 108px; left: 263px; font: bold 18px "Times New Roman", Arial;}

[class*="_castle"]
{
	pointer-events: none;
}

#army_div
{
	left: 0px;
  position: relative;
  top: 10px;
  background: url(<?php echo base_url();?>public/pics/generic_background.png);
  background-size: 306px 83px;
  background-repeat: no-repeat;
  padding-left: 40px;
  padding-top: 12px;
  padding-bottom: 10px;
}

#date_div
{
	left: 0px;
  position: relative;
  top: 10px;
  background: url(<?php echo base_url();?>public/pics/generic_background.png);
  background-size: 306px 44px;
  background-repeat: no-repeat;
  padding-left: 40px;
  padding-top: 12px;
  padding-bottom: 10px;
}

.game_icon
{
	font: bold 18px "Times New Roman", Arial;
	color: #FFFFFF;
	text-decoration: none;
}

.dotc_font_menu
{
	font: bold 22px "Times New Roman", Arial;
	color: #000000;
	text-decoration: none;
}

.dotc_font_submenu
{
	font: bold 18px "Times New Roman", Arial;
	color: #000000;
	text-decoration: none;
}

#menu_options
{
	left: 0px;
  position: relative;
  top: 10px;
  background: url(<?php echo base_url();?>public/pics/generic_background.png);
  background-size: 306px 275px;
  background-repeat: no-repeat;
  padding-left: 10px;
  padding-top: 25px;
  padding-bottom: 50px;
}

.sub
{
	display:none;
}

ul
{
  list-style-type: none;
}

#info
{
	position: absolute;
  width: 250px;
  height: 60px;
  top: 10px;
  left: 25px;
  font: bold 21px "Times New Roman", Arial;
  background: url(<?php echo base_url();?>public/pics/generic_background.png);
  background-size: 252px 60px;
  background-repeat: no-repeat;
  padding-top: 4px;
  text-align: center;
  padding-left: 20px;
  padding-right: 20px;
  display: none;
}

#game_text
{
	position: absolute;
  width: 305px;
  height: 160px;
  top: 10px;
  right: 0px;
  font: bold 21px "Times New Roman", Arial;
  background: url(<?php echo base_url();?>public/pics/generic_background.png);
  background-size: 310px 163px;
  background-repeat: no-repeat;
  padding: 19px 35px 10px 35px;
  text-align: center;
  display: none;
}

.actionDiv
{
	position: absolute;
  width: 460px;
  height: 500px;
  top: 340px;
  left: 10px;
  font: bold 21px "Times New Roman", Arial;
  color: #ffffff;
  padding-top: 5px;
  padding-left: 5px;
  padding-right: 5px;
  text-align: center;
  display: none;
  border: 0px solid blue;
  z-index: 1000;
  opacity: 0.9;
  background-color: #000000;
  border: 10px ridge #FFFF55;
  /*box-shadow: 10px 10px 5px grey;*/
}

.action_div_title
{
	font: bold 24px "Times New Roman", Arial;
  color: #ffffff;
}

.action_div_text
{
	font: bold 20px "Times New Roman", Arial;
  color: #ffffff;
}

.action_div_links
{
	font: normal 18px "Times New Roman", Arial;
	color: #FFFFFF;
	text-decoration: none;
}

.action_div_smalltext
{
	font: normal 16px "Times New Roman", Arial;
	color: #FFFFFF;
}

#action_div_players_stats
{
	position: absolute;
	width: 300px;
	left: 85px;
}

#action_div_fight
{
	position: absolute;
  border: 0px solid yellow;
  top: 72px;
  left: 1px;
  width: 99%;
  height: 205px;
}

#action_div_armies
{
	position: absolute;
	border: 0px solid green;
	top: 1px;
  left: 1px;
  width: 99%;
  height: 65%;
}

#action_div_strategy
{
	position: absolute;
	border: 0px solid red;
	top: 137px;
  left: 1px;
  width: 99%;
  height: 66px;
}

.action_div_button_close
{
  position: absolute;
  bottom: 1px;
  left: 43%;
}

.font19{font: bold 19px "Times New Roman", Arial; color: #ffffff;}
.font17{font: bold 17px "Times New Roman", Arial; color: #ffffff;}
.font16{font: bold 16px "Times New Roman", Arial; color: #ffffff;}
.font15{font: bold 15px "Times New Roman", Arial; color: #ffffff;}
.font15b{font: bold 15px "Times New Roman", Arial; color: #000000;}
.font17b{font: bold 17px "Times New Roman", Arial; color: #000000;}
.font15y{font: bold 15px "Times New Roman", Arial; color: #FFFF55;}

#character_div
{
	position: absolute;
	background-repeat: no-repeat;
	background-size: contain;
	height: 197px; width: 310px;
	/*margin-top: 28px;*/
	top: 1px;
	right: 1px;
	display: block;
}

#army
{
	position:absolute;
	width: 25px;
	/*height: 30px;*/
	z-index: 100;
	display:none;
}

a:hover .pointer {cursor: pointer;}

#modal
{
	position: absolute;
	width: 41%;
	height: 90%;
	z-index: 10000;
	color: blue;
	opacity: 0.01;
	display: none;
}

</style>
