import axios from 'axios'
export default async(url='', data={}, type='POST', isUrl = 0) => {
    const basicUrl = '192.168.1.6:3003';
    
    // const basicUrl = 'https://m.gzbfdc.com/servlet';
    type = type.toUpperCase();
    if(isUrl === 0) {
      url = basicUrl + url;
    }
    try {
        
        if(type === 'GET'){
            const response = axios.get(url, {params: data});
            return response;
        }else if(type === 'POST'){
            const response = axios.post(url, data ,{headers: {'Content-Type': 'application/x-www-form-urlencoded'}});
            console.log('post:' + JSON.stringify(data));
            return response;
        }else if(type === 'DELETE'){
            const response = axios({
                method: 'delete',
                url: url,
                params: data
            });
            console.log('delete:' + JSON.stringify(data));
            return response;
        }
    } catch(error) {
        throw new Error(error)
    }
}
