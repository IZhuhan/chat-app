// Init user
const currentUser = User.getInstance();

// Init socket
const socket = io();

// Init UI
const ui = new UI();

// Init elements
const loginForm = document.forms[ 'login-form' ];
const userName = loginForm.elements[ 'username' ];

const messageForm = document.forms[ 'send-message' ];
const messageInput = messageForm.elements[ 'message' ];

const roomsList = document.querySelector( '.rooms-list' );

// Init local var
let currentRoom;

loginForm.addEventListener( 'submit', function ( e ) {
    e.preventDefault();

    if ( userName.value ) {
        const name = userName.value;

        currentUser.setUser( name );
        socket.emit( 'new user', name );
    }
});

messageForm.addEventListener( 'submit', function ( e ) {
    e.preventDefault();
    
    if ( messageInput.value ) {
        socket.emit( 'message', messageInput.value );
    }

    messageForm.reset();
});

roomsList.addEventListener( 'click', function ( e ) {
    if ( e.target.dataset.roomIndex ) {
        let index = e.target.dataset.roomIndex;

        socket.emit( 'roomchange', index );
        $( '.sidenav' ).sidenav( 'close' );
    }
});

// Socket events
socket.on( 'welcome', room => {
    currentRoom = room;

    ui.hideLogin();
    ui.showAuthorized( currentUser.getUser() );
    ui.showRoomName( currentRoom );
});
socket.on( 'rooms', rooms => ui.generateRooms( rooms ) );
socket.on( 'chat message', message => {
    if ( message.username === currentUser.getUser() ) {
        ui.addMessage( message, 'from' );
    } else {
        ui.addMessage( message, 'to' );
    }
});
socket.on( 'new user joined', user => ui.newUserJoin( user ) );
socket.on( 'roommates', ( { usernames } ) => {
    let users = Object.keys( usernames )
                     .filter( user => usernames[ user ].room === currentRoom )
                     .map( user => {
                         usernames[ user ].name = user;

                         return usernames[ user ];
                     });

    ui.generateUsersInRoom( users );
});
socket.on( 'has left the room', user => ui.userLeft( user ) );