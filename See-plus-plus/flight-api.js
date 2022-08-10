const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const mailgun = require("mailgun-js");
const { Module } = require('module');
const DOMAIN = 'sandbox1223eb61b00b418090bcfba5567b90d9.mailgun.org';
const api_key = '7f25eed03edb0c1601ada959ac242dd9-1b3a03f6-3a976fea';
const mg = mailgun({apiKey: api_key, domain: DOMAIN});



const app = express();
const port = 6400;

// Where we will keep books
let flights = 
[
{
"whereto": "Rome",
"price": "500",
"datego": "01/15",
"hotelname": "COMFORT INN ROMA TERMINI",
"hoteladdress":"Termini Station, Rome ",
"image":"https://q-xx.bstatic.com/images/hotel/max500/215/215423636.jpg"
},

{
"whereto": "Viena",
"price": "500",
"datego": "01/31",
"hotelname": "APMS Rooms",
"hoteladdress":"12.Meidling, Viena",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/171162514.webp?k=339c8b6dbd22de3e7bfe2925fa8465385cfa1a038980f6e657d20d98d25b57c7&o=&s=1"
},

{
"whereto": "Moscow",
"price": "1000",
"datego": "01/15",
"hotelname": "Hotel Sovietsky",
"hoteladdress":"Leningradsky Prospect, Moscow",
"image":"https://cf.bstatic.com/xdata/images/hotel/max500/291010716.jpg?k=ddc895af4ee27cac014a80b0cd70aedfecbcf16baba00d59385a53fd3c3e57ea&o=&hp=1"
},

 {
"whereto": "Belgrad",
"price": "1000",
"datego": "01/31",
"hotelname": "Belgrade Bicycle Hostel",
"hoteladdress":"Stari Grad, Belgrade",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/317462306.webp?k=4eb1b2be114f3e4630d7be9a7c945b9222f92b04f9a86bfc1b33619be53479a3&o=&s=1"
},

 {
"whereto": "Montreal",
"price": "1500",
"datego": "01/15",
"hotelname": "Auberge L Apero",
"hoteladdress":"City Center, Montreal",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/114214692.webp?k=41cb85849cefa2b58cc55dc897518cc18c12882c8f5a0d4d883347d2fabd9ef6&o=&s=1"
},

 {
"whereto": "Cape Town",
"price": "1500",
"datego": "01/31",
"hotelname": "Long Street Backpackers",
"hoteladdress":"Cape Town CBD, Cape Town",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/280052587.webp?k=0205c853cb91e2489f0c8a49797e7bed8ef8a73db1a378896dd79b1150f1c6b5&o=&s=1"
},

 {
"whereto": "Helsinki",
"price": "500",
"datego": "02/15",
"hotelname": "Arkadia Hostel",
"hoteladdress":"Katajanokka, Helsinki",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/273618059.webp?k=fb215c95ad2114a927350fe90e385549937517b9606ef26938d544bc2e79e7a6&o=&s=1"
},

 {
"whereto": "Berlin",
"price": "500",
"datego": "02/31",
"hotelname": "Mir Hostel",
"hoteladdress":"Mitte, Berlin",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/273319401.webp?k=2011ddcf6df606a597fea249932fe147b9eafa519bcb1b199bab92a61f95cefe&o=&s=1"
},

 {
"whereto":"Edinburgh",
"price": "1000",
"datego": "02/15",
"hotelname": "High Street Hostel",
"hoteladdress":"Historic Center, Edinburgh",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/237486644.webp?k=76d5808fa70e7ebd0ac607402dfbdd47356c7bad62b6d4369158eb8be9001c13&o=&s=1"
},

 {
"whereto": "Chicago",
"price": "1000",
"datego": "02/31",
"hotelname": "Chicago Getway Hostel",
"hoteladdress":"Lincoln Park, Chicago",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/7179399.webp?k=5cb63dfc16f3eadf6a247dd18b72855829b207ca4e674afd2df8e72c619efcd0&o=&s=1"
},

 {
"whereto": "Sydney",
"price": "1500",
"datego": "02/15",
"hotelname": "Sydney Backpackers",
"hoteladdress":"Central Sydney, Sydney",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/168929347.webp?k=b55a9684307860affc3899024ed27aaf9e144a7af5dedf16151447ca1e0ff1a2&o=&s=1"
},

 {
"whereto": "Taipei",
"price": "1500",
"datego": "02/31",
"hotelname": "SleepBox Hostel",
"hoteladdress":"Zhongzheng District, Taipei",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/64419645.webp?k=c1053fe72448751d2c96947d2981a47713c05421ea2af761b60ffbd9589fdbf5&o=&s=1"
},

 {
"whereto": "Munich",
"price": "500",
"datego": "03/15",
"hotelname": "THE TENT",
"hoteladdress":"Moosach, Munich",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/90382889.webp?k=d2cf35f9f20319353058411a977e1b56a6a28db3328980115e09f18e455197d9&o=&s=1"
},

 {
"whereto": "Madrid",
"price": "500",
"datego": "03/31",
"hotelname": "HC Hostel",
"hoteladdress":"City Center, Madrid",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/332824490.webp?k=2e8cf8f8b2766147e975b2052d25387fbfba282850a907ff4edcad2d90410beb&o=&s=1"
},

 {
"whereto": "Punta Cana",
"price": "1000",
"datego": "03/15",
"hotelname": "Hotel Punto4",
"hoteladdress":"Bávaro, Punta Cana",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/308976980.webp?k=c043c671739cbc1297311cdbdb6a069057bde412090084f67406002da673ecd4&o=&s=1"
},

 {
"whereto": "Miami",
"price": "1000",
"datego": "03/31",
"hotelname": "MiLuSol",
"hoteladdress":"City Center, Miami",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/356504635.webp?k=a423d25c2671f8dbfc61e9de9efb248793fb68eeabaa2037bc519baee7495218&o=&s=1"
},

{
"whereto": "Melbourne",
"price": "1500",
"datego": "03/15",
"hotelname": "Summer House Melbourne Backpackers",
"hoteladdress":"St Kilda, Melbourne",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/200286985.webp?k=bcae6f5120e8614facb761b6c8aecafce6ccf2808f2f5ce9e92fdcfb05cced87&o=&s=1"
},

{
"whereto": "Tokyo",
"price": "1500",
"datego": "03/31",
"hotelname": "Hotel Owl Tokyo Shinbashi",
"hoteladdress":"Minato, Tokyo",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/238672685.webp?k=e8e70bffff56504f6c96cd643b0c217ebc337db20818fa4a46fb9b891eb65f12&o=&s=1"
},

{
"whereto": "Barcelona",
"price": "500",
"datego": "04/15",
"hotelname": "Inout",
"hoteladdress":"Sarrià-St. Gervasi, Barcelona",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/228653866.webp?k=6095de373a1998412176ee1c833d72e4210f73f6795a57ffdc6c116dbb9ab524&o=&s=1"
},

{
"whereto": "Prague",
"price": "500",
"datego": "04/31",
"hotelname": "Plus Prague",
"hoteladdress":"Prague 7, Prague",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/34904716.webp?k=7fb05211c446029314cf675a170e5378473decd4dd951b35e0ebc974ea518c73&o=&s=1"
},

{
"whereto": "Marrakech",
"price": "1000",
"datego": "04/15",
"hotelname": "HOSTEL SBAI",
"hoteladdress":"Medina, Marrakech",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/380122302.webp?k=66b5cf1c2cabfde8d92a981a3c890217f2f4f9fb69dec3ad44ccca5aec73be27&o=&s=1"
},

{
"whereto": "Copenhagen",
"price": "1000",
"datego": "04/31",
"hotelname": "Bedwood Hostel",
"hoteladdress":"City Centre, Copenhagen",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/357285748.webp?k=796fafdf384e9b694719b1d500b4f9e93904ff1ae0d3a82abe926945286159ef&o=&s=1"
},

{
"whereto": "Buenos Aires",
"price": "1500",
"datego": "04/15",
"hotelname": "Hospedaje La Rana",
"hoteladdress":"Flores, Buenos Aires",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/78563257.webp?k=29e0db00f286acb50b032c449f90ffd729b8538d44a8996c8f9f23b1437e90bc&o=&s=1"
},

{
"whereto": "San Francisco",
"price": "1500",
"datego": "04/31",
"hotelname": "Amsterdam Hostel",
"hoteladdress":"Union Square, San Francisco",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/305087301.webp?k=e4e4ca81857afb6da062d1cb4b99fb5b6995295e109409f0e10b1b79ca001238&o=&s=1"
},

{
"whereto": "Lisbon",
"price": "500",
"datego": "05/15",
"hotelname": "Daar Lisbon Apartments & Hostel",
"hoteladdress":"Arroios, Lisbon",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/88759640.webp?k=75c479a0b4cdf15a7a24dc7f8d29872bd4701c0f95e39f3bd639ff9a533dac40&o=&s=1"
},

{
"whereto": "Athens",
"price": "500",
"datego": "05/31",
"hotelname": "Thanasis Place",
"hoteladdress":"Athens Center, Athens",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/255195188.webp?k=bc8e403dcba7bba255c96a3e43c8de125cbe14d410712243f39d0041e6042396&o=&s=1"
},

{
"whereto": "Las Vegas",
"price": "1000",
"datego": "05/15",
"hotelname": "Bposhtels Las Vegas",
"hoteladdress":"Boulder Strip, Las Vegas",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/332224408.webp?k=d2041d6142f6e910f382d84da7b5129f901448fdd4548ac8d9f5eb784fed013d&o=&s=1"
},

{
"whereto": "Kathmandu",
"price": "1000",
"datego": "05/31",
"hotelname": "My Friends Hostel",
"hoteladdress":"Kathmandu, Kathmandu",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/357977513.webp?k=76d2a1554aaed4210a5c9ca3caa5b0f4dc3a0de67318c96f1d0e90937afd2be7&o=&s=1"
},

{
"whereto": "Boston",
"price": "1500",
"datego": "05/15",
"hotelname": "Boston Homestel",
"hoteladdress":"Dorchester, Boston",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/186739093.webp?k=1726fb4f168163b97de7e62a976fa925540adb0fbc25920484958f5d34adc333&o=&s=1"
},

{
"whereto": "Reykjavìk",
"price": "1500",
"datego": "05/31",
"hotelname": "Dalur- HI Hostel",
"hoteladdress":"Reykjavìk East, Reykjavìk",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/302650892.webp?k=b6248bba9214c473e28c06aa0e61d36f8126878c7cd196970a964e057c6ed7cb&o=&s=1"
},

{
"whereto": "São Miguel Island",
"price": "500",
"datego": "06/15",
"hotelname": "Bella Italia Portas da Cidade",
"hoteladdress":"Ponta Delgada, Azores ",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/297732990.webp?k=c7514cf6eda283b1b5433abba8e0ed74fd3e181dfbb0d4b1786640b836a903dd&o=&s=1"
},

{
"whereto": "Florence",
"price": "500",
"datego": "06/31",
"hotelname": "Hostel Santa Monaca",
"hoteladdress":"San Frediano, Florence",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/178526346.webp?k=6079d11fd2c6ec028476aff17590f44b60f7779392267849af48f5013a92bf9f&o=&s=1"
},

{
"whereto": "Manchester",
"price": "1000",
"datego": "06/15",
"hotelname": "Rahman Piccadily Hostel",
"hoteladdress":"City Center, Manchester",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/308269357.webp?k=ae1db4894635e78ee2945768317f4046d5c85a0d76b83350bbc3a3a7ad594fa7&o=&s=1"
},

{
"whereto": "Stockholm",
"price": "1000",
"datego": "06/31",
"hotelname": "Hostel by Bromma",
"hoteladdress":"Bromma, Stockholm",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/106185347.webp?k=5e2817e1c584a8fc435d133a100c6178ba2630dbda740737ea0d8acb25e7040c&o=&s=1"
},

{
"whereto": "Delhi",
"price": "1500",
"datego": "06/15",
"hotelname": "AmigosIndia",
"hoteladdress":"South Delhi, Delhi",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/209381911.webp?k=2c89627f864882426422de3d3fc512a76a5814dfc4252b8c626032f06256a576&o=&s=1"
},

{
"whereto": "Mexico City",
"price": "1500",
"datego": "06/31",
"hotelname": "Mexiqui Zocalo",
"hoteladdress":"City Center, Mexico City",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/97567694.webp?k=b77359fa10e97651d9245533b4283b8a65b1305501038386dcbf76b18a896e86&o=&s=1"
},

{
"whereto": "Budapest",
"price": "500",
"datego": "07/15",
"hotelname": "Casa Nora",
"hoteladdress":"07. Erzsébetváros, Budapest",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/20474267.webp?k=1e242904d173be1c06164c9ad88be3a3d8a9fdeb254e59c929a5ba6956b2ade2&o=&s=1"
},

{
"whereto": "Porto",
"price": "500",
"datego": "07/31",
"hotelname": "The Central House Ribeira",
"hoteladdress":"União de Freguesias do Centro, Porto",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/363156298.webp?k=6df20517028a16380038855a78348802f3952fdac8561088a8dac82ad574c453&o=&s=1"
},

{
"whereto": "Medellín",
"price": "1000",
"datego": "07/15",
"hotelname": "JEP Hostel",
"hoteladdress":"La Candelaria, Medellín",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/218357171.webp?k=1ba2ef999ca3dd111d3ecdbc7644d9fe9d99a8d98adfc6eaa6a637fc37dd4e3e&o=&s=1"
},

{
"whereto": "Glasgow",
"price": "1000",
"datego": "07/31",
"hotelname": "Euro Hostel Glasgow",
"hoteladdress":"City Center, Glasgow",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/164211100.webp?k=6ac9cc12910729c52ed44d116c456922b7f39d7f40d877587db963fe61e06b5a&o=&s=1"
},

{
"whereto": "São Paulo",
"price": "1500",
"datego": "07/15",
"hotelname": "Hostel Santana- Metrô Santana",
"hoteladdress":"Santana, São Paulo",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/174598613.webp?k=bb20d9a8989ef21f04558e72ade248731f73073c0f485d3e6c181b66da5fb550&o=&s=1"
},

{
"whereto": "Wellington",
"price": "1500",
"datego": "07/31",
"hotelname": "Nomad Capital Backpackers",
"hoteladdress":"Wellington CBD, Wellington",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/16834951.webp?k=86318d8e76e6edfd80a110e2fc8f0ecbcde3de4517c1282a767cdacdcb49366e&o=&s=1"
},

{
"whereto": "Warsaw",
"price": "500",
"datego": "08/15",
"hotelname": "Lubelski",
"hoteladdress":"Wawer, Warsaw",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/334697912.webp?k=80dd85c510340b1d266201d1fd06c1ea437d06211a33fa151c8e7eda1f7e2f39&o=&s=1"
},

{
"whereto": "London",
"price": "500",
"datego": "08/31",
"hotelname": "Kensal Green Backpackers",
"hoteladdress":"Kensington and Chelsea, London",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/97799657.webp?k=a14a94c39b6fbb6731af3f3fdf53879684ae9acf710b7d620786f44502597a5d&o=&s=1"
},

{
"whereto": "Amsterdam",
"price": "1000",
"datego": "08/15",
"hotelname": "International Budget Hostel",
"hoteladdress":"City Center, Amsterdam",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/27920600.webp?k=90bbb5527d755c9504b2574ec9b5b5c6dbf354ba56c2d17eadd9ab290b3f9d44&o=&s=1"
},

{
"whereto": "Tel Aviv",
"price": "1000",
"datego": "08/31",
"hotelname": "Hostel BU93",
"hoteladdress":"Tel Aviv City -Centre, Tel Aviv",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/249485436.webp?k=6fdaa3ee4031c7800e9b75397d9708404060ff44cab910823bd37d4ae6eb383b&o=&s=1"
},

{
"whereto": "Osaka",
"price": "1500",
"datego": "08/15",
"hotelname": "Hotel Diamond",
"hoteladdress":"Nishinari, Osaka",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/238893934.webp?k=6f3dcb913d32ced196a77518cf26215cea027168c6113d7333567cff7daa53c9&o=&s=1"
},

{
"whereto": "Toronto",
"price": "1500",
"datego": "08/31",
"hotelname": "The Parkdale Hostellerie",
"hoteladdress":"Toronto, Toronto",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/324891378.webp?k=298f09e54519d3c14c9d510360da60ecf44872d4a13bf2ccc128be258281a205&o=&s=1"
},

{
"whereto": "Ljubljana",
"price": "500",
"datego": "09/15",
"hotelname": "Hostel Sleeping Beauty",
"hoteladdress":"City Centre, Ljubljana",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/75118611.webp?k=43cffd5934fbc76e0fa0207d5ad19151d195c32fcf900c38c5693eb5b5bf7dcb&o=&s=1"
},

{
"whereto": "Paris",
"price": "500",
"datego": "09/31",
"hotelname": "Peace and Love Hostel",
"hoteladdress":"10º arrondissement, Paris",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/86678924.webp?k=a45742d431200178d9887df0aabd138305f57d2f6fb09a9e9293ae95c9f50dc4&o=&s=1"
},

{
"whereto": "Kuala Lumpur",
"price": "1000",
"datego": "09/15",
"hotelname": "Oasis Guest House",
"hoteladdress":"Kuala Lumpur, Kuala Lumpur",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/376972002.webp?k=938d71b23f1f3eb2d152f61073cfe9dc6550a28c62764c210bd32a232c41e638&o=&s=1"
},

{
"whereto": "Accra",
"price": "1000",
"datego": "09/31",
"hotelname": "Hi Hills Apartments",
"hoteladdress":"Accra, Accra",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/181981818.webp?k=aac513786206d729aec0b52663c8aafea517ee7339a73a44f85664f64a5e4f5e&o=&s=1"
},

{
"whereto": "Singapore",
"price": "1500",
"datego": "09/15",
"hotelname": "Betel Box Backpackers Hostel",
"hoteladdress":"Katong, Singapore",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/282570828.webp?k=f6bb9fb10ff487a2a9437dd8327cb85984e3574a4dbd877a9dddaadfa893ab17&o=&s=1"
},

{
"whereto": "Dubai",
"price": "1500",
"datego": "09/31",
"hotelname": "California Hostel Dubai Beach",
"hoteladdress":"Jumeirah Beach",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/218717098.webp?k=5905281080f9e6d06c9f774790c50fc1b95690b66375a13651e7c5af7e7f9858&o=&s=1"
},

{
"whereto": "Kraców",
"price": "500",
"datego": "10/15",
"hotelname": "Art Hostel",
"hoteladdress":"Old Town, Kraców",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/166476583.webp?k=d065744488138aeae8a304f7d8ad090cc3f3f6034d250285b0d82982f99e7796&o=&s=1"
},

{
"whereto": "Tallinn",
"price": "500",
"datego": "10/31",
"hotelname": "Imaginary Hostel",
"hoteladdress":"Tallinn City-Centre, Tallinn",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/174674224.webp?k=ed0ad446d822f24709e0810d2dbb38fe4039c6f3a4641d23363a841555742696&o=&s=1"
},

{
"whereto": "Abu Dhabi",
"price": "1000",
"datego": "10/15",
"hotelname": "Al Jazira Club Hotel",
"hoteladdress":"Abu Dhabi, Abu Dhabi",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/281525286.webp?k=95bfc9d66888de3ea7b8a79ab9208744c6f7ebe87310ec954b0b3459b5dc639b&o=&s=1"
},

{
"whereto": "Doha",
"price": "1000",
"datego": "10/31",
"hotelname": "La Villa Hotel",
"hoteladdress":"Doha, Doha",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/19205755.webp?k=5e6cdcef7d5f7708494041cc8cabf38afcabe342b34049758c8a67b7058a80be&o=&s=1"
},

{
"whereto": "Mumbai",
"price": "1500",
"datego": "10/15",
"hotelname": "Royal Dormitory",
"hoteladdress":"Western Suburbs, Mumbai",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/249678940.webp?k=810f9a7145b52cb3a1a06dbd7ed8078dace257e793e01ecf7a08e051e0d6421f&o=&s=1"
},

{
"whereto": "Cairo",
"price": "1500",
"datego": "10/31",
"hotelname": "Safari Hostel",
"hoteladdress":"Cairo, Cairo",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/190330899.webp?k=b4dd8715888cd37b59897e4ccd874c601f560968bc556c7e5f9bedb30c2ae1c6&o=&s=1"
},

{
"whereto": "Brussels",
"price": "500",
"datego": "11/15",
"hotelname": "Jacques Brel Youth Hostel",
"hoteladdress":"Brussels Centre, Brussels",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/21562670.webp?k=085abcdbeac4743c0381e7b76ac965e0eea339b753535deeaacd523caad96455&o=&s=1"
},

{
"whereto": "Sófia",
"price": "500",
"datego": "11/31",
"hotelname": "Hostel Mostel Sofia",
"hoteladdress":"Centrum, Sofia",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/4033598.webp?k=0c95ebf183c9c8185e03f46019b8cd1b19fa9d70f6d3638ef7223ee337a1f82c&o=&s=1"
},

{
"whereto": "Auckland",
"price": "1000",
"datego": "11/15",
"hotelname": "HIT Hostel",
"hoteladdress":"Auckland, Auckland",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/306411691.webp?k=8181ead4a56889b96c6d8af16087111ebb9d549a0489a19742a83ec6df788694&o=&s=1"
},

{
"whereto": "Baghdad",
"price": "1000",
"datego": "11/31",
"hotelname": "Life Palace Hotel and Rest",
"hoteladdress":"Baghdad, Baghdad",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/324571989.webp?k=220979efd9519f614f4eae8e0dae70f8d2e8d19d3124e4469fdc3ef50f54334b&o=&s=1"
},

{
"whereto": "Lagos",
"price": "1500",
"datego": "11/15",
"hotelname": "m3 Place Lagos",
"hoteladdress":"Surulere, Lagos",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/373900948.webp?k=750c958d4e78bdbc8976c80dd36dd9d74a60a82c4437b19241870ddb6e396422&o=&s=1"
},

{
"whereto": "Manilla",
"price": "1500",
"datego": "11/31",
"hotelname": "River Central Hostel",
"hoteladdress":"Makati, Manilla",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/85245389.webp?k=8343683548784395f12874d3141832b49bf3e26afefdbbe70371ee2e0706d636&o=&s=1"
},

{
"whereto": "Riga",
"price": "500",
"datego": "12/15",
"hotelname": "Liberty Airy",
"hoteladdress":"Centre, Riga",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/183337189.webp?k=28f56d7427e423121475200e4057f7d972aeb6ac55c431e0b8b199f076376068&o=&s=1"
},

{
"whereto": "Oslo",
"price": "500",
"datego": "12/31",
"hotelname": "Anker Hostel",
"hoteladdress":"Oslo City Centre, Oslo",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/296658593.webp?k=55b9b2ab0ac2d0798d2c56f06f2745ad3230436e024b3b65b2d0a08ccd81af61&o=&s=1"
},

{
"whereto": "Johannesburg",
"price": "1000",
"datego": "12/15",
"hotelname": "Johannesburg Youth Hostel",
"hoteladdress":"Randburg, Johannesburg",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/153411521.webp?k=1c45de12aeac566e169ae6b5d48cf290bc272a0f5543da181fb101e72301b199&o=&s=1"
},

{
"whereto": "Alexandria",
"price": "1000",
"datego": "12/31",
"hotelname": "Shatie Alnakhleel Apartment",
"hoteladdress":"16th Street, Shatie Alnakheel, Kilo21",
"image":"https://cf.bstatic.com/xdata/images/hotel/max1024x768/156743423.jpg?k=f5f63f03e168af9b568ce85b81a943e242a8cd71b7ba5b8d44718e1ba6fad594&o=&hp=1"
},

{
"whereto": "Brasilia",
"price": "1500",
"datego": "12/15",
"hotelname": "Hostel FreeWay",
"hoteladdress":"Asa Norte, Brasília",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/233387273.webp?k=3cc29fc2de69b94554a1d9237c587587bb7b328f9e78eb7902606824cf492715&o=&s=1"
},

{
"whereto": "Vancouver",
"price": "1500",
"datego": "12/31",
"hotelname": "The Cambie Hostel Gastown",
"hoteladdress":"Gastown, Vancouver",
"image":"https://cf.bstatic.com/xdata/images/hotel/square200/172549149.webp?k=d35c51c4cb6d3192448f7acb5c1abd8210d43b4f7e39ad56b1a9b6aa71707abb&o=&s=1"

}
];



app.use(cors());

// Configuring body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/email', (req, res) => {
  
    const data = {
        from: 'See++ Team <tickets@seeplusplus.org>',
        to: req.body.email,
        subject: 'Tickets',
        text: 'Dear '+ req.body.name +', we have processed your request and we are thrilled to provide you with our amazing service!'+
        'The plane tickets will be sent in a future email but we already have a destination and acomodation for you!!'+
        ' Destination: '+ req.body.object.whereto +'    Hotel Name: '+ req.body.object.hotelname+'    Hotel Address: '+req.body.object.hoteladdress+'    Reminder! Your flight back is in 7 days! ' 
    };
    mg.messages().send(data, function (error, body) {
        console.log(body);
    });
    

    
});

app.listen(port, () => console.log(`Hello world app listening on port ${port}!`));

app.get('/flights', (req, res) => {
    res.json(flights);
});







