## Setting .env file

1. PASS_SEC = june111
2. JWT_SEC = jwt
3. MONGO_URL= mongodb+srv://ftbdev:DZEwjVaUpOeuE6S4@ftbdev.17jlte7.mongodb.net/?retryWrites=true&w=majority
4. MONGO_PASS=DZEwjVaUpOeuE6S4
5. MONGO_USER =ftbdev

## Creating Pdf

1. library html-pdf
2. Setting the pdf route on index.ts (line 41)
3. Creating the template for our pdf, in "utils" folder (templatepdf.ts).
4. Inside de the routes folder, i´ve created the pdf folder
5. pdf.ts where i defined the endpoint and methods.
6. controllers.ts, there's a middleware that creates the pdf.
