import { Box, makeStyles, createStyles, Modal, ModalProps } from '@material-ui/core'
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
  }),
)

export const ModalNoteEditor = ({ note, onComplete, onNoteChange, readOnly = false, open }: ModalNoteEditorProps) => {
  const classes = useStyles()

  return (
    <Modal className={classes.modal} open={open} onClose={() => {onComplete && onComplete()}}>
      <Box p={2} bgcolor="white">
        <EditableNote note={note} onNoteChange={onNoteChange} readOnly={readOnly} />
      </Box>
    </Modal>
  )
}

export default ModalNoteEditor