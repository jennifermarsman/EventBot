module.exports = function () {
    bot.dialog('/sponsors', [
        function (session) {
            builder.Prompts.text(session, "Search the sponsor you're interested in:");
        },
        function (session, results) {
            var sponsor = results.response.toLowerCase();
            if (sponsor === "data monsters" || sponsor ==="hpc wire" || sponsor === "enterprise tech"){ 
                sponsor = sponsor.split(' ')[0] + sponsor.split(' ')[1];
            }

            performSearch(sponsor, 'sponsorindex', function (err, results) {
                if (err) {
                }
                if (results && results[0] && results[0]['@search.score'] && results[0]['@search.score'] > .1) {
                    //Checking relevance. >2 generally requires an exact event title match. Checking some buttons right now for some reason
                    session.privateConversationData.queryResults = results;
                    session.privateConversationData.searchType = "sponsor";
                    session.replaceDialog('/ShowResults');
                } else {
                    // No sufficiently good results to reset query and restart
                    session.send("I could not find a sponsor by that name");
                    session.replaceDialog('/promptButtons');
                }
            });
        }
    ]);
}
