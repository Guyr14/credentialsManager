
export class StoredCredential {
    serviceName: string;  // e.g., "Moodle", "Gmail", etc.
    username: string;
    password: string;
    dateAdded: number;

    constructor(serviceName: string, username: string, password: string) {
        this.serviceName = serviceName;
        this.username = username;
        this.password = password;
        this.dateAdded = Date.now();
    }

    public static fromJSON(json: any): StoredCredential {
        const credential = new StoredCredential(
            json.serviceName,
            json.username,
            json.password
        );
        credential.dateAdded = json.dateAdded;
        return credential;
    }
}