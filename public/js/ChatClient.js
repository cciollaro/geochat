//responsible for sending and receiving messages.

// SENDING

//message: String
//chat_style: 'whisper', 'nearby', 'building'
//reciever_id:
// if chat_style === 'whisper' then must be a user_id
// else then null
function sendMessage(message, chat_style, receiver_id){
    if(socket === undefined || socket === null){
        console.log("no socket connection!");
        return;
    }

    socket.emit('message', {chat_style: chat_style, receiver_id: receiver_id, message: message});
}

// handling sending a nearby message to all
jQuery(document).on('submit', 'form#textEntry', function(e){
    var field = jQuery(this).find("input[type='text']");
    var message = field.val();
    field.val(''); //clear the field
    field.focus();
	
	var myRe = /^\/nick (\w+)/;
	var myArray = myRe.exec(message);
	
	if(myArray[1]){
		socket.emit('update_nickame', {nickname: myArray[1]});
	} else {
		sendMessage(message, 'nearby', null);	
	}

    return false;
});

// RECEIVING

// when we receive a message from the server
socket.on('message', function (data) {
	if(data.type === 'whisper'){
		//do stuff for whisper
	}
    jQuery('#chat').append("<span style=color:red;>" + data.nickname + "</span>: " + data.message + '<br />' );
});
