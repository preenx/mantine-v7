/* eslint-disable no-console */
import React from 'react';
import { TextInput } from '../TextInput';
import { Button } from '../Button';
import { ScrollArea } from '../ScrollArea';
import { Combobox } from './Combobox';
import { useCombobox } from './use-combobox/use-combobox';

export default { title: 'Combobox' };

const largeOptionsList = Array(100)
  .fill(0)
  .map((_, index) => (
    <Combobox.Option value={`option-${index}`} key={index}>
      Option {index}
    </Combobox.Option>
  ));

const lorem = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl quis tincidunt
sodales, leo sapien faucibus eros, eu tincidunt nisl quam eget mauris. Nulla facilisi. Nulla
facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla facilisi. Nulla
`;

const scrollableContent = Array(20)
  .fill(0)
  .map((_, index) => <p key={index}>{lorem}</p>);

function StoryBase({ children }: { children: React.ReactNode }) {
  const [opened, setOpened] = React.useState(false);
  const store = useCombobox({ opened, onOpenedChange: setOpened });
  const [value, setValue] = React.useState('');

  return (
    <div style={{ padding: 40 }}>
      <Combobox
        store={store}
        withinPortal={false}
        onItemSelect={(val) => {
          setValue(val);
          store.closeDropdown();
          store.resetSelectedOption();
        }}
      >
        <Combobox.Target>
          <TextInput
            placeholder="Pick a value"
            onFocus={store.openDropdown}
            onBlur={store.closeDropdown}
            value={value}
            onChange={(event) => {
              setValue(event.currentTarget.value);
              store.openDropdown();
            }}
            onClick={() => store.openDropdown()}
          />
        </Combobox.Target>
        <Combobox.Dropdown>
          <Combobox.Options>{children}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
}

export function Usage() {
  return (
    <StoryBase>
      <Combobox.Option value="react">React</Combobox.Option>
      <Combobox.Option value="vue" disabled>
        Vue
      </Combobox.Option>
      <Combobox.Option value="svelte">Svelte</Combobox.Option>
      <Combobox.Option value="angular">Angular</Combobox.Option>
    </StoryBase>
  );
}

export function DisabledFirstItem() {
  return (
    <StoryBase>
      <Combobox.Option value="react" disabled>
        React
      </Combobox.Option>
      <Combobox.Option value="vue" disabled>
        Vue
      </Combobox.Option>
      <Combobox.Option value="svelte">Svelte</Combobox.Option>
      <Combobox.Option value="angular">Angular</Combobox.Option>
    </StoryBase>
  );
}

export function AllItemsDisabled() {
  return (
    <StoryBase>
      <Combobox.Option value="react" disabled>
        React
      </Combobox.Option>
      <Combobox.Option value="vue" disabled>
        Vue
      </Combobox.Option>
      <Combobox.Option value="svelte" disabled>
        Svelte
      </Combobox.Option>
      <Combobox.Option value="angular" disabled>
        Angular
      </Combobox.Option>
    </StoryBase>
  );
}

export function WithButtonTarget() {
  const store = useCombobox();

  return (
    <div style={{ padding: 40 }}>
      <Combobox
        store={store}
        withinPortal={false}
        onItemSelect={(value) => {
          console.log(value);
          store.closeDropdown();
        }}
        width={400}
        position="bottom-start"
        offset={10}
      >
        <Combobox.Target>
          <Button onClick={() => store.toggleDropdown()}>Toggle Popover</Button>
        </Combobox.Target>
        <Combobox.Dropdown>
          <Combobox.Options>
            <Combobox.Option value="react">React</Combobox.Option>
            <Combobox.Option value="vue">Vue</Combobox.Option>
            <Combobox.Option value="svelte">Svelte</Combobox.Option>
            <Combobox.Option value="angular">Angular</Combobox.Option>
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
}

export function WithScrollArea() {
  const store = useCombobox({ defaultOpened: true });
  const [value, setValue] = React.useState('');

  return (
    <div style={{ padding: 40 }}>
      {scrollableContent}
      <Combobox store={store} withinPortal={false} onItemSelect={setValue}>
        <Combobox.Target>
          <TextInput
            placeholder="Pick a value"
            onFocus={store.openDropdown}
            onBlur={store.closeDropdown}
            value={value}
            onChange={(event) => setValue(event.currentTarget.value)}
          />
        </Combobox.Target>
        <Combobox.Dropdown>
          <Combobox.Options>
            <ScrollArea.Autosize mah={200} type="scroll">
              {largeOptionsList}
            </ScrollArea.Autosize>
          </Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
      {scrollableContent}
    </div>
  );
}

const fruitsData = [
  { label: 'Apple', value: 'apple' },
  { label: 'Banana', value: 'banana' },
  { label: 'Orange', value: 'orange' },
  { label: 'Grape', value: 'grape' },
  { label: 'Mango', value: 'mango' },
  { label: 'Pineapple', value: 'pineapple' },
];

export function WithActive() {
  const store = useCombobox();
  const [active, setActive] = React.useState<string | null>(null);
  const [value, setValue] = React.useState('');

  const options = fruitsData.map((fruit) => (
    <Combobox.Option value={fruit.value} key={fruit.value} active={active === fruit.value}>
      {active === fruit.value && '✓'} {fruit.label}
    </Combobox.Option>
  ));

  return (
    <div style={{ padding: 40 }}>
      <Combobox
        store={store}
        withinPortal={false}
        onItemSelect={(val) => {
          setActive(val);
          setValue(fruitsData.find((fruit) => fruit.value === val)!.label);
        }}
      >
        <Combobox.Target>
          <TextInput
            placeholder="Pick a value"
            onFocus={store.openDropdown}
            onBlur={store.closeDropdown}
            value={value}
            onChange={(event) => {
              setValue(event.currentTarget.value);
            }}
          />
        </Combobox.Target>
        <Combobox.Dropdown>
          <Combobox.Options>{options}</Combobox.Options>
        </Combobox.Dropdown>
      </Combobox>
    </div>
  );
}
