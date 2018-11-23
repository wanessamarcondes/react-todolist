import React from 'react'
import { storiesOf } from '@storybook/react'
import StoryRouter from 'storybook-react-router'
import Alert from './index'

storiesOf('Components/Alert', module)
    .addDecorator(StoryRouter())
    .add('default', () => <Alert open={true}>Email e senha não cadastrados</Alert>)
    