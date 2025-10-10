const URL = "https://fsa-book-buddy-b6e748d1380d.herokuapp.com/api"





export async function register(username, password) {
    try {
        const response = await fetch (`${URL}/users/register`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({
                username, 
                password
            })
        })
    } catch (error) {
        console.error("Register Error ", error)
    }
}