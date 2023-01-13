import React from 'react'

const ImageCom = (props) => {
  return (
    <img key={props.path} src={props.path} />
  )
}

export default ImageCom