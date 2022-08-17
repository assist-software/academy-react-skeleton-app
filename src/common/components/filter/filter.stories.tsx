import { ComponentStory, ComponentMeta } from '@storybook/react'

import { Filter } from './filter'

export default {
  title: 'common/Filter',
  component: Filter,
  parameters: {
    docs: {
      description: {
        component: '',
      },
    },
  },
} as ComponentMeta<typeof Filter>

const Template: ComponentStory<typeof Filter> = (args) => <Filter />

export const Default = Template.bind({})

Default.args = {}
