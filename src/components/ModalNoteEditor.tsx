import { Box, makeStyles, createStyles, Modal, ModalProps } from '@material-ui/core'
import * as types from '~/types'
import { Note } from '~/components'

export type ModalNoteEditorProps = {
  note: types.Note,
  open: ModalProps["open"],
  onClose?: ModalProps["onClose"],
} & types.OnNoteChange & types.ReadOnly

const useStyles = makeStyles(() =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
)

export const ModalNoteEditor = ({ note, open, onClose, onNoteChange, readOnly = false }: ModalNoteEditorProps) => {
  const classes = useStyles()

  return (
    <Modal className={classes.modal} open={open} onClose={onClose}>
      <Box p={2} bgcolor="white">
        <Note note={note} onNoteChange={onNoteChange} readOnly={readOnly} />
      </Box>
    </Modal>
  )
}

export default ModalNoteEditor