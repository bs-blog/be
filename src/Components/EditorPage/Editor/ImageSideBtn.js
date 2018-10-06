import { ImageSideButton, Block, addNewBlock } from 'medium-draft'
import 'isomorphic-fetch'
import './ImageSideBtn.css'
import firebase from '../../../lib/firebase'

const apiUpload = async e => {
  const file = e.target.files[0]

  if (file.type.indexOf('image/') !== 0) {
    throw new Error('Uploaded file is not images.')
  }

  const name = file.name
  const formData = new FormData()
  formData.append('file', file, name)
  formData.append('name', name)

  const response = await fetch('/ajax/upload', {
    method: 'POST',
    body: formData
  })

  return response.json()
}

const firebaseUpload = async e => {
  const file = e.target.files[0]
  const name = file.name
  const storageRef = firebase.storage().ref()

  if (file.type.indexOf('image/') !== 0) {
    throw new Error('Uploaded file is not images.')
  }

  const snapshoot = await storageRef.child(`images/${name}`).put(file)
  const url = await snapshoot.ref.getDownloadURL()

  return { url }
}

export class ApiImageSideBtn extends ImageSideButton {
  async onChange(e) {
    const data = await apiUpload(e)

    if (data && data.url) {
      this.props.setEditorState(
        addNewBlock(this.props.getEditorState(), Block.IMAGE, {
          src: data.url
        })
      )
    }

    this.props.close()
  }
}

export class FirebaseImageSideBtn extends ImageSideButton {
  async onChange(e) {
    const data = await firebaseUpload(e)

    if (data && data.url) {
      this.props.setEditorState(
        addNewBlock(this.props.getEditorState(), Block.IMAGE, {
          src: data.url
        })
      )
    }

    this.props.close()
  }
}
