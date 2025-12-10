export const getGameInfo = () => {
    return fetch("http://localhost:8088/games?_expand=user").then((res) => res.json())
}