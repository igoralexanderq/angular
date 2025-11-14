/*

import type types = require("./core/types");

class SaludoServide implements types.Service{
    execute(name: string): string {
        return `hello, ${name}!`;
    }
}

const service = new SaludoServide();
console.log(service.execute("World"));


export type Constructor<T> = new (...args: any[]) => T;


function crearInstancia<T>(Clase: Constructor<T>, ...args: any[]): T {
    return new Clase(...args);
}

class Persona {
    constructor(public nombre: string) {}
}

const p = crearInstancia(Persona, "Alice");

console.log(p);
*/

/*
import { Container } from "./core/container";

const service = Container.get<{ execute: (n: string) => string }>("GreetingService");
console.log(service.execute("Igor"));
console.log(1);

*/
console.log("TS-Magic running!");