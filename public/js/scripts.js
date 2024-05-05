SAXONS = ["wilfred", "cedric", "geoffrey", "wolfric", "robin"];
NORMANS = ["brian", "roger", "edmund", "philip", "reginald"];
const DEFAULT_LAND_COLOR = "#FFFF55";
const PLAYER_LAND_COLOR = "#00AAAA";

var logMsg = "";

function setPlayerDiv()
{
	if(typeof localStorage.character_chosen == 'undefined')
	{
		return false; // game has not started yet!
	}

	var characters = getCharacters();
	var img_path = base_url + "public/pics/"+localStorage.character_chosen+".png";
	//console.log("img_path: ", img_path);
	$("#player_div").css("background-image","url("+img_path+")");
	$("#leadership").html(characters[localStorage.character_chosen]['leadership']);
	$("#jousting").html(characters[localStorage.character_chosen]['jousting']);
	$("#swordplay").html(characters[localStorage.character_chosen]['swordplay']);
	$("#player_div").show();
}

function setArmyDiv(land) // shows army composition and location on main screen (in a div)
{
	if(typeof localStorage.character_chosen == 'undefined')
	{
		return false; // game has not started yet!
	}

	if(typeof land == "undefined"){
		land = getArmyLocation();
	}

	var characters = getCharacters();
	$("#army_location").html(land);
	$("#number_of_men").html(characters[localStorage.character_chosen]['men']);
	$("#number_of_knights").html(characters[localStorage.character_chosen]['knights']);
	$("#number_of_catapults").html(characters[localStorage.character_chosen]['catapults']);
}

function getSetInitialValues() // this function should only be called once, at the start of the game!
{
	//console.log("Entering function 'getSetInitialValues'!");

	// set initial date or reload date
	if(localStorage.getItem("date") === null)
	{
		$("#date_div").html("September 1149");
	}
	else $("#date_div").html(localStorage.date);

	if(localStorage.hasOwnProperty('game_started')) return;

	setCharacters();
	setMapLocations();
	setBasicSkills();

	localStorage.game_started = "yes";
	localStorage.character_action_outcome = "";
	localStorage.date = "September 1149";
	localStorage.character_index = 0;
	//localStorage.temp = "";

	//console.log("Leaving function 'getSetInitialValues'!");
	//alert("Leaving function 'getSetInitialValues'!");
}

function randomID(length)
{	
	var result = '';
  	var characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
	for(var i = 0; i < length; i++ )
	{
		result += characters.charAt(Math.floor(Math.random() * characters.length));
	}
  	return result;
}

$(document).ready(function()
{
	//console.log("this (doc ready): ", $(this));

	if(typeof localStorage.character_chosen == 'undefined')
	{
		return false; // game has not started yet!
	}

	getSetInitialValues();
	showArmyLocation();
	resetLandsColors();
	setPlayerDiv();
	setArmyDiv();

	// get first income for human player
	var current_date = $("#date_div").html();
	var temp = current_date.split(" ");
	var year = temp[1];
	var month = temp[0];
	if(year == 1149 && month == "September") getMonthlyIncome(localStorage.character_chosen);

	$("ul.top li").click(function()
	{
		$(this).children("ul.sub").slideToggle();
	});

	var timeoutId;
	$("path.land").hover(function() // this function has to be inside document.ready !!!
	{
		var current_stroke_color = "";
		var current_stroke_width = "";
		let locations = getLocations();

		var name = $(this).attr("id");
		if(typeof name == "undefined")
		{
			name = $(this).attr("title");
		}
		//console.log("title (land hover): ", title);

		var cssclass = $(this).attr("class");

		//console.log("cssclass (land hover): ", cssclass);

		current_stroke_color = $(this).css("stroke");
		current_stroke_width = $(this).css("stroke-width");

		//console.log("current_stroke_color (land hover): ", current_stroke_color); console.log("current_stroke_width (land hover): ", current_stroke_width);

		if(cssclass == "land" && current_stroke_width != '3px')
		{
			$(this).css({"stroke": "black", "stroke-width": "1.5px"});
		}

		var id = $(this).attr("id");
		var title = $(this).attr("title");
		var thisclass = $(this).attr("class");
		var fill = $(this).css("fill");

		//console.log("title (1): ", title); console.log("id (1): ", id); console.log("thisclass: ", thisclass); console.log("fill: ", fill); console.log("name: ", name);

		if(!timeoutId)
		{
			timeoutId = window.setTimeout(function()
			{
				timeoutId = null;
				$("#info").fadeIn(function()
				{
					if(locations[name]['owner'] == "")
					{
						var info = name + "<br /><font class='font17b'>Men: "+locations[name]['men']+", Gold: "+locations[name]['income']+"</font>";
					}
					else var info = name;
					$("#info").html(info);

					// console.log("title (2): ", title); console.log("id (2): ", id); //console.log("thisclass: ", thisclass); console.log("fill: ", fill);

					if(typeof name !== "undefined" && !name.includes("castle") && !name.includes("forest"))
					{
						var land_info = getLandInfo(name);
						var human_player = getHumanPlayer();

						//console.log("name (land hover): ", name); console.log("land_info (land hover): ", land_info);

						if(land_info['owner'] != "") // if land belongs to someone
						{
		    			if(land_info['owner'] == human_player[0]) // if land belongs to human player show that land's army composition
		    			{
		    				$("#game_text").fadeIn().html("Men: "+land_info['men']+"<br />Knights: "+land_info['knights']+"<br />Catapults: "+land_info['catapults']+"<br /><br />Income: "+land_info['income']);
		    			}
		    			else
		    			{
		    				//console.log("land_info['character']['leadership'] (land hover): ", land_info['character']['leadership']);

		    				var img_path = base_url + "public/pics/"+land_info['owner']+".png";
		    				$("#character_div").css("background-image","url("+img_path+")");
								$("#character_div .leadership").html(land_info['character']['leadership']);
			    			$("#character_div .jousting").html(land_info['character']['jousting']);
			    			$("#character_div .swordplay").html(land_info['character']['swordplay']);
			    			$("#character_div").show();
		    			}
						}
					}
				});
			},300);
		}
	},
	function()
	{
		var cssclass = $(this).attr("class");
		var current_stroke_color = $(this).css("stroke");
		var current_stroke_width = $(this).css("stroke-width");

		if(cssclass == "land" && current_stroke_width != '3px')
		{
			$(this).css({"stroke": current_stroke_color, "stroke-width": "1.5px"});
		}

		if(timeoutId){window.clearTimeout(timeoutId);timeoutId = null;}
		else
			{
				$("#info").fadeOut(function()
				{
					$("#info").html("");
					$("#character_div").hide();
				});
				$("#game_text").fadeOut();
			}
	});


	/*
	var coords = document.getElementById("Lancashire").getBoundingClientRect();
  console.log("(Doc ready), coords: ", coords);
	var top = coords.top - (coords.height / 2);
  var left = coords.left - 315 + (coords.width / 2);
  console.log("(Doc ready), Lancashire top: "+top+", left: "+left);
  var leftOffset = ((Math.floor(document.getElementById("Lancashire").getBoundingClientRect().width)) - 1200) / 2;
  var topOffset = ((Math.floor(document.getElementById("Lancashire").getBoundingClientRect().height)) - 1000) / 2;
  console.log("(Doc ready), Lancashire topOffset: "+topOffset+", leftOffset: "+leftOffset);

	  bottom: 542 (271)
		height: 113 (56)
		left: 659 (330)
		right: 738 (370)
		top: 428 (215)
		width: 79 (40)
		x: 659 (330)
		y: 428 (215)
	  given: 371 / 384 ; correct: 488 / 375
	  mouse coords: 495 / 700
	*/

 /*
  coords = document.getElementById("Anglesey").getBoundingClientRect();
  console.log("(Doc ready), coords: ", coords);
  top = parseInt(parseInt(coords.top) - (parseInt(coords.height) / 2));
  left = parseInt(parseInt(coords.left) - 315 + (parseInt(coords.width) / 2));
  console.log("(Doc ready), Anglesey top: "+top+", left: "+left);
  	bottom: 564 (282)
		height: 37 (19)
		left: 540 (270)
		right: 589 (295)
		top: 527 (265)
		width: 48 (25)
		x: 540 (270)
		y: 527 (265)
  	given: 508 / 249 ; correct: 536 / 241
  	mouse coords: 542 / 562

	var bodyRect = document.body.getBoundingClientRect();
  console.log("bodyrect: ", bodyRect);
 */

 //console.log("Leaving doc ready!");

 // battle simulation!
 /*
 let locations = getLocations();
 let characters = getCharacters();
 characters['wilfred']['men'] = 2390;
 characters['wilfred']['knights'] = 5;
 characters['wilfred']['catapults'] = 5;
 //characters['wilfred']['leadership'] = 6;
 //characters['reginald']['leadership'] = 6;
 locations['Kent']['owner'] = "reginald";
 locations['Kent']['men'] = 0;
 locations['Kent']['knights'] = 1000;
 locations['Kent']['catapults'] = 0;
 saveLocations(locations);
 saveCharacters(characters);
 var battleResult = getBattleResult('wilfred', 'Kent');
 console.log("battleResult: ", battleResult);
 */
});

function saveToLog(text)
{
	//console.log("base_url (function 'SaveToLog' in scripts.js file): ", base_url);
	$.ajax({
	 	method: "POST",
	  	url: base_url + "main/save_to_log",
	  	data: {text: text},
	  	async: false
	  })
	  .done(function(){
	  	//console.log("Write to log successful!");
	  })
	  .fail(function(){
	  	console.log("ajax error while trying to write to log...");
	  });
}

function* findPaths(graph, src, dst, path=[], visited=(new Set()))
{
  if (src === dst) {
    yield path.concat(dst);
  }
  else if (graph[src] && !visited.has(src)) {
    visited.add(src);
    path.push(src);

    for (const neighbor of graph[src]) {
      yield *findPaths(graph, neighbor, dst, path, visited);
    }

    visited.delete(src);
    path.pop(src);
  }
};

function findPath(start_land, end_land, character)
{
	var routes = [];
 	let locations = getLocations();
 	var temp = {};

	for(const land of Object.entries(locations))
	{
		if(land[1]['owner'] != character) continue; // both ends of route must belong to character!
		for(const borderland of Object.entries(land[1]['borders']))
		{
			if(locations[borderland[1]]['owner'] != character) continue; // both ends of route must belong to character!
			temp = {V1: land[1]['name'], V2: borderland[1]};
		  routes.push(temp);
		}
	}
 	//console.log("routes: ", routes);

	const graphify = routes => {
  	const graph = {};

  	for(const node of routes){
    	if(!graph[node.V1]) {
      	graph[node.V1] = [];
    	}
    graph[node.V1].push(node.V2)
  	}
  	return graph;
	};

	let generator = findPaths(graphify(routes), start_land, end_land);

	var found = false;
	for(let value of generator)
	{
		if(value != "")
  	{
  		//console.log(value);
  		saveToLog("Function 'findPath', value: "+JSON.stringify(value));
    	found = true;
    	break; // onyl need one path
  	}
	}

	//console.log("found: ", found);
	return found;
}

function getBattleResult(character, land_to)
{
	console.log("Function 'getBattleResult', character: "+character+", land_to: "+land_to);

	let characters = getCharacters();
	let locations = JSON.parse(localStorage.locations); // to-do: create function getLocations() and possibly also saveLocations()

	//console.log("Function 'getBattleResult', after gathering forces from land attacked, player2_men: "+player2_men+", player2_knights: "+player2_knights+", player2_catapults: "+player2_catapults);

	// get attacker's army & leadership
	var player1 = character;
	var player1_men = characters[character]['men'];
	var player1_knights = characters[character]['knights'];
	var player1_catapults = characters[character]['catapults'];
	var player1_leadership = characters[character]['leadership'];
	var player1_raw_numbers = player1_men + (player1_knights * 8);

	console.log("Function 'getBattleResult', player1: "+player1+", player1_men: "+player1_men+",  player1_knights: "+player1_knights+", player1_catapults: "+player1_catapults+", player1_leadership: "+player1_leadership+", player1_raw_numbers: "+player1_raw_numbers);

	// get defender's army & leadership
	var player2 = locations[land_to]['owner'];
	var player2_men = 0;
	var player2_knights = 0;
	var player2_catapults = 0;

	// if players's army in on the same land being attacked
	var player2_army_location = getArmyLocation(player2);
	console.log("Function 'getBattleResult', player2_army_location: "+player2_army_location);
	if(player2_army_location == land_to)
	{
		player2_men += characters[player2]['men'];
		player2_knights += characters[player2]['knights'];
		player2_catapults += characters[player2]['catapults'];
	}

	// any troops on the land being attacked join the defender's army (if any)
	player2_men += locations[land_to]['men'];
	player2_knights += locations[land_to]['knights'];
	player2_catapults += locations[land_to]['catapults'];

	// all forces from land are transfered to player2's army
	locations[land_to]['men'] = 0;
	locations[land_to]['knights'] = 0;
	locations[land_to]['catapults'] = 0;

	var player2_leadership = characters[player2]['leadership'];
	var player2_raw_numbers = player2_men + (player2_knights * 8);

	logMsg = "Function 'getBattleResult' (before battle starts), player1: "+player1+", player1_men: "+player1_men+",  player1_knights: "+player1_knights+", player1_catapults: "+player1_catapults+", player1_leadership: "+player1_leadership+", player1_raw_numbers: "+player1_raw_numbers+", player2: "+player2+", player2_men: "+player2_men+",  player2_knights: "+player2_knights+", player2_catapults: "+player2_catapults+", player2_leadership: "+player2_leadership+", player2_raw_numbers: "+player2_raw_numbers;
	console.log(logMsg);
	saveToLog(logMsg);

	//console.log("Function 'getBattleResult', player2: "+player2+", player2_men: "+player2_men+",  player2_knights: "+player2_knights+", player2_catapults: "+player2_catapults+", player2_leadership: "+player2_leadership+", player2_raw_numbers: "+player2_raw_numbers);

	var battle_result = [];
	var number_of_kills = 0;
	var winner = "";
	var catapults_destroyed_p1 = 0;
	var catapults_destroyed_p2 = 0;

	var player1_men_start = player1_men;
	var player2_men_start = player2_men;
	var player1_knights_start = player1_knights;
	var player2_knights_start = player2_knights;
	var player1_catapults_start = player1_catapults;
	var player2_catapults_start = player2_catapults;

	var knights_killed = 0;

	// men battle (with the help of knights, who can also die!)
	while(player1_men > 0)
	{
		number_of_kills_p1 = Math.floor(player1_raw_numbers * player1_leadership / 10);
		number_of_kills_p2 = Math.floor(player2_raw_numbers * player2_leadership / 10);
		console.log("Function 'getBattleResult' (men battle), number_of_kills_p1: "+number_of_kills_p1+", number_of_kills_p2: "+number_of_kills_p2);

		// catapults attack! (if any)
		var number_of_kills_p1_catapults = player1_catapults * (Math.floor(Math.random() * (5 - 1)) + 1);
		var number_of_kills_p2_catapults = player2_catapults * (Math.floor(Math.random() * (5 - 1)) + 1);
		console.log("Function 'getBattleResult' (catapults kills during men battle), number_of_kills_p1_catapults: "+number_of_kills_p1_catapults+", number_of_kills_p2_catapults: "+number_of_kills_p2_catapults);

		// some catapults are destroyed (if both armies are balanced)
		if(player1_catapults > 0 && ((player1_men / player2_men) < 4))
		{
			//catapults_destroyed_p1 = Math.floor((player1_catapults/100)*(Math.floor(Math.random() * (50 - 5)) + 5));
			catapults_destroyed_p1 = Math.floor(player2_men / player1_catapults / 2);
			player1_catapults -= catapults_destroyed_p1;
		}
		if(player2_catapults > 0 && ((player2_men / player1_men) < 4))
		{
			//catapults_destroyed_p2 = Math.floor((player2_catapults/100)*(Math.floor(Math.random() * (50 - 5)) + 5));
			catapults_destroyed_p2 = Math.floor(player1_men / player2_catapults / 2);
			player2_catapults -= catapults_destroyed_p2;
		}
		console.log("Function 'getBattleResult' (men battle), player1_catapults destroyed: "+catapults_destroyed_p1+", player2_catapults destroyed: "+catapults_destroyed_p2);

		player1_men -= (number_of_kills_p2 + number_of_kills_p2_catapults);
		player2_men -= (number_of_kills_p1 + number_of_kills_p1_catapults);
		if(player1_men <= 0)
		{
			console.log("Function 'getBattleResult' (men battle), all men from player1 are dead! player1_men: "+player1_men+", player2_men: "+player2_men);

			// check if player1 knights were killed
			if(player1_men < 0)
			{
				knights_killed = Math.floor(Math.abs(player1_men) / 8);
				player1_knights -= knights_killed;
				console.log("Function 'getBattleResult' (men battle), "+knights_killed+" knights were killed! player1 knights left: "+player1_knights);
			}

			player1_men = 0;
		}
		if(player2_men <= 0)
		{
			console.log("Function 'getBattleResult' (men battle), all men from player2 are dead! player1_men: "+player1_men+", player2_men: "+player2_men);

			// check if player2 knights were killed
			if(player2_men < 0)
			{
				knights_killed = Math.floor(Math.abs(player2_men) / 8);
				player2_knights -= knights_killed;
				console.log("Function 'getBattleResult' (men battle), "+knights_killed+" knights were killed! player2 knights left: "+player2_knights);
			}

			player2_men = 0;
			break;
		}

		console.log("Function 'getBattleResult' (men battle raging on), player1_men: "+player1_men+", player2_men: "+player2_men);
	}

	// fix for negative values (this can happen)
	if(player1_men < 0) player1_men = 0;
	if(player2_men < 0) player2_men = 0;
	if(player1_knights < 0) player1_knights = 0;
	if(player2_knights < 0) player2_knights = 0;
	if(player1_catapults < 0) player1_catapults = 0;
	if(player2_catapults < 0) player2_catapults = 0;

	console.log("Function 'getBattleResult' (after men battle), player1_men: "+player1_men+",  player2_men: "+player2_men+", player1_knights: "+player1_knights+", player2_knights: "+player2_knights+", player1_catapults: "+player1_catapults+", player2_catapults: "+player2_catapults);

	// recalculate raw numbers
	player1_raw_numbers = player1_men + (player1_knights * 8);
	player2_raw_numbers = player2_men + (player2_knights * 8);
	console.log("Function 'getBattleResult' (before knights battle), player1_men: "+player1_men+",  player2_men: "+player2_men+", player1_knights: "+player1_knights+", player2_knights: "+player2_knights+", player1_raw_numbers: "+player1_raw_numbers+", player2_raw_numbers: "+player2_raw_numbers);

	// knights battle
	while(player1_knights > 0)
	{
		//number_of_kills_p1 = Math.floor(player1_raw_numbers * player1_leadership / 10);
		//number_of_kills_p2 = Math.floor(player2_raw_numbers * player2_leadership / 10);
		number_of_kills_p1 = Math.floor(player1_knights * player1_leadership / 10);
		number_of_kills_p2 = Math.floor(player2_knights * player2_leadership / 10);

		player1_knights -= number_of_kills_p2;
		player2_knights -= number_of_kills_p1;
		if(player1_knights <= 0)
		{
			player1_knights = 0;
			break;
		}
		if(player2_knights <= 0)
		{
			player2_knights = 0;
			break;
		}
	}

	// fix for negative values (this can happen)
	if(player1_knights < 0) player1_knights = 0;
	if(player2_knights < 0) player2_knights = 0;

	console.log("Function 'getBattleResult' (after knights battle), player1_knights: "+player1_knights+",  player2_knights: "+player2_knights);

	// remaining men VS remaining knights battle
	if(player1_men > 0 && player2_knights > 0)
	{
		// player1's men fight against player2's knights!
		while(player1_men > 0)
		{
			number_of_kills_p1 = Math.floor(player1_men * player1_leadership / 8 / 10);
			number_of_kills_p2 = Math.floor(player2_knights * player2_leadership * 8 / 10);
			console.log("Function 'getBattleResult' (men vs knights (1)), number_of_kills_p1: "+number_of_kills_p1+", number_of_kills_p2: "+number_of_kills_p2);

			// catapults attack! (if any)
			number_of_kills_p1_catapults = player1_catapults * (Math.floor(Math.random() * (5 - 1)) + 1);
			number_of_kills_p2_catapults = player2_catapults * (Math.floor(Math.random() * (5 - 1)) + 1);
			console.log("Function 'getBattleResult' (catapults kills during knights battle(1)), number_of_kills_p1_catapults: "+number_of_kills_p1_catapults+", number_of_kills_p2_catapults: "+number_of_kills_p2_catapults);

			// some catapults are destroyed (between 5% and 50%)
			if(player1_catapults > 0)
			{
				//catapults_destroyed_p1 = Math.floor((player1_catapults/100)*(Math.floor(Math.random() * (50 - 5)) + 5));
				catapults_destroyed_p1 = Math.floor(player2_men / player1_catapults / 2);
				player1_catapults -= catapults_destroyed_p1;
			}
			if(player2_catapults > 0)
			{
				//catapults_destroyed_p2 = Math.floor((player2_catapults/100)*(Math.floor(Math.random() * (50 - 5)) + 5));
				catapults_destroyed_p2 = Math.floor(player1_men / player2_catapults / 2);
				player2_catapults -= catapults_destroyed_p2;
			}
			console.log("Function 'getBattleResult' (final battle(1)), player1_catapults destroyed: "+catapults_destroyed_p1+", player2_catapults destroyed: "+catapults_destroyed_p2);

			player1_men -= (number_of_kills_p2 + number_of_kills_p2_catapults);
			player2_knights -= (number_of_kills_p1 + number_of_kills_p1_catapults);
			if(player1_men <= 0)
			{
				player1_men = 0;
				break;
			}
			if(player2_knights <= 0)
			{
				player2_knights = 0;
				break;
			}
		}
	}
	else if(player2_men > 0 && player1_knights > 0) // player1 has zero men but still has knights, player2 has men but zero knights
	{
		// player2's men fight against player1's knights!
		while(player2_men > 0)
		{
			number_of_kills_p2 = Math.floor(player2_men * player2_leadership / 8 / 10);
			number_of_kills_p1 = Math.floor(player1_knights * player1_leadership * 8 / 10);
			console.log("Function 'getBattleResult' (men vs knights (2)), number_of_kills_p1: "+number_of_kills_p1+", number_of_kills_p2: "+number_of_kills_p2);

			// catapults attack! (if any)
			number_of_kills_p1 += player1_catapults * (Math.floor(Math.random() * (5 - 1)) + 1);
			number_of_kills_p2 += player2_catapults * (Math.floor(Math.random() * (5 - 1)) + 1);
			console.log("Function 'getBattleResult' (catapults kills during knights battle(2)), number_of_kills_p1_catapults: "+number_of_kills_p1_catapults+", number_of_kills_p2_catapults: "+number_of_kills_p2_catapults);

			// some catapults are destroyed (between 5% and 50%)
			if(player1_catapults > 0)
			{
				//catapults_destroyed_p1 = Math.floor((player1_catapults/100)*(Math.floor(Math.random() * (50 - 5)) + 5));
				catapults_destroyed_p1 = Math.floor(player2_men / player1_catapults / 2);
				player1_catapults -= catapults_destroyed_p1;
			}
			if(player2_catapults > 0)
			{
				//catapults_destroyed_p2 = Math.floor((player2_catapults/100)*(Math.floor(Math.random() * (50 - 5)) + 5));
				catapults_destroyed_p2 = Math.floor(player1_men / player2_catapults / 2);
				player2_catapults -= catapults_destroyed_p2;
			}
			console.log("Function 'getBattleResult' (final battle(2)), player1_catapults destroyed: "+catapults_destroyed_p1+", player2_catapults destroyed: "+catapults_destroyed_p2);

			player2_men -= (number_of_kills_p1 + number_of_kills_p1_catapults);
			if(player2_men <= 0)
			{
				player2_men = 0;
				break;
			}
			player1_knights -= (number_of_kills_p2 + number_of_kills_p2_catapults);
			if(player1_knights <= 0)
			{
				player1_knights = 0;
				break;
			}
		}
	}

	console.log("Function 'getBattleResult' (after final battle between men and knights), player1_men: "+player1_men+",  player1_knights: "+player1_knights+", player2_men: "+player2_men+", player2_knights: "+player2_knights+", player1_catapults: "+player1_catapults+", player2_catapults: "+player2_catapults);

	// fix for negative values
	if(player1_men < 0) player1_men = 0;
	if(player2_men < 0) player2_men = 0;
	if(player1_knights < 0) player1_knights = 0;
	if(player2_knights < 0) player2_knights = 0;
	if(player1_catapults < 0) player1_catapults = 0;
	if(player2_catapults < 0) player2_catapults = 0;

	// if one of the players has zero men AND zero knights then the battle is over
	if(player1_men == 0 && player1_knights == 0 && player2_men == 0 && player2_knights == 0) // draw, all forces wiped out!
	{
		battle_result.push({winner: "",
												player1_men: player1_men,
												player1_knights: player1_knights,
												player1_catapults: player1_catapults,
												loser: "",
												player2_men: player2_men,
												player2_knights: player2_knights,
												player2_catapults: player2_catapults
											});

		characters[player1]['men'] = 0;
		characters[player1]['knights'] = 0;
		characters[player1]['catapults'] = 0;

		characters[player2]['men'] = 0;
		characters[player2]['knights'] = 0;
		characters[player2]['catapults'] = 0;

		locations[land_to]['catapults'] = player2_catapults + player1_catapults; // land gets abandoned catapults!
	}
	else if(player1_men == 0 && player1_knights == 0) // player2 wins! (defender)
	{
		player2_catapults += player1_catapults; // winner captures remaining catapults
		player1_catapults = 0;
		battle_result.push({winner: player2,
												player1_men: player1_men,
												player1_knights: player1_knights,
												player1_catapults: player1_catapults,
												loser: player1,
												player2_men: player2_men,
												player2_knights: player2_knights,
												player2_catapults: player2_catapults
											});
		characters[player1]['men'] = 0;
		characters[player1]['knights'] = 0;
		characters[player1]['catapults'] = 0;

		if(player2_army_location == land_to)
		{
			characters[player2]['men'] = player2_men;
			characters[player2]['knights'] = player2_knights;
			characters[player2]['catapults'] = player2_catapults;
		}
		else
		{
			locations[land_to]['men'] = player2_men;
			locations[land_to]['knights'] = player2_knights;
			locations[land_to]['catapults'] = player2_catapults;
		}
	}
	else if(player2_men == 0 && player2_knights == 0) // player1 wins! (attacker)
	{
		player1_catapults += player2_catapults; // winner captures remaining catapults
		player2_catapults = 0;
		battle_result.push({winner: player1,
												player1_men: player1_men,
												player1_knights: player1_knights,
												player1_catapults: player1_catapults,
												loser: player2,
												player2_men: player2_men,
												player2_knights: player2_knights,
												player2_catapults: player2_catapults
											});

		if(player2_army_location == land_to)
		{
			characters[player2]['men'] = 0;
			characters[player2]['knights'] = 0;
			characters[player2]['catapults'] = 0;
		}

		characters[player1]['men'] = player1_men;
		characters[player1]['knights'] = player1_knights;
		characters[player1]['catapults'] = player1_catapults;

		// land being attacked lost so no forces remain
		locations[land_to]['men'] = 0;
		locations[land_to]['knights'] = 0;
		locations[land_to]['catapults'] = 0;
	}

	console.log("Function 'getBattleResult' (after final calculations), player1_men: "+player1_men+",  player1_knights: "+player1_knights+", player1_catapults: "+player1_catapults+", player2_men: "+player2_men+", player2_knights: "+player2_knights+", player2_catapults: "+player2_catapults);

	// save changes to forces and location
	saveCharacters(characters);
	saveLocations(locations);

	// add starting values to 'battle_result'
	battle_result[0]['player1_men_start'] = player1_men_start;
	battle_result[0]['player2_men_start'] = player2_men_start;
	battle_result[0]['player1_knights_start'] = player1_knights_start;
	battle_result[0]['player2_knights_start'] = player2_knights_start;
	battle_result[0]['player1_catapults_start'] = player1_catapults_start;
	battle_result[0]['player2_catapults_start'] = player2_catapults_start;

	// return battle result
	return battle_result[0];
}

function openActionDiv(data, character = null)
{
	console.log("Function 'openActionDiv'!");

	if(character == null)
	{
		let characters = getCharacters();
		var temp = characters[Object.keys(characters)[localStorage.character_index]];
		var temp = characters[Object.keys(characters)[localStorage.character_index]]['fullname'].split(" ");
		character = temp[0].toLowerCase().trim();
	}

	// close any previous opened div's
	$('[id^="action_div_"]').remove();
	$("#action_div").hide();

	var $div = $('#action_div');
	var new_div_id = "action_div_"+character;
	var $klone = $div.clone().prop('id', new_div_id);
  $div.after($klone);
  $klone.html(""); // clear div before appending data
	$klone.append(data);
	$klone.show();
}

function getLandsWithinReach(land)
{
	console.log("Function 'getLandsWithinReach', land: ", land);
	let locations = getLocations();
	var borders = locations[land]['borders'];
	console.log("Function 'getLandsWithinReach', borders: ", borders);
	return borders;
}

// get lands to attack within reach of character's army OR character's territory
function getLandsToAttackWithinReachOfArmy(character, land = null)
{
	//console.log("Function 'getLandsToAttackWithinReachOfArmy', character: "+character+", land: "+land);
	let characters = getCharacters();

	// calculate lands to attack only for character's army location OR any land of his realm
	var army_location = "";
	if(land == null) army_location = getArmyLocation(character);
	else army_location = land;

	let locations = getLocations();
	var lands_within_reach = locations[army_location]['borders'];

	//console.log("Function 'getLandsToAttackWithinReachOfArmy', army location: "+army_location+", character: "+character);
	//console.log("Function 'getLandsToAttackWithinReachOfArmy', lands_within_reach (before removing any): ", lands_within_reach);

	var positions_to_remove = [];
	var current_date = $("#date_div").html();
	var temp = current_date.split(" ");
	var year = temp[1];
	for(let i = 0; i < lands_within_reach.length; i++)
	{
		//console.log("Function 'getLandsToAttackWithinReachOfArmy', land in loop: "+lands_within_reach[i]+", i: "+i+", lands_within_reach.length: "+lands_within_reach.length);

		// remove friends lands from lands to attack list
		if(characters[character]['allies'].includes(locations[lands_within_reach[i]]['owner']))
		{
			//console.log("Function 'getLandsToAttackWithinReachOfArmy', removing land '"+lands_within_reach[i]+"' because it belongs to ally '"+locations[lands_within_reach[i]]['owner']+"'");
			//lands_within_reach.splice(i,1);
			positions_to_remove.push(i);
		}

		// remove lands with home castles IF year is sooner than 1151
		else if(locations[lands_within_reach[i]]['castle'] == "castle_big" && year < 1151)
		{
			positions_to_remove.push(i);
		}

		// remove lands that belong to himself
		else if(locations[lands_within_reach[i]]['owner'] == character)
		{
			//console.log("Function 'getLandsToAttackWithinReachOfArmy', removing land '"+lands_within_reach[i]+"' because it already belongs to '"+character+"'");
			//lands_within_reach.splice(i,1);
			positions_to_remove.push(i);
		}

		// remove lands with a castle IF the character has no catapults in his army
		else if(locations[lands_within_reach[i]]['castle'] != "" && characters[character]['catapults'] == 0)
		{
			//console.log("Function 'getLandsToAttackWithinReachOfArmy', removing land '"+lands_within_reach[i]+"' because it has a castle and '"+character+"' has no catapults in his army");
			//lands_within_reach.splice(i,1);
			positions_to_remove.push(i);
		}
	}

	// remove tagged lands (in previous loop)
	for(var i = positions_to_remove.length -1; i >= 0; i--) lands_within_reach.splice(positions_to_remove[i],1);

	//alert("Leaving function 'getLandsToAttackWithinReachOfArmy'");
	//console.log("Leaving function 'getLandsToAttackWithinReachOfArmy', lands_within_reach: ", lands_within_reach);
	return lands_within_reach;
}

function getLandsToAttackWithinReachOfRealm(character)
{
	//console.log("Function 'getLandsToAttackWithinReachOfRealm', character: ", character);

	var army_location = getArmyLocation(character);
	var lands_to_attack = [];
	let locations = getLocations();

	if(isArmyCutOff(character) == "yes")
	{
		//console.log("Function 'getLandsToAttackWithinReachOfRealm', army is cut off!");
		lands_to_attack = getLandsToAttackWithinReachOfArmy(character);
	}
	else
	{
		//console.log("Function 'getLandsToAttackWithinReachOfRealm', army is not cut off...");
		for(const location of Object.entries(locations))
		{
			// for each location that belongs to character gather ALL borders
			if(locations[location[0]]['owner'] == character)
			{
				//console.log("Function 'getLandsToAttackWithinReachOfRealm', location[0] (army not cut off): ", location[0]);
				//console.log("Function 'getLandsToAttackWithinReachOfRealm', going to call function 'getLandsToAttackWithinReachOfArmy' for location: "+location[0]);
				borders = getLandsToAttackWithinReachOfArmy(character, location[0])
				//borders = locations[location[0]]['borders'];
				//console.log("Back to function 'getLandsToAttackWithinReachOfRealm', borders (army not cut off): ", borders);
				lands_to_attack = lands_to_attack.concat(borders);
				//console.log("Function 'getLandsToAttackWithinReachOfRealm', ALL lands_to_attack (army not cut off): ", lands_to_attack);
			}
		}
	}

	//console.log("Function 'getLandsToAttackWithinReachOfRealm', lands_to_attack (possibly with duplicates): ", lands_to_attack);

	// remove duplicates from array
	var uniqueNames = [];
	$.each(lands_to_attack, function(i, el)
	{
		if($.inArray(el, uniqueNames) === -1) uniqueNames.push(el);
	});
	lands_to_attack = uniqueNames;

	//console.log("Function 'getLandsToAttackWithinReachOfRealm', lands_to_attack (after removing duplicates): ", lands_to_attack);

	return lands_to_attack;
}

$(document).on("click","#send_army", function()
{
	var army_location = getArmyLocation();
	var lands_within_reach = getLandsWithinReach(army_location);
	for(let i = 0; i < lands_within_reach.length; i++) // highlight border lands
	{
		$("#"+lands_within_reach[i]).css({'stroke': 'red', 'stroke-width': '3px'});
	}
	$("#game_text").fadeIn().html("Select territory to attack or move your army to.<br /><button type='button' class='close_game_text_div'>Cancel</button>");
});

$(document).on("click","#transfer_forces", function()
{
	var data = showActionDiv("transfer_forces");
	openActionDiv(data, localStorage.character_chosen);
});

$(document).on("click","#buy_home_army", function()
{
	var data = showActionDiv("buy_home_army");
	openActionDiv(data, localStorage.character_chosen);
});

function buyHomeArmyPlayer(type, amount) // buy home army (for human player only)
{
	let locations = getLocations();
	let characters = getCharacters();
	var home_castle_location = characters[localStorage.character_chosen]['home_castle'];

	switch(type)
	{
		case 'men': gold_spent = 1; break;
		case 'knights': gold_spent = 8; break;
		case 'catapults': gold_spent = 15; break;
	}

	if(characters[localStorage.character_chosen]['gold'] == 0) return;

	if((amount * gold_spent) > characters[localStorage.character_chosen]['gold'])
	{
		amount = Math.floor(characters[localStorage.character_chosen]['gold'] / gold_spent);
	}
	gold_spent = gold_spent * amount;
	locations[home_castle_location][type] += amount;
	characters[localStorage.character_chosen]['gold'] -= gold_spent;

	// update UI (view)
	$("#buy_home_army_men").html(locations[home_castle_location]['men']);
	$("#buy_home_army_knights").html(locations[home_castle_location]['knights']);
	$("#buy_home_army_catapults").html(locations[home_castle_location]['catapults']);
	$("#home_gold").html(characters[localStorage.character_chosen]['gold']);

	// save changes
	saveLocations(locations);
	saveCharacters(characters);

	return true;
}

function transferForcesCPU(character) // CPU transfering forces
{
	let characters = getCharacters();
	var home_castle_location = characters[character]['home_castle'];
	let locations = getLocations();

	// check if home castle forces are too low
	if(locations[home_castle_location]['men'] <= 20 && locations[home_castle_location]['knights'] <= 10)
	{
		logMsg = "Function 'transferForcesCPU', home army forces are too low for '"+character+"' at "+home_castle_location+", men: "+locations[home_castle_location]['men']+", knights: "+locations[home_castle_location]['knights']+", so no transfer will be done";
		console.log(logMsg);
		saveToLog(logMsg);
		return false;
	}

	// check if army is cut off
	if(isArmyCutOff(character) == "no")
	{
		// transfer 40% to 80% of forces from home castle to army

		var number_of_men_transfered = Math.floor(locations[home_castle_location]['men'] * getRandomNumber(null, 40, 80) / 100);
		locations[home_castle_location]['men'] -= number_of_men_transfered;
		characters[character]['men'] += number_of_men_transfered;

		var number_of_knights_transfered = Math.floor(locations[home_castle_location]['knights'] * getRandomNumber(null, 40, 80) / 100);
		locations[home_castle_location]['knights'] -= number_of_knights_transfered;
		characters[character]['knights'] += number_of_knights_transfered;

		var number_of_catapults_transfered = Math.floor(locations[home_castle_location]['catapults'] * getRandomNumber(null, 40, 80) / 100);
		locations[home_castle_location]['catapults'] -= number_of_catapults_transfered;
		characters[character]['catapults'] += number_of_catapults_transfered;

		logMsg = "Function 'transferForcesCPU', "+number_of_men_transfered+" men, "+number_of_knights_transfered+" knights and "+number_of_catapults_transfered+" catapults were transfered from the home castle of '"+character+"' to his army at "+characters[character]['army_location'];
		console.log(logMsg);
		saveToLog(logMsg);
	}
	else
	{
		logMsg = "Function 'transferForcesCPU', army is cut off for '"+character+"', so no transfer is possible.";
		console.log(logMsg);
		saveToLog(logMsg);
		return false;
	}

	// save changes
	saveCharacters(characters);
	saveLocations(locations);

	return true;
}

// for human player!
function transferForces(direction, type, amount) // direction = left OR right
{
	if(typeof amount == "undefined") amount = 10;
	//console.log("Function 'transferForces', direction: "+direction+", type: "+type+", amount: "+amount);
	// Function 'transferForces', from: army, to: Shropshire, type: men, amount: 100000

	let locations = getLocations();
	let characters = getCharacters();
	var army_location = getArmyLocation();

	if(direction == "left")
	{
		// if value is zero return
		if(characters[localStorage.character_chosen][type] == 0) return;

		if(amount > characters[localStorage.character_chosen][type]) amount = characters[localStorage.character_chosen][type];
		locations[army_location][type] = locations[army_location][type] + amount;
		characters[localStorage.character_chosen][type] = characters[localStorage.character_chosen][type] - amount;
	}
	else
	{
		// if value is zero return
		if(locations[army_location][type] == 0) return;

		if(amount > locations[army_location][type]) amount = locations[army_location][type];
		locations[army_location][type] = locations[army_location][type] - amount;
		characters[localStorage.character_chosen][type] = characters[localStorage.character_chosen][type] + amount;
	}

	// refresh values on table (showActionDiv)
	$("#transfer_land_"+type).html(locations[army_location][type]);
	$("#transfer_army_"+type).html(characters[localStorage.character_chosen][type]);

	saveLocations(locations); // save changes
	saveCharacters(characters);
}

$(document).on("click",".close_game_text_div", function()
{
	resetLandsColors();
	$("#game_text").fadeOut();
});

function getAliveCharacters()
{
	let characters = getCharacters();
	var alive_characters = [];

	for(const character of Object.entries(characters))
	{
		//console.log("character (function 'getAliveCharacters'): ", character);
		if(character[0] != "robin" && character[0] != localStorage.character_chosen && character[1]['state'] == "alive")
		{
			alive_characters.push(character);
		}
	}

	return alive_characters;
}

$(document).on("click","#hold_tournament", function()
{
	var alive_characters = getAliveCharacters();
	//console.log("alive_characters (click hold_tournament): ", alive_characters);

	var data = showActionDiv("hold_tournament");
	//console.log("data: ", data);

	//$('#action_div').html(data).fadeIn();
	openActionDiv(data);
});

$(document).on("click","#pass", function()
{
	var data = showActionDiv("pass", null, localStorage.character_chosen);
	//$('#action_div').html(data).fadeIn();
	openActionDiv(data);
});

function cpuPass(character)
{
	var data = showActionDiv("pass", null, character);
	openActionDiv(data);
	return true;
}

function getHumanPlayer()
{
	var temp = JSON.parse(localStorage.characters);

	for(const el of Object.entries(temp))
	{
		//console.log("el (function 'getHumanPlayer'): ", el); console.log("el[0] (function 'getHumanPlayer'): ", el[0]); console.log("el[1]['played_by'] (function 'getHumanPlayer'): ", el[1]['played_by']);
		if(el[1]['played_by'] == "player")
		{
			return el;
		}
	}

	return false;
}

function getTournamentLands()
{
	var all_lands = JSON.parse(localStorage.locations);
	//console.log("all_lands (function 'getTournamentLands'): ", all_lands);

	available_lands = [];
	for(const land of Object.entries(all_lands))
	{
		//console.log("land (function 'getTournamentLands'): ", land);
		//console.log("land[1]['castle']: "+land[1]['castle']+", land[1]['owner']: "+land[1]['owner']);
		if(land[1]['castle'] == "" && land[1]['owner'] != '' && land[1]['owner'] != "robin" && land[1]['owner'] != localStorage.character_chosen)
		{
			//console.log("found one available land! land: ", land[1]);
			available_lands.push(land[1]);
		}
	}

	//console.log("available_lands (function 'getTournamentLands'): ", available_lands);
	return available_lands;
}

$(document).on("click",".land", function()
{
	var stroke = $(this).css("stroke");
	var stroke_width = $(this).css("stroke-width");
	var land_to = this.id;
	//console.log("land clicked! stroke: "+stroke+", land_to: "+land_to+", stroke_width: "+stroke_width);
	console.log(land_to);
	localStorage.temp += "'"+land_to+"',";

	if(stroke_width == '3px') // attack or move army
	{
		var data = showActionDiv("send_army", land_to);
		$('#action_div').html(data).fadeIn(function ()
		{
			var result = $('#result').html(); // alert("result: "+result);
			if(result == "land_taken")
			{
				setLandOwner(land_to);
				setArmyLocation(land_to);
				showArmyLocation(land_to);
				setArmyDiv(land_to);
			}
			else if(result == "army_move")
			{
				$('#action_div').fadeOut();
				setArmyLocation(land_to);
				showArmyLocation(land_to);
				setArmyDiv(land_to);
			}
			$("#game_text").fadeOut();
			resetLandsColors();
		});
	}
	else if(stroke == "darkred")
	{
		//
	}
	else // do nothing (invalid land clicked, neither valid for an attack or raiding)
	{
		//
	}
});

function resetLandsColors()
{
	//console.log("Function 'resetLandsColors' called!");

	// check required variables
	if(localStorage.hasOwnProperty('locations') && localStorage.locations.length != 0) {}
	else {alert("no locations available in function 'resetLandsColors'!!!"); return false;}
	if(localStorage.hasOwnProperty('characters') && localStorage.characters.length != 0) {}
	else {alert("no characters available in function 'resetLandsColors'!!!"); return false;}

	let locations = getLocations();
	let characters = getCharacters();

	var fill_color = "";
	var location_castle = "";

	$('path.land').each(function(i, obj)
	{
		$(this).css("stroke", 'black');
		$(this).css("stroke-width", '1.5px');

		if(locations[this.id]['owner'] != "")
		{
			fill_color = characters[locations[this.id]['owner']]['color'];

			// set player fill color
			if(locations[this.id]['owner'] == localStorage.character_chosen)
			{
				fill_color = PLAYER_LAND_COLOR;
			}

		}
		else fill_color = "#FFFF55";

		if(locations[this.id]['castle'] != '')
		{
			$("."+this.id+"_castle").show();
		}

		$(this).css("fill", fill_color);
	});

	return true;
}

function getRandomNumber(range, min = 0, max = 0)
{
	if(min == 0 && max == 0)
	{
		switch(range)
		{
			case 'low': min = 2; max = 8; break;
			default:
			case 'medium': min = 8; max = 18; break;
			case 'high': min = 18; max = 30; break;
		}
	}

  return Math.floor(Math.random() * (max - min)) + min;
}

function getLandInfo(land)
{
	var arr = [];

	// get land info
	let locations = getLocations();
	var land_info = locations[land]; //console.log("land_info (function 'getLandInfo'): ", land_info);

	if(typeof land_info == "undefined") return arr;

	// get character info
	var character = "";
	if(land_info.hasOwnProperty('owner'))
	{
		let characters = getCharacters();
		character = characters[land_info['owner']];
		//console.log("character (function 'getLandInfo'): ", character);
	}

	arr['name'] = land_info['name'];
	arr['castle'] = land_info['castle'];
	arr['owner'] = land_info['owner'];
	arr['men'] = land_info['men'];
	arr['knights'] = land_info['knights'];
	arr['catapults'] = land_info['catapults'];
	arr['color'] = land_info['color'];
	arr['borders'] = land_info['borders'];
	arr['character'] = character;
	arr['income'] = land_info['income'];

	//console.log("arr (function 'getLandInfo'): ", arr);
	return arr;
}

function getLandOwner(land)
{
	// get land info
	let locations = getLocations();
	var land_info = locations[land];

	if(typeof land_info == "undefined") return null;

	if(land_info.hasOwnProperty('owner'))
	{
		return land_info['owner'];
	}
	else return null;
}

function setLandOwner(land, owner = null)
{
	if(owner == null)
	{
		temp = getHumanPlayer();
		owner = temp[0];
	}

	let locations = getLocations();
	locations[land]['owner'] = owner;
	saveLocations(locations);
	return true;
}

function setArmyLocation(land, character = null)
{
	if(character == null)
	{
	  character = localStorage.character_chosen;
	}

	if(typeof land == 'undefined')
	{
	  land = getArmyLocation(player);
	}

	let characters = getCharacters();
	characters[character]['army_location'] = land;
	saveCharacters(characters);

	logMsg = "function 'setArmyLocation',  land: "+land+", character: "+character+" now has his army_location at: "+characters[character]['army_location'];
	console.log(logMsg);
	saveToLog(logMsg);
}

function getArmyLocation(character)
{
	//console.log("function 'getArmyLocation',  localStorage.character_chosen: ", localStorage.character_chosen);

	if(typeof character == 'undefined')
	{
		if(typeof localStorage.character_chosen == 'undefined')
		{
			return null;
		}
		character = localStorage.character_chosen;
	}
	//console.log("function 'getArmyLocation',  character: ", character);

	let characters = getCharacters();
	//console.log("function 'getArmyLocation',  characters: ", characters);

	var army_location = characters[character]['army_location'];
	//console.log("function 'getArmyLocation',  army_location: ", army_location);
	
	return army_location;
}

function showArmyLocation() // show army location for human player
{
	var army_location = getArmyLocation();

	//console.log("army_location (function 'showArmyLocation'): ", army_location);

	if(!army_location) return false; // player has not chosen his character yet (game has not started!)

	var top = $("img."+army_location+"_castle").css("top");
	var left = $("img."+army_location+"_castle").css("left");

	top = top.replace("px","");
	left = left.replace("px","");

	var t = 0; var l = 0;
	switch(army_location)
	{
		default: t = 0; l = 0; break;
		case 'Northumberland': t = 50; l = -1; break;
		case 'Shropshire': t = -18; l = 1; break;
		case 'Yorkshire': t = 52; l = 1; break;
	}

	top = t+(+top)+"px";
	left = l+(+left)+"px";

	//alert("top: "+top+", left: "+left+", army_location: "+army_location);

	$("#army").css("top", top);
	$("#army").css("left", left);
	$("#army").css("z-index", "100");
	$("#army").show();
}

function getCharacterIncome(character)
{
	let locations = getLocations();
	let characters = getCharacters();

	var income = 0;
	for(const land of Object.entries(locations))
	{
		// console.log("land: ", land); console.log("land[1]['owner']: ", land[1]['owner']);
		// console.log("land[1]['income']: ", land[1]['income']);
		if(land[1]['owner'] == character)
		{
			income += land[1]['income'];
		}
	}

	return income;
}

function getCharacters()
{
	if(typeof localStorage === 'undefined') return false;
	if(typeof localStorage.characters === 'undefined') return false;
	return JSON.parse(localStorage.characters);
}

function saveCharacters(characters)
{
	localStorage.characters = JSON.stringify(characters);
}

function getLocations()
{
	if(typeof localStorage === 'undefined') return false;
	if(typeof localStorage.locations === 'undefined') return false;
	return JSON.parse(localStorage.locations);	
}

function saveLocations(locations)
{
	localStorage.locations = JSON.stringify(locations);
}

function getMonthlyIncome(character)
{
	var income = getCharacterIncome(character);

	// load characters from localStorage if they exist
	var characters = getCharacters();

	if(!characters)
	{
		characters = [];
		characters[character] = [];
		characters[character]['gold'] = 0;
	}

	characters[character]['gold'] += income;

	logMsg = "Player '"+character+"' gets an income of "+income+" and now has a total of "+characters[character]['gold'];
	console.log(logMsg);
	saveToLog(logMsg);

	showIncomePlaySound(character);

	saveCharacters(characters); // save changes
}

function showIncomePlaySound(character, income = null)
{
	if(!income)
	{
		income = getCharacterIncome(character);
	}

	let characters = getCharacters();

	if(!characters)
	{
		characters = [];
		characters[character] = [];
		characters[character]['gold'] = 0;
	}

	if(character == localStorage.character_chosen) // show info with income and play sound effect
	{
		let sound_path = base_url + "public/sounds/coins.mp3";
		new Audio(sound_path).play();
		let total = characters[character]['gold'] + income;
		$("#info").html("Income: "+income+" gold coins. Total: "+total).fadeIn(function()
		{
			wait(3000);
			$("#info").fadeOut();
		});
	}
}

function getLargestArmy()
{
	let characters = getCharacters();

	var largest_army = 0;
	var number_of_men = 0;
	for(const character of Object.entries(characters))
	{
		number_of_men = characters[character[0]]['men'] + (characters[character[0]]['knights'] * 8);
		if(number_of_men > largest_army) largest_army = number_of_men;
	}

	return largest_army;
}

function advanceDate()
{
	var months = ["January","February","March","April","May","June","July","August","September","October","November","December"];

	var currentDate = localStorage.date;
	//console.log("Function 'advanceDate', currentDate: ", currentDate);

	var arrDate = currentDate.split(' ');
	//console.log("arrDate: ", arrDate);

	var index = months.indexOf(arrDate[0]);
	//console.log("index: ", index);

	var Month = index+=1;
	var Year = arrDate[1];
	//console.log("Month: ", Month); console.log("Year: ", Year);
	if(Month > 11) // advances one year
	{
		Month = 0;
	  Year = parseInt(arrDate[1]);
	  Year += 1;
	  //console.log("Month: ", Month); console.log("Year: ", Year);
	}

	var newDate = months[Month] + " " + Year;
	//console.log("newDate: ", newDate);

	localStorage.date = newDate; // save new date

	let characters = getCharacters();
	var player = getHumanPlayer();
	console.log("Function 'advanceDate', player: ", player);

	//$("#date_div").html(localStorage.date + " / " + characters[]);
	$("#date_div").html(localStorage.date + " / Gold: 122");

	var sound_path = base_url + "public/sounds/beep.mp3";
	new Audio(sound_path).play();
	// audio clips: https://www.soundjay.com
}

function wait(ms)
{
	var start = new Date().getTime();
  var end = start;
  while(end < start + ms)
  {
  	end = new Date().getTime();
  }
}

function isAlly(character = null, land_or_character = null)
{
	console.log("Function 'isAlly', character: "+character+", land_or_character: "+land_or_character);

	if(character == null)
	{
		console.log("Function 'isAlly', variable 'character' cannot be null!");
		return false;
	}

	if(land_or_character == null)
	{
		console.log("Function 'isAlly', variable 'land_or_character' cannot be null!");
		return false;
	}

	let characters = getCharacters();

	for(player in characters)
	{
		if(land_or_character == player)
		{
			if(characters[player]['allies'].includes(character))
			{
				console.log("Function 'isAlly', character "+character+" and "+player+" are allies! (returning true...)");
				return true;
			}
			else
			{
				console.log("Function 'isAlly', character "+character+" and "+player+" are NOT allies. (returning false...)");
				return false;
			}
		}
	}

	let locations = getLocations();

	for(land in locations)
	{
		if(land == land_or_character)
		{
			console.log("Function 'isAlly', land: "+land+", land_or_character: "+land_or_character);
			console.log("Function 'isAlly', characters[locations[land]['owner']]['allies']: "+characters[locations[land]['owner']]['allies']);
			console.log("Function 'isAlly', character: "+character);
			if(characters[locations[land]['owner']]['allies'].includes(character))
			{
				console.log("Function 'isAlly', character "+character+" and "+characters[locations[land]['owner']]+" are allies! land: "+land+" (returning true...)");
				return true;
			}
			else
			{
				console.log("Function 'isAlly', character "+character+" and "+characters[locations[land]['owner']]+" are NOT allies. land: "+land+" (returning false...)");
				return false;
			}
		}
	}

	console.log("Function 'isAlly', no match was found between character "+character+" and "+land_or_character+". (returning false...)");
	return false;
}

function buyHomeArmyCPU(character)
{
	var data = showActionDiv("buy_home_army_CPU", null, character);
	openActionDiv(data);
	return true;
}

function buyHomeArmy(character) // for CPU only!
{
	let characters = getCharacters();
	let locations = getLocations();
	var home_castle_location = characters[character]['home_castle'];

	// check gold
	console.log("Function 'buyHomeArmy', gold (before buying anything): ", characters[character]['gold']);
	if(characters[character]['gold'] < 1)
	{
		console.log("Player '"+character+"' has no gold! (function 'buyHomeArmy')");
		return false;
	}

	// spend on men and knights (55-90% of gold)
	var random_percentage = Math.floor(Math.random() * (55 - 90)) + 55;
	console.log("Function 'buyHomeArmy', random_percentage: ", random_percentage);

	// buy men
	var gold_for_men = Math.floor(characters[character]['gold'] * random_percentage / 100);
	console.log("Function 'buyHomeArmy', gold_for_men: ", gold_for_men);
	locations[home_castle_location]['men'] += gold_for_men;
	characters[character]['gold'] -= gold_for_men;

	// buy knights
	var gold_for_knights = characters[character]['gold'] - gold_for_men;
	console.log("Function 'buyHomeArmy', gold_for_knights: ", gold_for_men);
	if(gold_for_knights >= 8)
	{
		locations[home_castle_location]['knights'] += Math.floor(gold_for_knights / 8);
		characters[character]['gold'] -= gold_for_knights;
	}

	// check if player has catapult in his army
	var has_catapult = "no";
	if(characters[character]['catapults'] > 0) has_catapult = "yes";
	console.log("Function 'buyHomeArmy', has_catapult: ", has_catapult);

	// if not AND gold > 30 buy at least one catapult
	if(has_catapult == "no" && characters[character]['gold'] > 30)
	{
		while(locations[home_castle_location]['catapults'] < 11) // buy a maximum of 10 catapults
		{
			locations[home_castle_location]['catapults'] += 1;
			characters[character]['gold'] -= 15;
			if(characters[character]['gold'] < 15) break; // no more gold left!
		}
	}

	console.log("Function 'buyHomeArmy', gold (after buying stuff): "+characters[character]['gold']);
	console.log("Function 'buyHomeArmy', "+character+" now has "+locations[home_castle_location]['men']+" men, "+locations[home_castle_location]['knights']+" knights and "+locations[home_castle_location]['catapults']+" catapults in his Home castle at "+home_castle_location);

	// save changes
	saveCharacters(characters);
	saveLocations(locations);

	return true;
}

function attackLand(character, lands_within_reach_to_attack) // function for CPU only!
{
	// get characters data
	let characters = getCharacters();
	let locations = getLocations();

	resetLandsColors();

	// check if the player has an able army
	if(characters[character]['men'] > 0 || characters[character]['knights'] > 0) {}
	else
	{
		console.log("Player '"+character+"' has no able army! (Function 'attackLand')");
		return false;
	}

	// remove Sherwood forest from list, no one dares attack Robin Hood!
	const Sherwood = lands_within_reach_to_attack.indexOf("Nottinghamshire");
	if(Sherwood > -1) {lands_within_reach_to_attack.splice(Sherwood, 1);}

	// check if lands to attack has at least one land (after removing Sherwood forest)
	if(lands_within_reach_to_attack.length < 1)
	{
		//console.log("Variable 'lands_within_reach_to_attack' has no lands! lands_within_reach_to_attack: "+JSON.stringify(lands_within_reach_to_attack, null, "  "));
		return false;
	}

	var army_location = getArmyLocation(character);
	//console.log("Function 'attackLand', character: "+character+", army_location: "+army_location);
	//console.log("Function 'attackLand', lands_within_reach_to_attack: ", lands_within_reach_to_attack);

	for(let i = 0; i < lands_within_reach_to_attack.length; i++) // highlight border lands
	{
		//console.log("Function 'attackLand', highlight lands!");
		$("#"+lands_within_reach_to_attack[i]).css({'stroke': characters[character]['color'], 'stroke-width': '3px'});
	}

	// choose land to attack
	var land_to_attack = lands_within_reach_to_attack[Math.floor(Math.random()*lands_within_reach_to_attack.length)];

	// show land to attack (highlight)
	var anim = $("#"+land_to_attack).find("animate");
	var current_land_fill = $("#"+land_to_attack).css("fill");
	anim.attr("attributeName", "fill").attr("values", ""+characters[character]['color']+";"+current_land_fill+";"+characters[character]['color']+";"+characters[character]['color']+";");

	// attack!
	var data = showActionDiv('send_army', land_to_attack, character);
	//console.log("will show action_div! (function 'attackLand'), land chosen: "+land_to_attack);
	openActionDiv(data);

	return true;
}

function holdTournament(character)
{
	console.log(character+" is holding a tournament!");
}

function removeLandsNotOwnedByCharacter(lands, character) // remove elements from lands array
{
	let locations = getLocations();
	var positions_to_remove = [];
	var i = 0;
	while(i < lands.length)
	{
		//console.log("Function 'findPathToHomeCastle', land in loop: ", lands[i]);
		//console.log("Function 'findPathToHomeCastle', i: "+i);
		if(locations[lands[i]]['owner'] != character)
		{
			//console.log("Function 'findPathToHomeCastle', going to delete: ", lands[i]);
			positions_to_remove.push(i);
		}
		++i;
	}

	// remove invalid action from array
	for(var i = positions_to_remove.length -1; i >= 0; i--) lands.splice(positions_to_remove[i],1);

	return lands;
}

function findCommonElementsArrays(arr1, arr2)
{
	return arr1.some(item => arr2.includes(item))
}

function isArmyCutOff(character) // check if the character's army is cut off from his home castle
{
	console.log("Function 'isArmyCutOff', character: ", character);
	let characters = getCharacters();

	var army_location = getArmyLocation(character);
	var home_castle = characters[character]['home_castle'];

	var result = findPath(army_location, home_castle, character);
	console.log("Function 'isArmyCutOff', result (from function 'findPathToHomeCastle'): ", result);

	if(result) return "no"; // army is not cut off
	else return "yes"; // yep, army is cut off
}

function cpuPlayerDoSomething(character, action = null)
{
	console.log(character+" is doing something!");

	let characters = getCharacters();
	let selectedAction;

	if(action == null) // if no action was previously chosen then randomly select one
	{
		let actions = {
			buy_home_army: 0,
			attack_land: 80,
			go_raiding: 14,
			hold_tournament: 0, // to-do: create this option andchange this value!
			pass: 6,
		  };
		
		largest_army = getLargestArmy();
		players_army = characters[character]['men'] + (characters[character]['knights'] * 8);
		//console.log("Function 'cpuPlayerDoSomething', largest_army: ", largest_army);
		//console.log("Function 'cpuPlayerDoSomething', players_army: ", players_army);

		// check if it makes sense to buy home army (reinforcements)
		if(players_army < (largest_army / 2) && characters[character]['gold'] > 10)
		{
			actions.buy_home_army = 50;
			actions.attack_land = 30;
		}

		// if there's no land to attack then choose some other action
		var army_location = characters[character]['army_location'];
		var lands_within_reach_to_attack = getLandsToAttackWithinReachOfRealm(character);
		logMsg = "Function 'cpuPlayerDoSomething', lands_within_reach_to_attack.length: "+lands_within_reach_to_attack.length+", Object.keys(lands_within_reach_to_attack).length: "+Object.keys(lands_within_reach_to_attack).length+", character: "+character+", lands_within_reach_to_attack: "+JSON.stringify(lands_within_reach_to_attack, null, "  ");
		console.log(logMsg);
		saveToLog(logMsg);		
		if(lands_within_reach_to_attack.length === 0 || Object.keys(lands_within_reach_to_attack).length == 0)
		{
			actions.attack_land = 0;			
	  	}

		// Calculate the total probability
		const totalProbability = Object.values(actions).reduce((sum, value) => sum + value, 0);
		  
		// Generate a random number between 0 and the total probability
		const randomNum = Math.random() * totalProbability;
		  
		let currentProbability = 0;		
		  
		// Loop through actions and probabilities
		for (let action in actions) {
			currentProbability += actions[action];
		
			if (randomNum <= currentProbability) {
			selectedAction = action;
			break;
			}
		}
		  
		console.log("Function 'cpuPlayerDoSomething', selectedAction:", selectedAction);
	}

	// transfer forces from Home Castle to army (if possible)
	transferForcesCPU(character); // to-do: does not make much sense is home castle is in danger, also home castle should never be empty!

	// execute action!
	var result = true;
	switch(selectedAction)
	{
		case 'buy_home_army': result = buyHomeArmy(character); break;
		case 'attack_land': result = attackLand(character, lands_within_reach_to_attack); break;
		case 'hold_tournament': result = holdTournament(character); break;
		case 'go_raiding': result = goRaidingCPU(character); break;
		case 'pass': result = cpuPass(character); break;
		default: break;
	}

	console.log("Function 'cpuPlayerDoSomething', result from action '"+selectedAction+"': ", result);

	// if action was unsuccessfull do another action! (Ex: 'buy home army' with no gold!)
	if(!result)
	{
		switch(selectedAction)
		{
			default: cpuPlayerDoSomething(character, "pass"); break;
			case 'hold_tournament': cpuPlayerDoSomething(character, "buy_home_army"); break;
			case 'buy_home_army': cpuPlayerDoSomething(character, "pass"); break;
			case 'attack_land': cpuPlayerDoSomething(character, "buy_home_army"); break;
		}
	}
}

function goAITurn()
{
	//console.log("Function 'goAITurn', character_index: "+localStorage.character_index);

	//$("#modal").css('display', 'block');
	$("#info").html("War rages throughout the land").fadeIn();

	let characters = getCharacters();
	//console.log("Function 'goAITurn', characters.length: "+Object.keys(characters).length);

	if(parseInt(localStorage.character_index) >= Object.keys(characters).length) // end of all AI turn
	{
		//$("#modal").css('display', 'none');
		$("#info").fadeOut();

		advanceDate();
		resetLandsColors();

		console.log("Leaving function 'goAITurn'");
		return; // stop when it reaches the last player
	}

	var current_player = characters[Object.keys(characters)[parseInt(localStorage.character_index)]];
	var temp = characters[Object.keys(characters)[parseInt(localStorage.character_index)]]['fullname'].split(" ");
	var player_short_name = temp[0].toLowerCase().trim();
	console.log("Function 'goAITurn', current_player: ", current_player);
	//console.log("Function 'goAITurn', player_short_name: ", player_short_name);
	//console.log("Function 'goAITurn', current_player['state']: ", current_player['state']);

	//if(current_player['state'] == 'alive') console.log("alive!"); else console.log("dead...");
	//if(player_short_name != localStorage.character_chosen) console.log("different!"); else console.log("the same...");
	//if(player_short_name != "robin") console.log("not robin!"); else console.log("robin...");

	if(current_player['state'] == 'alive' && player_short_name != localStorage.character_chosen && player_short_name != "robin")
	{
		console.log("Function 'goAITurn', "+player_short_name+" is going to play!");
		getMonthlyIncome(player_short_name); // each player first receives his monthly income
		cpuPlayerDoSomething(player_short_name);
		console.log("Function 'goAITurn', going to increment variable 'localStorage.character_index' after calling function 'cpuPlayerDoSomething', value is now: "+localStorage.character_index);
		localStorage.character_index = parseInt(localStorage.character_index) + 1;
	}
	else
	{
		console.log("Function 'goAITurn', going to increment variable 'localStorage.character_index' before calling function 'goAITurn', value is now: "+localStorage.character_index);
		localStorage.character_index = parseInt(localStorage.character_index) + 1;
		console.log("Function 'goAITurn', current player invalid so onto the next player!");
		goAITurn(); // on to next AI player!
	}

	//console.log("Function 'goAITurn', going to call itself again! localStorage.character_index: ", localStorage.character_index);
	//goAITurn(); // on to next AI player!
}

function goRaidingCPU(character) // character is who is DOING the raiding, not the victim!
{
	var data = showActionDiv("go_raiding", null, character);
	openActionDiv(data);
	return true; // whether the raid is successfull or not this return is always true!
}

function goRaiding(character = null) // character is who is DOING the raiding, not the victim!
{
	if(character == null) return false;

	let characters = getCharacters();
	var attacker = characters[character];
	var victims = [];

	// set victims
	for(player in characters)
	{
		// if not himself, nor Robin, nor one of his allies then add to victims list
		if(player != character && player != 'robin' && !characters[character]['allies'].includes(player))
		{
			victims.push(player);
		}
	}
	console.log("Function 'goRaiding', victims: ", victims);

	// choose victim
	var victim = victims[Math.floor(Math.random()*victims.length)];
	console.log("Function 'goRaiding', victim: ", victim);

	// raid! (and get result)
	var player1_swordplay_skill = characters[character]['swordplay'];
	var player2_swordplay_skill = characters[victim]['swordplay'];
	console.log("Function 'goRaiding', player1_swordplay_skill: "+player1_swordplay_skill+", player2_swordplay_skill: "+player2_swordplay_skill);

	var winner = "";
	var loser = "";
	var gold_stolen = 0;
	var success = true;
	player1_swordplay_skill += Math.floor(Math.random() * (4 - 1)) + 1;
	player2_swordplay_skill += Math.floor(Math.random() * (4 - 1)) + 1;
	console.log("Function 'goRaiding', player1_swordplay_skill (plus random): "+player1_swordplay_skill+", player2_swordplay_skill (plus random): "+player2_swordplay_skill);
	if(player1_swordplay_skill > player2_swordplay_skill)
	{
		winner = character;
		loser = victim;
		gold_stolen = Math.floor(characters[victim]['gold'] / 2);
		characters[victim]['gold'] -= gold_stolen;
		characters[character]['gold'] += gold_stolen;
	}
	else // defender won (the victim!)
	{
		winner = victim;
		loser = character;
		gold_stolen = Math.floor(characters[character]['gold'] / 2);
		characters[victim]['gold'] += gold_stolen;
		characters[character]['gold'] -= gold_stolen;
		success = false;
	}
	console.log("Function 'goRaiding', winner: "+winner+", loser: "+loser+", gold_stolen: "+gold_stolen);

	var winner_fullname = characters[winner]['fullname'];
	var loser_fullname = characters[loser]['fullname'];

	var result = [];
	result.push({winner: winner,
							 loser: loser,
							 gold_stolen: gold_stolen,
							 success: success,
							 winner_fullname: winner_fullname,
							 loser_fullname: loser_fullname
		});
	logMsg = "Function 'goRaiding', result: "+JSON.stringify(result, null, "  ");
	console.log(logMsg);
	saveToLog(logMsg);

	// save changes
	saveCharacters(characters);

	return result[0];
}

function setBasicSkills() // convert skills points (0-1000) to basic skills range (0-10)
{
	let characters = getCharacters();

	for(const character of Object.entries(characters))
	{
		characters[character[0]]['leadership'] = Math.floor(characters[character[0]]['leadership_points'] / 100);
		characters[character[0]]['jousting'] = Math.floor(characters[character[0]]['jousting_points'] / 100);
		characters[character[0]]['swordplay'] = Math.floor(characters[character[0]]['swordplay_points'] / 100);
	}

	saveCharacters(characters); // save changes
}

function setCharacterSkillPoints(character, skill, points)
{
	//console.log("Function 'setCharacterSkillPoints', character: "+character+", skill: "+skill+", points: "+points);

	let characters = getCharacters();

	characters[character][skill+"_points"] += points;

	// set max limit of 1000
	if(characters[character][skill+"_points"] > 1000) {characters[character][skill+"_points"] = 1000;}

	// set min limit of 0
	if(characters[character][skill+"_points"] < 0) {characters[character][skill+"_points"] = 0;}

	saveCharacters(characters); // save changes

	setBasicSkills(); // recalculate basic skills
}

$(document).on("click","#t_fame_button", function()
{
	var data = showActionDiv("choose_tournament_opponent");
	//$('#action_div').html(data).fadeIn();
	openActionDiv(data);
});

$(document).on("click",".jousting_clash", function()
{
	var data = showActionDiv("jousting_clash", null, this.id);
	//$('#action_div').html(data).fadeIn();
	openActionDiv(data);
});

$(document).on("click","#t_land_button", function()
{
	var data = showActionDiv("tournament_choose_land", null, this.id);
	//$('#action_div').html(data).fadeIn();
	openActionDiv(data);
});

$(document).on("click","#kill_horse", function()
{
	confirm("Are you sure you want to kill your opponent's horse? This is a despicable action. Plus you will lose all your lands, apart from your home castle!");
	var data = showActionDiv("kill_horse");
	//$('#action_div').html(data).fadeIn();
	openActionDiv(data);
});

function getJoustingWinner(player1, player2)
{
	let characters = getCharacters();
	var player1_jousting_skill = characters[player1]['jousting'];
	var player2_jousting_skill = characters[player2]['jousting'];

	player1_jousting_skill += Math.floor(Math.random() * (5 - 2)) + 2;
	player2_jousting_skill += Math.floor(Math.random() * (5 - 2)) + 2;

	if(player1_jousting_skill > player2_jousting_skill) return player1;
	else if(player1_jousting_skill < player2_jousting_skill) return player2;
	else // decide by swordplay
	{
		var player1_swordplay_skill = characters[player1]['swordplay'];
		var player2_swordplay_skill = characters[player2]['swordplay'];

		if(player1_swordplay_skill > player2_swordplay_skill) return player1;
		else if(player1_swordplay_skill < player2_swordplay_skill) return player2;

		else // it's a draw so decide by chance
		{
			winner = Math.floor(Math.random() * (2 - 1)) + 1;

			if(winner == 1) return player1;
			else return player2;
		}
	}
}

function stripPlayerLands(character)
{
	let locations = getLocations();
	let characters = getCharacters();

	var home_castle = characters[character]['home_castle'];

	console.log("Function 'stripPlayerLands', home_castle: ", home_castle);
	console.log("Function 'stripPlayerLands', character: ", character);

	for(const land of Object.entries(locations))
	{
		if(land[1]['owner'] == character && land[1]['name'] != home_castle)
		{
			console.log("Function 'stripPlayerLands', land[1]['owner']: ", land[1]['owner']);
			console.log("Function 'stripPlayerLands', land[1]['name']: ", land[1]['name']);
			locations[land[1]['name']]['owner'] = "";
		}
	}

	saveLocations(locations);
}

function setPlayerState(player = null, state = null)
{
	let characters = getCharacters();

	if(player == null && state == null) // revert all alive players to state 'alive'
	{
		for(const character of Object.entries(characters))
		{
			if(characters[character[0]]['state'] != 'dead')
			{
				characters[character[0]]['state'] = 'alive';
			}
		}
	}
	else // set single player to a state per function parameters
	{
		characters[player]['state'] = state;
	}

	saveCharacters(characters); //save changes
}

function setPlayerGold(character, amount)
{
	let characters = getCharacters();
	characters[player]['gold'] += amount;
	saveCharacters(characters); //save changes
}

function checkSaxonAllies() // from X date Saxons may no longer be allies with other Saxons (% chance)
{
	var current_date = $("#date_div").html();
	var temp = current_date.split(" ");
	var year = temp[1]; // console.log("year: ", year);

	if(year < 1151) return true;

	let characters = getCharacters();
	var first_character = null;

	// loop all saxons except human player and robin
	for(character in characters)
	{
		//console.log("character (1): ", character);
		if(characters[character]['side'] == "saxons" && character != "robin" && character != localStorage.character_chosen)
		{
			//console.log("character (2): ", character);
			var chance = (Math.floor(Math.random() * (10 - 1)) + 1);
			//console.log("chance: ", chance);
			if(chance <=3)
			{
				var allies = characters[character]['allies'];
				//console.log("allies (before): ", allies);
				// remove robin from array
				var robin_index = allies.indexOf("robin");
				allies.splice(robin_index, 1);
				//console.log("allies (after removing robin): ", allies);
				var random_enemy_index = Math.floor(Math.random() * (allies.length));
				var random_enemy = allies[random_enemy_index];
				//console.log("random_enemy: "+random_enemy);
				allies.splice(random_enemy_index, 1);
				allies.push("robin") // put robin back in the allies!
				//console.log("allies (after): ", allies);
				characters[character]['allies'] = allies;

				// set that new allegiance both ways
				allies = characters[random_enemy]['allies'];
				//console.log("allies (before): ", allies);
				// remove robin from array
				robin_index = allies.indexOf("robin");
				allies.splice(robin_index, 1);
				//console.log("allies (after removing robin): ", allies);
				// removing other ex-ally from array
				var index = allies.indexOf(character);
				allies.splice(index, 1);
				allies.push("robin") // put robin back in the allies!
				//console.log("allies (after removing ex-ally): ", allies);
				characters[random_enemy]['allies'] = allies;

				first_character = character;

				break;
			}
		}
	}

	if(first_character != null)
	{
		logMsg = "Function 'checkSaxonAllies', Saxon characters "+first_character+" and "+random_enemy+" are now enemies!";
	}
	else logMsg = "No Saxons declared war on fellow Saxons this turn...";

	console.log(logMsg);
	saveToLog(logMsg);

	// save changes
	saveCharacters(characters);

	return true;
}

$(document).on("click", ".closeButton", function()
{
	result = $(this).data("result");
	character = $(this).data("character");
	land = $(this).data("land");

	console.log("click 'closeButton', result: "+result+", character: "+character);

	var startAITurn = "no";

	$("#action_div").hide();
	$("#action_div_"+character).remove();
	$(".land animate").attr("attributeName",""); // reset any (all) lands animations

	switch(result)
	{
		default:
		case 'none': break;

		case 'end_turn':
		case 'army_move':
		case 'ai_turn':
		case 'player_passes': startAITurn = "yes";
			//console.log("click 'closeButton', startAITurn (inside switch): ", startAITurn);
			break;

		case 'tournament_victory': setPlayerState(); startAITurn = "yes"; break;

		case 'tournament_lost':
			setPlayerState();
			var data = showActionDiv("tournament_lost");
			//$('#action_div').html(data).fadeIn();
			openActionDiv(data);
			break;

		case 'tournament_win':
			var data = showActionDiv("choose_tournament_opponent");
			//$('#action_div').html(data).fadeIn();
			openActionDiv(data);
			break;
	}

	//console.log("click 'closeButton', startAITurn: ", startAITurn);
	//console.log("click 'closeButton', localStorage.character_index: ", localStorage.character_index);

	if(startAITurn == "yes")
	{
		resetLandsColors();
		if(localStorage.character_index >= 10) // reached end of AI turn
		{
			localStorage.character_index = 0; // reset AI value
			//$("#modal").css('display', 'none');
			$("#game_text").fadeOut();
			advanceDate();
			//resetLandsColors();
			$("#info").fadeOut();
			checkSaxonAllies(); // from X date Saxons may no longer be allies with other Saxons (% chance)

			var current_date = $("#date_div").html();
			var temp = current_date.split(" ");
			var year = temp[1];
			var month = temp[0];
			if(year == 1149 && month == "September") {}
			else getMonthlyIncome(localStorage.character_chosen); // get income for human player
		}
		else
		{
			console.log("Calling function 'goAITurn' from click 'closeButton'");
			goAITurn();
		}
	}
});

$(document).on("click","#logout", function()
{
	localStorage.clear();
	window.location.href = base_url;
});
