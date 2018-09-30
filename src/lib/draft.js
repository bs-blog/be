import DraftJS from 'draft-js'

const IMAGE_TYPE = 'atomic:image'

const getRawContent = draftData => {
  const rawContent = !draftData.getCurrentContent
    ? draftData // it is a rawContent
    : DraftJS.convertToRaw(draftData.getCurrentContent()) // it is a content state

  return rawContent
}

export const getCoverImage = draftData => {
  if (!draftData) return ''

  const rawContent = getRawContent(draftData)

  if (!rawContent.blocks || !rawContent.blocks.length || rawContent.blocks.length <= 0) return ''

  for (let i = 0; i < rawContent.blocks.length; i++) {
    const item = rawContent.blocks[i]
    if (item.type === IMAGE_TYPE) return item.data.src
  }

  return ''
}

export const getTitle = draftData => {
  if (!draftData) return ''

  const rawContent = getRawContent(draftData)

  if (!rawContent.blocks || !rawContent.blocks.length || rawContent.blocks.length <= 0) return ''

  for (let i = 0; i < rawContent.blocks.length; i++) {
    const item = rawContent.blocks[i]
    if (item.text) return item.text
  }

  return ''
}

export const getDescription = draftData => {
  if (!draftData) return ''

  const rawContent = getRawContent(draftData)

  if (!rawContent.blocks || !rawContent.blocks.length || rawContent.blocks.length <= 0) return ''

  for (let i = 0; i < rawContent.blocks.length; i++) {
    const item = rawContent.blocks[i]
    if (item.text && item.text.length > 50) return item.text
  }

  return ''
}
