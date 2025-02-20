
import {User} from "./User";
import {TIME_TO_BLOCK, TIME_TO_NOTIFICATION} from "./Utils";
import {sendMail} from "./mailManager";
import {updateUserIsBlocked} from "./databaseActions";

export function checkExpiredTime(user: User) {
    const timeoutUntilNotification = user.getNotificationTime() - Date.now();
    console.log('time to wait until notify: ' + timeoutUntilNotification);
    setTimeout(() => {
        sendUserNotification(user, user.getNotificationTime());
    }, timeoutUntilNotification);
}

export function sendUserNotification(user: User, notificationTime: number) {
    if(user.passwordLastTimeChanged > notificationTime - TIME_TO_NOTIFICATION) {
        console.log('user changed password before get notify');
        return;
    }
    const userEmail = user.getEmail();
    sendMail(userEmail, 'hi ' + user.getFullName()+ '/n please change your password, you have ' + TIME_TO_BLOCK + ' seconds to do it before your user will be blocked!');

    setTimeout(() => {
        blockUserIfPasswordDontChanged(user, Date.now());
    }, TIME_TO_BLOCK);
}

export function blockUserIfPasswordDontChanged(user: User, timeUntilBlocked: number) {
    console.log('check if block needed');
    if(user.passwordLastTimeChanged > timeUntilBlocked - TIME_TO_BLOCK) {
        return;
    }
    updateUserIsBlocked(user, user.getUserName());

    sendMail(user.getEmail(),  'hi ' + user.getFullName()+ ' your user is blocked until you update your password!');
}

