function setTexts(var1, var2, var3)
{
	var texts = {};

	texts['allied'] = {};
	texts['allied']['land_crossing'] = `This land belongs to your ally ${var1}. He asks you: "Do you wish to cross my land in peace?"`;
	texts['allied']['land_crossing_options'] = `What is your response? <a href="#">Cross land in peace</a> / Attack this land!"`;

	texts['tournament'] = {};
	texts['tournament']['intro_title'] = `The Tournament`;
	texts['tournament']['intro_text'] = `${var1} bids all knights to attend the games of Chivalry. The day of the tournament finds the lords at Ashby.`;
	texts['tournament']['choose_stakes'] = `Choose the stakes: Fame or Land.`;
	texts['tournament']['choose_opponent'] = `Choose your opponent:`;
	texts['tournament']['the_clash'] = `An expectant hush falls over the gallery as the Marshall gives the signal and the gallant knights spur their horses into action.`;
	texts['tournament']['lost'] = `Thus ends your day in the lists at Ashby. You were not the champion, but your deeds will be remembered. Leaving for home, you vow to return and bring glory to your name.`;
	texts['tournament']['banned'] = `You may not call a tournament, you have been banned from Ashby.`;
	texts['tournament']['round_won'] = `Congratulations. You won that round.`;
	texts['tournament']['victory'] = `You have won this tournament. Your name is spoken in reverence throughout the kingdom and your legend grows. A chest with 50 gold coins is awarded to you.`;
	texts['tournament']['horse_killed'] = `It is a black day for those who bear your name. You have broken the laws of Chivalry by killing a horse! You are banished from the tournament. No longer will you be called a Lord of the realm. Stripped of your lands, you return to an empty castle.`;

	texts['battle'] = {};
	texts['battle']['title_attack'] = `Clash at ${var1}`;
	texts['battle']['text_attack'] = `Blood taints the land as the sounds of battle fill the air.`;
	//Ex: echo sprintf($BATTLE_ATTACK, $player_name);
	texts['battle']['no_men'] = `There is no claim on this land. ${var1} captures it without casualty and any men within have now joined his quest.`;
	texts['battle']['title_defense'] = `The Defense`;
	texts['battle']['text_defense'] = `Your army is attacked by ${var1}. Saxon blood taints the green fields of ${var2}.`;
	texts['battle']['transfer_forces_title'] = `Transfer forces`;
	texts['battle']['draw'] = `Both forces fight a fierce and furious struggle but in the end no one is left standing. All men have lost their lives in this confrontation.`;
	texts['battle']['no_men_defending'] = `There are no men defending this territory. ${var1} captures it without any casualties.`;

	texts['saxon_lady'] = {};
	texts['saxon_lady']['saved'] = `You creep into a torchlit chamber and find a beautiful Saxon maid trembling in the darkness. Grateful, she calls your name and rushes into your waiting arms. During the weeks that follow, gratitude turns to love. Then late one night...`;
	texts['saxon_lady']['love'] = `As the firelight reflects in her eyes, your pulse quickens.`;
	texts['saxon_lady']['win_text'] = `You return to battle with renewed strength and determination... You have found a power in love as mighty as the sword you raise against your enemies.`;

	texts['sherwood'] = {};
	texts['sherwood']['robin_aid_title'] = `Sherwood Forest`;
	texts['sherwood']['robin_aid_text'] = `bla bla bla`;
	texts['sherwood']['robin_wont_aid_title'] = `Sherwood Again`;
	texts['sherwood']['robin_wont_aid_text'] = `Robin welcomes you to Sherwood and orders a celebration. 'Do the Saxons fare well?' You give Robin the news, then ask his aid. He replies, 'I pledged to assist you three times. You are ready to face the Normans without further aid from me.'`;

	texts['endgame'] = {};
	texts['endgame']['title_victory'] = `Final Victory`;
	texts['endgame']['text_victory'] = `Defeating the last enemy lord, you restore peace to the troubled kingdom. Now it is time to crown a new king. The men of Sherwood accompany you to the palace where a jubilant crowd fills the throne room. Suddenly, excited whispers race through the crowded hall. <i>'The Crown has been found. Robin has it!'</i> He was the 'thief' who took the Crown after the King's death, keeping it safe in Sherwood forest, safe from the Normans. Grinning broadly, the noble outlaw turns the Crown over to the archbishop, who begins the ceremony that will make you King of England.`;
	texts['endgame']['text_victory_robin_dead'] = `Defeating the last enemy lord, you restore peace to the troubled kingdom. Now it is time to crown a new king. Your most trusted men accompany you to the palace where a jubilant crowd fills the throne room. Suddenly, excited whispers race through the crowded hall. <i>'The Crown has been found. It was hidden in Sherwood forest!'</i> Robin Hood was the 'thief' who took the Crown after the King's death, keeping it safe in Sherwood forest, safe from the Normans. Grinning broadly, your men turn the Crown over to the archbishop, who begins the ceremony that will make you King of England.`;
	texts['endgame']['title_defeat'] = `The Last Battle`;
	texts['endgame']['text_defeat'] = `Your men fought bravely, but luck was not with them this day. After a long siege, your castle falls to the attackers. As the enemy pours throught the gates, you send your men into secret passages underneath the castle, passing word to meet in Sherwood forest. Moments later, you follow them to freedom. Together with Robin and the men of Sherwood, you will continue to struggle against Norman opression. Slipping away from your burning castle, you vow to keep fighting until a Saxon rules the land...`;

	texts['random_events'] = {};
	texts['random_events']['norman_rogues'] = `Norman rogues ambush your sheriff and steal the taxes he was collecting. You lose half your income this month.`;
	texts['random_events']['norman_plotters'] = `Norman plotters plant seeds of unrest within your realm. The vassals revolt. You lose a territory.`;
	texts['random_events']['robin_raids'] = `Robin raids a Norman stronghold and sends each Saxon lord 25 pieces of gold to help the cause.`;
	texts['random_events']['knights_aid'] = `${var1} knights have arrived from Germany to aid you in fighting the Normans.`;
	texts['random_events']['catapult_sabotage'] = `Norman rogues sabotage your catapults. The mighty siege engines are reduced to a pile of scrap.`;
	texts['random_events']['viking_raid'] = `A viking raid attacks your home castle. Many men are lost defending it.`;
	texts['random_events']['saxon_lady_kidnapped'] = `Saxon lady ${var1} has been kidnapped and is being held at ${var2}. Her ward promises to grant you her hand, and the joining of your two kingdoms should you succeed in a rescue attempt. Do you want to rescue her?`;
	texts['random_events']['danes_invasion'] = `Danes invade England and cut a path of destruction through your lands. You lose a territory.`;
	texts['random_events']['gain_territory'] = `Reacting to decades of tyranny, peasants in ${var1} stage a revolt and overthrow the local magistrate. You have a new territory.`;

	texts['raiding'] = {};
	texts['raiding']['title'] = `The Raid`;
	texts['raiding']['success'] = `${var1} raids the home castle of ${var2} in the middle of the night, while his guards were sleeping. When the sun rises that morning half the gold is gone.`;
	texts['raiding']['fail'] = `${var1} raids the home castle of ${var2} in the middle of the night, but he is captured and thrown into the dungeon. A few days later, after paying a large ransom, the humiliated Lord is released, poorer but a bit wiser.`;
	texts['raiding']['gold_stolen'] = `You get ${var1} gold coins to add to your treasure.`;

	texts['players_turns'] = {};
	texts['players_turns']['pass_title'] = `An orderly stage.`;
	texts['players_turns']['pass'] = `${var1} stays put. His forces remain where they are, and he takes no action this month.`;
	texts['players_turns']['buy_home_army'] = `Buying Home army`;

	localStorage.texts = JSON.stringify(texts);
	//console.log(`localStorage.texts (function 'setTexts'): `, localStorage.texts);
}

function getText(text, subtext, var1 = "", var2 = "", var3 = "")
{
	//console.log("text (function 'getText'): "+text+", subtext: "+subtext+", var1: "+var1+", var2: "+var2+", var3: "+var3);
	setTexts(var1, var2, var3);
	var texts = JSON.parse(localStorage.texts);
	return texts[text][subtext];
}
