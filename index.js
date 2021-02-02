const jsdom = require("jsdom");
const { JSDOM } = jsdom;

var Crawler = require("crawler");

var c = new Crawler({
    maxConnections: 10,
    rateLimit: 1000,
    // This will be called for each crawled page
    // callback : function (error, res, done) {
    //     if(error){
    //         console.log(error);
    //     }else{
    //         var $ = res.$;
    //         // $ is Cheerio by default
    //         //a lean implementation of core jQuery designed specifically for the server
    //         console.log($("title").text());
    //     }
    //     done();
    // }
});

// Queue URLs with custom callbacks & parameters
c.queue([{
    uri: 'https://infogram.com/situacion-comunal-1hzj4odl0x9w6pw',
    parameter1: "window",

    // jQuery: false,

    // The global callback won't be called
    callback: function (error, res, done) {
        if (error) {
            console.log(error);
        } else {
            var $ = res.$;
            const { window } = new JSDOM($("body").html(), { includeNodeLocations: true, runScripts: "dangerously" });

            var data = window.infographicData.elements.content.content.entities["3f026fbf-998f-4ae2-852b-94fa3a2f71d4"].props.chartData.data[0];

            data.forEach(element => {
                console.log(element[0] + element[1] + "\n");
            });
            // $(".igc-table-container tbody tr").each((i, element) => {
            //     debugger;

            //     $(element.childNodes).each((i, element) => {

            //     });
            // })
            debugger;
            console.log('Grabbed', res.body.length, 'bytes');
        }
        done();
    }
}]);
