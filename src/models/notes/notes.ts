import { prop, getModelForClass } from '@typegoose/typegoose'

class Note {
  @prop()
  title: string

  @prop()
  date: string

  @prop()
  description: string
}

const NoteModel = getModelForClass(Note)
export default NoteModel
