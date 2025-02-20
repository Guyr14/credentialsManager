import express from 'express';
import path from 'path';
import {Register, signIn, updateUserPassword} from './index';
import {checkPasswordStrength, generateStrongPassword} from "./passwordUtils";
import { addStoredCredential, removeStoredCredential, getStoredCredentials } from './credentialDatabaseActions';
import { updateStoredCredential } from './credentialDatabaseActions';

const app = express();
const port = 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.get('/dashboard', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html'));
});


app.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        const result = await signIn(username, password);
        if (result === 'successfully logged in') {
            res.json({
                success: true,
                message: result,
                redirectUrl: `/dashboard?username=${encodeURIComponent(username)}`
            });
        } else {
            res.json({success: false, message: result});
        }
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
});

app.post('/register', async (req, res) => {
    const { username, email, password, fullName } = req.body;
    try {
        const result = await Register(username, email, password, fullName);
        if (result != 'success') {
            res.status(400).json({ success: false, message: result });
        } else {
            res.json({ success: true, message: 'Registration successful'});
        }
    } catch (error: any) {
        res.status(400).json({ success: false, message: error.message });
    }
});

app.post('/check-password-strength', (req, res) => {
    const { password, username } = req.body;
    const strength = checkPasswordStrength(password, username);
    res.json(strength);
});

app.get('/generate-password', (req, res) => {
    const password = generateStrongPassword();
    res.json({ password });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);

    app.post('/api/credentials', async (req, res) => {
        try {
            const {userName, serviceName, serviceUsername, servicePassword} = req.body;

            if (!userName || !serviceName || !serviceUsername || !servicePassword) {
                return res.status(400).json({
                    success: false,
                    message: 'All fields (userName, serviceName, serviceUsername, servicePassword) are required'
                });
            }

            const credential = await addStoredCredential(
                userName,
                serviceName,
                serviceUsername,
                servicePassword
            );
            res.json({success: true, credential});
        } catch (error: any) {
            res.status(500).json({success: false, message: error.message});
        }
    });

    app.get('/api/credentials/:userName', async (req, res) => {
        try {
            const credentials = await getStoredCredentials(req.params.userName);
            res.json({success: true, credentials});
        } catch (error: any) {
            res.status(500).json({success: false, message: error.message});
        }
    });

    app.delete('/api/credentials/:userName/:serviceName', async (req, res) => {
        try {
            await removeStoredCredential(req.params.userName, req.params.serviceName);
            res.json({success: true, message: 'Credential removed successfully'});
        } catch (error: any) {
            res.status(500).json({success: false, message: error.message});
        }
    });

    app.post('/update-password', async (req, res) => {
        const { username, oldPassword, newPassword } = req.body;
        const strengthCheck = checkPasswordStrength(newPassword, username);
        if (!strengthCheck.isValid) {
            return res.status(400).json({
                success: false,
                message: 'New password does not meet strength requirements'
            });
        }

        try {
            const result = await updateUserPassword(username, oldPassword, newPassword);
            if (result === 'password successfully updated') {
                res.json({ success: true, message: result });
            } else {
                res.json({ success: false, message: result });
            }
        } catch (error: any) {
            res.status(400).json({ success: false, message: error.message });
        }
    });

    app.put('/api/credentials/:userName/:serviceName', async (req, res) => {
        try {
            const { userName, serviceName } = req.params;
            const { password } = req.body;

            if (!password) {
                return res.status(400).json({
                    success: false,
                    message: 'New password is required'
                });
            }

            await updateStoredCredential(userName, serviceName, password);
            res.json({ success: true, message: 'Credential updated successfully' });
        } catch (error: any) {
            res.status(500).json({ success: false, message: error.message });
        }
    });
});

