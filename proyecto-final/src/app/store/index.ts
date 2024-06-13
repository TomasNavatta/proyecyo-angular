import { ActionReducer, ActionReducerMap, MetaReducer } from "@ngrx/store";
import { AuthReducer, authFeatureName } from "./auth/auth.reducer";
import { localStorageSync } from "ngrx-store-localstorage";

interface RootState {}

export const rootReducer: ActionReducerMap<RootState> = {
    [authFeatureName]: AuthReducer
}

export function localStorageSyncReducer(reducer: ActionReducer<any>): ActionReducer<any> {
    return localStorageSync({keys: [authFeatureName], rehydrate: true})(reducer);
  }
   export const metaReducers: Array<MetaReducer<any, any>> = [localStorageSyncReducer];
  