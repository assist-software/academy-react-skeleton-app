import { Card } from 'primereact/card'

import { ChildrenNode } from 'common/types/props.types'
import noDataFoundImage from 'assets/images/no-data-found.png'

interface NoDataFoundProps extends ChildrenNode {
  useCardWrapper?: boolean
}

export const NoDataFound = ({ children, useCardWrapper = false }: NoDataFoundProps) => {
  const content = (
    <>
      <img src={noDataFoundImage} alt='No data found' className='w-3 mb-5' />
      <div className='text-xl'>{children}</div>
    </>
  )

  if (useCardWrapper) {
    return <Card className='text-center mt-6 pt-7 pb-7'>{content}</Card>
  } else {
    return <div className='text-center mt-6 pt-7 pb-7'>{content}</div>
  }
}
