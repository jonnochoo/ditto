var colors = require('colors');
var csv = require('csv');
var fs = require('fs');
var Handlebars = require('handlebars');
var program = require('commander');
var transform = require('stream-transform');

program
  .version('0.0.1');

program.command('batch')
  .description('creates a file per row in the CSV file')
  .option("-i, --input [input]", "CSV file")
  .option("-t, --template [template]", "handlebars template")
  .option("-o, --output [output]", "the output file name (supports handlebars syntax)")
  .action(function(options) {

    var template = fs.readFileSync(options.template).toString('utf8');
    var compiledTemplate = Handlebars.compile(template);
    var fileNameTemplate = Handlebars.compile(options.output);

    var input = fs.createReadStream(options.input);
    var parser = csv.parse({ columns: true, delimiter: ','});
    input
      .pipe(parser)
      .pipe(transform(function (data) {  
        var text = compiledTemplate(data);
        var fileName = fileNameTemplate(data);
        fs.writeFile(fileName, text, function(err) {
          if(err) console.log(err.red);

          console.log("Created file:", fileName.green);
        });
      }));

  });

program.command('single')
  .description('creates a single file using a CSV file')
  .option("-i, --input [input]", "CSV file")
  .option("-t, --template [template]", "handlebars template")
  .option("-o, --output [output]", "the output file name")
  .action(function(options) {

    var template = fs.readFileSync(options.template).toString('utf8');
    var compiledTemplate = Handlebars.compile(template);
    var fileName = options.output;

    var records = [];
    var input = fs.createReadStream(options.input);
    var parser = csv.parse({ columns: true, delimiter: ','});  
    parser.on('readable', function(record) {
      while(record = parser.read()) {
        records.push(record);
      }
    });
    parser.on('finish', function() {
      console.log(records);
      var text = compiledTemplate({
        records: records
      });
      fs.writeFile(fileName, text, function(err) {
          if(err) console.log(err.red);

          console.log("Created file:", fileName.green);
        });
    });

    input.pipe(parser);
  });

program.parse(process.argv);

if (!program.args.length) program.help();