import { Search } from 'lucide-react'

interface SearchBarProps {
  searchText: string
  setSearchText: (value: string) => void
}

const SearchBar = ({ searchText, setSearchText }: SearchBarProps) => {
  return (
    <div className="w-full bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 px-4 py-3 rounded-full max-w-3xl mx-auto shadow-lg">
      <div className="relative flex items-center">
        <Search className="absolute left-2 h-5 w-5 text-gray-400" />
        <input
          type="text"
          placeholder="Search for songs..."
          className="w-full bg-transparent py-2 sm:pr-10 pl-10 text-base text-gray-200 placeholder-gray-400 outline-none"
          value={searchText}
          onChange={(e) => setSearchText(e.target.value)}
        />
      </div>
    </div>
  )
}

export default SearchBar
