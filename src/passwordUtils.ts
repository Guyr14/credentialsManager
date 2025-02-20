import bcrypt from 'bcrypt';

export function checkPasswordStrength(password: string, username: string = ''): {
    score: number;
    feedback: string[];
    isValid: boolean;
} {
    const feedback: string[] = [];
    let score = 0;

    if (password.length < 8) {
        feedback.push("Password must be at least 8 characters long");
        return { score: 0, feedback, isValid: false };
    }

    if (/(?:012|123|234|345|456|567|678|789)/.test(password)) {
        feedback.push("Password cannot contain sequential numbers");
        return { score: 0, feedback, isValid: false };
    }

    if (/(.)\1{2,}/.test(password)) {
        feedback.push("Password cannot contain repeated characters (e.g., 'aaa')");
        return { score: 0, feedback, isValid: false };
    }

    if (username && password.toLowerCase().includes(username.toLowerCase())) {
        feedback.push("Password cannot contain your username");
        return { score: 0, feedback, isValid: false };
    }

    if (password.length >= 12) {
        score += 2;
    } else if (password.length >= 8) {
        score += 1;
    }

    if (/\d/.test(password)) {
        score += 1;
    } else {
        feedback.push("Add numbers for a stronger password");
    }

    if (/[a-z]/.test(password)) {
        score += 1;
    } else {
        feedback.push("Add lowercase letters");
    }

    if (/[A-Z]/.test(password)) {
        score += 1;
    } else {
        feedback.push("Add uppercase letters");
    }

    if (/[!@#$%^&*(),.?":{}|<>]/.test(password)) {
        score += 1;
    } else {
        feedback.push("Add special characters");
    }

    const varietyScore = (
        (/\d/.test(password) ? 1 : 0) +
        (/[a-z]/.test(password) ? 1 : 0) +
        (/[A-Z]/.test(password) ? 1 : 0) +
        (/[!@#$%^&*(),.?":{}|<>]/.test(password) ? 1 : 0)
    );
    if (varietyScore >= 4) {
        score += 1;
    }

    if (/qwerty|password|admin|letmein|welcome/i.test(password)) {
        score = Math.max(0, score - 2);
        feedback.push("Avoid common password patterns");
    }

    const finalScore = Math.min(score, 5);
    const isValid = finalScore >= 3; // Require at least a score of 3 to be valid

    return {
        score: finalScore,
        feedback,
        isValid
    };
}

export function generateStrongPassword(): string {
    const lowercase = 'abcdefghijklmnopqrstuvwxyz';
    const uppercase = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const numbers = '23456789'; // Removed 0 and 1 to avoid confusion
    const special = '!@#$%^&*()_+-=[]{}|;:,.<>?';

    let password = '';

    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += lowercase[Math.floor(Math.random() * lowercase.length)];
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += uppercase[Math.floor(Math.random() * uppercase.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += numbers[Math.floor(Math.random() * numbers.length)];
    password += special[Math.floor(Math.random() * special.length)];
    password += special[Math.floor(Math.random() * special.length)];
    const allChars = lowercase + uppercase + numbers + special;

    while (password.length < 16) {
        const char = allChars[Math.floor(Math.random() * allChars.length)];
        if (!password.endsWith(char)) {
            password += char;
        }
    }
    return password.split('').sort(() => Math.random() - 0.5).join('');
}

export async function hashPassword(password: string): Promise<string> {
    const saltRounds = 10;
    return await bcrypt.hash(password, saltRounds);
}

export async function verifyPassword(password: string, hashedPassword: string): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
}