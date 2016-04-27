var assert = require('assert');
var B9 = require('b9');
var b9_debug = require('./index');

describe('src/index', function(){

  var bot = new B9({ package:false });
  bot.self.id = 'UB9M3';
  bot.install( b9_debug );

  it('registers `inspect` command',function(){
    // check the help command is defined
    simulate('message','help inspect',function(txt){
      assert.equal( /Command not found/.test( txt ), false );
      assert.equal( /inspect/.test( txt ), true );
    });
  });

  it('prop argument is optional',function(){
    var posted = false;
    // stub out the api post
    bot.post = function( method, data ){
      assert.equal( method, 'files.upload' );
      assert.equal( data.content, JSON.stringify( bot, null, "  ") );
      posted = true;
    };
    // call the command on undefined prop
    simulate('message','inspect');
    // make sure the assertions ran
    assert.equal( posted, true, 'api post was not sent');
  });

  it('traverses namespaced properties',function(){
    var posted = false;
    // stub out the api post
    bot.post = function( method, data ){
      assert.equal( method, 'files.upload' );
      assert.equal( data.content, '"UB9M3"' );
      posted = true;
    };
    // call the command to inspect instance
    simulate('message','inspect self.id');
    // make sure the assertions ran
    assert.equal( posted, true, 'api post was not sent' );
  });

  it('traverses bracket notation properties',function(){
    var posted = false;
    // stub out the api post
    bot.post = function( method, data ){
      assert.equal( method, 'files.upload' );
      assert.equal( data.content, '"UB9M3"' );
      posted = true;
    };
    simulate('message','inspect self["id"]');
    // make sure the assertions ran
    assert.equal( posted, true, 'api post was not sent' );
  });

  it('handles undefined properties',function(){
    var posted = false;
    bot.post = function( method, data ){
      assert.equal( method, 'files.upload' );
      assert.equal( data.content, 'undefined' );
      posted = true;
    };
    simulate('message','inspect self.less');
    // make sure the assertions ran
    assert.equal( posted, true, 'api post was not sent' );
  });

  it('writes send traffic to log',function(){
    var logged = false;
    bot._debug_log = function( str ){
      assert.equal( str, 'send: {"text":"hello","channel":"D"}' );
      logged = true;
    };
    simulate('rtm.send','hello');
    // make sure the assertions ran
    assert.equal( logged, true, 'message was not logged' );
  });

  it('writes read traffic to log',function(){
    var logged = false;
    bot._debug_log = function( str ){
      assert.equal( str, 'read: {"text":"goodbye","channel":"D"}' );
      logged = true;
    };
    simulate('rtm.read','goodbye');
    // make sure the assertions ran
    assert.equal( logged, true, 'message was not logged' );
  });

  // simulate on event
  function simulate ( type, str, reply ){
    bot.emit( type, {
      text: ( str || '' ),
      channel: 'D' // direct msg
    }, reply );
  }

});
