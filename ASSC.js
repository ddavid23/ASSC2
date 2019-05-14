//credit to vegeta897 and lorokko.
const Discord = require("discord.js");
const client = new Discord.Client();
const settings = require('./config.json');
var statustring = "No signal";

var request = require('request');
var arkCommand = '/ark'; // Command for triggering

var url = 'https://ark-servers.net/api/?object=servers&element=detail&key=5T5nR5PnWbcNqCm4b9RhEXpdtmSvKvhiW1z';


function update() {

  request(url, function(err, response, body) {
      if(err) {
          console.log(err);
          //return message.reply('Error getting ARK server status...');
      }
      body = JSON.parse(body);
      var status = 'Server offline';
      console.log(body.motd);
      if(body.is_online == 1) {
          if((body.is_online == 1)){
            client.user.setStatus('online')
            //.then(console.log)
            .catch(console.error);
          }else{
            client.user.setStatus('idle')
            //.then(console.log)
            .catch(console.error);
          }
            if(body.players != 0) {
                status = ' ' + body.players + '  of  ' + ' 13 ';
              } else {
                status = ' 0  of  ' + ' 13 ';
               
        }
      } else {
        client.user.setStatus("dnd")
        status = "Server is offline"
    

      }
      client.user.setActivity(status, { type: 'PLAYING' })
      .then(presence => console.log(status))
      .catch(console.error);
  });


  
}

request(url, function(err, response, body) {
   body = JSON.parse(body);
client.on("message", (message) => {
  if (message.content.startsWith("!version")) {
    message.channel.send("Loading...")
    .then((msg) => { // Resolve promise
				msg.edit("Current version D-DinoNet is on: " + (body.version) ) // Edits message with current timestamp minus timestamp of message
			});
    update();
  }
}
);
});

request(url, function(err, response, body) {
   body = JSON.parse(body);
client.on("message", (message) => {
  if (message.content.startsWith("!players")&&(body.players >= 2)) {
    message.channel.send("Loading...")
    .then((msg) => { 
				msg.edit("There are " +  (body.players) + " players online right now.")
    });
      update();
    }
}
);
});
  
  request(url, function(err, response, body) {
   body = JSON.parse(body);
client.on("message", (message) => {
  if (message.content.startsWith("!players")&&(body.players == 1)) {
    message.channel.send("Loading...")
    .then((msg) => {msg.edit("There is " +  (body.players) + " players online right now.") 
    update(); 
      }
    );
}
}
          );
          });

  request(url, function(err, response, body) {
   body = JSON.parse(body);
client.on("message", (message) => {
  if (message.content.startsWith("!players")&&(body.players == 0)) {
    message.channel.send("Loading...")
    .then((msg) => {msg.edit("No players online right now.") 
    update(); 
      }
    );
}
}
          );
          });

 request(url, function(err, response, body) {
   body = JSON.parse(body);
client.on("message", (message) => {
  if (message.content.startsWith("!uptime")){
    message.channel.send("Loading...")
    .then((msg) => {msg.edit((body.uptime) + "% of the time") 
    update(); 
      }
    );
}
}
          );
          });

 request(url, function(err, response, body) {
   body = JSON.parse(body);
client.on("message", (message) => {
  if (message.content.startsWith("!status") && (body.is_online == 1)){
    message.channel.send("Loading...")
    .then((msg) => {msg.edit("Server is Running") 
    update(); 
      }
    );
}
}
          );
          });

 request(url, function(err, response, body) {
   body = JSON.parse(body);
client.on("message", (message) => {
  if (message.content.startsWith("!status") && (body.is_online == 0)){
    message.channel.send("Loading...")
    .then((msg) => {msg.edit("Server is Closed") 
    update(); 
      }
    );
}
}
          );
          });

      
client.on("ready", () => {
  console.log("I was bready all along!");
  client.setInterval(update,30000);
});

client.on("message", (message) => {
  if (message.content.startsWith("!ping")) {
    message.channel("pong!")
    update();
  }
});



client.login(settings.token);
