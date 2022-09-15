import { MainLayout } from 'common/components/layouts/main-layout'
import { ProjectsCreateForm } from 'features/projects/components/projects-create-form'

export const CreateProjectPage = () => (
  <MainLayout>
    <div className='grid grid-nogutter'>
      <div className='col-12 md:col-6 md:col-offset-3'>
        <h1>Create new project</h1>

        <div className='mt-4'>
          <ProjectsCreateForm />
        </div>
      </div>
    </div>
  </MainLayout>
)
