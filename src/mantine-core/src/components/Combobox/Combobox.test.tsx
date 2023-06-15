import React from 'react';
import { tests } from '@mantine/tests';
import { TextInput } from '../TextInput';
import { Combobox } from './Combobox';
import { useCombobox } from './use-combobox';

function DefaultUsage() {
  const store = useCombobox();

  return (
    <div style={{ padding: 40 }}>
      <Combobox store={store} withinPortal={false}>
        <Combobox.Target>
          <TextInput label="Test input" onFocus={store.openDropdown} onBlur={store.closeDropdown} />
        </Combobox.Target>
        <Combobox.Dropdown id="test-id">Test dropdown</Combobox.Dropdown>
      </Combobox>
    </div>
  );
}

describe('@mantine/core/Combobox', () => {
  tests.axe([<DefaultUsage />]);
});