/* eslint-disable @typescript-eslint/restrict-template-expressions */
import multer from 'multer'
import { Request, Response } from 'express' // Types for req,res

const storage = multer.diskStorage({
  destination: (_req, _file, cb) => {
    cb(null, 'src/uploads')
  },
  filename: (_req, file, cb) => {
    console.log(file)
    cb(null, `${file.originalname}`)
  },
})
const upload = multer({ storage: storage })

const upload2 = upload.single('file')

const uploadFile = (_req: Request, res: Response): any => {
  res.send({ data: 'enviar archivo' })
}
export { upload2, uploadFile }
