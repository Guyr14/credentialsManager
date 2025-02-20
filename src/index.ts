import {User} from "./User";
import {createNewUser} from "./Utils";
import {checkExpiredTime} from "./timerManager";
import {saveUserInDb, getUserFromDatabase, updateUser, updateNumberOfRetries} from "./databaseActions";
import {isCorrectPassword} from "./validation";
import {UserAction} from "./UserAction";
import {hashPassword} from "./passwordUtils";


export async function Register(userName: string, email: string , password: string, fullName: string) {

    if ((await getUserFromDatabase(userName))) {
        return "username already in use, please choose another username";
    }

    const user: User = createNewUser(userName,email, password, fullName);
    saveUserInDb(user, userName);

    checkExpiredTime(user);
    return 'success';
}

export async function updateUserPassword(userName: string, oldPassword: string, newPassword: string) {

    const user = await getUserFromDatabase(userName);

    if(user === undefined) {
        console.log(('user name ' + userName + ' does not exist'));
        return 'user name ' + userName + ' does not exist';
    }

    if(!await isCorrectPassword(user,oldPassword, user.getPassword())) {
        console.log(('old password is incorrect'));
        return 'The given password is incorrect';
    }

    const hashedPassword: string = await hashPassword(newPassword);
    UserAction.updatePassword(user, hashedPassword);
    await updateUser(user, userName);
    return 'password successfully updated';
}


export async function signIn(userName: string, password: string) {
    const user = await getUserFromDatabase(userName);

    if(user == undefined){
        return 'User does not exist';
    }

    if (user.getIsBlocked()) {
        return 'user is blocked, password change is needed';
    }

    if(!await isCorrectPassword(user, password, user.password)) {
        await updateUser(user, userName);
        const remainingRetries = user.getNumOfRemainingRetries();
        if (remainingRetries === 0) {
            return 'Incorrect password, your user blocked until you will change your password';
        }
        return 'Incorrect password , you have ' + remainingRetries + 'remaining retries';
    }
    UserAction.resetNumOfRetries(user);

    await updateNumberOfRetries(user, userName);
    return 'successfully logged in';
}