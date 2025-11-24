import "reflect-metadata";

function LogPropertyType(target: any, propertyKey: string) {
    const type = Reflect.getMetadata("design:type", target, propertyKey);    
    console.log(`La propiedad "${propertyKey}" es de tipo: ${type.name}`);
}

class Persona {
    @LogPropertyType
    nombre: string;

    @LogPropertyType
    edad: number;

    constructor(nombre: string, edad: number) {
        this.nombre = nombre;
        this.edad = edad;
    }
}

new Persona("Alexander", 34);