//3. Decoradores mágicos
import "reflect-metadata";
import { Container } from "./Container";

//Decorador Service
export function Service() {
    return function (target: any) {
        const instance = Container.resolve(target);
        Container.register(target, instance)
    }
}

//Decorador Inject
export function Inject(token: any) {
    return function (target: any, propertyKey: string) {
        const instance = Container.resolve(token);
        target[propertyKey] = instance;
    }
}

//Decorador Controller
export function Controller(prefix: string) {
    return function (target: any) {
        Reflect.defineMetadata("prefix", prefix, target);
    }
}

//Decorador Get
export function Get(path: string) {
    return function (target: any, propertyKey: string) {
        Reflect.defineMetadata("method", "GET", target[propertyKey]);
        Reflect.defineMetadata("path", path, target[propertyKey]);
    }
}