let arr_kills = [];
let arr_deaths = [];
let arr_assists = [];
let arr_wins = [];
let arr_goldEarned = [];
let arr_totalMinionsKilled = [];
let arr_totalDamageDealtToChampions = [];
let arr_totalDamageTaken = [];


function ClearArray() {
    arr_kills = [];
    arr_deaths = [];
    arr_assists = [];
    arr_wins = [];
    arr_goldEarned = [];
    arr_totalMinionsKilled = [];
    arr_totalDamageDealtToChampions = [];
    arr_totalDamageTaken = [];
}

function CopyToClipboard(id) {
    var range = document.createRange();
    range.selectNodeContents(document.getElementById(id));
    window.getSelection().removeAllRanges(); // clear current selection
    window.getSelection().addRange(range); // to select text
    document.execCommand("copy");
    window.getSelection().removeAllRanges();// to deselect
    alert("Text Copied 📋 Ready to Paste.\n"+String(range).replace(/^(?=\n)$|^\s*|\s*$|\n\n+/gm, ""));
}


function LoadStats() {
    var lines = document.getElementById('lobbychat').value.trim().split('\n');
    for(var i = 0;i < lines.length;i++){
        var sumn = String(lines[i]).split(' ').slice(0, -3).join(' ');
        console.log(sumn);
        GetSummonerName(sumn,String(i));
    }
    ClearArray();
}

function GetSummonerName(SName,divid) {
    setTimeout(function(){
        let headersList = {
        }
        let api_key = "?api_key=RGAPI-cc5ad7c2-6b14-41ec-8e33-a5a7284ba221"
        let cors_proxy = "https://lolscors.jsfiddle.workers.dev/?"
        let riot_apicall = "https://euw1.api.riotgames.com/lol/summoner/v4/summoners/by-name/"+SName+api_key

        fetch(cors_proxy + riot_apicall, {
            method: "GET",
            headers: headersList
        }).then(function (response) {
            return response.text();
        }).then(function (data) {
    //      console.log(data);
            let jsonobj = JSON.parse(data);
    //      console.log(`url(\'https://ddragon.leagueoflegends.com/cdn/12.6.1/img/profileicon/${jsonobj.profileIconId}.png\')`);
    //      console.log(jsonobj.name);
    //      console.log(jsonobj.summonerLevel);
    //      console.log(jsonobj.puuid);
    //        document.getElementById("s"+divid+"-puuid").innerHTML = jsonobj.puuid;
            GetMatchHistory(String(jsonobj.puuid),String(divid))
            document.getElementById("s"+divid+"-profileIconId").src = `https://ddragon.leagueoflegends.com/cdn/12.6.1/img/profileicon/${jsonobj.profileIconId}.png`;
            document.getElementById("s"+divid+"-profileIconId").style.borderStyle = "double";
            document.getElementById("s"+divid+"-linebreak").innerHTML = "━━━━━━━━";
            document.getElementById("s"+divid+"-name").innerHTML = jsonobj.name;
            document.getElementById("s"+divid+"-summonerLevel").innerHTML = "Level "+jsonobj.summonerLevel;
        })
    },2000);
}

function GetMatchHistory(puuid,divid) {
    setTimeout(function(){
        let headersList = {
       }
        let api_key = "&api_key=RGAPI-cc5ad7c2-6b14-41ec-8e33-a5a7284ba221"
        let cors_proxy = "https://lolscors.jsfiddle.workers.dev/?"
        let riot_apicall = ("https://europe.api.riotgames.com/lol/match/v5/matches/by-puuid/"+puuid+"/ids?start=0&count=3"+api_key)
        fetch(cors_proxy + riot_apicall, {
            method: "GET",
            headers: headersList
        }).then(function (response) {
            return response.text();
        }).then(function (data) {
            let jsonobj = JSON.parse(data);
            let matchdetails = ""; 
            console.log(jsonobj);
            for(var i = 0;i < jsonobj.length;i++){
        //        console.log(String(jsonobj[i]));
                matchdetails = GetMatchDetails(String(jsonobj[i]),divid,puuid)
            }
        })
    },2000);
}

function GetMatchDetails(matchid,divid,puuid) {
    setTimeout(function(){
        let headersList = {
        }
        let api_key = "?api_key=RGAPI-cc5ad7c2-6b14-41ec-8e33-a5a7284ba221"
        let cors_proxy = "https://lolscors.jsfiddle.workers.dev/?"
        let riot_apicall = "https://europe.api.riotgames.com/lol/match/v5/matches/"+matchid+api_key
        fetch(cors_proxy + riot_apicall, {
            method: "GET",
            headers: headersList
        }).then(function (response) {
            return response.text();
        }).then(function (data) {
            let jsonobj = JSON.parse(data);
            jsonobj = jsonobj.info.participants;
            console.log(jsonobj);
            let xkills = 0;
            let xdeaths = 0;
            let xassists = 0;
            let xwins = 0;
            let xgoldEarned = 0;
            let xtotalMinionsKilled = 0;
            let xtotalDamageDealtToChampions = 0;
            let xtotalDamageTaken = 0;
/*           return jsonobj; */
            for(var i = 0;i < jsonobj.length;i++){
                if (String(jsonobj[i].puuid) == puuid){
                    console.log("puuid is equal");
                    console.log(divid);

                    arr_kills.splice(divid, 0, [divid, jsonobj[i].kills]);
                    arr_deaths.splice(divid, 0, [divid, jsonobj[i].deaths]);
                    arr_assists.splice(divid, 0, [divid, jsonobj[i].assists]);
                    arr_goldEarned.splice(divid, 0, [divid, jsonobj[i].goldEarned]);
                    arr_totalMinionsKilled.splice(divid, 0, [divid, jsonobj[i].totalMinionsKilled]);
                    arr_totalDamageDealtToChampions.splice(divid, 0, [divid, jsonobj[i].totalDamageDealtToChampions]);
                    arr_totalDamageTaken.splice(divid, 0, [divid, jsonobj[i].totalDamageTaken]);

                    
                    for (let i = 0; i < arr_kills.length; i++) {
                        if (arr_kills[i][0] == divid) {
                            console.log(arr_kills[i][0]);
                            console.log(arr_kills[i][1]);
                            xkills = xkills + arr_kills[i][1];
                            console.log(xkills)
                        }
                    }
                    for (let i = 0; i < arr_deaths.length; i++) {
                        if (arr_deaths[i][0] == divid) {
                            console.log(arr_deaths[i][0]);
                            console.log(arr_deaths[i][1]);
                            xdeaths = xdeaths + arr_deaths[i][1];
                            console.log(xdeaths)
                        }
                    }
                    for (let i = 0; i < arr_assists.length; i++) {
                        if (arr_assists[i][0] == divid) {
                            console.log(arr_assists[i][0]);
                            console.log(arr_assists[i][1]);
                            xassists = xassists + arr_assists[i][1];
                            console.log(xassists)
                        }
                    }
                    for (let i = 0; i < arr_goldEarned.length; i++) {
                        if (arr_goldEarned[i][0] == divid) {
                            xgoldEarned = xgoldEarned + arr_goldEarned[i][1];
                        }
                    }
                    for (let i = 0; i < arr_totalMinionsKilled.length; i++) {
                        if (arr_totalMinionsKilled[i][0] == divid) {
                            xtotalMinionsKilled = xtotalMinionsKilled + arr_totalMinionsKilled[i][1];
                        }
                    }
                    for (let i = 0; i < arr_totalDamageDealtToChampions.length; i++) {
                        if (arr_totalDamageDealtToChampions[i][0] == divid) {
                            xtotalDamageDealtToChampions = xtotalDamageDealtToChampions + arr_totalDamageDealtToChampions[i][1];
                        }
                    }
                    for (let i = 0; i < arr_totalDamageTaken.length; i++) {
                        if (arr_totalDamageTaken[i][0] == divid) {
                            xtotalDamageTaken = xtotalDamageTaken + arr_totalDamageTaken[i][1];
                        }
                    }
                    for (let i = 0; i < arr_wins.length; i++) {
                        if (arr_wins[i][0] == divid) {
                            console.log("wins");
                            console.log(arr_wins[i][0]);
                            xwins = xwins + arr_wins[i][1];
                        }
                    }
                    
                    xkills = xkills / 3;
                    xdeaths = xdeaths / 3;
                    xassists = xassists / 3;
                    xgoldEarned = xgoldEarned / 3;
                    xtotalMinionsKilled = xtotalMinionsKilled / 3;
                    xtotalDamageDealtToChampions = xtotalDamageDealtToChampions / 3;
                    xtotalDamageTaken = xtotalDamageTaken / 3;

                    document.getElementById("s"+divid+"-kills").innerHTML = xkills.toFixed(0) + "⚔️ Kills"
                    document.getElementById("s"+divid+"-deaths").innerHTML = xdeaths.toFixed(0) + "⚰️ Deaths"
                    document.getElementById("s"+divid+"-assists").innerHTML = xassists.toFixed(0) + "🛡️ Assists"
                    document.getElementById("s"+divid+"-goldEarned").innerHTML = xgoldEarned.toFixed(0) + " Gold";
                    document.getElementById("s"+divid+"-totalMinionsKilled").innerHTML = xtotalMinionsKilled.toFixed(0) + "👹 Minions";
                    document.getElementById("s"+divid+"-totalDamageDealtToChampions").innerHTML = xtotalDamageDealtToChampions.toFixed(0) + "💪 Damage (Champions)";
                    document.getElementById("s"+divid+"-totalDamageTaken").innerHTML = xtotalDamageTaken.toFixed(0) + "🤕 Damage (Tanked)";
                }
                else {
                    console.log("puuid is not equal");
                }
            }
        })
    },2000);
}



