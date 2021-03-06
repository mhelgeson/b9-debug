module.exports = function( b9 ){

  // if option is undefined, set default
  if ( b9._debug_log == null ){
    b9._debug_log = console.log;
  }

  // write all events to the console
  b9.on('rtm.send', function( msg ){
    if ( b9._debug_log ){
      b9._debug_log('send: '+ JSON.stringify( msg ) );
    }
  });

  b9.on('rtm.read', function( msg ){
    if ( b9._debug_log ){
      b9._debug_log('read: '+ JSON.stringify( msg ) );
    }
  });

  // allow inspection of the slack instance, from slack
  b9.command(
    'inspect [prop]',
    'Print json encoding of a property, for debugging.',
    function( msg, reply ){
      var val = b9;
      if ( msg.argv.prop ){
        msg.argv.prop
          // remove bracket notation: key[0]['name'] -> key.0.name
          .replace(/\[['"]?/g,'.').replace(/['"]?\]/g,'')
          // divide and iterate properties
          .split('.').every(function( key ){
            // traverse namespace and assign, continue or break
            return ( val = val[ key ] ) ? true : false;
          });
      }
      b9.debug( msg.channel, val );
    }
  );

  var num = 1;

  // logs a value as an attachment...
  b9.debug = function( channel, value ){
    if ( typeof value === 'undefined' ){
      value = 'undefined';
    }
    else {
      value = JSON.stringify( value, null, "  ")
    }
    // https://api.slack.com/methods/files.upload
    b9.post('files.upload',{
      channels: channel,
      filename: 'debug_'+( num++ )+'.json',
      filetype: 'javascript',
      content: value
    });
  };

};
