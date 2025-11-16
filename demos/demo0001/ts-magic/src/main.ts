import { Container } from "./core/container";
import './services/greeting.service';

const service = Container.get<{ execute: (n: string) => string }>("GreetingService");
const farewell = Container.get<{ execute: (n: string) => string }>("FarewellService");


//console.log("TS-Magic running :D!");