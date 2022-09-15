import styled from 'styled-components'
import { DataTable, DataTableProps } from 'primereact/datatable'
import { Column, ColumnProps } from 'primereact/column'

interface GenericDataTableProps extends DataTableProps {
  columns: ColumnProps[]
}

export const GenericDataTable = (props: GenericDataTableProps) => {
  const columnsElements = props.columns.map((column) => {
    return <Column key={column.field} {...column}></Column>
  })

  return <StyledDataTable {...props}>{columnsElements}</StyledDataTable>
}

const StyledDataTable = styled(DataTable)`
  .p-datatable-table {
    border-collapse: separate;
    border-spacing: 0 24px;

    .p-datatable-thead {
      th {
        background-color: transparent;
        border: 0;
        padding-bottom: 0;

        .p-column-title {
          color: #777;
          font-size: 16px;
          font-weight: 600;
        }
      }
    }

    .p-datatable-tbody {
      tr {
        box-shadow: 0px 0px 4px rgba(0, 0, 0, 0.12);

        td {
          border: 0;
          color: #111;
          opacity: 0.77;
          padding: 32px;

          &:first-of-type {
            border-radius: 8px 0 0 8px;
          }

          &:last-of-type {
            border-radius: 0 8px 8px 0;
          }
        }
      }
    }
  }
`
