/*Inserting into aboutus collection*/
const dbName = 'enmacchiatodb';
const aboutObject = {	
	language:'English',
	aboutUsItems:[
	{
			type:'Text',
			order:0,
			header:'What is English Macchiato?',
			text:'English Macchiato is an education application which can be used by those who wish to learn English and improve their skills!',
			image:{}			
	},
	{
		type:'Image',
		order:1,
		header:'',
		text:'',
		image:{
			type:'.jpg',
			alt:'aboutus',
			name:'aboutus1',
			hasMobileTabletPortrait:true,
			hasMobileTabletLandscape:true,
			hasIPadFamily:true,
			hasDesktop:true
		}
	},
	{
			type:'Text',
			order:2,
			header:'Why should learners use English Macchiato?',
			text:'Before we tell you why it is a good idea to use this perfect application ... ',
			image:{}
	}
	]};
	
conn = new Mongo();
db = conn.getDB(dbName);
db.aboutus.insertOne(aboutObject);