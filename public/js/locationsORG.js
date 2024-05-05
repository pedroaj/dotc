function setMapLocations() // set home locations colors, lands and castles for all players
{
	//console.log("Entering function 'setMapLocations'!");

	var characters = JSON.parse(localStorage.characters);

	// initialize locations & castles
	locations = {};
	locations_names = ["Bedfordshire","Berkshire","Buckinghamshire","Cheshire","Cambridgeshire","Cornwall","Cumbria","Derbyshire","Durham","Dorset","Devon","Essex","Gloucestershire",
		"London","Hampshire","Herefordshire","Hertfordshire","Kent","Lancashire","Leicestershire","Lincolnshire","Northamptonshire","Northumberland","Norfolk","Nottinghamshire",
		"Oxfordshire","Rutland","Suffolk","Somerset","Shropshire","Surrey","Staffordshire","Sussex","Wales","Wiltshire","Worcestershire","Warwickshire","Yorkshire"];

	// initialize lands colors and set number of men per land
	locations_names.forEach(function(name)
	{
		temp = {};
		temp['name'] = name;
		switch(name)
		{
			default:
				temp['castle'] = "";
				temp['owner'] = "";
				temp['men'] = getRandomNumber('medium');
				temp['color'] = DEFAULT_LAND_COLOR;
				temp['income'] = getRandomNumber('medium');
				break;

			case 'Cumbria': case 'Wales': case 'Lincolnshire': case 'Devon':
				temp['castle'] = "";
				temp['owner'] = "";
				temp['men'] = getRandomNumber('high');
				temp['color'] = DEFAULT_LAND_COLOR;
				temp['income'] = getRandomNumber('high');
				break;

			case 'Rutland': case 'Bedfordshire': case 'Hertfordshire': case 'Berkshire':
				temp['castle'] = "";
				temp['owner'] = "";
				temp['men'] = getRandomNumber('low');
				temp['color'] = DEFAULT_LAND_COLOR;
				temp['income'] = getRandomNumber('low');
				break;
		}
		temp['knights'] = 0;
		temp['catapults'] = 0;
		locations[name] = temp;
	});

	// set locations border lands (neighbouring lands)
	locations['Bedfordshire']['borders'] = ['Northamptonshire', 'Cambridgeshire', 'Buckinghamshire', 'Hertfordshire'];
	locations['Berkshire']['borders'] = ['Oxfordshire', 'Wiltshire', 'Buckinghamshire', 'Hampshire', 'Surrey'];
	locations['Buckinghamshire']['borders'] = ['Northamptonshire', 'Bedfordshire', 'Oxfordshire', 'Hertfordshire', 'London', 'Berkshire'];
	locations['Cheshire']['borders'] = ['Lancashire', 'Derbyshire', 'Staffordshire', 'Shropshire', 'Wales'];
	locations['Cambridgeshire']['borders'] = ['Northamptonshire', 'Lincolnshire', 'Norfolk', 'Suffolk', 'Essex', 'Hertfordshire', 'Bedfordshire'];
	locations['Cornwall']['borders'] = ['Devon'];
	locations['Cumbria']['borders'] = ['Northumberland', 'Durham', 'Yorkshire', 'Lancashire'];
	locations['Derbyshire']['borders'] = ['Lancashire', 'Yorkshire', 'Nottinghamshire', 'Leicestershire','Staffordshire','Cheshire'];
	locations['Durham']['borders'] = ['Northumberland', 'Cumbria', 'Yorkshire'];
	locations['Dorset']['borders'] = ['Devon', 'Somerset', 'Wiltshire','Hampshire'];
	locations['Devon']['borders'] = ['Cornwall', 'Somerset', 'Dorset'];
	locations['Essex']['borders'] = ['Suffolk', 'Cambridgeshire', 'Hertfordshire','London','Kent'];
	locations['Gloucestershire']['borders'] = ['Wales', 'Herefordshire', 'Worcestershire','Warwickshire','Oxfordshire','Wiltshire','Somerset'];
	locations['London']['borders'] = ['Buckinghamshire', 'Hertfordshire', 'Essex','Kent','Surrey','Berkshire'];
	locations['Hampshire']['borders'] = ['Dorset', 'Hampshire', 'Berkshire','Surrey','Sussex'];
	locations['Herefordshire']['borders'] = ['Wales', 'Shropshire', 'Worcestershire','Gloucestershire'];
	locations['Hertfordshire']['borders'] = ['Buckinghamshire', 'Bedfordshire', 'Cambridgeshire','Essex','London'];
	locations['Kent']['borders'] = ['Essex', 'London', 'Surrey','Sussex'];
	locations['Lancashire']['borders'] = ['Cumbria', 'Yorkshire', 'Derbyshire','Cheshire'];
	locations['Leicestershire']['borders'] = ['Staffordshire', 'Derbyshire', 'Nottinghamshire','Lincolnshire','Rutland','Northamptonshire','Warwickshire'];
	locations['Lincolnshire']['borders'] = ['Yorkshire', 'Nottinghamshire', 'Leicestershire','Rutland','Northamptonshire','Cambridgeshire','Norfolk'];
	locations['Northamptonshire']['borders'] = ['Leicestershire', 'Rutland', 'Lincolnshire','Cambridgeshire','Bedfordshire','Buckinghamshire','Oxfordshire','Warwickshire'];
	locations['Northumberland']['borders'] = ['Cumbria', 'Durham'];
	locations['Norfolk']['borders'] = ['Lincolnshire', 'Cambridgeshire','Suffolk'];
	locations['Nottinghamshire']['borders'] = ['Lincolnshire', 'Yorkshire','Rutland','Leicestershire','Derbyshire'];
	locations['Oxfordshire']['borders'] = ['Gloucestershire', 'Warwickshire','Northamptonshire','Buckinghamshire','Berkshire','Wiltshire'];
	locations['Rutland']['borders'] = ['Leicestershire', 'Lincolnshire','Northamptonshire'];
	locations['Suffolk']['borders'] = ['Norfolk', 'Cambridgeshire','Essex'];
	locations['Somerset']['borders'] = ['Gloucestershire', 'Wiltshire','Dorset','Devon'];
	locations['Shropshire']['borders'] = ['Wales', 'Cheshire','Staffordshire','Worcestershire','Herefordshire'];
	locations['Surrey']['borders'] = ['Sussex', 'Hampshire','Berkshire','London','Kent'];
	locations['Staffordshire']['borders'] = ['Shropshire', 'Cheshire','Derbyshire','Leicestershire','Warwickshire','Worcestershire'];
	locations['Sussex']['borders'] = ['Hampshire', 'Surrey','Kent'];
	locations['Wales']['borders'] = ['Cheshire', 'Shropshire','Herefordshire','Gloucestershire'];
	locations['Wiltshire']['borders'] = ['Oxfordshire', 'Berkshire','Hampshire','Dorset','Somerset','Gloucestershire'];
	locations['Worcestershire']['borders'] = ['Shropshire', 'Staffordshire','Warwickshire','Gloucestershire','Herefordshire'];
	locations['Warwickshire']['borders'] = ['Leicestershire', 'Northamptonshire','Oxfordshire','Gloucestershire','Worcestershire','Staffordshire'];
	locations['Yorkshire']['borders'] = ['Durham', 'Cumbria','Lancashire','Derbyshire','Nottinghamshire','Lincolnshire'];

	// initialize saxons start location
	var randomStartLocation = "";
	var tempStartLocations = SAXONS_START_LOCATIONS;
	SAXONS.forEach(function(item)
	{
		if(item == 'robin') return; // robin hood lives at Nottinghamshire forest!
		var randomStartLocation = tempStartLocations[Math.floor(Math.random() * tempStartLocations.length)];

		// remove previous start location from array, because it cannot be selected again
		const index = tempStartLocations.indexOf(randomStartLocation);
		if(index > -1) {tempStartLocations.splice(index, 1);}

		characters[item]['home_castle'] = randomStartLocation;
		characters[item]['army_location'] = randomStartLocation;

		locations[randomStartLocation]['owner'] = item;
		locations[randomStartLocation]['castle'] = "castle_big";
		locations[randomStartLocation]['color'] = characters[item]['color'];
	});

	// initialize special saxon player: robin of locksley (Robin Hood)
	locations['Nottinghamshire']['owner'] = 'robin';
	locations['Nottinghamshire']['men'] = 300;

	tempStartLocations = NORMANS_START_LOCATIONS;

	// initialize normans start location
	NORMANS.forEach(function(item)
	{
		var randomStartLocation = tempStartLocations[Math.floor(Math.random() * tempStartLocations.length)];

		// remove previous start location from array, because it cannot be selected again
		const index = tempStartLocations.indexOf(randomStartLocation);
		if(index > -1) {tempStartLocations.splice(index, 1);}

		characters[item]['home_castle'] = randomStartLocation;
		characters[item]['army_location'] = randomStartLocation;

		locations[randomStartLocation]['owner'] = item;
		locations[randomStartLocation]['castle'] = "castle_big";
		locations[randomStartLocation]['color'] = characters[item]['color'];
	});

	for(const location of Object.entries(locations))
	{
		$('#'+location['name']).css('fill',location['color']); // set color
		if(location['castle'] != '')
		{
			$('.'+location['name']+'_castle').show();
		}
	}

	for(const character of Object.entries(characters))
	{
		$('#'+character[1]['home_castle']).addClass(character[0]); // add player's name to land class
		$("a[title^="+character[1]['home_castle']).addClass(character[0]); // add player's name to home castle
	}

	// set Sherwood forest location, color & owner (special case)
	$("a[title='Sherwood forest']").addClass('robin'); // add robin's name to Sherwood forest
	$("path[title='Nottinghamshire']").css('fill','#00960F');

	//console.log("array locations (function 'setMapLocations'): ", locations); console.log("JSON.stringify(locations) (at function 'setMapLocations'): ", JSON.stringify(locations));

	localStorage.locations = JSON.stringify(locations);
	localStorage.characters = JSON.stringify(characters);

	// console.log("localStorage.locations (function 'setMapLocations'): ", localStorage.locations);

	return true;
}
