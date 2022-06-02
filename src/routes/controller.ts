/* eslint-disable @typescript-eslint/explicit-function-return-type */
import Note from '../models/notes/notes'

const CreateNote = async (req: any, res: any) => {
  const { title, date, description } = req.body

  const newNote = new Note({
    title,
    date,
    description,
  })
  await newNote.save()
  res.status(200).json({
    id: newNote.id,
    title: newNote.title,
    date: newNote.date,
    description: newNote.description,
  })
}

const getAllNotes = async (_req: any, res: any) => {
  try {
    const getNote = await Note.find({}).sort({ date: -1 }).select('-__V')
    res.status(200).json(getNote)
  } catch (error) {
    console.log(error)
  }
}

const getNoteById = async (req: any, res: any) => {
  try {
    const singleNote = await Note.findById(req.params.id)
    res.status(200).json(singleNote)
  } catch (error) {
    res.status(500).json(error)
  }
}

const deleteNoteByid = async (req: any, res: any) => {
  try {
    await Note.findByIdAndDelete(req.params.id)
    res.status(200).json('Note deleted')
  } catch (error) {
    res.status(500).json(error)
  }
}

const updateNoteById = async (req: any, res: any) => {
  const { body } = req

  try {
    const updateNote = await Note.findByIdAndUpdate(
      req.params.id,
      {
        $set: body,
      },
      {
        new: true,
      },
    )
    res.status(200).json(updateNote)
  } catch (error) {
    res.status(500).json(error)
  }
}

export { CreateNote, getAllNotes, getNoteById, deleteNoteByid, updateNoteById }
