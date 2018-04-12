// User singltone
const User = ( function () {
    let user = '';
    let instance;

    const getUser = function () {
        return user;
    };

    const setUser = async function ( name ) {
        user = name;

        return user;
    };

    const createInstance = function () {
        return {
            getUser,
            setUser
        };
    };

    return {
        getInstance: function () {
            return instance || ( instance = createInstance() );
        }
    };
})();

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

// Socket events
socket.on( 'welcome', () => {
    ui.hideLogin();
    ui.showAuthorized( currentUser.getUser() );
});
socket.on( 'rooms', rooms => ui.generateRooms( rooms ) );
socket.on( 'updateusers', users => ui.generateUsersInRoom( users ) );
socket.on( 'chat message', message => {
    if ( message.username === currentUser.getUser() ) {
        ui.addMessage( message, 'from' );
    } else {
        ui.addMessage( message, 'to' );
    }
});
socket.on( 'new user joined', user => ui.newUserJoin( user ) );