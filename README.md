# MelodyStream

A sleek, modern music player built with React and TypeScript, designed to help users discover and enjoy their favorite songs without the hassle. Hosted on Vercel, this app fetches a curated collection of music from an external API, featuring search functionality, infinite scroll pagination, and single-track playback with a responsive UI.

## Features

- **Song List**: Displays a grid of songs with album art, titles, and artists.
- **Search**: Filter songs by title or artist name in real-time.
- **Single Playback**: Ensures only one song plays at a time, pausing others automatically.
- **Pagination**: Loads more songs as you scroll with a "Load More" button.
- **Image Fallback**: Handles broken album art URLs with a musical notes placeholder.
- **Responsive Design**: Adapts to mobile, tablet, and desktop screens using Tailwind CSS.
- **Error Handling**: Gracefully manages API errors and broken media links.

## Tech Stack

- **Frontend**: React, TypeScript, Tailwind CSS
- **Icons**: Lucide React
- **Data Fetching**: Native Fetch API
- **Deployment**: Vercel
- **API**: Robo Music API

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn
- Git

### Installation

#### Clone the Repository

```bash
git clone https://github.com/oderahub/MelodyStream.git
cd MelodyStream
```

#### Install Dependencies

```bash
npm install
```

**or**

```bash
yarn install
```

#### Run Locally

```bash
npm run dev
```

**or**

```bash
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Project Structure

```
MelodyStream/
├── public/
│   └── fallback-image.png  # Optional fallback image for broken album art
├── src/
│   ├── components/
│   │   ├── MusicList.tsx    # Main song list component
│   │   ├── SearchBar.tsx    # Search input component
│   │   └── AudioPlayer.tsx  # Handles playback logic
│   ├── pages/
│   │   ├── Home.tsx         # Main page displaying songs
│   │   └── NotFound.tsx     # 404 page
│   └── App.tsx              # Root component
├── package.json
└── README.md
```

## Usage

- **Browse Songs**: View the initial list of 30 songs fetched from the API.
- **Search**: Type in the search bar to filter songs by title or artist.
- **Play**: Click the play button on any song—others will pause automatically.
- **Load More**: Click the "Load More" button to fetch the next page of songs.

## Deployment

The app is deployed on Vercel: [Live Demo](https://melody-mu.vercel.app/)

To deploy your own:

1. Push to a GitHub repository.
2. Link it to Vercel via the dashboard.
3. Vercel will auto-detect the React app and deploy it.

## Known Issues

- **Broken Images**: One API-provided `songImage` URLs (e.g., Bing thumbnails) may fail. A fallback image ([Musical Notes SVG](https://upload.wikimedia.org/wikipedia/commons/thumb/8/84/Musical_notes.svg/240px-Musical_notes.svg.png)) is used.
- **API Pagination**: The API may repeat songs across pages. The app uses composite keys (`${songTitle}-${artistName}-${index}`) to avoid duplicate key errors.

## Future Improvements

- Replace the external API with a static JSON file or a more reliable source.
- Add a global play/pause control in the header.
- Implement audio progress bars and volume controls.
- Cache API responses for faster loading.

## Contributing

1. Fork the repository.
2. Create a feature branch: `git checkout -b feature/your-feature`.
3. Commit changes: `git commit -m "Add your feature"`.
4. Push to the branch: `git push origin feature/your-feature`.
5. Open a pull request.

## License

This project is licensed under the MIT License. See [LICENSE](LICENSE) for details.

## Acknowledgments

- **xAI for Grok**, which assisted in development and debugging.
- **Lucide React** for icons.
- **Tailwind CSS** for styling.

**GitHub Repository:** [MelodyStream](https://github.com/oderahub/MelodyStream)
