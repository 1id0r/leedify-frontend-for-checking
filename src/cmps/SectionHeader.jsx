import React from 'react'

export default function StationPage() {
  return (
    <div className='station-page'>
      {/* Header Section */}
      <header className='station-header'>
        <div className='station-header__cover'>
          <div className='station-header__icon'>♥</div>
        </div>

        <div className='station-header__info'>
          <span className='station-header__type'>Station</span>
          <h1 className='station-header__title'>Liked Songs</h1>
          <div className='station-header__meta'>
            <span className='station-header__owner'>lidornissim</span>
            <span className='station-header__songs-count'>2,644 songs</span>
          </div>
        </div>
      </header>

      {/* Controls Section */}
      <div className='station-controls'>
        <button className='station-controls__play'>
          <span className='station-controls__play-icon'>▶</span>
        </button>
        <button className='station-controls__list'>List</button>
      </div>

      {/* Table Header */}
      <div className='station-table-header'>
        <div className='station-table-header__number'>#</div>
        <div className='station-table-header__title'>Title</div>
        <div className='station-table-header__album'>Album</div>
        <div className='station-table-header__date'>Date added</div>
        <div className='station-table-header__duration'>
          <svg width='16' height='16' viewBox='0 0 16 16'>
            <path d='M8 1.5a6.5 6.5 0 100 13 6.5 6.5 0 000-13zM0 8a8 8 0 1116 0A8 8 0 010 8z' fill='currentColor' />
            <path
              d='M8 3.25a.75.75 0 01.75.75v3.25H11a.75.75 0 010 1.5H7.25V4A.75.75 0 018 3.25z'
              fill='currentColor'
            />
          </svg>
        </div>
      </div>
    </div>
  )
}
