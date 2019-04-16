export class User {

    private name: string;
    private lastname: string;
    private email: string;
    private password: string;
    private img?: string;
    private role?: string;
    private google?: boolean;
    private id?: string;

    constructor(name: string, lastname: string, email: string, password: string) {
        this.name = name;
        this.lastname = lastname;
        this.email = email;
        this.password = password;
    }

    public getName(): string {
        return this.name;
    }

    public setName(name: string): void {
        this.name = name;
    }

    public getLastname(): string {
        return this.lastname;
    }

    public setLastname(lastname: string): void {
        this.lastname = lastname;
    }

    public getEmail(): string {
        return this.email;
    }

    public setEmail(email: string): void {
        this.email = email;
    }

    public getPassword(): string {
        return this.password;
    }

    public setPassword(password: string): void {
        this.password = password;
    }

    public getImg(): string {
        return this.img;
    }

    public setImg(img: string): void {
        this.img = img;
    }

    public getRole(): string {
        return this.role;
    }

    public setRole(role: string): void {
        this.role = role;
    }

    public isGoogle(): boolean {
        return this.google;
    }

    public setGoogle(google: boolean): void {
        this.google = google;
    }

    public getId(): string {
        return this.id;
    }

    public setId(id: string): void {
        this.id = id;
    }
}
