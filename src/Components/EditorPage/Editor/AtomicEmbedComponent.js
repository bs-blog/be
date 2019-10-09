import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const EmbededVideoBlock = styled.div`
  text-align: center;
`

const getInnerHtml = url => {
  if (url.indexOf('soundcloud.com') !== -1) {
    // <iframe width="100%" height="300" scrolling="no" frameborder="no" allow="autoplay" src="https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/182045307&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true&visual=true"></iframe>
    return `${url}`
  }

  if (url.indexOf('<iframe') !== -1) {
    const iframeSrc = url.split(' ')[1]
    if (iframeSrc.indexOf('src="https://player.vimeo.com/video/') !== -1) {
      // http://tv.pacificleague.jp/vod/pc/topics/sns/27948 iframe
      return `<iframe ${iframeSrc} width="640" height="360" frameborder="0" allowfullscreen />`
    }

    return ''
  }

  if (url.indexOf('www.youtube.com') !== -1) {
    //youtube origin link
    const _url = new URL(url)
    const getVideoHash = _url.searchParams.get('v')
    return `<iframe width="640" height="360" src="https://www.youtube.com/embed/${getVideoHash}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`
  }

  if (url.indexOf('youtu.be') !== -1) {
    // youtube share Link
    const _url = new URL(url)
    const getVideoHash = _url.pathname
    return `<iframe width="640" height="360" src="https://www.youtube.com/embed/${getVideoHash}" frameborder="0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`
  }

  return ''
}

export default class AtomicEmbedComponent extends React.Component {
  static propTypes = {
    data: PropTypes.object.isRequired
  }
  render() {
    const { url } = this.props.data
    const innerHTML = getInnerHtml(url)
    return (
      <EmbededVideoBlock>
        <div dangerouslySetInnerHTML={{ __html: innerHTML }} />
      </EmbededVideoBlock>
    )
  }
}
