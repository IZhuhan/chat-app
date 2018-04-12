class UI {
    constructor() {
        this.login = document.querySelector( '.login' );
        this.authorized = document.querySelector( '.authorized' );
        this.roomsList = document.querySelector( '.rooms-list' );
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

    hideAuthorized() {

    }

    generateRooms( rooms ) {
        this.roomsList.innerHTML = '';

        rooms.forEach( room => this.roomsList.insertAdjacentHTML( 'beforeend', UI.roomListTemplate( room ) ) );
    }

    generateUsersInRoom( users ) {
        this.usersList.innerHTML = '';

        for ( let user in users ) {
            this.usersList.insertAdjacentHTML( 'beforeend', UI.userListTemplate( user, users[ user ].id ) );
        }
    }

    addMessage( message, sendDirection ) {
        this.messageContainer.insertAdjacentHTML( 'beforeend', UI.messageTemplate( message, sendDirection ) );
    }

    newUserJoin( name ) {
        this.messageContainer.insertAdjacentHTML( 'beforeend', UI.newUserJoinTemplate( name) );
    }

    static roomListTemplate( room ) {
        return `
                <li><a href="#" class="waves-effect">${ room }</a></li>
        `;
    }

    static userListTemplate( name, id ) {
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
}