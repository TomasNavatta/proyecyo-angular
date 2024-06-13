import { IClases } from "./models"

export class  ProductsMockService {
    getProducts(): IClases[] {
        return [{
            id: 2,
            clase: 'Angular JS',
            horario: '10:30 AM'
        },
        {
            id: 3,
            clase: 'React JS',
            horario: '14:00 PM'
        }]
    }

}