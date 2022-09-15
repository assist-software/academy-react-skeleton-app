import { useEffect, useRef } from 'react'
import { observer } from 'mobx-react-lite'
import { Toast } from 'primereact/toast'

import { useStore } from 'common/store/store'
import { defaultProps } from '../constants/notifier.const'

interface NotifierProps {
  autoRemove?: boolean
  displayTime?: number
}

export const Notifier = observer((props: NotifierProps) => {
  const { notifierStore } = useStore()

  const toast = useRef<Toast>(null)

  useEffect(() => {
    if (notifierStore.messages.length === 0) {
      return
    }

    if (toast && toast.current) {
      const { autoRemove, displayTime } = { ...defaultProps, ...props }
      const messages = notifierStore.messages.map(({ severity, detail }) => ({
        severity,
        detail,
        sticky: !autoRemove,
        life: displayTime,
      }))
      toast.current.show(messages)
    }

    notifierStore.clearAllMessages()
  }, [notifierStore.messages.length])

  return <Toast ref={toast} />
})
