export class Usuario {

    constructor(
        public user?: string,
        public password?: string,
        public token?: string,
        public nome?: string,
        public role?: string,
        public expires?: string) { }
}