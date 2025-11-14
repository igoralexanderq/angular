//Un servicio con una clase, una interfaz y un método.

import { Injectable } from "../core/decorators";
import { Service } from "../core/types";

@Injectable()
export class GreetingService implements Service {
    execute(name: string): string {
        return `Hola ${name} 👋 desde TypeScript mágico ✨`;
    }
}