import {ATTEMPTS_UNTIL_BLOCKED, TIME_TO_NOTIFICATION} from "./Utils";
import {User} from "./User";

export class UserAction {

    public static fromUser(existingUser: User): User {
        return new User(
            existingUser.username,
            existingUser.email,
            existingUser.password,
            existingUser.numOfRemainingTries,
            existingUser.notificationTime,
            existingUser.fullName,
            existingUser.isBlocked
        );
    }

    public static updatePassword(user: User, newPassword: string) {
        user.setPassword(newPassword);
        user.setPasswordLastTimeChanged(Date.now());
        user.setNotificationTime(Date.now() + TIME_TO_NOTIFICATION);
    }

    public static getNumOfRemainingRetries(user: User) {
        return user.getNumOfRemainingRetries();
    }

    public static updateNumOfRetries(user: User) {
        user.setNumOfRemainingRetries(user.getNumOfRemainingRetries() - 1);
    }

    public static resetNumOfRetries(user: User) {
        user.setNumOfRemainingRetries(ATTEMPTS_UNTIL_BLOCKED);
    }
}
