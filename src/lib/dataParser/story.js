export const reader = item => {
  const rawContent = JSON.parse(item.data)
  return {
    ...item,
    rawContent
  }
}
