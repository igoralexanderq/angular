
//Reemplazando al constructor
function AudiService(): ClassDecorator {
    return (target: any) => {
        const original = target;
        
        const newConstructor: any = function(...args: any[]) {
            console.log(`📌 [AUDIT] Instanciando servicio: ${original.name}`);
            console.log(`📎 Dependencias:`, args);
            return new original(...args);
        };

        newConstructor.prototype = original.prototype;
        return newConstructor;
    }    
}

//Estandar
/**
 * 
 * @returns fucntion(...) { ... } <- Definiendo el decorador de clase.
 * T extends { new (...args: any[]): {} } <- Genérico con una restricción.
 * T <- Represente el constructor de una clase, tiene que ser algo que se 
 * pueda construir con new, que reciba una lista de arugmentos y que devuelva
 * un objketo.
 */
function Audit() {
    return function<T extends { new (...args: any[]): {} }> (constructor: T) {
        return class extends constructor {
            constructor(... args: any[]) {
                console.log("Instanciando: ", constructor.name);
                super(...args);
            }
        };
    }
}


function RequiredOld(target: any, propertyKey: string) {
    let value = target[propertyKey];

    const getter = () => value;
    const setter = (newVal: any) => {
        if(newVal === null || newVal === undefined) {
            console.error(`❌ La propiedad "${propertyKey}" es requerida.`);
            throw new Error(`La propiedad "${propertyKey}" es requerida.`);
        }
        value = newVal;
    };

    Object.defineProperty(target, propertyKey, {
        get: getter,
        set: setter
    });
}

const requiredValues = new WeakMap<Object, any>();

function Required(target: any, propertyKey: string) {
    Object.defineProperty(target, propertyKey, {
        get() {
            return requiredValues.get(this);
        }, 
        set(value: any) {
            //console.log(propertyKey, value);
            if(value === null || value === undefined) {
                throw new Error(`❌ La propiedad "${propertyKey}" es requerida.`);
            }
            requiredValues.set(this, value);
        },
        enumerable: true,
        configurable: true
    });
}

function LogExecution(
    target: any,
    propertyKey: string,
    descriptor: PropertyDescriptor
) {
    const original = descriptor.value;
    descriptor.value = function(...args: any[]) {
        console.log(`👣 Ejecutando método: ${propertyKey}`);
        console.log(`➡️ Args:`, args);

        const start = performance.now();
        const result = original.apply(this, args);
        const end = performance.now();

        console.log(`⏱️ Tiempo: ${(end - start).toFixed(2)} ms`);

        return result;
    };

}

@Audit()
export class UserService {
    @Required
    apiUrl!: string;

    constructor() {
        //this.apiUrl = 'https://bcp.com/api/users';        
    }

    @LogExecution
    getUserById(id: number) {
        console.log('Llamando API...', this.apiUrl);
        return { 
            id,
            name: 'Alexander'
        }
    }
}

//const x = new UserService();
//x.getUserById(19);
//x.apiUrl = null;


//function <T extends { new (...args: any[]): {} }> (constructor: T)

function wrapInResponse<T> (data: T) {
    return {
        ok: true,
        timestamp: Date.now(),
        data
    };
}

console.log(wrapInResponse(10));
console.log(wrapInResponse({ id: 1, name: 'Alexander' }));
console.log(wrapInResponse(['a', 'b', 'c']));
