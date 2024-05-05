<?php	

	switch($page)
	{
		default:
		case 'intro': $fs_image = 'title_screen2.png'; $alt = 'Defender of the Crown'; $link = 'intro_text1'; $sound = 'intro.mp3'; break;
		case 'intro_text1': $fs_image = 'intro_text1.png'; $alt = ''; $link = 'intro_text2'; $sound = 'intro_story.mp3'; break;
		case 'intro_text2': $fs_image = 'intro_text2.png'; $alt = ''; $link = 'choose_character'; $sound = 'intro_story.mp3'; break;
	}

?>

<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="utf-8">
	<title>Defender of The Crown</title>
	<script src="https://code.jquery.com/jquery-3.4.1.slim.min.js"></script>
	<style type="text/css">
		#container
		{
			position: fixed;
	    top: 0;
	    left: 0;
	    width: 100%;
	    height: 100%;
		}
		.img-responsive_fsBAK{position: fixed; top: 0; left: 0; min-width: 100%; min-height: 100%;}

		html
		{
			background: url(<?php echo base_url(); ?>/public/pics/<?php echo $fs_image; ?>) no-repeat center center fixed;
		  -webkit-background-size: cover;
		  -moz-background-size: cover;
		  -o-background-size: cover;
		  background-size: cover;
		}
	</style>
</head>
<body>

<div id="container">

	<div id="body">
	</div>

	<?php
	if($sound != '')
	{ ?>
		<audio autoplay="true" src="<?php echo base_url(); ?>/public/sounds/<?php echo $sound; ?>" style="display:none;">
	<?php
	}
	?>

</div>

<script>
	$(document).ready(function()
	{
		$("#container").click(function()
		{
			location.href = '<?php echo base_url(); ?>?page=<?php echo $link; ?>';
		});
	});
</script>

</body>
</html>
