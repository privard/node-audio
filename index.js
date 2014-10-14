var fs = require('fs');
var lame = require('lame');
var stream = require('stream');

var parser = new stream.Transform({objectMode: true});
var totalsamples = 0;

parser._transform = function(chunk, encoding, done){
	console.log(chunk.length);
	for (var j = 0; j < chunk.length; j = j+4){
		var firstSample = chunk.readInt16BE(j, true);
		// this.push(totalsamples+','+firstSample+'\n');	
		this.push(new Buffer(firstSample));
		totalsamples++;
	}
	done();
}

var writer = fs.createWriteStream('text.txt')
	.on('finish', function(){console.log('finished writing')});

var pcmWriter = fs.createWriteStream('raw.pcm')
	.on('finish', function(){console.log('finished raw dump')});

var decoded = fs.createReadStream('heyyou.mp3')
	.on('end', function(){
		console.log("Finished reading");
	})
	.pipe(new lame.Decoder())
	.pipe(pcmWriter);

// decoded
	// .pipe(parser)
	// .pipe(pcmWriter);

// decoded
	// .pipe(parser);
	// .pipe(writer);



