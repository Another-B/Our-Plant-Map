import { Picture } from "./picture";
import { Plant } from "./plant";

export class PlantApplicationService {
    constructor(private plant: Plant, private picture: Picture) {}
}
