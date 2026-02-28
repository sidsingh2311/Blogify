// creating a function to get the local storage details 
export const token = () => {
    const userInfo = localStorage.getItem("mern-blog");
    return userInfo? JSON.parse(userInfo).token : null

}