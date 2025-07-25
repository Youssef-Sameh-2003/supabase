import { Transition } from '@headlessui/react'
import { PermissionAction } from '@skybase/shared-types/out/constants'
import { isEmpty } from 'lodash'
import { AlertCircle, ChevronDown, Clipboard, Download, Loader, Trash2, X } from 'lucide-react'
import SVG from 'react-inlinesvg'

import { useParams } from 'common'
import { ButtonTooltip } from 'components/ui/ButtonTooltip'
import { useCheckPermissions } from 'hooks/misc/useCheckPermissions'
import { BASE_PATH } from 'lib/constants'
import { formatBytes } from 'lib/helpers'
import { useStorageExplorerStateSnapshot } from 'state/storage-explorer'
import {
  Button,
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from 'ui'
import { URL_EXPIRY_DURATION } from '../Storage.constants'
import { StorageItem } from '../Storage.types'
import { downloadFile } from './StorageExplorer.utils'
import { useCopyUrl } from './useCopyUrl'
import { useFetchFileUrlQuery } from './useFetchFileUrlQuery'

const PREVIEW_SIZE_LIMIT = 10 * 1024 * 1024 // 10MB

const PreviewFile = ({ item }: { item: StorageItem }) => {
  const { projectRef, selectedBucket } = useStorageExplorerStateSnapshot()

  const { data: previewUrl, isLoading } = useFetchFileUrlQuery({
    file: item,
    projectRef: projectRef,
    bucket: selectedBucket,
  })

  // if the size is not available, we set it to be greater than the max size
  const size = +(item.metadata?.size ?? PREVIEW_SIZE_LIMIT + 1)
  const mimeType = item.metadata?.mimetype

  const isSkipped = !!mimeType && !!size && size > PREVIEW_SIZE_LIMIT

  if (isLoading) {
    return (
      <div className="flex h-full w-full items-center justify-center text-foreground-lighter">
        <Loader size={14} strokeWidth={2} className="animate-spin" />
      </div>
    )
  }
  if (isSkipped) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center">
        <SVG
          src={`${BASE_PATH}/img/file-filled.svg`}
          preProcessor={(code) =>
            code.replace(/svg/, 'svg class="mx-auto w-32 h-32 text-color-inherit opacity-75"')
          }
        />
        <p className="mt-2 w-2/5 text-center text-sm">
          File size is too large to preview in the explorer
        </p>
      </div>
    )
  }
  if (!mimeType || !previewUrl) {
    return (
      <SVG
        src={`${BASE_PATH}/img/file-filled.svg`}
        preProcessor={(code) =>
          code.replace(/svg/, 'svg class="mx-auto w-32 h-32 text-color-inherit opacity-75"')
        }
      />
    )
  }

  if (mimeType.includes('image')) {
    return (
      <div
        className="flex h-full w-full items-center justify-center bg-contain bg-center bg-no-repeat"
        style={{ backgroundImage: `url('${previewUrl}')` }}
      />
    )
  }
  if (mimeType.includes('audio')) {
    return (
      <div className="flex h-full w-full items-center justify-center px-10">
        <audio key={previewUrl} controls style={{ width: 'inherit' }}>
          <source src={previewUrl} type="audio/mpeg" />
          <p className="text-sm text-foreground-light">
            Your browser does not support the audio element.
          </p>
        </audio>
      </div>
    )
  }
  if (mimeType.includes('video')) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <video key={previewUrl} controls style={{ maxHeight: '100%' }}>
          <source src={previewUrl} type="video/mp4" />
          <p className="text-sm text-foreground-light">
            Your browser does not support the video tag.
          </p>
        </video>
      </div>
    )
  }
  return (
    <SVG
      src={`${BASE_PATH}/img/file-filled.svg`}
      preProcessor={(code) =>
        code.replace(/svg/, 'svg class="mx-auto w-32 h-32 text-color-inherit opacity-75"')
      }
    />
  )
}

const PreviewPane = () => {
  const { ref: projectRef, bucketId } = useParams()

  const {
    selectedBucket,
    selectedFilePreview: file,
    setSelectedItemsToDelete,
    setSelectedFilePreview,
    setSelectedFileCustomExpiry,
  } = useStorageExplorerStateSnapshot()
  const { onCopyUrl } = useCopyUrl()

  const canUpdateFiles = useCheckPermissions(PermissionAction.STORAGE_WRITE, '*')

  if (!file) return null

  const width = 450
  const isOpen = !isEmpty(file)
  const size = file.metadata ? formatBytes(file.metadata.size) : null
  const mimeType = file.metadata ? file.metadata.mimetype : undefined
  const createdAt = file.created_at ? new Date(file.created_at).toLocaleString() : 'Unknown'
  const updatedAt = file.updated_at ? new Date(file.updated_at).toLocaleString() : 'Unknown'

  return (
    <>
      <Transition
        show={isOpen}
        enter="transition ease-out duration-150"
        enterFrom="transform opacity-0"
        enterTo="transform opacity-100"
        leave="transition ease-in duration-100"
        leaveFrom="transform opacity-100"
        leaveTo="transform opacity-0"
      >
        <div className="h-full border-l border-overlay bg-surface-100 p-4" style={{ width }}>
          {/* Preview Header */}
          <div className="flex w-full justify-end text-foreground-lighter transition-colors hover:text-foreground">
            <X
              className="cursor-pointer"
              size={14}
              strokeWidth={2}
              onClick={() => setSelectedFilePreview(undefined)}
            />
          </div>

          {/* Preview Thumbnail*/}
          <div className="my-4 border border-overlay">
            <div className="flex h-56 w-full items-center 2xl:h-72">
              <PreviewFile item={file} />
            </div>
          </div>

          <div className="w-full space-y-6">
            {/* Preview Information */}
            <div className="space-y-1">
              <h5 className="break-words text-base text-foreground">{file.name}</h5>
              {file.isCorrupted && (
                <div className="flex items-center space-x-2">
                  <AlertCircle size={14} strokeWidth={2} className="text-foreground-light" />
                  <p className="text-sm text-foreground-light">
                    File is corrupted, please delete and reupload this file again
                  </p>
                </div>
              )}
              {mimeType && (
                <p className="text-sm text-foreground-light">
                  {mimeType}
                  {size && <span> - {size}</span>}
                </p>
              )}
            </div>

            {/* Preview Metadata */}
            <div className="space-y-2">
              <div>
                <label className="mb-1 text-xs text-foreground-lighter">Added on</label>
                <p className="text-sm text-foreground-light">{createdAt}</p>
              </div>
              <div>
                <label className="mb-1 text-xs text-foreground-lighter">Last modified</label>
                <p className="text-sm text-foreground-light">{updatedAt}</p>
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-2 border-b border-overlay pb-4">
              <Button
                type="default"
                icon={<Download size={16} strokeWidth={2} />}
                disabled={file.isCorrupted}
                onClick={async () => await downloadFile({ projectRef, bucketId, file })}
              >
                Download
              </Button>
              {selectedBucket.public ? (
                <Button
                  type="outline"
                  icon={<Clipboard size={16} strokeWidth={2} />}
                  onClick={() => onCopyUrl(file.name)}
                  disabled={file.isCorrupted}
                >
                  Get URL
                </Button>
              ) : (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button
                      type="outline"
                      icon={<Clipboard size={16} strokeWidth={2} />}
                      iconRight={<ChevronDown />}
                      disabled={file.isCorrupted}
                    >
                      Get URL
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent side="bottom" align="center">
                    <DropdownMenuItem
                      key="expires-one-week"
                      onClick={() => onCopyUrl(file.name, URL_EXPIRY_DURATION.WEEK)}
                    >
                      Expire in 1 week
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      key="expires-one-month"
                      onClick={() => onCopyUrl(file.name, URL_EXPIRY_DURATION.MONTH)}
                    >
                      Expire in 1 month
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      key="expires-one-year"
                      onClick={() => onCopyUrl(file.name, URL_EXPIRY_DURATION.YEAR)}
                    >
                      Expire in 1 year
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      key="custom-expiry"
                      onClick={() => setSelectedFileCustomExpiry(file)}
                    >
                      Custom expiry
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </div>
            <ButtonTooltip
              type="outline"
              disabled={!canUpdateFiles}
              size="tiny"
              icon={<Trash2 strokeWidth={2} />}
              onClick={() => setSelectedItemsToDelete([file])}
              tooltip={{
                content: {
                  side: 'bottom',
                  text: !canUpdateFiles
                    ? 'You need additional permissions to delete this file'
                    : undefined,
                },
              }}
            >
              Delete file
            </ButtonTooltip>
          </div>
        </div>
      </Transition>
    </>
  )
}

export default PreviewPane
