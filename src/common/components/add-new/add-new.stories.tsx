import { ComponentStory, ComponentMeta } from '@storybook/react'

import { AddNew } from './add-new'

export default {
  title: 'common/AddNew',
  component: AddNew,
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
} as ComponentMeta<typeof AddNew>

const Template: ComponentStory<typeof AddNew> = (args) => <AddNew />

export const Default = Template.bind({})

Default.args = {}
