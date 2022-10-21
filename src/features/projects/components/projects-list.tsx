import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { observer } from 'mobx-react-lite'
import fromUnixTime from 'date-fns/fromUnixTime'
import formatDistance from 'date-fns/formatDistance'
import { ColumnProps } from 'primereact/column'
import { Skeleton } from 'primereact/skeleton'
import useInfiniteScroll from 'react-infinite-scroll-hook'

import { useStore } from 'common/store/store'
import { GenericDataTable } from 'common/components/generic-data-table'
import { MoreActionsButton } from 'common/components/more-actions-button'
import { NoDataFound } from 'common/components/no-data-found'
import { LoadingItemsIndicator } from 'common/components/loading-items-indicator'
import { numberOfProjectsDisplayedPerPage } from '../constants/projects.const'
import { Project } from '../types/projects-models.types'

export const ProjectsList = observer(() => {
  const { notifierStore, projectsStore } = useStore()

  const { projects, removeProject, totalNumberOfProjects } = projectsStore

  const [nextPage, setNextPage] = useState(1)
  const [isLoadingProjects, setIsLoadingProjects] = useState(true)
  const [isLoadingProjectsPage, setIsLoadingProjectsPage] = useState(true)
  const [isLoadingProjectIdsToDelete, setIsLoadingProjectIdsToDelete] = useState<number[]>([])

  const navigate = useNavigate()

  useEffect(() => {
    loadProjects()
  }, [])

  const deleteProjectHandler = async (projectId: number) => {
    try {
      setIsLoadingProjectIdsToDelete((prevIsLoadingProjectIdsToDelete) => [
        ...prevIsLoadingProjectIdsToDelete,
        projectId,
      ])

      await removeProject(projectId)

      notifierStore.pushMessage({
        severity: 'success',
        detail: `The project was deleted successfully.`,
      })
    } catch (error) {
      notifierStore.pushMessage({
        severity: 'error',
        detail: `An error occurred while deleting the project: ${error.message}`,
      })
    } finally {
      setIsLoadingProjectIdsToDelete((prevIsLoadingProjectIdsToDelete) =>
        prevIsLoadingProjectIdsToDelete.filter((id) => {
          return id !== projectId
        }),
      )
    }
  }

  const loadProjects = async () => {
    try {
      setIsLoadingProjectsPage(true)

      await projectsStore.loadProjects({
        page: nextPage,
        pageSize: numberOfProjectsDisplayedPerPage,
      })

      setNextPage((prevNextPage) => prevNextPage + 1)
    } catch (error) {
      notifierStore.pushMessage({
        severity: 'error',
        detail: `An error occurred while loading the projects: ${error.message}`,
      })
    } finally {
      setIsLoadingProjects(false)
      setIsLoadingProjectsPage(false)
    }
  }

  const thereAreProjectsToLoad =
    nextPage <= Math.ceil(totalNumberOfProjects / numberOfProjectsDisplayedPerPage)

  const [sentryRef] = useInfiniteScroll({
    loading: isLoadingProjectsPage,
    hasNextPage: thereAreProjectsToLoad,
    onLoadMore: loadProjects,
  })

  const columns: ColumnProps[] = [
    {
      header: `${totalNumberOfProjects} active ${
        totalNumberOfProjects === 1 ? 'project' : 'projects'
      }`,
      field: 'name',
      body: ({ name }: Project) => {
        return <span className='text-xl'>{name}</span>
      },
    },
    {
      header: 'Saved documents',
      field: 'numberOfDocuments',
      body: ({ numberOfDocuments }: Project) => {
        return <Link to='/unknown-link'>{numberOfDocuments}</Link>
      },
    },
    {
      header: 'Last activity',
      field: 'updatedAt',
      body: ({ updatedAt }: Project) => {
        return formatDistance(new Date(), fromUnixTime(Math.floor(updatedAt / 1000)))
      },
    },
    {
      header: 'Shared with',
      field: 'collaborators',
      body: ({ collaborators }: Project) => {
        return (
          <Link to='/unknown-link'>{`${collaborators.length} ${
            collaborators.length === 1 ? 'collaborator' : 'collaborators'
          }`}</Link>
        )
      },
    },
    {
      header: '',
      field: 'id',
      body: ({ id }: Project) => {
        const menuModel = [
          {
            items: [
              {
                label: 'Edit project settings',
                command: () => {
                  navigate(`/update-project-step-1/${id}`)
                },
              },
              {
                label: 'Delete project',
                command: () => {
                  deleteProjectHandler(id)
                },
              },
            ],
          },
        ]
        return (
          <MoreActionsButton
            buttonProps={{ disabled: isLoadingProjectIdsToDelete.includes(id) }}
            menuModel={menuModel}
          />
        )
      },
    },
  ]

  let content: JSX.Element

  if (isLoadingProjects) {
    content = (
      <>
        {[...Array(5)].map((_, i) => (
          <Skeleton key={i} height='90px' className='mb-3' />
        ))}
      </>
    )
  } else if (projects.length === 0) {
    content = (
      <NoDataFound useCardWrapper={true}>
        <Link to='/create-project'>Create your first project</Link> to get started.
      </NoDataFound>
    )
  } else {
    content = (
      <>
        <GenericDataTable columns={columns} value={projects} responsiveLayout='scroll' />
        {thereAreProjectsToLoad && <LoadingItemsIndicator />}
        <div ref={sentryRef} />
      </>
    )
  }

  return content
})
