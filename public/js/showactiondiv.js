function showActionDiv(action, land_to = null, character = null) // character is who is playing this turn
{
	if(action == "send_army" && land_to == null) // an error occurred, Ex: 'lands_within_reach' array is empty
	{
		logMsg = 'ERROR (land_to is empty): Function "showActionDiv", action: '+action+', land_to: '+land_to+', character: '+character;
		console.log(logMsg);
		saveToLog(logMsg);
		return "An error occurred, variable 'land_to' is empty!";
	}

	if(character == null) character = localStorage.character_chosen;

	logMsg = 'function "showActionDiv", action: '+action+', land_to: '+land_to+', character: '+character;
	console.log(logMsg);
	saveToLog(logMsg);

	var locations = JSON.parse(localStorage.locations);
	var characters = JSON.parse(localStorage.characters);
	var title = ""; var text = ""; var img = ""; var options = ""; var result = ""; // initialize action div variables
	var player_fullname = characters[character]['fullname'];
	var army_location = getArmyLocation();
	var home_castle_location = characters[character]['home_castle'];
	//console.log("army_location (function 'showActionDiv'): ", army_location);

	var showCloseButton = true;

	switch(action)
	{
		case 'send_army':
			if(locations[land_to]['owner'] == "") // land has no owner
			{
				console.log("function 'showActionDiv', send_army, land being attacked has no owner");
				title = getText('battle', 'title_attack') + "<br />" + land_to + "<br />";
				text = getText('battle', 'no_men', player_fullname);
				//console.log("texts['battle_attack']['title'] (function 'seekConquest'): ", texts['battle_attack']['title']);
				img = "<img width='340' height='212' src='"+base_url+"public/pics/no_owner.png' />";
				setLandOwner(land_to, character);
				setArmyLocation(land_to, character);
				result = "end_turn";
				setCharacterSkillPoints(character, 'leadership', 10);

				if(character == localStorage.character_chosen)
				{
					showArmyLocation();
					setArmyDiv(land_to);
				}
			}
			else if(locations[land_to]['owner'] == character) // land already belongs to current player (character)
			{
				console.log("function 'showActionDiv', send_army, land being attacked belongs to character (army_move)");

				// move army only
				result = "army_move";
			}
			else if(character == localStorage.character_chosen && isAlly(character, land_to)) // land belongs to a current ally
			{
				// TO-DO (cross land in peace OR attack!)
				// attack: no longer ally, call this again with send_army
				// cross: check lands to cross to with army_location (?)

				var land_owner = getLandOwner(land_to);
				console.log("function 'showActionDiv', crossing ally land, land_to: "+land_to+", land_owner: "+land_owner);
				title = getText('allied', 'land_crossing', characters[land_owner]['fullname']);
				text = getText('allied', 'land_crossing_options');
				img = "<img width='235' height='262' src='"+base_url+"public/pics/"+land_owner+"_head.png' />";
				showCloseButton = false;

				//...
			}
			else // battle!
			{
				var player_attacked_fullname = characters[locations[land_to]['owner']]['fullname'];
				console.log("function 'showActionDiv', send_army, player_attacked_fullname: "+player_attacked_fullname);

				if(locations[land_to]['castle'] != "") // has castle
				{
					console.log("function 'showActionDiv', send_army, land being attacked has castle");
					//console.log("army_location (function 'showActionDiv', send_army): ", army_location);
					//console.log("land_info (function 'showActionDiv', send_army): ", land_info);

					if(characters[character]['catapults'] > 0) // attacking army has catapult
					{
						// BATTLE!
						console.log("function 'showActionDiv', send_army, land has castle AND army has catapult");
					}
					else // attacking army has no catapult
					{
						// RETREAT
						console.log("function 'showActionDiv', send_army, land has castle BUT army has no catapult");
					}
				}
				else // land being attacked has no castle
				{
					console.log("function 'showActionDiv', send_army, land being attacked has no castle, character: "+character+", land_to: "+land_to);

					title = getText('battle', 'title_attack', land_to);
					text = getText('battle', 'text_attack');
					img = "<br /><img width='340' height='89' src='"+base_url+"public/pics/battle1.png' /><br />";

					// battle!
					var battle_result = "";
					function first(callback)
					{
						battle_result = getBattleResult(character, land_to);
						console.log("function 'showActionDiv', send_army, battle_result: ", battle_result);
						callback();
					}

					function second()
					{
						var winner_men = 0;
						var winner_knights = 0;
						var winner_catapults = 0;

						options = `<font class='font19'>`+player_fullname+` VS `+player_attacked_fullname;
						options += `<br />Leadership: `+characters[character]['leadership']+`/10   vs   `+characters[locations[land_to]['owner']]['leadership']+`/10`;
						options += `<br />Men: `+battle_result['player1_men_start']+`   vs   `+battle_result['player2_men_start'];
						options += `<br />Knights: `+battle_result['player1_knights_start']+`   vs   `+battle_result['player2_knights_start'];
						options += `<br />Catapults: `+battle_result['player1_catapults_start']+`   vs   `+battle_result['player2_catapults_start'];

						if(battle_result['winner'] == "" && battle_result['loser'] == "") // draw
						{
							// if defender's army was on the land attacked it gets back to his home castle
							if(characters[locations[land_to]['owner']]['army_location'] == land_to)
							{
								setArmyLocation(characters[locations[land_to]['owner']]['home_castle'], locations[land_to]['owner']);
							}

							// attacker's army is destroyed and gets back to home castle
							setArmyLocation(characters[character]['home_castle'], character);

							setCharacterSkillPoints(character, 'leadership', -5); // attacker got his army destroyed!

							setLandOwner(land_to, ""); // land now has no owner!

							options += "<br /><br />"+ getText('battle', 'draw');
						}
						else if(battle_result['winner'] == locations[land_to]['owner']) // if defender won
						{
							// attacker's army is destroyed and gets back to home castle
							setArmyLocation(characters[battle_result['loser']]['home_castle'], battle_result['loser']);

							winner_men = battle_result['player2_men'];
							winner_knights = battle_result['player2_knights'];
							winner_catapults = battle_result['player2_catapults'];

							setCharacterSkillPoints(battle_result['winner'], 'leadership', 10);
							setCharacterSkillPoints(battle_result['loser'], 'leadership', -10);

							options += "<br /><br />"+ characters[battle_result['winner']]['fullname'] +" is victorious!<br />After the battle his forces now stand at "+winner_men+" men, "+winner_knights+" knights and "+winner_catapults+" catapults.";
						}
						else // attacker won
						{
							winner_men = battle_result['player1_men'];
							winner_knights = battle_result['player1_knights'];
							winner_catapults = battle_result['player1_catapults'];

							setLandOwner(land_to, battle_result['winner']); // land gets new owner: the attacker

							setCharacterSkillPoints(battle_result['winner'], 'leadership', 10);
							setCharacterSkillPoints(battle_result['loser'], 'leadership', -10);

							// if no men were defending the territory attacked
							if(battle_result['player2_men_start'] == 0 && battle_result['player2_knights_start'] == 0)
							{
								text = getText('battle', 'no_men_defending', player_fullname);
								img = "<img width='340' height='212' src='"+base_url+"public/pics/battle_no_men_defending.png' />";
							}
							else
							{
								options += "<br /><br />"+ characters[battle_result['winner']]['fullname'] +" is victorious!<br />After the battle his forces now stand at "+winner_men+" men, "+winner_knights+" knights and "+winner_catapults+" catapults.";
							}

							// defender's army gets back to his home castle
							setArmyLocation(characters[locations[land_to]['owner']]['home_castle'], locations[land_to]['owner']);

							if(character == localStorage.character_chosen)
							{
								setArmyLocation(land_to);
							}
						}

						result = "end_turn";
					}

					first(second);

					if(character == localStorage.character_chosen)
					{
						showArmyLocation();
						setArmyDiv(land_to);
					}
				}

			}
			break;

		case 'transfer_forces':
			title = getText('battle', 'transfer_forces_title');
			text = "";
			//img = "<img width='340' height='212' src='"+base_url+"public/pics/no_owner.png' />";
			options = `<table style="width: 300px; margin-left: auto; margin-right: auto;">
									    <tr>
									        <td align="center">territory</td>
									        <td>&nbsp;</td>
									        <td align="center">Army</td>
									    </tr>
									    <tr>
									        <td align="center"><a href="#" onclick="transferForces('left', 'men');" class="game_icon"><<</a> <span id="transfer_land_men">`+locations[army_location]['men']+`</span></td>
									        <td align="center"><a href="#" onclick="transferForces('left', 'men', 1);" class="game_icon"><</a> Soldiers <a href="#" onclick="transferForces('right', 'men', 1);" class="game_icon">></a></td>
									        <td align="center"><span id="transfer_army_men">`+ characters[localStorage.character_chosen]['men'] +`</span> <a href="#" onclick="transferForces('right', 'men');" class="game_icon">>></a></td>
									    </tr>
									    <tr>
									        <td align="center"><a href="#" onclick="transferForces('left', 'knights');" class="game_icon"><<</a> <span id="transfer_land_knights">`+locations[army_location]['knights']+`</span></td>
									        <td align="center"><a href="#" onclick="transferForces('left', 'knights', 1);" class="game_icon"><</a> Knights <a href="#" onclick="transferForces('right', 'knights', 1);" class="game_icon">></a></td>
									        <td align="center"><span id="transfer_army_knights">`+ characters[localStorage.character_chosen]['knights'] +`</span> <a href="#" onclick="transferForces('right', 'knights');" class="game_icon">>></a></td>
									    </tr>
									    <tr>
									        <td align="center"><a href="#" onclick="transferForces('left', 'catapults');" class="game_icon"><<</a> <span id="transfer_land_catapults">`+locations[army_location]['catapults']+`</td>
									        <td align="center"><a href="#" onclick="transferForces('left', 'catapults', 1);" class="game_icon"><</a> Catapults <a href="#" onclick="transferForces('right', 'catapults', 1);" class="game_icon">></a></td>
									        <td align="center"><span id="transfer_army_catapults">`+ characters[localStorage.character_chosen]['catapults'] +`</span> <a href="#" onclick="transferForces('right', 'catapults');" class="game_icon">>></a></td>
									    </tr>
									</table>`;
			break;

		case 'buy_home_army':
			title = getText('players_turns', 'buy_home_army');


			options = `<br />You have <span id="home_gold">`+characters[character]['gold']+`</span> gold pieces<br /><br />
									<table style="width: 300px; margin-left: auto; margin-right: auto;">
									    <tr>
									        <td align="center">Cost</td>
									        <td>&nbsp;</td>
									        <td align="center">Home Army</td>
									    </tr>
									    <tr>
									        <td align="center"><span>1</span></td>
									        <td align="center">Soldiers</td>
									        <td align="center"><span id="buy_home_army_men">`+ locations[home_castle_location]['men'] +`</span> <a href="#" onclick="buyHomeArmyPlayer('men', 1);" class="game_icon">></a></td>
									        <td align="center"><a href="#" onclick="buyHomeArmyPlayer('men', 10);" class="game_icon">>></a></td>
									    </tr>
									    <tr>
									        <td align="center"><span>8</span></td>
									        <td align="center">Knights</td>
									        <td align="center"><span id="buy_home_army_knights">`+ locations[home_castle_location]['knights'] +`</span> <a href="#" onclick="buyHomeArmyPlayer('knights', 1);" class="game_icon">></a></td>
									        <td align="center"><a href="#" onclick="buyHomeArmyPlayer('knights', 10);" class="game_icon">>></a></td>
									    </tr>
									    <tr>
									        <td align="center"><span>15</span></td>
									        <td align="center">Catapults</td>
									        <td align="center"><span id="buy_home_army_catapults">`+ locations[home_castle_location]['catapults'] +`</span> <a href="#" onclick="buyHomeArmyPlayer('catapults', 1);" class="game_icon">></a></td>
									        <td align="center"><a href="#" onclick="buyHomeArmyPlayer('catapults', 10);" class="game_icon">>></a></td>
									    </tr>
									</table>`;

				result = "end_turn";
			break;

		case 'hold_tournament':
			player_fullname = characters[localStorage.character_chosen]['fullname'];
			title = getText('tournament', 'intro_title');
			text = getText('tournament', 'intro_text', player_fullname);
			//console.log("player_fullname: ", player_fullname); console.log("text: ", text);
			img = "<img width='340' height='212' src='"+base_url+"public/pics/tournament0.png' id='tournament_pic' />";

			tournament_lands = getTournamentLands();
			console.log("tournament_lands (function 'showActionDiv', hold_tournament): ", tournament_lands);

			if(tournament_lands.length > 0)
			{
				options = "<font class='font19'>Choose the stakes:</font><br /><a href='#' id='t_fame_button' class='font19'>Fame</a><a href='#' id='t_land_button' class='font19'>Land</a>";
			}
			else // no available lands to joust for!
			{
				options = "<font class='font19'>There are no lands to joust for, so you will have to joust for fame.</font><br /><button type='button' id='t_fame_button'>Ok</button>";
			}
			break;

		case 'choose_tournament_opponent':
			var characters = JSON.parse(localStorage.characters);
			var options = "";
			var someone_left_to_fight = "no";

			for(const character of Object.entries(characters))
			{
				//console.log("character (t_fame_button clicked)): ", character);
				//character ['wilfred', {…}]0: "wilfred"1: army_location: "Leicestershire"catapults: 0color: "#0000AA"fullname: "Wilfred of Ivanhoe"gold: 0home_castle: "Leicestershire"jousting: 6knights: 0leadership: 6men: 10played_by: "computer"points: 1000side: "saxons"state: "alive"swordplay: 6[[Prototype]]: Objectlength: 2[[Prototype]]: Array(0)
				if(character[0] != localStorage.character_chosen && character[0] != "robin" && character[1]['state'] == "alive")
				{
					//options += `<div><a href='#' id='`+character[0]+`' class='action_div_links'><img width='35' height='39' src='`+base_url+`pics/`+character[0]+`_head.png' />`+character[1]['fullname']+`</a><br /><span class='action_div_smalltext'>Jousting: `+character[1]['jousting']+`</span><br />`;

					options += `
						<div class="row">
					    <div class="col-md-2">
					        <div>
					        	<a href="#" id="`+character[0]+`" class="jousting_clash"><img width="35" height="39" src="`+base_url+`pics/`+character[0]+`_head.png" /></a>
					        </div>
					    </div>
					    <div class="col-md-10">
					        <div class="row">
					            <div class="col-md-12 text-start">
					                	<a href="#" id="`+character[0]+`" class="font15y jousting_clash">`+character[1]['fullname']+`</a>
					                	<span class="font15y">Jousting: `+character[1]['jousting']+`</span>
					            </div>
					        </div>
					    </div>
						</div>`;
						someone_left_to_fight = "yes";
				}
			}

			if(someone_left_to_fight == "no")
			{
				showActionDiv("tournament_victory");
			}
			else // show option to kill opponent's horse
			{
				options += `
					<div class="row">
				    <div class="col-md-12">
				    	<button type='button' id="kill_horse">Kill opponent's horse!</button>
				    </div>
					</div>`;
			}

			title = getText('tournament', 'intro_title');
			text = getText('tournament', 'choose_opponent');
			break;

		case 'jousting_clash':
			//console.log("jousting_clash (showActionDiv), character: ", character);
			var jousting_winner = getJoustingWinner(localStorage.character_chosen, character);
			//console.log("jousting_clash (showActionDiv), jousting_winner: ", jousting_winner);

			title = getText('tournament', 'intro_title');
			text = getText('tournament', 'the_clash');
			img = "<img width='340' height='212' src='"+base_url+"public/pics/jousting.jpg' />";
			options = "<font class='font19'>The winner is "+characters[jousting_winner]['fullname']+"! <br />";

			if(jousting_winner == localStorage.character_chosen)
			{
				options += getText('tournament', 'round_won');
				setOpponentDefeatedInTournament(character);
			}

			options += "</font>";

			// determine tournament round loser
			if(jousting_winner == localStorage.character_chosen) jousting_loser = character;
			else jousting_loser = localStorage.character_chosen;

			setCharacterSkillPoints(jousting_winner, 'jousting', 10);
			setCharacterSkillPoints(jousting_winner, 'leadership', 10);
			setCharacterSkillPoints(jousting_loser, 'jousting', -10);
			setCharacterSkillPoints(jousting_loser, 'leadership', -10);
			if(jousting_winner == localStorage.character_chosen) result = "tournament_win";
			else result = "tournament_lost";

			setPlayerState(jousting_loser, "knocked_out"); // set player to 'knocked out' in current tournament

			break;

		case 'tournament_lost':
			title = getText('tournament', 'intro_title');
			text = getText('tournament', 'lost');
			img = "<img width='340' height='212' src='"+base_url+"public/pics/tournament1.png' id='tournament_pic' />";
			result = "end_turn";
			break;

		case 'tournament_victory':
			title = getText('tournament', 'intro_title');
			text = getText('tournament', 'victory');
			img = "<img width='340' height='212' src='"+base_url+"public/pics/tournament_victory.png' />";
			setPlayerState(); // reset knocked out players to state 'alive'
			setPlayerGold(localStorage.character_chosen, 50);
			setCharacterSkillPoints(localStorage.character_chosen, 'jousting', 50);
			setCharacterSkillPoints(localStorage.character_chosen, 'leadership', 75);
			result = "tournament_victory";
			break;

		case 'kill_horse':
			var home_castle = characters[localStorage.character_chosen]['home_castle'];
			title = getText('tournament', 'intro_title');
			text = getText('tournament', 'horse_killed');
			img = "<img width='340' height='212' src='"+base_url+"public/pics/tournament1.png' />";
			setPlayerState(); // reset knocked out players to state 'alive'
			//setPlayerGold(localStorage.character_chosen, 50);
			setCharacterSkillPoints(localStorage.character_chosen, 'jousting', -50);
			setCharacterSkillPoints(localStorage.character_chosen, 'leadership', -75);
			stripPlayerLands(localStorage.character_chosen);
			setArmyLocation(home_castle);
			showArmyLocation();
			setArmyDiv(home_castle);
			resetLandsColors();
			result = "end_turn";
			break;

		case 'go_raiding':
			title = getText('raiding', 'title');
			var raiding_result = goRaiding(character);
			if(raiding_result['success'])
			{
				text = getText('raiding', 'success', raiding_result['winner_fullname'], raiding_result['loser_fullname']);
				img = "<br /><img width='340' height='212' src='"+base_url+"public/pics/raiding_success.png' />";
			}
			else
			{
				text = getText('raiding', 'fail', raiding_result['loser_fullname'], raiding_result['winner_fullname']);
				img = "<br /><img width='340' height='212' src='"+base_url+"public/pics/raiding_fail.png' />";
			}

			setCharacterSkillPoints(raiding_result['winner'], 'leadership', 10);
			setCharacterSkillPoints(raiding_result['winner'], 'swordplay', 10);
			setCharacterSkillPoints(raiding_result['loser'], 'leadership', -10);

			if(raiding_result['winner'] == localStorage.character_chosen)
			{
				options = getText('raiding', 'gold_stolen', raiding_result['gold_stolen']);
			}

			break;

		case 'buy_home_army_CPU': // so that it triggers the next AI playing OR end of AI turn

		case 'pass':
			player_fullname = characters[character]['fullname'];
			//console.log("function 'showActionDiv', case option 'pass', character: "+character+", player_fullname: "+player_fullname);
			title = getText('players_turns', 'pass_title');
			text = getText('players_turns', 'pass', player_fullname);
			img = "<img width='340' height='212' src='"+base_url+"public/pics/player_passes_turn.png' />";
			result = "player_passes";
			break;
	}

	if(character == localStorage.character_chosen) {}
	else result = "ai_turn";

	// return html depending on player and div
	var div = "action_div";
	switch(action)
	{
		default: break;
		case 'send_army': div = ""; break;
	}

	var html = "<span id='result' style='display:none'>"+result+"</span><div class='action_div_title'>"+title+"</div><div class='action_div_text' style='margin-top: 8px;'>"+text+"</div><div class='action_div_image' style='margin-top: 5px;'>"+img+"</div><div class='action_div_subtext'>"+options+"</div><div class='action_div_button_close'>";

	if(showCloseButton)
	{
		html += "<button type='button' data-character='"+character+"' data-land='"+land_to+"' data-result='"+result+"' class='closeButton'>Close</button></div>";
	}

	return html;
}
