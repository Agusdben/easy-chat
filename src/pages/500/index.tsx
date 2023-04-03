import Error from 'next/error'
import React from 'react'

const Custom500: React.FC = () => {
  return (
    <Error statusCode={500} title='Internal server error'/>
  )
}

export default Custom500
