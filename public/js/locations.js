function setMapLocations() // set home locations colors, lands and castles for all players
{
	//console.log("Entering function 'setMapLocations'!");

	var characters = JSON.parse(localStorage.characters);

	// initialize locations & castles
	locations = {};
	locations_names = ["Aberdeenshire", "Anglesey", "Angus", "Ayrshire", "Banffshire", "Bedfordshire", "Berkshire", "Berwickshire", "Brecknockshire", "Buckinghamshire", "Caernarfonshire", "Cambridgeshire", "Cardiganshire", "Carmarthenshire", "Cheshire", "Cornwall", "Cumberland", "Denbighshire", "Derbyshire", "Devon", "Dorset", "Dumfriesshire", "Durham", "Eastlothian", "Essex", "Fife", "Flintshire", "Glamorgan", "Gloucestershire", "Hampshire", "Herefordshire", "Hertfordshire", "Huntingdonshire", "Kent", "Kincardineshire", "Kirkcudbrightshire", "Lanarkshire", "Lancashire", "Leicestershire", "Lincolnshire", "Merionethshire", "Middlesex", "Midlothian", "Monmouthshire", "Montgomeryshire", "Morayshire", "Nairnshire", "Norfolk", "Northamptonshire", "Northumberland", "Nottinghamshire", "Oxfordshire", "Peeblesshire", "Pembrokeshire", "Perthshire", "Radnorshire", "Renfrewshire", "Roxburghshire", "Rutland", "Selkirkshire", "Shropshire", "Somerset", "Staffordshire", "Stirlingshire", "Suffolk", "Surrey", "Sussex", "Worcestershire", "Warwickshire", "Westlothian", "Westmorland", "Wigtownshire", "Wiltshire", "Yorkshire"];

	SAXONS_START_LOCATIONS = ["Aberdeenshire", "Kirkcudbrightshire", "Yorkshire", "Cardiganshire"];
	NORMANS_START_LOCATIONS = ["Cornwall", "Warwickshire", "Norfolk", "Sussex", "Essex"];

	// initialize lands colors and set number of men per land
	locations_names.forEach(function(name)
	{
		temp = {};
		temp['name'] = name;
		switch(name)
		{
			default:
				temp['men'] = getRandomNumber('medium');
				temp['income'] = getRandomNumber('medium');
				break;

			case 'Gloucestershire': case 'Yorkshire': case 'Lincolnshire': case 'Devon':
				temp['men'] = getRandomNumber('high');
				temp['income'] = getRandomNumber('high');
				break;

			case 'Rutland': case 'Bedfordshire': case 'Hertfordshire': case 'Berkshire':
				temp['men'] = getRandomNumber('low');
				temp['income'] = getRandomNumber('low');
				break;
		}
		temp['castle'] = "";
		temp['owner'] = "";
		temp['color'] = DEFAULT_LAND_COLOR;
		temp['knights'] = 0;
		temp['catapults'] = 0;
		locations[name] = temp;
	});

	// set locations border lands (neighbouring lands)
	locations['Aberdeenshire']['borders'] = ['Banffshire','Perthshire','Angus','Kincardineshire'];
	locations['Anglesey']['borders'] = ['Caernarfonshire'];
	locations['Angus']['borders'] = ['Perthshire','Aberdeenshire','Kincardineshire'];
	locations['Ayrshire']['borders'] = ['Renfrewshire','Lanarkshire','Dumfriesshire','Kirkcudbrightshire','Wigtownshire'];
	locations['Banffshire']['borders'] = ['Morayshire','Aberdeenshire'];
	locations['Bedfordshire']['borders'] = ['Northamptonshire','Huntingdonshire','Cambridgeshire','Hertfordshire','Buckinghamshire'];
	locations['Berkshire']['borders'] = ['Gloucestershire','Oxfordshire','Buckinghamshire','Surrey','Hampshire','Wiltshire'];
	locations['Berwickshire']['borders'] = ['Eastlothian','Midlothian','Roxburghshire','Northumberland'];
	locations['Brecknockshire']['borders'] = ['Cardiganshire','Radnorshire','Herefordshire','Monmouthshire','Glamorgan','Carmarthenshire'];
	locations['Buckinghamshire']['borders'] = ['Northamptonshire','Bedfordshire','Hertfordshire','Middlesex','Surrey','Berkshire','Oxfordshire'];
	locations['Caernarfonshire']['borders'] = ['Anglesey','Denbighshire','Merionethshire'];
	locations['Cambridgeshire']['borders'] = ['Lincolnshire','Norfolk','Suffolk','Essex','Hertfordshire','Bedfordshire','Huntingdonshire','Northamptonshire'];
	locations['Cardiganshire']['borders'] = ['Merionethshire','Montgomeryshire','Radnorshire','Brecknockshire','Carmarthenshire','Pembrokeshire'];
	locations['Carmarthenshire']['borders'] = ['Pembrokeshire','Cardiganshire','Brecknockshire','Glamorgan'];
	locations['Cheshire']['borders'] = ['Lancashire','Yorkshire','Derbyshire','Staffordshire','Shropshire','Denbighshire','Flintshire'];
	locations['Cornwall']['borders'] = ['Devon'];
	locations['Cumberland']['borders'] = ['Dumfriesshire','Roxburghshire','Northumberland','Durham','Westmorland','Lancashire'];
	locations['Denbighshire']['borders'] = ['Flintshire','Cheshire','Shropshire','Montgomeryshire','Merionethshire','Caernarfonshire'];
	locations['Derbyshire']['borders'] = ['Yorkshire','Nottinghamshire','Leicestershire','Staffordshire','Cheshire'];
	locations['Devon']['borders'] = ['Cornwall','Somerset','Dorset'];
	locations['Dorset']['borders'] = ['Devon','Somerset','Wiltshire','Hampshire'];
	locations['Dumfriesshire']['borders'] = ['Kirkcudbrightshire','Ayrshire','Lanarkshire','Peeblesshire','Selkirkshire','Roxburghshire','Cumberland'];
	locations['Durham']['borders'] = ['Northumberland','Cumberland','Westmorland','Yorkshire'];
	locations['Eastlothian']['borders'] = ['Midlothian','Berwickshire'];
	locations['Essex']['borders'] = ['Suffolk','Cambridgeshire','Hertfordshire','Middlesex','Surrey','Kent'];
	locations['Fife']['borders'] = ['Perthshire','Stirlingshire'];
	locations['Flintshire']['borders'] = ['Denbighshire','Cheshire'];
	locations['Glamorgan']['borders'] = ['Carmarthenshire','Brecknockshire','Monmouthshire'];
	locations['Gloucestershire']['borders'] = ['Monmouthshire','Herefordshire','Worcestershire','Warwickshire','Oxfordshire','Berkshire','Wiltshire','Somerset'];
	locations['Hampshire']['borders'] = ['Dorset','Wiltshire','Berkshire','Surrey','Sussex'];
	locations['Herefordshire']['borders'] = ['Monmouthshire','Brecknockshire','Radnorshire','Shropshire','Worcestershire','Gloucestershire'];
	locations['Hertfordshire']['borders'] = ['Bedfordshire','Cambridgeshire','Essex','Middlesex','Buckinghamshire'];
	locations['Huntingdonshire']['borders'] = ['Northamptonshire','Cambridgeshire','Bedfordshire'];
	locations['Kent']['borders'] = ['Essex','Middlesex','Surrey','Sussex'];
	locations['Kincardineshire']['borders'] = ['Aberdeenshire','Angus'];
	locations['Kirkcudbrightshire']['borders'] = ['Wigtownshire','Ayrshire','Dumfriesshire'];
	locations['Lanarkshire']['borders'] = ['Renfrewshire','Ayrshire','Dumfriesshire','Peeblesshire','Midlothian','Westlothian','Stirlingshire'];
	locations['Lancashire']['borders'] = ['Westmorland','Yorkshire','Cheshire'];
	locations['Leicestershire']['borders'] = ['Staffordshire','Derbyshire','Nottinghamshire','Lincolnshire','Rutland','Northamptonshire','Warwickshire'];
	locations['Lincolnshire']['borders'] = ['Yorkshire','Nottinghamshire','Leicestershire','Rutland','Northamptonshire','Cambridgeshire','Norfolk'];
	locations['Merionethshire']['borders'] = ['Caernarfonshire','Denbighshire','Montgomeryshire','Cardiganshire'];
	locations['Middlesex']['borders'] = ['Buckinghamshire','Hertfordshire','Essex','Kent','Surrey'];
	locations['Midlothian']['borders'] = ['Westlothian','Lanarkshire','Peeblesshire','Selkirkshire','Roxburghshire','Berwickshire','Eastlothian'];
	locations['Monmouthshire']['borders'] = ['Glamorgan','Brecknockshire','Herefordshire','Gloucestershire'];
	locations['Montgomeryshire']['borders'] = ['Cardiganshire','Radnorshire','Shropshire','Denbighshire','Merionethshire'];
	locations['Morayshire']['borders'] = ['Nairnshire','Banffshire'];
	locations['Nairnshire']['borders'] = ['Morayshire'];
	locations['Norfolk']['borders'] = ['Lincolnshire','Cambridgeshire','Suffolk'];
	locations['Northamptonshire']['borders'] = ['Leicestershire','Rutland','Lincolnshire','Cambridgeshire','Huntingdonshire','Bedfordshire','Buckinghamshire','Oxfordshire','Warwickshire'];
	locations['Northumberland']['borders'] = ['Berwickshire','Roxburghshire','Cumberland','Durham'];
	locations['Nottinghamshire']['borders'] = ['Yorkshire','Lincolnshire','Leicestershire','Derbyshire'];
	locations['Oxfordshire']['borders'] = ['Warwickshire','Northamptonshire','Buckinghamshire','Berkshire','Gloucestershire'];
	locations['Peeblesshire']['borders'] = ['Lanarkshire','Dumfriesshire','Selkirkshire','Midlothian'];
	locations['Pembrokeshire']['borders'] = ['Cardiganshire','Carmarthenshire'];
	locations['Perthshire']['borders'] = ['Aberdeenshire','Angus','Fife','Stirlingshire'];
	locations['Radnorshire']['borders'] = ['Montgomeryshire','Shropshire','Herefordshire','Brecknockshire','Cardiganshire'];
	locations['Renfrewshire']['borders'] = ['Lanarkshire','Ayrshire'];
	locations['Roxburghshire']['borders'] = ['Selkirkshire','Midlothian','Berwickshire','Northumberland','Cumberland','Dumfriesshire'];
	locations['Rutland']['borders'] = ['Leicestershire','Lincolnshire','Northamptonshire'];
	locations['Selkirkshire']['borders'] = ['Peeblesshire','Midlothian','Roxburghshire','Dumfriesshire'];
	locations['Shropshire']['borders'] = ['Denbighshire','Cheshire','Staffordshire','Worcestershire','Herefordshire','Radnorshire','Montgomeryshire'];
	locations['Somerset']['borders'] = ['Gloucestershire','Wiltshire','Dorset','Devon'];
	locations['Staffordshire']['borders'] = ['Cheshire','Derbyshire','Leicestershire','Warwickshire','Worcestershire','Shropshire'];
	locations['Stirlingshire']['borders'] = ['Perthshire','Fife','Westlothian','Lanarkshire'];
	locations['Suffolk']['borders'] = ['Norfolk','Cambridgeshire','Essex'];
	locations['Surrey']['borders'] = ['Berkshire','Buckinghamshire','Middlesex','Kent','Sussex','Hampshire'];
	locations['Sussex']['borders'] = ['Hampshire','Surrey','Kent'];
	locations['Worcestershire']['borders'] = ['Shropshire','Staffordshire','Warwickshire','Gloucestershire','Herefordshire'];
	locations['Warwickshire']['borders'] = ['Worcestershire','Staffordshire','Leicestershire','Northamptonshire','Oxfordshire','Gloucestershire'];
	locations['Westlothian']['borders'] = ['Fife','Stirlingshire','Lanarkshire','Midlothian'];
	locations['Westmorland']['borders'] = ['Cumberland','Durham','Yorkshire','Lancashire'];
	locations['Wigtownshire']['borders'] = ['Ayrshire','Kirkcudbrightshire'];
	locations['Wiltshire']['borders'] = ['Gloucestershire','Berkshire','Hampshire','Dorset','Somerset'];
	locations['Yorkshire']['borders'] = ['Durham','Westmorland','Lancashire','Cheshire','Derbyshire','Nottinghamshire','Lincolnshire'];

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
	locations['Nottinghamshire']['men'] = 3000;

	// initialize normans start location
	tempStartLocations = NORMANS_START_LOCATIONS;
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
