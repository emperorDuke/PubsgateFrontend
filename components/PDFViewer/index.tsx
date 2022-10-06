import React from 'react'
import { Document, DocumentProps, Page, pdfjs } from 'react-pdf'
import { debounce } from '../../utils/customFunctions'
import Button from '../Button'

pdfjs.GlobalWorkerOptions.workerSrc = `//cdnjs.cloudflare.com/ajax/libs/pdf.js/${pdfjs.version}/pdf.worker.min.js`

const PDFViewer = () => {
  const [numPages, setNumPages] = React.useState(0)
  const [pageNumber, setPageNumber] = React.useState(1)
  const [pageHeight, setPageHeight] = React.useState(0)
  const documentRef = React.useRef<HTMLDivElement>(null)
  const pageRef = React.useRef<HTMLDivElement>(null)

  React.useEffect(() => {
    const documentEl = documentRef.current

    if (!pageHeight && documentEl) {
      setPageHeight(documentEl.offsetHeight)
    }

    const onScroll = () => {
      if (documentEl) {
        if (documentEl.scrollTop === 0) {
          setPageNumber(1)
          return
        }

        const calcPageNumber = Math.ceil(documentEl.scrollTop / pageHeight)

        if (calcPageNumber !== pageNumber && isFinite(calcPageNumber)) {
          setPageNumber(calcPageNumber)
        }
      }
    }

    if (documentEl) {
      documentEl.addEventListener('scroll', debounce(onScroll, 500))
    }

    return () => {
      if (documentEl) {
        documentEl.removeEventListener('scroll', debounce(onScroll, 500))
      }
    }
  }, [setPageNumber, pageNumber, pageHeight])

  const handleLoad: DocumentProps['onLoadSuccess'] = ({ numPages }) => {
    setNumPages(numPages)
  }

  const handleRender = () => {
    pageRef.current && setPageHeight(pageRef.current.offsetHeight)
  }

  const handleNextPage = () => {
    const documentEl = documentRef.current

    if (documentEl) {
      documentEl.scrollTo(0, pageHeight * pageNumber + 10)
    }
  }

  const handlePrevPage = () => {
    const documentEl = documentRef.current

    if (documentEl) {
      documentEl.scrollTo(
        0,
        pageNumber - 1 === 1 ? 0 : pageHeight * (pageNumber - 1),
      )
    }
  }

  return (
    <div>
      <div className="flex items-center mb-3">
        <Button size="small" variant="outlined" onClick={handlePrevPage}>
          previous
        </Button>

        <p className="font-bold text-xl mx-3">
          Page {pageNumber} of {numPages}
        </p>

        <Button size="small" variant="outlined" onClick={handleNextPage}>
          next
        </Button>
      </div>

      <Document
        inputRef={documentRef}
        className={`h-[800px] overflow-y-scroll overflow-x-hidden overscroll-contain`}
        file="http://localhost:8000/media/boli.pdf"
        onLoadSuccess={handleLoad}
      >
        {Array.apply(null, Array(numPages))
          .map((x, i) => i + 1)
          .map((x) =>
            x == 1 ? (
              <Page
                key={x}
                pageNumber={x}
                inputRef={pageRef}
                onRenderSuccess={handleRender}
                scale={1.5}
              />
            ) : (
              <Page pageNumber={x} scale={1.5} key={x} />
            ),
          )}
      </Document>
    </div>
  )
}

export default PDFViewer
