import { Box, makeStyles, createStyles, Modal, ModalProps, Grow } from '@material-ui/core'
import * as types from '~/types'
import { EditableNote } from '~/components'

export type ModalNoteEditorProps = {
  open: ModalProps["open"],
} & types.NoteEditor

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    modalInner: {
      outline: 0,
    },
  }),
)

export const ModalNoteEditor = ({ note, onComplete, onNoteChange, readOnly = false, open }: ModalNoteEditorProps) => {
  const classes = useStyles()

  return (
    <Modal className={classes.modal} open={open} onClose={() => {onComplete && onComplete()}}>
      <Grow in={open}>
        <Box p={0.15} className={classes.modalInner}>
          <EditableNote note={note} onNoteChange={onNoteChange} readOnly={readOnly} />
        </Box>
      </Grow>
    </Modal>
  )
}

export default ModalNoteEditor