import { FormControl } from "@angular/forms";
import { IClases } from "../../products/models";
import { IUser } from "../../users/models";

export interface ISale {
    id: number;
    curso?: IClases;
    user?: IUser;
    userId: number
    productId: string
    quantity: number;
}

export interface ISaleForm {
    quantity: FormControl<number | null>;
    user: FormControl<IUser | null>;
    curso: FormControl<IClases | null>;

}

export interface ICreateSaleData {
    curso?: IClases | null;
    user?: IUser | null;
    quantity?: number | null;

}