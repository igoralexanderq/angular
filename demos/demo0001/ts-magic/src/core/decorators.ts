//Decorador que registra una clase automáticamente.

import { Container } from "./container";

export function Injectable(name?: string): ClassDecorator {
    return (target: any) => {
        const serviceName = name || target.name;
        Container.register(serviceName, target);
        console.log(`✅ Registered service: ${serviceName}`);
    }
}