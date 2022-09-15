import { Link } from 'react-router-dom'
import { Button } from 'primereact/button'

import { MainLayout } from 'common/components/layouts/main-layout'
import { ProjectsList } from 'features/projects/components/projects-list'

export const ProjectsPage = () => (
  <MainLayout>
    <div className='grid grid-nogutter'>
      <div className='col-12 lg:col-8 lg:col-offset-2'>
        <div className='flex justify-content-between'>
          <h1>My projects</h1>

          <Link to='/create-project'>
            <Button type='button' label='Create new project' icon='pi pi-plus' />
          </Link>
        </div>

        <div className='mt-5'>
          <ProjectsList />
        </div>
      </div>
    </div>
  </MainLayout>
)
