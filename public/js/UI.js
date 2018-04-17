class UI {
    constructor() {
        this.login = document.querySelector( '.login' );
        this.authorized = document.querySelector( '.authorized' );
        this.roomsList = document.querySelector( '.rooms-list' );
        this.roomNameContainer = document.querySelector( '.room-name' );
        this.usersList = document.querySelector( '.users-list' );
        this.messageContainer = document.querySelector( '.message-container' );
        this.userNameContainer = document.querySelector( 'li.user-name' );
    }

    showLogin() {

    }

    hideLogin() {
        this.login.style.display = 'none';
    }

    showAuthorized( userName ) {
        this.authorized.style.display = 'block';
        this.userNameContainer.textContent = userName;
    }

    showRoomName( name ) {
        this.roomNameContainer.textContent = `"${ name }"`;
    }

    hideAuthorized() {

    }

    generateRooms( rooms ) {
        this.roomsList.innerHTML = '';

        rooms.forEach( ( room, index ) => this.roomsList.insertAdjacentHTML( 'beforeend', UI.roomListTemplate( room, index ) ) );
    }

    generateUsersInRoom( users ) {
        this.usersList.innerHTML = '';

        users.forEach( user => this.usersList.insertAdjacentHTML( 'beforeend', UI.userListTemplate( user ) ) );
    }

    addMessage( message, sendDirection ) {
        this.messageContainer.insertAdjacentHTML( 'beforeend', UI.messageTemplate( message, sendDirection ) );
    }

    newUserJoin( name ) {
        this.messageContainer.insertAdjacentHTML( 'beforeend', UI.newUserJoinTemplate( name ) );
    }

    userLeft( name ) {
        this.messageContainer.insertAdjacentHTML( 'beforeend', UI.userLeftTemplate( name ) );
    }

    static roomListTemplate( room, index ) {
        return `
                <li><a href="#" class="waves-effect" data-room-index="${ index }">${ room }</a></li>
        `;
    }

    static userListTemplate( { name, id }) {
        return `
                <li class="collection-item" data-user-id="${ id }">${ name }</li>
        `;
    }

    static messageTemplate( msg, sendDirection ) {
        return `
            <div class="message ${ sendDirection }">
                <div class="card ${ sendDirection === 'to' ? '' : 'blue-grey darken-1' }">
                    <div class="card-content white-text">
                        <p>${ msg.message }</p>
                    </div>
                </div>
            </div>
        `;
    }

    static newUserJoinTemplate( name ) {
        return `
            <div class="card teal lighten-2">
                <div class="card-content white-text">
                    <p>New user "${ name }" joined to chat</p>
                </div>
            </div>
        `;
    }

    static userLeftTemplate( name ) {
        return `
            <div class="card teal lighten-2">
                <div class="card-content white-text">
                    <p>User "${ name }" has left the room</p>
                </div>
            </div>
        `;
    }
}