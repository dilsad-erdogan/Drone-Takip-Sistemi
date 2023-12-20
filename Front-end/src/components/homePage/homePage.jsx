import React from 'react'
import './homePage.css';

const homePage = () => {
  return (
    <>
      <div className='container'>
        <div className='blurryBackground'></div>

        <div className='content'>
          <h1>Drone Takip Sistemine Hoşgeldiniz.</h1>
          <p>Burada bizim bilgilerimizi göreceksiniz.</p>
        </div>
      </div>
      {/* css dosyasında belirtilen sınıf ile container, blurryBackground ve content sınıflarının tasarımı yapılıyor ve content içerisinde yazılan yazılar gösteriliyor. */}
    </>
  )
}

export default homePage