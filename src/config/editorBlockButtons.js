const blogEditor = [
  {
    label: 'H1',
    style: 'header-one',
    icon: 'header',
    description: 'Heading 1'
  },
  {
    label: 'H2',
    style: 'header-two',
    icon: 'header',
    description: 'Heading 2'
  },
  {
    label: 'H3',
    style: 'header-three',
    icon: 'header',
    description: 'Heading 3'
  },
  {
    label: 'Q',
    style: 'blockquote',
    icon: 'quote-right',
    description: 'Blockquote'
  },
  {
    label: 'UL',
    style: 'unordered-list-item',
    icon: 'list-ul',
    description: 'Unordered List'
  }
]

const codeEditor = [
  {
    label: 'H1',
    style: 'header-one',
    icon: 'header',
    description: 'Heading 1'
  },
  {
    label: 'H2',
    style: 'header-one',
    icon: 'header',
    description: 'Heading 2'
  },
  {
    label: 'H3',
    style: 'header-one',
    icon: 'header',
    description: 'Heading 3'
  },
  {
    label: 'Q',
    style: 'blockquote',
    icon: 'quote-right',
    description: 'Blockquote'
  },
  {
    label: 'Code',
    style: 'code-block',
    description: 'javascript code'
  },
  {
    label: 'UL',
    style: 'unordered-list-item',
    icon: 'list-ul',
    description: 'Unordered List'
  }
]

const DEFAULT_BLOCK_BUTTONS = blogEditor

export default { blogEditor, codeEditor, DEFAULT_BLOCK_BUTTONS }
