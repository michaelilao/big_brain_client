import axios from 'axios';
const API =  process.env.NODE_ENV === 'production' ? 'https://bigbrain-mcmaster-server.herokuapp.com/api' : "http://localhost:8080/api"
console.log(API)
export const addScore = async (req) => {
    const response = await axios.post(`${API}/score/addscore`, {
        username: req.username,
        score: req.score
    })
    return response
} 

export const getAverageScore = async (req) => {
    const response = await axios.get(`${API}/score/getaveragescores`)
    return response
}

export const getScore = async (req) => {
    const username = req.username;
    const response = await axios.get(`${API}/score/getscore/${username}`)
    return response
}