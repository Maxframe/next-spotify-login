import { useSession, signIn, signOut } from "next-auth/react";
import { useState } from "react";

export default function Home() {
  const { data: session } = useSession();
  const [playlistList, setPlaylistList] = useState([]);
  const [topArtistsList, setTopArtistsList] = useState([]);

  const getMyPlaylists = async () => {
    const res = await fetch("/api/playlists");
    const { items } = await res.json();
    setPlaylistList(items);
  };
  const getMyTopArtists = async () => {
    const res = await fetch("/api/topartists");
    const { items } = await res.json();
    setTopArtistsList(items);
  };

  if (session) {
    return (
      <>
        <div className="flex justify-between m-2">
          Signed in as {session?.token?.email} <br />
          <button
            className="p-2 border bg-red-600 text-white rounded-lg"
            onClick={() => signOut()}
          >
            Sign out
          </button>
        </div>
        <hr />
        <div className="flex flex-row justify-around w-full m-2">
          <div>
            <button
              className="p-2 border bg-green-600 text-white rounded-lg"
              onClick={() => getMyPlaylists()}
            >
              Get all my playlists
            </button>
            {playlistList.map((item) => (
              <div key={item.id}>
                <h1>{item.name}</h1>
                <img src={item.images[0]?.url} width="100" />
              </div>
            ))}
          </div>
          <div>
            <button
              className="p-2 border bg-green-600 text-white rounded-lg"
              onClick={() => getMyTopArtists()}
            >
              Get all my top artists
            </button>
            {topArtistsList.map((item) => (
              <div key={item.id}>
                <h1>{item.name}</h1>
                <img src={item.images[0]?.url} width="100" />
              </div>
            ))}
          </div>
        </div>
      </>
    );
  }
  return (
    <>
      Not signed in <br />
      <button onClick={() => signIn()}>Sign in</button>
    </>
  );
}
