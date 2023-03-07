/* eslint-disable @typescript-eslint/restrict-template-expressions */
import { PDFDocument } from 'pdf-lib'
import { readFile, writeFile } from 'fs/promises'

import { Request, Response } from 'express' // Types for req,res

const editPdf = async (req: Request, res: Response): Promise<any> => {
  const { body } = req
  console.log(body)
  try {
    const pdfDoc = await PDFDocument.load(await readFile('test.pdf'))

    const fieldNames = pdfDoc
      .getForm()
      .getFields()
      .map((e) => e.getName())
    console.log({ fieldNames })

    const form = pdfDoc.getForm()

    form.getTextField('Fecha').setText(body.fecha)
    form.getTextField('importe').setText(body.importe)
    form.getTextField('importe en letras').setText(body.importe_letras)
    form.getTextField('cuenta').setText(body.cuenta)
    form.getTextField('Razón social 2').setText(body.razon_social_2)
    form.getTextField('Dirección 2').setText(body.direccion_2)
    form.getTextField('cuenta 2').setText(body.cuenta_2)
    form.getTextField('nombre banco').setText(body.nombre_banco)
    form.getTextField('swift').setText(body.swift)
    form.getTextField('Dirección 3').setText(body.direccion_3)
    form.getTextField('nombre banco 2').setText(body.nombre_banco_2)
    form.getTextField('swift 2').setText(body.swift_2)
    form.getTextField('Dirección 4').setText(body.direccion_4)
    form.getTextField('detalles del pago').setText(body.detalles_pago)
    form.getTextField('RUC 2').setText(body.ruc_2)
    form.getTextField('Nombres y apellidos 2').setText(body.nombres_2)
    form.getTextField('DNI 2').setText(body.dni_2)
    // RADIOBUTTONS
    form.getRadioGroup('tipo de moneda').select(body.tipo_moneda)
    form.getRadioGroup('tipo de moneda 2').select(body.tipo_moneda_2)
    form.getRadioGroup('tipo de gastos').select(body.tipo_gastos)
    form.getRadioGroup('Tipo de documento 2').select(body.tipo_documento_2)

    // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
    const fileName: any = `./pdfsedited/${body.nombres_2}${body.importe}.pdf`

    const pdfBytes = await pdfDoc.save()
    await writeFile(fileName, pdfBytes)
    res.status(200).json({ exitoso: true })
  } catch (error) {
    console.log(error)
  }
}

export { editPdf }
