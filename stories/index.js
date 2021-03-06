import React from 'react';
import { storiesOf } from '@storybook/react';
import Button from '../src/components/buttons/button';
import TextInput from '../src/components/fields/text-input';
import TextArea from '../src/components/fields/text-area';

storiesOf('Button', module)
  .add('regular', () => (
    <Button>Hello Button</Button>
  ))
  .add('cta', () => (
    <Button type="cta">CTA Button</Button>
  ))
  .add('small', () => (
    <Button size="small">Small Button</Button>
  ))
.add('tertiary', () => (
    <Button type="tertiary" size="small">Tertiary (Small) Button</Button>
  ))
.add('danger zone', () => (
    <Button type="dangerZone" size="small">Destructive Action</Button>
  ));

storiesOf('Text Input', module)
  .add('regular', () => (
    <TextInput placeholder="type something!"/>
  ))
  .add('login', () => (
    <TextInput placeholder="type something!" prefix="@"/>
  ))
  .add('search', () => (
    <TextInput type="search" opaque={true} search={true} placeholder="bots, apps, users"/>
  ))
  .add('with error', () => (
    <TextInput placeholder="glitch" error="That team already exists"/>
  ))
  .add('text area', () => (
    <TextArea placeholder="[Something here] doesn't seem appropriate for Glitch because..." error="Reason is required"/>
  ));