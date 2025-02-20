import {User} from "./User";

export const TIME_TO_NOTIFICATION : number = 60000;
export const TIME_TO_BLOCK: number = 60000;
export const ATTEMPTS_UNTIL_BLOCKED : number = 3;

export function createNewUser(userName: string, email: string , password: string, fullName: string): User{
    const timeExpired: number = Date.now() + TIME_TO_NOTIFICATION;
    return new User(userName, email, password, ATTEMPTS_UNTIL_BLOCKED, timeExpired, fullName, false);
}