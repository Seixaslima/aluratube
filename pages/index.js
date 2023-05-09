import React from 'react'
import config from '../config.json'
import styled from 'styled-components'
import Menu from '../src/components/Menu'
import { StyledTimeline } from '../src/components/Timeline'

function HomePage() {
  const [tituloDoVideo, setTituloDoVideo] = React.useState('')

  return (
    <>
      <div>
        <Menu
          tituloDoVideo={tituloDoVideo}
          setTituloDoVideo={setTituloDoVideo}
        />
        <Header />
        <Timeline tituloDoVideo={tituloDoVideo} playlists={config.playlists} />
      </div>
    </>
  )
}

const StyledHeader = styled.div`
  background-color: ${({ theme }) => theme.backgroundLevel1};

  img {
    height: 80px;
    width: 80px;
    border-radius: 50%;
  }
  .user-info {
    display: flex;
    align-item: center;
    width: 100%;
    padding: 16px 32px;
    gap: 16px;
  }
`
const StyledBanner = styled.div`
  width: 100%
  background-color: red;
  background-image: url('https://plus.unsplash.com/premium_photo-1673960921809-c663b3e60788?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80');
  height: 320px;
`

function Header() {
  return (
    <StyledHeader>
      <StyledBanner />
      <section className="user-info">
        <img src={`https://github.com/${config.github}.png`}></img>
        <div>
          <h2>{config.name}</h2>
          <p>{config.job}</p>
        </div>
      </section>
    </StyledHeader>
  )
}

function Timeline({ tituloDoVideo, ...props }) {
  const playlistNames = Object.keys(props.playlists)
  const tituloDoFiltro = tituloDoVideo
  return (
    <StyledTimeline>
      {playlistNames.map(playlistName => {
        const videos = props.playlists[playlistName]
        return (
          <section key={playlistName}>
            <h2>{playlistName}</h2>
            <div>
              {videos
                .filter(video => {
                  const titleNormalized = video.title
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                  const searchValueNormalized = tituloDoFiltro
                    .toLowerCase()
                    .normalize('NFD')
                    .replace(/[\u0300-\u036f]/g, '')
                  return titleNormalized.includes(searchValueNormalized)
                })
                .map(video => {
                  return (
                    <a key={video.url} href={video.url}>
                      <img src={video.thumb}></img>
                      <span>{video.title}</span>
                    </a>
                  )
                })}
            </div>
          </section>
        )
      })}
    </StyledTimeline>
  )
}

export default HomePage
