// src/controllers/user.contoller.ts (o user.controller.ts si luego lo renombras)
import { Controller, Get, Inject } from "../core/decorators";
import { UserService } from "../services/user.service";

@Controller("/users")
export class UserController {
  @Inject(UserService)
  private userService!: UserService;  // 👈 AQUÍ VA EL "!"

  @Get("/")
  getAll() {
    return this.userService.getUsers();
  }
}
