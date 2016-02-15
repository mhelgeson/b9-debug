var assert = require('assert');
var B9 = require('b9');
var b9_debug = require('./index');

describe('src/index', function(){

  var bot;

  it('registers `inspect` command',function(){

    bot = new B9({ package:false });
    bot.self.id = 'UB9M3';
    bot.install( b9_debug );

    // check the help command is defined
    simulate('message','help inspect',function(txt){
      assert.equal( /Command not found/.test( txt ), false );
      assert.equal( /inspect/.test( txt ), true );
    });

    // call the command to inspect instance
    simulate('message','inspect self.id',function(txt){
      assert.equal( txt, '```"UB9M3"```' );
    });

    // call the command on undefined prop
    simulate('message','inspect self[0]',function(txt){
      assert.equal( txt, '```undefined```' );
    });

    simulate('message','inspect',function(txt){
      assert.equal( txt, '```'+ JSON.stringify( bot, null, "  ") +'```' );
    });

  });

  it('writes send/read traffic to console',function(){

    var logged;
    bot = new B9({
      package:false,
      // hijack logging output
      debug_log: function( str ){
        logged += ([]).join.call( arguments, ' ');
      }
    });
    bot.install( b9_debug );

    logged = '';
    simulate('rtm.send','hello');
    assert.equal( logged, 'send: {"text":"hello","channel":"D"}' );

    logged = '';
    simulate('rtm.read','goodbye');
    assert.equal( logged, 'read: {"text":"goodbye","channel":"D"}' );

  });

  // simulate on event
  function simulate ( type, str, reply ){
    bot.emit( type, {
      text: ( str || '' ),
      channel: 'D' // direct msg
    }, reply );
  }

});
