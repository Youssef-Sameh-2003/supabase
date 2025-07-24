'use client'

import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from '@/registry/default/blocks/dropzone/components/dropzone'
import { useSkybaseUpload } from '@/registry/default/blocks/dropzone/hooks/use-skybase-upload'

const FileUploadDemo = () => {
  const props = useSkybaseUpload({
    bucketName: 'test',
    path: 'test',
    allowedMimeTypes: ['image/*'],
    maxFiles: 2,
    maxFileSize: 1000 * 1000 * 10, // 10MB,
  })

  return (
    <div className="w-[500px]">
      <Dropzone {...props}>
        <DropzoneEmptyState />
        <DropzoneContent />
      </Dropzone>
    </div>
  )
}

export default FileUploadDemo
