var scraperjs = require('scraperjs');
var Promise = require("bluebird");

const initPage = 'http://service.shmetro.com/hcskb/index.htm';
const userAgent = 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_1) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/56.0.2922.1 Safari/537.36';

const analysisOneSite = (name,link) => {
	return scraperjs.StaticScraper.create({url: link, headers:{ 'User-Agent': userAgent }})
	.scrape(function($) {
	    return $(".site_select_list a").map(function() {
	        return {line: $(this).text(), link: $(this).attr('href')};
	    }).get();
	})
}

scraperjs.StaticScraper.create({url: initPage, headers:{ 'User-Agent': userAgent }})
.scrape(function($) {
    return $(".site_select_list a").map(function() {
        return {line: $(this).text(), link: $(this).attr('href')};
    }).get();
})
.then(function(sites) {
    Promise.map(sites,(site) => {
    	return analysisOneSite(site.line,site.link);
    })
})