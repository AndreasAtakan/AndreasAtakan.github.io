import urllib2 as urllib
import json

addresses = [
	'Hammergata%2024,%203264%20Larvik,%20Norway',
	'Tordenskioldsgate%208-10,%200160%20Oslo,%20Norway',
	'R%C3%B8dbergveien%202b,%200591%20Oslo,%20Norway',
	'Lilleakerveien%208,%200283%20Oslo,%20Norway',
	'Holtet%2045,%201368%20Stabekk,%20Norway',
	'Wergelandsveien%207,%200167%20Oslo,%20Norway',
	'Pier%20X%20Bryggegata%203,%200250%20Oslo,%20Norway',
	'Bjellandveien%2014,%203172%20Vear,%20Norway',
	'%C3%85sterudsletta%20101,%201344%20Haslum,%20Oslo,%20Norway',
	'Sandfallveien%201,%209506%20Alta,%20Norway',
	'Haugvaldstads%20Gate,%204005%20Stavanger,%20Norway',
	'Storgata%2010%20,%202815%20GJ%C3%98VIK,%20Norway',
	'Sem%20S%C3%A6lands%20vei%205,%207034%20Trondheim,%20Norway',
	'Kirkegata%204,%203616%20Kongsberg,%20Norway',
	'Holtermansgatan%201B,%2041129%20Gothenburg,%20Sweden',
	'Eikeskogvegen%2030,%205570%20Aksdal,%20Norway',
	'Kj%C3%B8rboveien%2020,%201337%20Sandvika,%20Norway',
	'Lilleakerveien%2010,%200283%20Oslo,%20Norway',
	'Sandvika,%201337%20Sandvika,%20Norway',
	'PO%20Box%207700,%205020%20Bergen,%20Norway',
	'Elveveien%2036,%203262%20Larvik,%20Norway',
	'Elveveien%2036,%203262%20Larvik,%20Norway',
	'Conrad%20Mohrsveg%2015,%205892%20Bergen,%20Norway',
	'PO%20Box%20319%20,%208001%20Bod%C3%B8,%20Norway',
	'Kongeveien%2079,%203188%20Horten,%20Norway',
	'Havnegata%2048,%208900%20Br%C3%B8nn%C3%B8ysund,%20Norway',
	'c%20/%20o%20Mesh%20As,%20Tordenskiolds%20gate%203,%200160%20Oslo,%20Norway',
	'M%C3%A5nesigden%2020,%201337%20Sandvika,%20Norway',
	'Nils%20Koppels%20All%C3%A9%20Building%20402,%202800%20Copenhagen,%20Denmark',
	'Brannvakstgata%205,%203256%20Larvik,%20Norway',
	'%C3%98kernveien%20121,%200579%20Oslo,%20Norway',
	'Bj%C3%B8rnstadveien%2016,%201712%20Gr%C3%A5lum,%20Norway',
	'Chr.%20Krohgs%20gate%2016,%201860%20Oslo,%20Norway',
	'',
	'Karvesvingen%202,%200579%20Oslo,%20Norway',
	'Professor%20Olav%20Hansens%20vei%207A,%204007%20Stavanger,%20Norway',
	'Voldgata%208,%202000%20Liilestr%C3%B8m,%20Norway',
	'Idrettsvegen%20103,%20%205353%20Straume,%20Norway',
	'Veritasveien%2025,%204007%20Stavanger,%20Norway',
	'Ullagerveien%203,%200585%20Oslo,%20Norway',
	'Professor%20Olav%20Hanssensvei%2010,%204021%20Stavanger,%20Norway',
	'Terje%20L%C3%B8v%C3%A5s%20vei%201,%204879%20Grimstad,%20Norway',
	'B%C3%B8ckmans%20gate%202,%204370%20Eigersund,%20Norway',
	'Auglendsmyr%C3%A5%206,%20,%204016%20Stavanger,%20Norway',
	'Raveien%20205,%203184%20Horten,%20Norway',
	'Strandveien%2035,%20Lysaker,%201366%20Oslo,%20Norway',
	'Sven%20Oftedals%20vei%205,%200950%20Oslo,%20Norway',
	'Kanalsletta%204,,%204033%20Stavanger,%20Norway',
	'H%C3%A5kon%20Melbergs%20vei%2016,%201783%20Halden,%20Norway',
	'Messeveien%208,%202004%20Lillestr%C3%B8m,%20Norway',
	'Snar%C3%B8yveien%2030%20A,,%201360%20Fornebu,%20Norway',
	'Eikremsvingen%204,%206422%20Molde,%20Norway',
	'Kontorveien%2015,%204033%20Stavanger,%20Norway',
	'Teknologivegen%2012,%202815%20Gj%C3%B8vik,%20Norway',
	'Torggata%2021,%208200%20Fauske,%20Norway',
	'Sj%C3%B8gata%2070,%208200%20Fauske,%20Norway',
	'Martin%20linges%20vei%2025,%20Fornebu,%201364%20Oslo,%20Norway',
	'Kirkegaten%2050,,%204400%20Flekkefjord,%20Norway',
	'Oscars%20gate%2052,%202580%20Oslo,%20Norway',
	'Bryggegate%207,%202050%20Oslo%0A%0A,%20Norway',
	'Trekanten%20Vestre%20Rosten%2081,%20%0A,%207075%20Tiller,%20Norway',
	'PO%20Box%201405,%20,%201602%20Fredrikstad,%20Norway',
	'Svelvikveien%20154b,%203039%20Drammen,%20Norway',
	'Idrottsvegen%2014,%205700%20Voss,%20Norway',
	'Universitetsgata%202,,%200164%20Oslo,%20Norway',
	'Sentrumsg%C3%A5rden%20%0AKongens%20gt.%2051,%208514%20Narvik,%20Norway',
	'Rettedalen%201,%20,%204330%20%C3%85lg%C3%A5rd,%20Norway',
	'Gr%C3%A5trostveien%2012,%20,%201555%20Son,%20Norway',
	'Hagegata%2022,%200653%20Oslo,%20Norway',
	'Kronprinsens%20gate%207,%200251%20Oslo,%20Norway',
	'Rosenholmveien%2025,%20%201414%20TROLL%C3%85SEN,%20Norway',
	'Roalmarka%209,%207609%20Levanger,%20Norway',
	'Roald%20Amundsens%20gate%207%20%0A,%208300%20Svolv%C3%A6r,%20Norway',
	'Nedre%20Br%C3%B8holtlia%2011,%203430%20Spikkestad,%20Norway',
	'Gr%C3%B8nnegata%2083,%20,%202317%20Hamar,%20Norway',
	'Asbj%C3%B8rn%20Selsbanes%20gate%209,%209479%20Harstad,%20Norway',
	'Tykkemyr%201,%201597%20Moss,%20Norway',
	'Per%20kroghs%20vei%204a,%201065%20Oslo,%20Norway',
	'Apotekergata%2012,%203187%20Horten,%20Norway',
	'%C3%85sg%C3%A5rdveien%2024,%201671%20Kr%C3%A5ker%C3%B8y,%20Norway',
	'Vormstuguvegen%2040,%20Fakkelg%C3%A5rden,%20,%202624%20Lillehammer,%20Norway',
	'Rosenkrantz%E2%80%99%20gate%204,%200159%20oslo,%20Norway',
	'Gr%C3%B8nland%2058,%203045%20Oslo,%20Norway',
	'St.%20Olavs%20gate%207,%20c/o%20siv.ark.%20Arne%20S%C3%B8dal,%200165%20Oslo,%20Norway',
	'Strandgt.%207,%20Sandnes,%204307%20Stavanger,%20Norway',
	'Bryggegata%203,%200250%20Oslo,%20Norway',
	'Askerveien%2061,%20,%201384%20Asker,%20Norway',
	'Nydalsveien%2028,%200484%20Oslo,%20Norway',
	'Kirkegata%206,%203520%20Jevnaker,%20Norway',
	'Mustads%20vei%201,%20,%200283%20Oslo,%20Norway',
	'Lille%20Grensen%205,%200159%20Oslo,%20Norway',
	'Kongsbergregionen,%20,%203602%20Kongsberg,%20Norway',
	'R%C3%A5dhusplassen%202,%202208%20Kongsvinger,%20Norway',
	'S%C3%B8rkedalsveien%206,%200306%20Oslo,%20Norway',
	'Feyersgate%207,%203256%20Larvik,%20Norway',
	'Askerveien%2061,%201383%20Asker,%20Norway',
	'Kvits%C3%B8ygata%2010,%204014%20Stavanger,%20Norway',
	'Eikremsvingen%209%20Molde,%20Norway',
	'R%C3%A5dhuset,%20Storgata%2051%20,%20Lillehammer,%202600,%20Norway%20%0A',
	'Postboks%20313,%202001%20LILLESTR%C3%98M,%20Norway',
	'N%C3%A6ringsbygget,%209171%20Longyearbyen,%20Norway',
	'Gran%C3%A5svegen%2015A,%207068%20Trondheim,%20Norway',
	'ELVEVEIEN%2034,%20Larvik%203255,%20Norway',
	'Gaustadall%C3%A9en%2021,%200349%20Oslo,%20Norway',
	'O.J.%20Brochs%20gate%2016%20A,%205006%20Bergen,%20Norway',
	'Dronning%20Eufemiasgate%2016,%200190%20Oslo,%20Norway',
	'Ulvenveien%2090A,%200581%20Oslo,%20Norway',
	'Motzfeldsgate%2024b,%200561%20Oslo,%20Norway',
	'Lilleakerveien%208,%20,%200283%20Oslo,%20Norway',
	'Karenlyst%20Alle%202,%200278%20Oslo,%20Norway',
	'Kongleveien%202,%201451%20Nesoddtangen,%20Norway',
	'Skjebergveien%209,%201738%20Borgenhaugen,%20Norway',
	'Martin%20Linges%20Vei%2025,,%201364%20Fornebu,%20Norway',
	'Queen%20Eufemias%20gate%2016,%200191%20Oslo,%20Norway',
	'',
	'Tr%C3%A6leborgveien%2011,%203112%20T%C3%B8nsberg,%20Norway',
	'Schwenckegata%201,%203015%20Drammen,%20Norway',
	'Gunnar%20Warebergs%20gate%2013,%204021%20Stavanger,%20Norway',
	'Fridalsveien%2044,%205063%20Bergen,%20Norway',
	'Jernbaneveien%2023,%208023%20Bod%C3%B8,%20Norway',
	'Fredensborgvn.%2024D,%200177%20%20Oslo,%20Norway',
	'Bryggegata%203,,%200250%20Oslo,%20Norway',
	'Lysaker%20torg%2035,%20,%201366%20Lysaker,%20Norway',
	'Gaustadall%C3%A9en%2021,%200349%20Oslo,%20Norway',
	'Odd%20Frantzens%20plass%205,%205008%20Bergen,%20Norway',
	'%C3%98stre%20Nesttunvei%206,%20Nesttun,%205221%20Bergen,%20Norway',
	'Drammensveien%20111B,%200273%20Oslo,%20Norway',
	'Welhavens%20vei%209,%20Sandnes,%204319%20Stavanger,%20Norway',
	'Sj%C3%B8gata%2015,%208001%20Bod%C3%B8,%20Norway',
	'Malmskriverveien%2035,%201338%20Sandvika,%20Norway',
	'Hagegata%2022%0A,%200653%20Oslo,%20Norway',
	'Keiser%20Wilhelms%20gt.%2011,%206003%20%C3%85lesund,%20Norway',
	'Kirkegata%2015,%201501%20Moss,%20Norway',
	'Smeltedigelen%201,%200195%20Oslo,%200195%20Oslo,%20Norway',
	'Fridtjof%20Nansens%20plass%203,,%200160%20Oslo,%20Norway',
	'Postboks%204%20St.%20Olavs%20plass%20,%200130%20Oslo,%20Norway',
	'Torggata%205,%20,%200181%20Oslo,%20Norway',
	'Steinsvikvegen%2070,%205353%20Straume%0A%20Bergen,%20Norway',
	'Langebjerg%204,%204000%20Roskilde,%20Denmark',
	'Kirkeveien%2039%20B,%20,%200361%20Oslo,%20Norway',
	'Siriskjeret%2027,,%204014%20Stavanger,%20Norway',
	'K%C3%B8pmannsgata%2059%0A%0A,%207030%20Trondheim,%20Norway',
	'Fuglelivein%201B,%200667%20Oslo,%20Norway',
	'J%C3%A6rveien%2033,%204309%20Sandnes,%20Norway',
	'Glengsgata%2038,%201702%20Sarpsborg,%20Norway',
	'Kristian%20Augusts%20gate%207A,%200164%20Oslo,%20Norway',
	'Kristian%20Augusts%20gate%207A,%200164%20Oslo,%20Norway',
	'',
	'Strindv.%202,%207034%20Trondheim,%20Norway',
	'Kongens%20gate%2011A,%200152%20Oslo,%20Norway',
	'Robert%20Jacobsens%20Vej%2083,%202300%20Copenhagen,%20Denmark',
	'Vestengkleiva%203,%201385%20Asker,%20Norway',
	'Vardenbakken%20100,%201452%20Nesoddtangen,%20Norway',
	'Kanalsletta%203,%20,%204033%20Stavanger,%20Norway',
	'KOL%C3%85SVEIEN%204,%0A,%201555%20Son,%20Norway',
	'Bishop%20Gunnerus%20gate%2014%20A,%20,%200185%20Oslo,%20Norway',
	'Olav%20Kyrres%20gate%2023,%204068%20Stavanger',
	'R%C3%A5dhusgaten%202,%20%20J%C3%B8rpeland,%204100%20Stavanger,%20Norway',
	'Trudvangveien%2067,%203117%20T%C3%B8nsberg,%20Norway',
	'',
	'Sandakerveien%20140,%200484%20Oslo,%20Norway',
	'Arne%20Garborgs%20veg%2030,%204349%20Bryne,%20Norway',
	'Hagegata%2023,%200653%20Oslo,%20Norway',
	'Akersgata%2020,%200158%20Oslo,%20Norway',
	'Grundingen%202,%20,%200250%20Oslo,%20Norway',
	'vestengkleiva%203,%201385%20Asker,%20Norway',
	'Strandgata%2019,%200152%20Oslo,%20Norway',
	'Postboks%20103,%20Dale,%205722%20Hordaland,%20Norway',
	'',
	'Gottlieb%20Daimler%20Stra%C3%9Fe%0A67663%20Kaiserslautern,%20Germany',
	'Strandveien%208,%201366%20Lysaker,%20Norway',
	'Breivikvg%207,%204120%20Tau,%20Norway',
	'Siriskjeret%2025%20-%2031%0A4014%20Stavanger,%20Norway',
	''
]


response = urllib.urlopen('http://data.urbalurba.com/api/3/action/organization_list?all_fields=true&include_extras=true')
_data = response.read()
_data = json.loads(_data)


for i in range(0, len(addresses)):
	url = 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates?outSr=4326&forStorage=false&outFields=*&maxLocations=20&f=json&address=' + addresses[i]

	response = urllib.urlopen(url)
	data = response.read()
	data = json.loads(data)

	#_data['result'][i] = json.loads(_data['result'][i])
	if len(data['candidates']) > 0:
		loc = data['candidates'][0]['location']
		#_data['result'][i]['latlng']['lat'] = loc['y']
		#_data['result'][i]['latlng']['lng'] = loc['x']
		print('[' + str(loc['y']) + ',' + str(loc['x']) + '],')
	else:
		#_data['result'][i]['latlng']['lat'] = None
		#_data['result'][i]['latlng']['lng'] = None
		print('[0,0],')

#print(_data)