import "reflect-metadata";


function LogPropertyType(target: any, propertyKey: string) {
    const type = Reflect.getMetadata("design:type", target, propertyKey);    
    console.log(`La propiedad "${propertyKey}" es de tipo: ${type.name}`);
}

//Se ejecuta al instantiar la clase
function LogClass() {
  return function <T extends { new (...args: any[]): {} }>(constructor: T) {
    return class extends constructor {
      constructor(...args: any[]) {
        console.log("🟢 Se está creando una nueva instancia...");
        super(...args);

        // Aquí ejecutas tu lógica
        console.log("Datos recibidos:", args);
      }
    };
  };
}

function LogMethod(
    target: AnalyserNode,
    propertyKey: String, 
    descriptor: PropertyDescriptor
) {
    const original = descriptor.value;

    descriptor.value = function (...args: any[]) {
        console.log(`Ejecutando ${propertyKey} con args:`, args);
        const resultado = original.apply(this, args);
        
        console.log(`Resultado de ${propertyKey}:`, resultado);

        return resultado;
    };

    return descriptor;
}



@LogClass()
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