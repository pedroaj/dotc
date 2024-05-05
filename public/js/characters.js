function setCharacters()
{
	// initialize characters arrays
	characters = {};
	characters['wilfred'] = {};
	characters['cedric'] = {};
	characters['geoffrey'] = {};
	characters['wolfric'] = {};
	characters['robin'] = {};
	characters['brian'] = {};
	characters['roger'] = {};
	characters['edmund'] = {};
	characters['philip'] = {};
	characters['reginald'] = {};

	// initialize saxon players
	characters['wilfred']['played_by'] = 'computer';
	characters['cedric']['played_by'] = 'computer';
	characters['geoffrey']['played_by'] = 'computer';
	characters['wolfric']['played_by'] = 'computer';
	characters['robin']['played_by'] = 'computer';

	//console.log("localStorage.character_chosen (function 'setCharacters'): ", localStorage.character_chosen);

	// initialize human player
	switch(localStorage.character_chosen)
	{
		case 'wilfred': characters['wilfred']['played_by'] = 'player'; break;
		case 'cedric': characters['cedric']['played_by'] = 'player'; break;
		case 'geoffrey': characters['geoffrey']['played_by'] = 'player'; break;
		case 'wolfric': characters['wolfric']['played_by'] = 'player'; break;
	}

	// initialize saxon players stats
	characters['wilfred']['fullname'] = "Wilfred of Ivanhoe";
	characters['wilfred']['leadership'] = 0;
	characters['wilfred']['jousting'] = 0;
	characters['wilfred']['swordplay'] = 0;
	characters['wilfred']['color'] = "#0000AA";
	characters['wilfred']['color_dark'] = "#000063";
	characters['wilfred']['side'] = "saxons";
	characters['wilfred']['state'] = "alive";
	characters['wilfred']['gold'] = 0;
	characters['wilfred']['leadership_points'] = 600;
	characters['wilfred']['jousting_points'] = 600;
	characters['wilfred']['swordplay_points'] = 600;

	characters['cedric']['fullname'] = "Cedric of Rotherwood";
	characters['cedric']['leadership'] = 0;
	characters['cedric']['jousting'] = 0;
	characters['cedric']['swordplay'] = 0;
	characters['cedric']['color'] = "#55FFFF";
	characters['cedric']['color_dark'] = "#216363";
	characters['cedric']['side'] = "saxons";
	characters['cedric']['state'] = "alive";
	characters['cedric']['gold'] = 0;
	characters['cedric']['leadership_points'] = 900;
	characters['cedric']['jousting_points'] = 500;
	characters['cedric']['swordplay_points'] = 400;

	characters['geoffrey']['fullname'] = "Geoffrey Longsword";
	characters['geoffrey']['leadership'] = 0;
	characters['geoffrey']['jousting'] = 0;
	characters['geoffrey']['swordplay'] = 0;
	characters['geoffrey']['color'] = "#556B2F";
	characters['geoffrey']['color_dark'] = "#3A4920";
	characters['geoffrey']['side'] = "saxons";
	characters['geoffrey']['state'] = "alive";
	characters['geoffrey']['gold'] = 0;
	characters['geoffrey']['leadership_points'] = 500;
	characters['geoffrey']['jousting_points'] = 400;
	characters['geoffrey']['swordplay_points'] = 900;

	characters['wolfric']['fullname'] = "Wolfric the Wild";
	characters['wolfric']['leadership'] = 0;
	characters['wolfric']['jousting'] = 0;
	characters['wolfric']['swordplay'] = 0;
	characters['wolfric']['color'] = "#0094FF";
	characters['wolfric']['color_dark'] = "#005DA0";
	characters['wolfric']['side'] = "saxons";
	characters['wolfric']['state'] = "alive";
	characters['wolfric']['gold'] = 0;
	characters['wolfric']['leadership_points'] = 500;
	characters['wolfric']['jousting_points'] = 900;
	characters['wolfric']['swordplay_points'] = 400;

	characters['robin']['fullname'] = "Robin of Locksley";
	characters['robin']['leadership'] = 0;
	characters['robin']['jousting'] = 0;
	characters['robin']['swordplay'] = 0;
	characters['robin']['color'] = "#00A50D";
	characters['robin']['color_dark'] = "#003803";
	characters['robin']['side'] = "saxons";
	characters['robin']['state'] = "alive";
	characters['robin']['gold'] = 0;
	characters['robin']['leadership_points'] = 900;
	characters['robin']['jousting_points'] = 100;
	characters['robin']['swordplay_points'] = 800;

	// initialize special saxon player: robin of locksley (Robin Hood)
	characters['robin']['home_castle'] = 'Nottinghamshire';
	characters['robin']['army_location'] = 'Nottinghamshire';

	// initialize norman players
	characters['brian']['played_by'] = 'computer';
	characters['roger']['played_by'] = 'computer';
	characters['edmund']['played_by'] = 'computer';
	characters['philip']['played_by'] = 'computer';
	characters['reginald']['played_by'] = 'computer';

	// initialize norman players stats
	characters['brian']['fullname'] = "Brian de Bois-Guilbert";
	characters['brian']['leadership'] = 0;
	characters['brian']['jousting'] = 0;
	characters['brian']['swordplay'] = 0;
	characters['brian']['color'] = "#633100"; // dark brown
	characters['brian']['color_dark'] = "#512700";
	characters['brian']['side'] = "normans";
	characters['brian']['state'] = "alive";
	characters['brian']['gold'] = 0;
	characters['brian']['leadership_points'] = 800;
	characters['brian']['jousting_points'] = 800;
	characters['brian']['swordplay_points'] = 800;

	characters['philip']['fullname'] = "Philip Malvoisin";
	characters['philip']['leadership'] = 0;
	characters['philip']['jousting'] = 0;
	characters['philip']['swordplay'] = 0;
	characters['philip']['color'] = "#AA0000"; // dark red
	characters['philip']['color_dark'] = "#700000";
	characters['philip']['side'] = "normans";
	characters['philip']['state'] = "alive";
	characters['philip']['gold'] = 0;
	characters['philip']['leadership_points'] = 600;
	characters['philip']['jousting_points'] = 700;
	characters['philip']['swordplay_points'] = 500;

	characters['reginald']['fullname'] = "Reginald Front-de-Boeuf";
	characters['reginald']['leadership'] = 0;
	characters['reginald']['jousting'] = 0;
	characters['reginald']['swordplay'] = 0;
	characters['reginald']['color'] = "#FF5555"; // light red
	characters['reginald']['color_dark'] = "#872D2D";
	characters['reginald']['side'] = "normans";
	characters['reginald']['state'] = "alive";
	characters['reginald']['gold'] = 0;
	characters['reginald']['leadership_points'] = 600;
	characters['reginald']['jousting_points'] = 700;
	characters['reginald']['swordplay_points'] = 800;

	characters['edmund']['fullname'] = "Edmund the Grim";
	characters['edmund']['leadership'] = 0;
	characters['edmund']['jousting'] = 0;
	characters['edmund']['swordplay'] = 0;
	characters['edmund']['color'] = "#AA5500"; // light brown
	characters['edmund']['color_dark'] = "#7F3F00";
	characters['edmund']['side'] = "normans";
	characters['edmund']['state'] = "alive";
	characters['edmund']['gold'] = 0;
	characters['edmund']['leadership_points'] = 800;
	characters['edmund']['jousting_points'] = 600;
	characters['edmund']['swordplay_points'] = 700;

	characters['roger']['fullname'] = "Roger Falconbridge";
	characters['roger']['leadership'] = 0;
	characters['roger']['jousting'] = 0;
	characters['roger']['swordplay'] = 0;
	characters['roger']['color'] = "#FF6A00"; // orange
	characters['roger']['color_dark'] = "#9E3F00";
	characters['roger']['side'] = "normans";
	characters['roger']['state'] = "alive";
	characters['roger']['gold'] = 0;
	characters['roger']['leadership_points'] = 800;
	characters['roger']['jousting_points'] = 700;
	characters['roger']['swordplay_points'] = 800;

	// set initial armies, everyone starts with an army of 10 men only
	for(const character of Object.entries(characters))
	{
		characters[character[0]]['men'] = 10;
		characters[character[0]]['knights'] = 0;
		characters[character[0]]['catapults'] = 0;
	}

	// set initial allies
	for(character in characters)
	{
		if(characters[character]['side'] == "saxons")
		{
			characters[character]['allies']	= ["wilfred","cedric","geoffrey","wolfric","robin"];
		}
		else // player is norman
		{
			characters[character]['allies']	= ["brian","roger","edmund","philip","reginald"];
		}
		const index = characters[character]['allies'].indexOf(character);
		characters[character]['allies'].splice(index, 1); // remove himself from array
	}

	localStorage.characters = JSON.stringify(characters);
	//console.log("localStorage.characters (function 'setCharacters'): ", localStorage.characters);
}
