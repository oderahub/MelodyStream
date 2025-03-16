import { useState, useEffect, useRef } from 'react'
import SearchBar from './SearchBar'
import { Music, Loader2, ChevronDown, Play } from 'lucide-react'

interface Song {
  id: number
  songImage: string
  artistName: string
  songTitle: string
  songUrl: string
  albumName: string
  releaseDate: string
}

const MusicList = () => {
  const [searchText, setSearchText] = useState('')
  const [songs, setSongs] = useState<Song[]>([])
  const [page, setPage] = useState(1)
  const [loading, setLoading] = useState(false)
  const [hasMore, setHasMore] = useState(true)
  const [currentlyPlaying, setCurrentlyPlaying] = useState<number | null>(null)
  const audioRefs = useRef<Map<number, HTMLAudioElement>>(new Map()) // Track audio elements

  const fetchSongs = async (pageNum: number) => {
    setLoading(true)
    try {
      const response = await fetch(
        `https://robo-music-api.onrender.com/music/my-api?page=${pageNum}`
      )
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`)
      }
      const newSongs: Song[] = await response.json()
      if (newSongs.length === 0) {
        setHasMore(false)
      } else {
        setSongs((prevSongs) => [...prevSongs, ...newSongs])
      }
    } catch (error) {
      console.error('Fetch Error:', error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchSongs(page)
  }, [page])

  const filteredSongs = songs.filter(
    (song) =>
      song.songTitle.toLowerCase().includes(searchText.toLowerCase()) ||
      song.artistName.toLowerCase().includes(searchText.toLowerCase())
  )

  const handleNextPage = () => {
    if (hasMore && !loading) {
      setPage((prevPage) => prevPage + 1)
    }
  }

  const handlePlay = (id: number) => {
    if (currentlyPlaying !== id) {
      // Pause all other audio elements
      audioRefs.current.forEach((audio, audioId) => {
        if (audioId !== id && !audio.paused) {
          audio.pause()
          audio.currentTime = 0
        }
      })
      setCurrentlyPlaying(id)
    }
  }

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>, song: Song) => {
    console.warn(
      `Image failed to load: ${song.songImage} for "${song.songTitle}" by ${song.artistName}`
    )
    e.currentTarget.src = '/fallback-image.jpg'
  }

  return (
    <div className="wrapper max-w-6xl mx-auto p-4">
      <header className="text-center py-8">
        <div className="flex justify-center mb-4">
          <div className="h-16 w-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg">
            <Music className="h-8 w-8 text-white" />
          </div>
        </div>
        <h1 className="text-4xl font-bold mb-2">
          Find{' '}
          <span className="bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent">
            Songs
          </span>{' '}
          You'll Enjoy Without The Hassle
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">
          Discover your next favorite track from our curated collection of music
        </p>
      </header>

      <SearchBar searchText={searchText} setSearchText={setSearchText} />

      <div className="mt-12">
        {filteredSongs.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredSongs.map((song, index) => (
              <div
                key={`${song.songTitle}-${song.artistName}-${index}`}
                className={`bg-gray-800/70 backdrop-blur-sm rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-700/50 group ${
                  currentlyPlaying === song.id ? 'ring-2 ring-purple-500' : ''
                }`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={song.songImage}
                    alt={song.songTitle}
                    className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => handleImageError(e, song)}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-start p-4">
                    <div className="text-white">
                      <p className="text-sm font-medium">{song.albumName}</p>
                      <p className="text-xs opacity-75">{song.releaseDate}</p>
                    </div>
                  </div>
                </div>
                <div className="p-4 flex flex-col gap-3">
                  <div className="flex items-center gap-2">
                    {currentlyPlaying === song.id && (
                      <Play className="h-4 w-4 text-purple-400" fill="currentColor" />
                    )}
                    <div>
                      <h2 className="text-lg font-semibold text-white truncate">
                        {song.songTitle}
                      </h2>
                      <p className="text-gray-400 text-sm">{song.artistName}</p>
                    </div>
                  </div>
                  <audio
                    controls
                    src={song.songUrl}
                    className="w-full h-10 mt-2"
                    ref={(el) => {
                      if (el) audioRefs.current.set(song.id, el)
                      else audioRefs.current.delete(song.id)
                    }}
                    onPlay={() => handlePlay(song.id)}
                  />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-gray-800/40 backdrop-blur-sm rounded-xl border border-gray-700/50">
            <Music className="h-12 w-12 text-gray-500 mx-auto mb-4" />
            <p className="text-gray-400 text-lg">
              {searchText ? 'No songs match your search.' : 'No songs available yet.'}
            </p>
          </div>
        )}

        {hasMore && (
          <div className="text-center mt-10 mb-12">
            <button
              onClick={handleNextPage}
              disabled={loading}
              className={`px-6 py-3 rounded-full text-white font-medium flex items-center gap-2 mx-auto ${
                loading
                  ? 'bg-gray-700 cursor-not-allowed'
                  : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 shadow-lg hover:shadow-purple-500/20'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="h-5 w-5 animate-spin" />
                  <span>Loading...</span>
                </>
              ) : (
                <>
                  <span>Load More</span>
                  <ChevronDown className="h-5 w-5" />
                </>
              )}
            </button>
          </div>
        )}
      </div>
    </div>
  )
}

export default MusicList
