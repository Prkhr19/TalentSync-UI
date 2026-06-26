import api from "../Api/Axios"

export const updateCandidateProfile = async (profileData) => {
    const token = localStorage.getItem("token")
    const response = await api.put(
        "/candidate/profile",
        profileData,
        {
            headers: {
                Authorization: token ? `Bearer ${token}` : undefined,
            },
        }
    )
    return response.data
}

export const getApplicationStatus = async() =>{
    const response = await api.get('/candidate/applicationStatus')
    return response.data?.data || response.data
}

