import type { PostgresTrigger } from '@skybase/postgres-meta'
import { toast } from 'sonner'

import { useProjectContext } from 'components/layouts/ProjectLayout/ProjectContext'
import { useDatabaseTriggerDeleteMutation } from 'data/database-triggers/database-trigger-delete-mutation'
import TextConfirmModal from 'ui-patterns/Dialogs/TextConfirmModal'

interface DeleteHookModalProps {
  visible: boolean
  selectedHook?: PostgresTrigger
  onClose: () => void
}

const DeleteHookModal = ({ selectedHook, visible, onClose }: DeleteHookModalProps) => {
  const { name, schema } = selectedHook ?? {}

  const { project } = useProjectContext()
  const { mutate: deleteDatabaseTrigger, isLoading: isDeleting } = useDatabaseTriggerDeleteMutation(
    {
      onSuccess: () => {
        toast.success(`Successfully deleted ${name}`)
        onClose()
      },
    }
  )

  async function handleDelete() {
    if (!project) {
      return console.error('Project ref is required')
    }
    if (!selectedHook) {
      return toast.error('Unable find selected hook')
    }

    deleteDatabaseTrigger({
      trigger: selectedHook,
      projectRef: project.ref,
      connectionString: project.connectionString,
    })
  }

  return (
    <TextConfirmModal
      variant="destructive"
      visible={visible}
      size="medium"
      onCancel={() => onClose()}
      onConfirm={handleDelete}
      title="Delete database webhook"
      loading={isDeleting}
      confirmLabel={`Delete ${name}`}
      confirmPlaceholder="Type in name of webhook"
      confirmString={name || ''}
      text={
        <>
          This will delete the webhook <span className="text-bold text-foreground">{name}</span>{' '}
          from the schema <span className="text-bold text-foreground">{schema}</span>
        </>
      }
      alert={{ title: 'You cannot recover this webhook once deleted.' }}
    />
  )
}

export default DeleteHookModal
