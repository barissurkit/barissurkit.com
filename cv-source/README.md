# Accessible CV companions

These semantic HTML files mirror the content of the downloadable English and Turkish CV PDFs. The supplied PDF exports at the repository root are canonical because their layouts differ by language.

The HTML companions can be rendered for a quick content review with WeasyPrint:

```sh
mkdir -p tmp/pdfs
weasyprint --pdf-variant pdf/ua-1 cv-source/cv-en.html tmp/pdfs/cv-en-companion.pdf
weasyprint --pdf-variant pdf/ua-1 cv-source/cv-tr.html tmp/pdfs/cv-tr-companion.pdf
```

After every PDF replacement, confirm that each document is one page, reports `Tagged: yes`, and exposes a logical heading/list/link structure:

```sh
pdfinfo Baris_Surkit_CV_EN.pdf
pdfinfo -struct-text Baris_Surkit_CV_EN.pdf
pdfinfo Baris_Surkit_CV_TR.pdf
pdfinfo -struct-text Baris_Surkit_CV_TR.pdf
```

Formal PDF/UA conformance still requires validation with veraPDF and a manual screen-reader reading-order check.
