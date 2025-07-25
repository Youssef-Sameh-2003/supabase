import { compact, uniqBy } from 'lodash'
import { Item, Menu, Separator, Submenu } from 'react-contexify'
import 'react-contexify/dist/ReactContexify.css'

import { PermissionAction } from '@skybase/shared-types/out/constants'
import { useCheckPermissions } from 'hooks/misc/useCheckPermissions'
import { ChevronRight, ChevronsDown, ChevronsUp, Clipboard, Eye, FolderPlus } from 'lucide-react'
import { useStorageExplorerStateSnapshot } from 'state/storage-explorer'
import {
  STORAGE_ROW_TYPES,
  STORAGE_SORT_BY,
  STORAGE_SORT_BY_ORDER,
  STORAGE_VIEWS,
} from '../Storage.constants'

interface ColumnContextMenuProps {
  id: string
}

const ColumnContextMenu = ({ id = '' }: ColumnContextMenuProps) => {
  const canUpdateFiles = useCheckPermissions(PermissionAction.STORAGE_WRITE, '*')
  const {
    columns,
    selectedItems,
    setSelectedItems,
    setSortBy,
    setSortByOrder,
    addNewFolderPlaceholder,
  } = useStorageExplorerStateSnapshot()

  const snap = useStorageExplorerStateSnapshot()

  const onSelectCreateFolder = (columnIndex = -1) => {
    addNewFolderPlaceholder(columnIndex)
  }

  const onSelectAllItemsInColumn = (columnIndex: number) => {
    const columnFiles = columns[columnIndex].items
      .filter((item) => item.type === STORAGE_ROW_TYPES.FILE)
      .map((item) => {
        return { ...item, columnIndex }
      })
    const columnFilesId = compact(columnFiles.map((item) => item.id))
    const selectedItemsFromColumn = selectedItems.filter(
      (item) => item.id && columnFilesId.includes(item.id)
    )

    if (selectedItemsFromColumn.length === columnFiles.length) {
      // Deselect all items from column
      const updatedSelectedItems = selectedItems.filter(
        (item) => item.id && !columnFilesId.includes(item.id)
      )
      setSelectedItems(updatedSelectedItems)
    } else {
      // Select all items from column
      const updatedSelectedItems = uniqBy(selectedItems.concat(columnFiles), 'id')
      setSelectedItems(updatedSelectedItems)
    }
  }

  return (
    <Menu id={id} animation="fade">
      {canUpdateFiles && [
        <Item key="create-folder" onClick={({ props }) => onSelectCreateFolder(props.index)}>
          <FolderPlus size="14" strokeWidth={1} />
          <span className="ml-2 text-xs">New folder</span>
        </Item>,
        <Separator key="create-folder-separator" />,
      ]}
      <Item onClick={({ props }) => onSelectAllItemsInColumn(props.index)}>
        <Clipboard size="14" strokeWidth={1} />
        <span className="ml-2 text-xs">Select all items</span>
      </Item>
      <Submenu
        label={
          <div className="flex items-center space-x-2">
            <Eye size="14" strokeWidth={1} />
            <span className="text-xs">View</span>
          </div>
        }
        arrow={<ChevronRight size="14" strokeWidth={1} />}
      >
        <Item onClick={() => snap.setView(STORAGE_VIEWS.COLUMNS)}>
          <span className="ml-2 text-xs">As columns</span>
        </Item>
        <Item onClick={() => snap.setView(STORAGE_VIEWS.LIST)}>
          <span className="ml-2 text-xs">As list</span>
        </Item>
      </Submenu>
      <Submenu
        label={
          <div className="flex items-center space-x-2">
            <ChevronsDown size="14" strokeWidth={1} />
            <span className="ml-2 text-xs">Sort by</span>
          </div>
        }
        arrow={<ChevronRight size="14" strokeWidth={1} />}
      >
        <Item onClick={() => setSortBy(STORAGE_SORT_BY.NAME)}>
          <span className="ml-2 text-xs">Name</span>
        </Item>
        <Item onClick={() => setSortBy(STORAGE_SORT_BY.CREATED_AT)}>
          <span className="ml-2 text-xs">Last created</span>
        </Item>
        <Item onClick={() => setSortBy(STORAGE_SORT_BY.UPDATED_AT)}>
          <span className="ml-2 text-xs">Last modified</span>
        </Item>
        <Item onClick={() => setSortBy(STORAGE_SORT_BY.LAST_ACCESSED_AT)}>
          <span className="ml-2 text-xs">Last accessed</span>
        </Item>
      </Submenu>
      <Submenu
        label={
          <div className="flex items-center space-x-2">
            <ChevronsUp size="14" strokeWidth={1} />
            <span className="ml-2 text-xs">Sort by order</span>
          </div>
        }
        arrow={<ChevronRight size="14" strokeWidth={1} />}
      >
        <Item onClick={() => setSortByOrder(STORAGE_SORT_BY_ORDER.ASC)}>
          <span className="ml-2 text-xs">Ascending</span>
        </Item>
        <Item onClick={() => setSortByOrder(STORAGE_SORT_BY_ORDER.DESC)}>
          <span className="ml-2 text-xs">Descending</span>
        </Item>
      </Submenu>
    </Menu>
  )
}

export default ColumnContextMenu
