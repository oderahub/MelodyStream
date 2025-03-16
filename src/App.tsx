import MusicList from './components/MusicList'

const App = () => {
  return (
    <main className="min-h-screen bg-gray-900 text-white flex flex-col items-center relative">
      <div className="fixed inset-0 bg-gradient-to-br from-gray-900 to-gray-800 z-0" />
      <div className="fixed top-0 left-0 w-full h-full bg-[radial-gradient(ellipse_at_top_right,_rgba(120,_81,_169,_0.1),_transparent_70%)] z-0" />
      <div className="fixed bottom-0 right-0 w-full h-full bg-[radial-gradient(ellipse_at_bottom_left,_rgba(219,_39,_119,_0.1),_transparent_70%)] z-0" />

      <div className="relative z-10 w-full">
        <MusicList />
      </div>
    </main>
  )
}

export default App
