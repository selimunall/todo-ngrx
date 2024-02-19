import { provideStore } from "@ngrx/store";
import { TodoStateService, provideTodoState } from "./todo/facade";
import { makeEnvironmentProviders } from "@angular/core";

export {
    TodoStateService
};
  export const provideApplicationState = () =>
    makeEnvironmentProviders([
      provideStore(),
      provideTodoState()
    ]);