var through = require('through2');
var gutil = require('gulp-util');
var trumpet = require('trumpet');
var concat = require('concat');
var cheerio = require('cheerio');
var q = require('q');
var PluginError = gutil.PluginError;

// Consts
const PLUGIN_NAME = 'gulp-prefixer';

function prefixStream(data) {
    
    var stream = through(function (data) {
        var tr = trumpet();
        tr.selectAll('h1', function (elem) {
            elem.getAttribute('class', function (res) { 
                console.log(res);
            });
        });

        var datastream = through();
        datastream.write(data);
        datastream.pipe(tr);
    });
    
    return stream;
}


function test1(htmlOrg) {
    
    $ = cheerio.load(htmlOrg);
    $('h1').addClass('new Class');
    return $.html();
}

// Plugin level function(dealing with files)
function gulpPrefixer() {
    
    return through.obj(function (file, enc, cb) {
        if (file.isNull()) {
            // return empty file
            cb(null, file);
        }
        if (file.isBuffer()) {
            console.log('----------------buffer----------------')
            file.contents = new Buffer(test1(file.contents.toString()));
            console.log(file.contents.toString());
        }

        if (file.isStream()) {
            console.log('----------------stream----------------')
            //file.contents = file.contents.pipe(concat()).pipe(prefixStream());
        }
        
        cb(null, file);

    });

};

// Exporting the plugin main function
module.exports = gulpPrefixer;