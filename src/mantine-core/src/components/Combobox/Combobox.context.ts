import { createSafeContext, GetStylesApi } from '../../core';
import type { ComboboxFactory } from './Combobox';
import type { ComboboxOptionProps } from './ComboboxOption/ComboboxOption';
import type { ComboboxStore } from './use-combobox/use-combobox';

export interface ComboboxContextValue {
  getStyles: GetStylesApi<ComboboxFactory>;
  store: ComboboxStore;
  onOptionSelect?(value: string, optionProps: ComboboxOptionProps): void;
}

export const [ComboboxProvider, useComboboxContext] = createSafeContext<ComboboxContextValue>(
  'Combobox component was not found in tree'
);
