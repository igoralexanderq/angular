//2. Contenedor de dependencias
export class Container {
    private static services = new Map();

    static register(token: any, instance: any) {
        this.services.set(token, instance);
    }

    static resolve<T>(token: new (...args: any[]) => T): T {
        const target = Reflect.getMetadata("design:paramtypes", token) || [];
        const deps = target.map((t: any) => Container.resolve(t));

        const instance = new token(...deps);
        this.register(token, instance);        
        return instance;
    }

}