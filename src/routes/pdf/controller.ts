/* eslint-disable @typescript-eslint/explicit-function-return-type */
import template from '../../utils/templatepdf'
import pdf, { CreateOptions } from 'html-pdf'
import { Request, Response } from 'express' // Types for req,res

const options: CreateOptions = {
  format: 'A4',
  orientation: 'portrait',
}

const createPdf = (req: Request, res: Response) => {
  console.log(req.body)
  const date = new Date().toISOString()
  const datereg = date.slice(0, 13)
  const sec = new Date().getMilliseconds()
  const { product, category, ubication, price, user } = req.body

  pdf
    .create(template(product, category, ubication, price, user), options)
    .toFile(`./src/pdfsgenerated/${datereg}${sec}_test.pdf`, (err, res) => {
      // eslint-disable-next-line @typescript-eslint/strict-boolean-expressions
      err && console.log(err)
      return console.log(res)
    })
  return res.json({ filename: `${datereg}${sec}_test.pdf` })
}

// const getPdf = (_req: Request, res: Response) => {
//   res.send('holamundo')
// }

export { createPdf }
