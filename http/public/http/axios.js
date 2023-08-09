

const HEADERS = {
    'Content-Type': 'application/json'
}


const request = async params => {
    try{
        const {
            method = 'GET',
            url,
            headers = HEADERS,
            body
        } = params
        
        const config = {
            url,
            method,
            headers,
            data: body
        }
        
        return axios(config)
    }
    catch(error){
        alert(error)
    }    
}

const get = async (url, headers) =>{
    const response = await request({
        url,
        headers,
        method: 'GET'
    })
    
    return response.data
}

const post = async (url,body, headers)=>{
    const response = await request({
        url,
        headers,
        method: 'POST',
        body
    })
    
    return response.data
}

const patch = async (url,body, headers)=>{
    const response = await request({
        url,
        headers,
        method: 'PATCH',
        body
    })
    
    return response.data
}

const deleteRequest  = async (url,body, headers)=>{
    const response = await request({
        url,
        headers,
        method: 'DELETE',
        body
    })
    
    return response.data
}


const put = async (url,body, headers)=>{
    const response = await request({
        url,
        headers,
        method: 'PUT',
        body
    })
    
    return response.data
}

export default {
    get,
    post,
    put,
    patch,
    delete: deleteRequest
}