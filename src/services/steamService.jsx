export const searchSteamGames = (term) => {
    return fetch(`/steam/api/storesearch/?term=${term}&cc=US&l=english`).then((res) => res.json())
}