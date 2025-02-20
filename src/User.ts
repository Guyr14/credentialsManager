import { StoredCredential } from "./StoredCredential";

export class User {
    username: string;
    email: string;
    password: string;
    numOfRemainingTries: number;
    notificationTime: number;
    isBlocked : boolean;
    passwordLastTimeChanged: number;
    fullName: string
    storedCredentials: { [key: string]: StoredCredential };  // Hash table of stored credentials

    constructor(username: string, email: string, password: string, numOfRemainingTries: number, notificationTime: number, fullName: string, isBlocked: boolean) {
        this.username = username;
        this.email = email;
        this.password = password;
        this.numOfRemainingTries = numOfRemainingTries;
        this.notificationTime = notificationTime;
        this.isBlocked = isBlocked;
        this.passwordLastTimeChanged = Date.now();
        this.fullName = fullName;
        this.storedCredentials = {};
    }


    public getNotificationTime() : number {
        return this.notificationTime;
    }

    public getUserName() {
        return this.username;
    }

    public getEmail() {
        return this.email;
    }

    public setIsBlocked(state: boolean){
        this.isBlocked = state;
    }
    public getFullName() {
        return this.fullName;
    }

    public getPassword() {
        return this.password;
    }
    public setPassword(newPassword: string) {
        this.password = newPassword;
    }
    public setPasswordLastTimeChanged(timestamp: number) {
        this.passwordLastTimeChanged = timestamp;
    }

    public setNotificationTime(timestamp: number) {
        this.notificationTime = timestamp;
    }

    public getNumOfRemainingRetries(): number {
        return this.numOfRemainingTries;
    }

    public setNumOfRemainingRetries(retries: number) {
        this.numOfRemainingTries = retries;
    }

    public getIsBlocked() {
        return this.isBlocked;
    }
}
