//Contenedor de dependencias.
import { Constructor } from './types';

export class Container {
    private static services = new Map<string, any>();

    static register<T>(name: string, clazz: Constructor<T>) {
        this.services.set(name, new clazz());
    }

    static get<T>(name: string): T {
        const service = this.services.get(name);
        if(!service) throw new Error(`Service "${name}" not found`);
        return service;
    }
}