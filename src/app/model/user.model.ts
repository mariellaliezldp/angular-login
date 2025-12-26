export class UserRegister {
    userId?: number;
    email: string;
    fullName: string;
    password: string;

    // lets initialize this
    // we created classof it
    constructor() {
        this.userId = 0;
        this.email = '';
        this.fullName = '';
        this.password = '';
    }
}

export class LoginModel {
    email: string;
    password: string;

    constructor() {
        this.email = '';
        this.password = '';
    }
}