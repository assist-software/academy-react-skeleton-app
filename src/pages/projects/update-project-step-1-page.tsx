import { useParams } from 'react-router-dom'

import { MainLayout } from 'common/components/layouts/main-layout'
import { ProjectsUpdateStep1Form } from 'features/projects/components/projects-update-step-1-form'

export const UpdateProjectStep1Page = () => {
  const { id } = useParams()

  return (
    <MainLayout>
      <div className='grid grid-nogutter'>
        <div className='col-12 md:col-6 md:col-offset-3'>
          <h1>Update project</h1>

          <div className='mt-4'>
            <ProjectsUpdateStep1Form id={id!} />
          </div>
        </div>
      </div>
    </MainLayout>
  )
}
