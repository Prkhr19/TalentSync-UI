import { useEffect } from 'react'

export const usePageMeta = (title, description) => {
  useEffect(() => {
    const previousTitle = document.title
    document.title = title

    let meta = document.querySelector('meta[name="description"]')
    const createdMeta = !meta

    if (!meta) {
      meta = document.createElement('meta')
      meta.setAttribute('name', 'description')
      document.head.appendChild(meta)
    }

    const previousDescription = meta.getAttribute('content')
    meta.setAttribute('content', description)

    return () => {
      document.title = previousTitle
      if (createdMeta && meta.parentNode) {
        meta.parentNode.removeChild(meta)
      } else if (previousDescription) {
        meta.setAttribute('content', previousDescription)
      }
    }
  }, [title, description])
}
