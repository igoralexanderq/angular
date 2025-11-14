// Interfaces y tipos genéricos para el núcleo de la aplicación
export interface Service {
    execute(...args: any[]): any;
}

export type Constructor<T> = new (...args: any[]) => T;