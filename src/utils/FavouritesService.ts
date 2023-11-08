export const FavouritesService = {
    getFavourites() {
        const _favs = localStorage.getItem('favourites')
        if (_favs) return JSON.parse(_favs) as Array<string>
        return null
    },
    setFavourites(value: Array<string>) {
        const _favs = JSON.stringify(value)
        return localStorage.setItem('favourites', _favs)
    },
    removeFavourites() {
        return localStorage.removeItem('favourites')
    },
}