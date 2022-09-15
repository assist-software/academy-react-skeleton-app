import { useParams } from 'react-router-dom'

import { MainLayout } from 'common/components/layouts/main-layout'
import { ProjectsUpdateStep2Form } from 'features/projects/components/projects-update-step-2-form'

export const UpdateProjectStep2Page = () => {
  const { id } = useParams()

  return (
    <MainLayout>
      <div className='grid grid-nogutter'>
        <div className='col-12 md:col-6 md:col-offset-3'>
          <h1 className='mb-2'>Select what you care about</h1>
          <p className='text-600'>
            For best results, please indicate what is relevant (or not) for your project
          </p>

          <div className='mt-4'>{<ProjectsUpdateStep2Form id={id!} />}</div>
        </div>
      </div>
    </MainLayout>
  )
}
