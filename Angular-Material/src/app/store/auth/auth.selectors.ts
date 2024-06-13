import { createFeatureSelector, createSelector } from "@ngrx/store";
import { AuthState, authFeatureName } from "./auth.reducer";

export const authSate = createFeatureSelector<AuthState>(authFeatureName)

export const authUser = createSelector(authSate, (state) => state.authUser)