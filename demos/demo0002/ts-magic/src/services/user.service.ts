import { Service } from "../core/decorators";

@Service()
export class UserService {
    private users = ["Alex", "Fabián", "Fernando"];

    getUsers() {
        return this.users;
    }
}